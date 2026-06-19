using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

/// <summary>
/// Endpoints para reportes consolidadores y descargables.
/// </summary>
[ApiController]
[Route("api/v1/reportes")]
[Authorize]
public class ReportesController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ReportesController(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retorna el reporte consolidado DRR (Daily Run Report) para una fecha específica.
    /// </summary>
    [HttpGet("drr")]
    public async Task<ActionResult<DrrReportDto>> GetDrrReport([FromQuery] DateTime fecha)
    {
        var targetDate = fecha.Date;

        // Consultar Extrusiones
        var extrusiones = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .Where(e => e.Fecha.Date == targetDate)
            .ToListAsync();

        // Consultar Prensados
        var prensados = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .Where(p => p.Fecha.Date == targetDate)
            .ToListAsync();

        // Mapear Extrusiones
        var extrusionItems = extrusiones.Select(e => new DrrExtrusionItemDto
        {
            Id = e.Id,
            Extrusora = e.Extrusora != null ? e.Extrusora.Nombre : "",
            Turno = e.Turno != null ? e.Turno.Nombre : "",
            Operario = e.Operario != null ? e.Operario.Nombre : "",
            Producto = e.Producto ?? "",
            Programado = e.Programado,
            Producido = e.Producido,
            Target = e.Target,
            Eficiencia = e.Programado > 0 ? Math.Round((decimal)(e.Producido / (double)e.Programado) * 100, 2) : 0,
            TiempoInterrupcionMin = e.TiempoInterrupcionMin,
            KgVirgen = e.KgVirgen,
            KgMolido = e.KgMolido
        }).ToList();

        // Mapear Prensados
        var prensadoItems = prensados.Select(p => new DrrPrensadoItemDto
        {
            Id = p.Id,
            Prensa = p.Prensa != null ? p.Prensa.Nombre : "",
            Turno = p.Turno != null ? p.Turno.Nombre : "",
            Operario = p.Operario != null ? p.Operario.Nombre : "",
            Producto = p.Producto ?? "",
            Programado = p.Programado,
            Producido = p.Producido,
            Target = p.Target,
            Eficiencia = p.Programado > 0 ? Math.Round((decimal)(p.Producido / (double)p.Programado) * 100, 2) : 0,
            TiempoInterrupcionMin = p.TiempoInterrupcionMin,
            LoteSilo = p.LoteSilo ?? ""
        }).ToList();

        var report = new DrrReportDto
        {
            Fecha = targetDate,
            Extrusiones = extrusionItems,
            Prensados = prensadoItems
        };

        return Ok(report);
    }
}

public class DrrReportDto
{
    public DateTime Fecha { get; set; }
    public List<DrrExtrusionItemDto> Extrusiones { get; set; } = new();
    public List<DrrPrensadoItemDto> Prensados { get; set; } = new();
}

public class DrrExtrusionItemDto
{
    public Guid Id { get; set; }
    public string Extrusora { get; set; } = string.Empty;
    public string Turno { get; set; } = string.Empty;
    public string Operario { get; set; } = string.Empty;
    public string Producto { get; set; } = string.Empty;
    public decimal Programado { get; set; }
    public int Producido { get; set; }
    public decimal Target { get; set; }
    public decimal Eficiencia { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public decimal KgVirgen { get; set; }
    public decimal KgMolido { get; set; }
}

public class DrrPrensadoItemDto
{
    public Guid Id { get; set; }
    public string Prensa { get; set; } = string.Empty;
    public string Turno { get; set; } = string.Empty;
    public string Operario { get; set; } = string.Empty;
    public string Producto { get; set; } = string.Empty;
    public decimal Programado { get; set; }
    public int Producido { get; set; }
    public decimal Target { get; set; }
    public decimal Eficiencia { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public string LoteSilo { get; set; } = string.Empty;
}
