using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Calidad;
using HiCone.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class CalidadController : ControllerBase
{
    private readonly ICalidadService _calidadService;

    public CalidadController(ICalidadService calidadService)
    {
        _calidadService = calidadService;
    }

    [HttpPost("reclamos")]
    public async Task<ActionResult<Reclamo>> AbrirReclamo([FromBody] AbrirReclamoRequest request)
    {
        var result = await _calidadService.AbrirReclamoAsync(request.Cliente, request.OrderDoc, request.Descripcion);
        return Ok(result);
    }

    [HttpPost("reclamos/{id}/detalles")]
    public async Task<IActionResult> AgregarDetalle(Guid id, [FromBody] AgregarDetalleReclamoRequest request)
    {
        var result = await _calidadService.AgregarDetalleReclamoAsync(id, request.NoSerieCarrete, request.Defecto, request.Observacion);
        return result ? Ok() : BadRequest();
    }

    [HttpPut("reclamos/{id}/resolver")]
    public async Task<IActionResult> Resolver(Guid id, [FromBody] ResolverReclamoRequest request)
    {
        var result = await _calidadService.ResolverReclamoAsync(id, request.AccionCorrectiva, request.ResueltoPor);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("defectos/reportar")]
    public async Task<IActionResult> ReportarDefecto([FromBody] ReportarDefectoRequest request)
    {
        var result = await _calidadService.MarcarCarreteDefectuosoAsync(request.NoSerieCarrete, request.Tipo, request.Descripcion);
        return result ? Ok() : BadRequest();
    }

    [HttpGet("reclamos/activos")]
    public async Task<ActionResult<IEnumerable<Reclamo>>> GetActivos()
        => Ok(await _calidadService.GetReclamosActivosAsync());

    [HttpGet("trazabilidad/{noSerie}")]
    public async Task<IActionResult> GetTrazabilidad(string noSerie)
    {
        var result = await _calidadService.GetTrazabilidadCarreteAsync(noSerie);
        return result != null ? Ok(result) : NotFound("No se encontró trazabilidad para este carrete");
    }
}

public record AbrirReclamoRequest(string Cliente, string OrderDoc, string Descripcion);
public record AgregarDetalleReclamoRequest(string NoSerieCarrete, TipoDefecto Defecto, string Observacion);
public record ResolverReclamoRequest(string AccionCorrectiva, string ResueltoPor);
public record ReportarDefectoRequest(string NoSerieCarrete, TipoDefecto Tipo, string Descripcion);
