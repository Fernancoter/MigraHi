using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProduccionController : ControllerBase
{
    private readonly IProduccionService _produccionService;

    public ProduccionController(IProduccionService produccionService)
    {
        _produccionService = produccionService;
    }

    // ── Extrusión ─────────────────────────────────────────────────────────

    [HttpPost("extrusion/iniciar")]
    public async Task<ActionResult<Extrusion>> IniciarExtrusion([FromBody] IniciarExtrusionRequest request)
    {
        var result = await _produccionService.IniciarExtrusionAsync(request.ExtrusoraId, request.OperarioId, request.TurnoId, request.ProductoId);
        return Ok(result);
    }

    [HttpPost("extrusion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarExtrusion(Guid id, [FromBody] string? motivo)
    {
        var result = await _produccionService.FinalizarExtrusionAsync(id, motivo);
        return result ? Ok() : BadRequest("No se pudo finalizar la extrusión");
    }

    [HttpPost("extrusion/{id}/registrar-bobina")]
    public async Task<ActionResult<Bobina>> RegistrarBobina(Guid id, [FromBody] RegistrarBobinaRequest request)
    {
        var result = await _produccionService.registrarBobinaAsync(id, request.BobinaNo, request.Peso, request.Calibre, request.Ancho, request.Color);
        return Ok(result);
    }

    [HttpPost("extrusion/{id}/consumo")]
    public async Task<IActionResult> RegistrarConsumoExtrusion(Guid id, [FromBody] RegistrarConsumoRequest request)
    {
        try
        {
            var result = await _produccionService.RegistrarConsumoExtrusionAsync(id, request.SiloVirgenId, request.VirgenKg, request.SiloMolidoId, request.MolidoKg);
            return result ? Ok() : BadRequest("Error al registrar el consumo.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // ── Prensado ───────────────────────────────────────────────────────────

    [HttpPost("prensado/iniciar")]
    public async Task<ActionResult<Prensado>> IniciarPrensado([FromBody] IniciarPrensadoRequest request)
    {
        var result = await _produccionService.IniciarPrensadoAsync(request.PrensaId, request.OperarioId, request.TurnoId, request.ProductoId, request.TroquelId);
        return Ok(result);
    }

    [HttpPost("prensado/{id}/iniciar-carrera")]
    public async Task<ActionResult<Carrera>> IniciarCarrera(Guid id)
    {
        var result = await _produccionService.IniciarCarreraAsync(id);
        return Ok(result);
    }

    [HttpPost("prensado/carrera/{id}/finalizar")]
    public async Task<IActionResult> FinalizarCarrera(Guid id)
    {
        var result = await _produccionService.FinalizarCarreraAsync(id);
        return result ? Ok() : BadRequest();
    }

    // ── Pallets ────────────────────────────────────────────────────────────

    [HttpPost("palets")]
    public async Task<ActionResult<Palet>> CrearPalet([FromBody] CrearPaletRequest request)
    {
        var result = await _produccionService.CrearPaletAsync(request.ProductoId, request.OperarioId, request.PrensaId);
        return Ok(result);
    }

    [HttpPost("palets/{id}/agregar-carrete")]
    public async Task<IActionResult> AgregarCarrete(Guid id, [FromBody] Guid carreteId)
    {
        var result = await _produccionService.AgregarCarreteAPaletAsync(id, carreteId);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("palets/{id}/finalizar")]
    public async Task<IActionResult> FinalizarPalet(Guid id)
    {
        var result = await _produccionService.FinalizarPaletAsync(id);
        return result ? Ok() : BadRequest();
    }

    // ── Interrupciones (Downtime) ──────────────────────────────────────────
    
    [HttpGet("causas-interrupcion")]
    public async Task<ActionResult<IEnumerable<CausaInterrupcion>>> GetCausasInterrupcion()
        => Ok(await _produccionService.GetCausasInterrupcionAsync());

    [HttpPost("extrusion/interrupcion")]
    public async Task<ActionResult<ExtrusionInterrupcion>> RegistrarInterrupcionExtrusion([FromBody] RegistrarInterrupcionRequest request)
    {
        var result = await _produccionService.RegistrarInterrupcionExtrusionAsync(request.EntidadId, request.CausaId, request.Descripcion);
        return Ok(result);
    }

    [HttpPost("extrusion/interrupcion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionExtrusion(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionExtrusionAsync(id);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("prensado/interrupcion")]
    public async Task<ActionResult<PrensadoInterrupcion>> RegistrarInterrupcionPrensado([FromBody] RegistrarInterrupcionRequest request)
    {
        var result = await _produccionService.RegistrarInterrupcionPrensadoAsync(request.EntidadId, request.CausaId, request.Descripcion);
        return Ok(result);
    }

    [HttpPost("prensado/interrupcion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionPrensado(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionPrensadoAsync(id);
        return result ? Ok() : BadRequest();
    }

    // ── Dashboards y Estado ────────────────────────────────────────────────

    [HttpGet("disponibilidad/bobinas")]
    public async Task<ActionResult<IEnumerable<Bobina>>> GetBobinasDisponibles()
        => Ok(await _produccionService.GetBobinasDisponiblesParaPrensadoAsync());

    [HttpGet("maquinas/extrusoras")]
    public async Task<ActionResult<IEnumerable<Extrusora>>> GetEstadoExtrusoras()
        => Ok(await _produccionService.GetEstadoExtrusorasAsync());

    [HttpGet("maquinas/prensas")]
    public async Task<ActionResult<IEnumerable<Prensa>>> GetEstadoPrensas()
        => Ok(await _produccionService.GetEstadoPrensasAsync());
}

// ── DTOs ──────────────────────────────────────────────────────────────────
public record IniciarExtrusionRequest(Guid ExtrusoraId, Guid OperarioId, Guid TurnoId, Guid ProductoId);
public record RegistrarBobinaRequest(int BobinaNo, decimal Peso, decimal Calibre, decimal Ancho, ColorEstacion Color);
public record IniciarPrensadoRequest(Guid PrensaId, Guid OperarioId, Guid TurnoId, Guid ProductoId, Guid TroquelId);
public record CrearPaletRequest(Guid ProductoId, Guid OperarioId, Guid PrensaId);
public record RegistrarInterrupcionRequest(Guid EntidadId, Guid CausaId, string? Descripcion);
public record RegistrarConsumoRequest(Guid SiloVirgenId, decimal VirgenKg, Guid? SiloMolidoId, decimal MolidoKg);
