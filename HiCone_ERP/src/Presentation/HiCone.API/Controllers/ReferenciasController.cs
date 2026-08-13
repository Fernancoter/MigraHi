using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/produccion/referencias")]
[AllowAnonymous]
public class ReferenciasController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ReferenciasController(IApplicationDbContext context)
    {
        _context = context;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CONFIGURACIÓN SISTEMA
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("configuracion")]
    public async Task<ActionResult<IEnumerable<object>>> GetConfiguracion()
    {
        // Auto-seed para pruebas si está vacío
        if (!await _context.ConfiguracionesSistema.AnyAsync())
        {
            var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
            _context.ConfiguracionesSistema.AddRange(
                new ConfiguracionSistema { Id = Guid.NewGuid(), Key = "BaseUrl", Valor = "https://erphi-cone.com/erp/", TenantId = defaultTenantId },
                new ConfiguracionSistema { Id = Guid.NewGuid(), Key = "ExtrusionAyudaURL", Valor = "https://nedi.mx/knowledge/article/941", TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        var items = await _context.ConfiguracionesSistema
            .OrderBy(c => c.Key)
            .Select(c => new { c.Id, c.Key, c.Valor })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("configuracion")]
    public async Task<ActionResult<Guid>> CreateConfiguracion([FromBody] ConfiguracionDto dto)
    {
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var entity = new ConfiguracionSistema
        {
            Id = Guid.NewGuid(),
            Key = dto.Key,
            Valor = dto.Valor,
            TenantId = defaultTenantId
        };
        _context.ConfiguracionesSistema.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("configuracion/{id}")]
    public async Task<IActionResult> UpdateConfiguracion(Guid id, [FromBody] ConfiguracionDto dto)
    {
        var entity = await _context.ConfiguracionesSistema.FindAsync(id);
        if (entity is null) return NotFound();
        
        entity.Key = dto.Key;
        entity.Valor = dto.Valor;
        
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("configuracion/{id}")]
    public async Task<IActionResult> DeleteConfiguracion(Guid id)
    {
        var item = await _context.ConfiguracionesSistema.FindAsync(id);
        if (item is null) return NotFound();
        _context.ConfiguracionesSistema.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EXTRUSORA PRODUCTO
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("extrusora-producto")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusoraProductos()
    {
        var items = await _context.ExtrusoraProductos
            .Include(ep => ep.Extrusora)
            .Include(ep => ep.Producto)
            .Where(ep => !ep.IsDeleted)
            .OrderBy(ep => ep.Extrusora.Nombre).ThenBy(ep => ep.Producto.Nombre)
            .Select(ep => new
            {
                ep.Id,
                ExtrusoraId = ep.ExtrusoraId,
                ExtrusoraNombre = ep.Extrusora.Nombre,
                ProductoId = ep.ProductoId,
                ProductoNombre = ep.Producto.Nombre,
                ProductoCalibre = ep.DefaultCalibre,
                ProductoAncho = ep.DefaultAncho.ToString(),
                ProductoLongitud = (int)ep.DefaultLongitud,
                ReposoMin = ep.DefaultMinutosReposo,
                ProcesoMin = 90
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("extrusora-producto")]
    public async Task<ActionResult<Guid>> CreateExtrusoraProducto([FromBody] ExtrusoraProductoDto dto)
    {
        if (dto.ExtrusoraId == Guid.Empty)
            return BadRequest(new { Error = "El campo ExtrusoraId es requerido y no puede estar vacío." });
        if ((dto.ProductoId is null || dto.ProductoId == Guid.Empty) && string.IsNullOrWhiteSpace(dto.ProductoNombre))
            return BadRequest(new { Error = "Debe indicar ProductoId o ProductoNombre." });

        var extrusoraExiste = await _context.Extrusoras.AnyAsync(e => e.Id == dto.ExtrusoraId);
        if (!extrusoraExiste)
            return BadRequest(new { Error = $"No existe una extrusora con Id {dto.ExtrusoraId}." });

        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var producto = await ResolveProductoAsync(dto.ProductoId, dto.ProductoNombre, defaultTenantId);
        if (producto == null)
            return BadRequest(new { Error = $"No existe un producto con Id {dto.ProductoId}." });

        var entity = new ExtrusoraProducto
        {
            Id = Guid.NewGuid(),
            ExtrusoraId = dto.ExtrusoraId,
            ProductoId = producto.Id,
            DefaultCalibre = dto.ProductoCalibre,
            DefaultAncho = ParseAnchoDecimal(dto.ProductoAncho),
            DefaultLongitud = dto.ProductoLongitud,
            DefaultMinutosReposo = dto.ReposoMin,
            TenantId = defaultTenantId
        };
        _context.ExtrusoraProductos.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("extrusora-producto/{id}")]
    public async Task<IActionResult> UpdateExtrusoraProducto(Guid id, [FromBody] ExtrusoraProductoDto dto)
    {
        var entity = await _context.ExtrusoraProductos.FirstOrDefaultAsync(x => x.Id == id);
        if (entity is null) return NotFound();

        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var producto = await ResolveProductoAsync(dto.ProductoId, dto.ProductoNombre, defaultTenantId);
        if (producto == null)
            return BadRequest(new { Error = $"No existe un producto con Id {dto.ProductoId}." });

        entity.ExtrusoraId = dto.ExtrusoraId;
        entity.ProductoId = producto.Id;
        entity.DefaultCalibre = dto.ProductoCalibre;
        entity.DefaultAncho = ParseAnchoDecimal(dto.ProductoAncho);
        entity.DefaultLongitud = dto.ProductoLongitud;
        entity.DefaultMinutosReposo = dto.ReposoMin;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    private static decimal ParseAnchoDecimal(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw)) return 0m;
        raw = raw.Trim();
        if (decimal.TryParse(raw, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out var parsed))
            return parsed;
        if (decimal.TryParse(raw, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.CurrentCulture, out var parsedCulture))
            return parsedCulture;

        try
        {
            var parts = raw.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length == 2 && parts[1].Contains('/'))
            {
                var whole = decimal.Parse(parts[0], System.Globalization.CultureInfo.InvariantCulture);
                var fracParts = parts[1].Split('/');
                var num = decimal.Parse(fracParts[0], System.Globalization.CultureInfo.InvariantCulture);
                var den = decimal.Parse(fracParts[1], System.Globalization.CultureInfo.InvariantCulture);
                return whole + (num / den);
            }
            else if (parts.Length == 1 && parts[0].Contains('/'))
            {
                var fracParts = parts[0].Split('/');
                var num = decimal.Parse(fracParts[0], System.Globalization.CultureInfo.InvariantCulture);
                var den = decimal.Parse(fracParts[1], System.Globalization.CultureInfo.InvariantCulture);
                return num / den;
            }
        }
        catch { }

        return 0m;
    }

    /// <summary>
    /// Resuelve el Producto real a asociar: prioriza ProductoId (FK real, usado por la
    /// pantalla de Extrusión que ya presenta un selector de catálogo). Si no viene
    /// ProductoId, cae al flujo legado por nombre (usado por la pantalla de Referencias
    /// con campo de texto libre), buscando o creando el Producto por nombre.
    /// </summary>
    private async Task<Producto?> ResolveProductoAsync(Guid? productoId, string? productoNombre, Guid tenantId)
    {
        if (productoId.HasValue && productoId.Value != Guid.Empty)
        {
            return await _context.Productos.FirstOrDefaultAsync(p => p.Id == productoId.Value);
        }

        if (string.IsNullOrWhiteSpace(productoNombre))
            return null;

        var producto = await _context.Productos.FirstOrDefaultAsync(p => p.Nombre == productoNombre);
        if (producto == null)
        {
            var generatedCode = $"PROD-{DateTime.UtcNow.Ticks.ToString().Substring(8)}";
            producto = new Producto
            {
                Id = Guid.NewGuid(),
                Nombre = productoNombre,
                Clave = generatedCode,
                Codigo = generatedCode,
                TenantId = tenantId
            };
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync(default);
        }
        return producto;
    }


    [HttpDelete("extrusora-producto/{id}")]
    public async Task<IActionResult> DeleteExtrusoraProducto(Guid id)
    {
        var item = await _context.ExtrusoraProductos.FindAsync(id);
        if (item is null) return NotFound();
        _context.ExtrusoraProductos.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }
}

public record ConfiguracionDto(string Key, string Valor);
public record ExtrusoraProductoDto(Guid ExtrusoraId, string? ProductoNombre, decimal ProductoCalibre, string ProductoAncho, int ProductoLongitud, int ReposoMin, int ProcesoMin, Guid? ProductoId = null);
