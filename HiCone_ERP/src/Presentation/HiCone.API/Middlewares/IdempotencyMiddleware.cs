using System.IO;
using System.Text;
using System.Threading.Tasks;
using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace HiCone.API.Middlewares;

public class IdempotencyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<IdempotencyMiddleware> _logger;
    private const string HeaderName = "Idempotency-Key";

    public IdempotencyMiddleware(RequestDelegate next, ILogger<IdempotencyMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.Request.Headers.TryGetValue(HeaderName, out var keyValues) || string.IsNullOrWhiteSpace(keyValues))
        {
            await _next(context);
            return;
        }

        string idempotencyKey = keyValues.ToString().Trim();
        string method = context.Request.Method.ToUpperInvariant();

        // Solo aplica a métodos que mutan estado
        if (method != "POST" && method != "PUT" && method != "PATCH" && method != "DELETE")
        {
            await _next(context);
            return;
        }

        using var scope = context.RequestServices.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<IApplicationDbContext>();

        // Verificar si la operación ya fue procesada
        var existing = await dbContext.IdempotencyRecords
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Key == idempotencyKey);

        if (existing != null && existing.ExpiresAt > System.DateTime.UtcNow)
        {
            _logger.LogInformation("Idempotency hit para Key: {Key}, Path: {Path}. Retornando respuesta previa cacheada.", idempotencyKey, context.Request.Path);
            context.Response.StatusCode = existing.StatusCode;
            context.Response.ContentType = existing.ResponseContentType ?? "application/json";
            context.Response.Headers["X-Idempotency-Hit"] = "true";

            if (!string.IsNullOrEmpty(existing.ResponseBody))
            {
                await context.Response.WriteAsync(existing.ResponseBody, Encoding.UTF8);
            }
            return;
        }

        // Si no existe, interceptar la respuesta para guardarla
        var originalBodyStream = context.Response.Body;
        using var memoryStream = new MemoryStream();
        context.Response.Body = memoryStream;

        try
        {
            await _next(context);

            memoryStream.Position = 0;
            string responseBody = await new StreamReader(memoryStream, Encoding.UTF8).ReadToEndAsync();
            memoryStream.Position = 0;

            // Guardar en base de datos si la respuesta fue exitosa o un resultado de negocio definitivo (< 500)
            if (context.Response.StatusCode < 500)
            {
                try
                {
                    var record = new IdempotencyRecord
                    {
                        Key = idempotencyKey,
                        Path = context.Request.Path,
                        Method = method,
                        StatusCode = context.Response.StatusCode,
                        ResponseBody = responseBody,
                        ResponseContentType = context.Response.ContentType,
                        CreatedAt = System.DateTime.UtcNow,
                        ExpiresAt = System.DateTime.UtcNow.AddHours(48)
                    };

                    dbContext.IdempotencyRecords.Add(record);
                    await dbContext.SaveChangesAsync(default);
                }
                catch (System.Exception ex)
                {
                    _logger.LogWarning(ex, "No se pudo persistir el registro de idempotencia para la key {Key}", idempotencyKey);
                }
            }

            await memoryStream.CopyToAsync(originalBodyStream);
        }
        finally
        {
            context.Response.Body = originalBodyStream;
        }
    }
}
