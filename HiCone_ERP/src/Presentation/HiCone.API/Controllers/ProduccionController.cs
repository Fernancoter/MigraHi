using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace HiCone.API.Controllers;

[Authorize]
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
        try
        {
            var result = await _produccionService.IniciarExtrusionAsync(
                request.ExtrusoraId, 
                request.OperarioId, 
                request.TurnoId, 
                request.ProductoId,
                request.SiloVirgenId,
                request.VirgenKg,
                request.SiloMolidoId,
                request.MolidoKg,
                request.MetaKg,
                request.RevHusilloVirgen,
                request.RevHusilloMolido,
                request.LotePaqueteAditivos,
                request.Observaciones
            );
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("extrusion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarExtrusion(Guid id, [FromBody] string? motivo)
    {
        var result = await _produccionService.FinalizarExtrusionAsync(id, motivo);
        return result ? Ok() : BadRequest("No se pudo finalizar la extrusión");
    }

    [HttpPost("extrusion/guardar-bobina")]
    public async Task<ActionResult<Bobina>> GuardarBobina([FromBody] GuardarBobinaRequest request)
    {
        try
        {
            var result = await _produccionService.GuardarBobinaAsync(
                request.ExtrusionId,
                request.BobinaNo,
                request.Origen,
                request.Peso,
                request.Calibre,
                request.Desviacion,
                request.Color,
                request.MermaKg,
                request.Motivo,
                request.Observaciones
            );
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("extrusion/activa/{extrusoraId}")]
    public async Task<ActionResult<Extrusion>> GetExtrusionActiva(Guid extrusoraId)
    {
        var result = await _produccionService.GetExtrusionActivaAsync(extrusoraId);
        if (result == null) return NotFound(new { message = "No hay extrusión activa para esta extrusora." });
        return Ok(result);
    }

    [HttpGet("extrusion/siguiente-bobina-no")]
    public async Task<ActionResult<int>> ObtenerSiguienteBobinaNo([FromQuery] Guid extrusoraId, [FromQuery] Guid productoId)
    {
        var result = await _produccionService.ObtenerSiguienteBobinaNoAsync(extrusoraId, productoId);
        return Ok(result);
    }

    [HttpGet("operarios")]
    public async Task<ActionResult<IEnumerable<Operario>>> GetOperarios()
    {
        var result = await _produccionService.GetOperariosAsync();
        return Ok(result);
    }

    [HttpGet("productos")]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
    {
        var result = await _produccionService.GetProductosAsync();
        return Ok(result);
    }

    [HttpGet("turnos")]
    public async Task<ActionResult<IEnumerable<Turno>>> GetTurnos()
    {
        var result = await _produccionService.GetTurnosAsync();
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

    [HttpPost("prensado/{id}/montar-bobina")]
    public async Task<IActionResult> MontarBobina(Guid id, [FromBody] Guid bobinaId)
    {
        var result = await _produccionService.MontarBobinaEnPrensadoAsync(id, bobinaId);
        return result ? Ok() : BadRequest();
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

    [HttpPost("extrusion/interrupcion/activa/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionExtrusionActiva(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionExtrusionActivaAsync(id);
        return result ? Ok() : BadRequest("No se encontró interrupción activa para esta extrusión");
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

    [HttpPost("prensado/interrupcion/activa/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionPrensadoActiva(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionPrensadoActivaAsync(id);
        return result ? Ok() : BadRequest("No se encontró interrupción activa para este prensado");
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

    // ── Gestión de Bobinas ─────────────────────────────────────────────────

    [HttpPost("bobina/{id}/pausar")]
    public async Task<IActionResult> PausarBobina(Guid id)
    {
        var result = await _produccionService.PausarBobinaAsync(id);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo pausar la bobina.");
    }

    [HttpPost("bobina/{id}/rechazar")]
    public async Task<IActionResult> RechazarBobina(Guid id, [FromBody] RechazarBobinaRequest request)
    {
        var result = await _produccionService.RechazarBobinaAsync(id, request.Motivo, request.Observaciones);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo rechazar la bobina.");
    }

    [HttpPost("bobina/{id}/validar")]
    public async Task<IActionResult> ValidarBobina(Guid id)
    {
        var result = await _produccionService.ValidarBobinaAsync(id);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo validar la bobina.");
    }

    [HttpPost("bobina/{id}/transferir")]
    public async Task<IActionResult> TransferirBobina(Guid id, [FromBody] Guid extrusionDestinoId)
    {
        var result = await _produccionService.TransferirBobinaAsync(id, extrusionDestinoId);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo transferir la bobina.");
    }

    // ── Recalibración ──────────────────────────────────────────────────────

    [HttpPost("extrusion/{id}/recalibrar")]
    public async Task<IActionResult> RecalibrarExtrusion(Guid id, [FromBody] RecalibrarExtrusionRequest request)
    {
        var result = await _produccionService.RecalibrarExtrusionAsync(id, request.Calibre, request.Ancho, request.Longitud);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo recalibrar.");
    }

    // ── Resultado y KPIs ───────────────────────────────────────────────────

    [HttpGet("extrusion/{id}/resultado")]
    public async Task<IActionResult> GetExtrusionResultado(Guid id)
    {
        var result = await _produccionService.GetExtrusionResultadoAsync(id);
        if (result == null) return NotFound(new { message = "No se encontró el resultado de la extrusión." });
        return Ok(result);
    }

    [HttpGet("extrusion/{id}/bobinas")]
    public async Task<ActionResult<IEnumerable<Bobina>>> GetBobinasByExtrusion(Guid id)
        => Ok(await _produccionService.GetBobinasByExtrusionAsync(id));

    // ── Turno Activo ───────────────────────────────────────────────────────

    [HttpGet("turnos/activo")]
    public async Task<IActionResult> GetTurnoActivo()
    {
        var turno = await _produccionService.GetTurnoActivoAsync();
        if (turno == null) return NotFound(new { message = "No se encontró un turno activo." });
        return Ok(turno);
    }

    // ── Historial de Extrusiones ───────────────────────────────────────────

    [HttpGet("extrusiones/historial")]
    public async Task<ActionResult<IEnumerable<Extrusion>>> GetHistorialExtrusiones(
        [FromQuery] DateTime? desde, [FromQuery] DateTime? hasta,
        [FromQuery] Guid? extrusoraId, [FromQuery] Guid? productoId)
        => Ok(await _produccionService.GetHistorialExtrusionesAsync(desde, hasta, extrusoraId, productoId));

    [HttpGet("extrusiones")]
    public async Task<ActionResult<IEnumerable<Extrusion>>> GetExtrusiones()
        => Ok(await _produccionService.GetExtrusionesAsync());

    [HttpGet("prensados")]
    public async Task<ActionResult<IEnumerable<Prensado>>> GetPrensados()
        => Ok(await _produccionService.GetPrensadosAsync());

    [HttpGet("turno-activo")]
    public async Task<IActionResult> GetTurnoActivoAlternativo()
    {
        var turno = await _produccionService.GetTurnoActivoAsync();
        if (turno == null) return NotFound(new { message = "No se encontró un turno activo." });
        return Ok(turno);
    }

    [HttpGet("extrusora-productos")]
    public async Task<ActionResult<IEnumerable<ExtrusoraProducto>>> GetExtrusoraProductos()
        => Ok(await _produccionService.GetExtrusoraProductosAsync());
}

// ── DTOs ──────────────────────────────────────────────────────────────────
public record IniciarExtrusionRequest(
    Guid ExtrusoraId, 
    Guid OperarioId, 
    Guid TurnoId, 
    Guid ProductoId, 
    Guid SiloVirgenId, 
    decimal VirgenKg, 
    Guid? SiloMolidoId, 
    decimal MolidoKg, 
    decimal MetaKg, 
    decimal RevHusilloVirgen, 
    decimal RevHusilloMolido, 
    string? LotePaqueteAditivos, 
    string? Observaciones
);

public record GuardarBobinaRequest(
    Guid ExtrusionId, 
    int BobinaNo, 
    string Origen, 
    decimal Peso, 
    decimal Calibre, 
    decimal Desviacion, 
    ColorEstacion Color, 
    decimal MermaKg, 
    MotivoMolino Motivo, 
    string? Observaciones
);
public record IniciarPrensadoRequest(Guid PrensaId, Guid OperarioId, Guid TurnoId, Guid ProductoId, Guid TroquelId);
public record CrearPaletRequest(Guid ProductoId, Guid OperarioId, Guid PrensaId);
public record RegistrarInterrupcionRequest(Guid EntidadId, Guid CausaId, string? Descripcion);
public record RegistrarConsumoRequest(Guid SiloVirgenId, decimal VirgenKg, Guid? SiloMolidoId, decimal MolidoKg);
public record RechazarBobinaRequest(MotivoMolino Motivo, string? Observaciones);
public record RecalibrarExtrusionRequest(decimal? Calibre, decimal? Ancho, decimal? Longitud);

