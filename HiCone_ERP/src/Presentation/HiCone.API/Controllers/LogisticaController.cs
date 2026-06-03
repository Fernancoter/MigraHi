using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Logistica;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace HiCone.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class LogisticaController : ControllerBase
{
    private readonly ILogisticaService _logisticaService;

    public LogisticaController(ILogisticaService logisticaService)
    {
        _logisticaService = logisticaService;
    }

    [HttpPost("embarques/desde-sae")]
    public async Task<ActionResult<Embarque>> CrearEmbarque([FromBody] CrearEmbarqueSaeRequest request)
    {
        var result = await _logisticaService.CrearEmbarqueDesdeSaeAsync(request.OrderDoc, request.RemissionDoc);
        return Ok(result);
    }

    [HttpPut("embarques/{id}/programar")]
    public async Task<IActionResult> Programar(Guid id, [FromBody] ProgramarTransporteRequest request)
    {
        var result = await _logisticaService.ProgramarTransporteAsync(id, request.Transporte, request.Placas, request.Conductor);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("embarques/{id}/iniciar-carga")]
    public async Task<IActionResult> IniciarCarga(Guid id)
    {
        var result = await _logisticaService.IniciarCargaAsync(id);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("embarques/{id}/validar-palet")]
    public async Task<IActionResult> ValidarPalet(Guid id, [FromBody] string noSeriePalet)
    {
        var (success, message) = await _logisticaService.ValidarPaletParaEmbarqueAsync(id, noSeriePalet);
        if (!success) return BadRequest(new { message });
        return Ok(new { message });
    }

    [HttpPost("embarques/{id}/finalizar")]
    public async Task<IActionResult> Finalizar(Guid id, [FromBody] string elaboradoPor)
    {
        var result = await _logisticaService.FinalizarEmbarqueAsync(id, elaboradoPor);
        return result ? Ok() : BadRequest();
    }

    [HttpGet("embarques/activos")]
    public async Task<ActionResult<IEnumerable<Embarque>>> GetActivos()
        => Ok(await _logisticaService.GetEmbarquesActivosAsync());

    [HttpGet("embarques/{id}/resumen")]
    public async Task<IActionResult> GetResumen(Guid id)
        => Ok(await _logisticaService.GetResumenCargaAsync(id));
}

public record CrearEmbarqueSaeRequest(string OrderDoc, string RemissionDoc);
public record ProgramarTransporteRequest(string Transporte, string Placas, string Conductor);
