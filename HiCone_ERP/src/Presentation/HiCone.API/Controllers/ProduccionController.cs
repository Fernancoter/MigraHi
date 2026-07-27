using HiCone.Application.Interfaces;
using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiCone.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class ProduccionController : ControllerBase
{
    private readonly IProduccionService _produccionService;
    private readonly IApplicationDbContext _context;

    public ProduccionController(IProduccionService produccionService, IApplicationDbContext context)
    {
        _produccionService = produccionService;
        _context = context;
    }

    // ── Extrusión ─────────────────────────────────────────────────────────

    [HttpGet("extrusion/{id}")]
    public async Task<ActionResult<Extrusion>> GetExtrusion(Guid id)
    {
        var item = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .Include(e => e.Producto)
            .Include(e => e.Bobinas)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (item == null) return NotFound(new { message = "Orden de extrusión no encontrada." });
        return Ok(item);
    }

    [HttpPost("extrusion")]
    public async Task<ActionResult<Extrusion>> CreateExtrusion([FromBody] CreateExtrusionRequest request)
    {
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var codigo = $"EXT-{DateTime.UtcNow:yyyyMMddHHmmss}";

        var entity = new Extrusion
        {
            Id = Guid.NewGuid(),
            Codigo = codigo,
            Fecha = request.Fecha.Date,
            FechaInicio = request.ProcessStart ?? DateTime.UtcNow,
            FechaFin = request.ProcessEnd,
            Estado = (EstadoExtrusion)request.Estado,
            ExtrusoraId = request.ExtrusoraId,
            TurnoId = request.TurnoId,
            OperarioId = request.OperarioId,
            ProductoId = request.ProductoId,
            Calibre = request.Calibre,
            Ancho = request.Ancho,
            Longitud = request.Longitud,
            MetaKg = request.MetaKg,
            VirgenKg = request.VirgenKg,
            MolidoKg = request.MolidoKg,
            LoteSilo = request.LoteSilo,
            LotePaqueteAditivos = request.LotePaqueteAditivos,
            TenantId = defaultTenantId
        };

        _context.Extrusiones.Add(entity);
        await _context.SaveChangesAsync(default);

        return Ok(entity);
    }

    [HttpPut("extrusion/{id}")]
    public async Task<IActionResult> UpdateExtrusion(Guid id, [FromBody] UpdateExtrusionRequest request)
    {
        var entity = await _context.Extrusiones.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de extrusión no encontrada." });

        entity.Fecha = request.Fecha.Date;
        entity.FechaInicio = request.ProcessStart ?? entity.FechaInicio;
        entity.FechaFin = request.ProcessEnd;
        entity.Estado = (EstadoExtrusion)request.Estado;
        entity.ExtrusoraId = request.ExtrusoraId;
        entity.TurnoId = request.TurnoId;
        if (request.ProductoId.HasValue)
        {
            entity.ProductoId = request.ProductoId.Value;
        }
        entity.OperarioId = request.OperarioId;
        entity.Calibre = request.Calibre;
        entity.Ancho = request.Ancho;
        entity.Longitud = request.Longitud;
        entity.MetaKg = request.MetaKg;
        entity.VirgenKg = request.VirgenKg;
        entity.MolidoKg = request.MolidoKg;
        entity.LoteSilo = request.LoteSilo;
        entity.LotePaqueteAditivos = request.LotePaqueteAditivos;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("extrusion/{id}")]
    public async Task<IActionResult> DeleteExtrusion(Guid id)
    {
        var entity = await _context.Extrusiones.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de extrusión no encontrada." });

        entity.IsDeleted = true;
        entity.DeletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

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

    [HttpGet("interrupciones-extrusion")]
    public async Task<ActionResult<IEnumerable<object>>> GetInterrupcionesExtrusion()
    {
        var interrupciones = await _produccionService.GetInterrupcionesExtrusionAsync();
        var items = interrupciones.Select(i => new
        {
            i.Id,
            i.ExtrusionId,
            ExtrusionIdLegacy = i.Extrusion != null ? i.Extrusion.ExtrusionIdLegacy : 0,
            Fecha = i.Extrusion != null ? i.Extrusion.Fecha : DateTime.UtcNow.Date,
            Estado = i.Extrusion != null ? i.Extrusion.Estado.ToString() : "",
            HoraInicioExtrusion = i.Extrusion != null ? i.Extrusion.FechaInicio : DateTime.UtcNow,
            HoraFinExtrusion = i.Extrusion != null ? i.Extrusion.FechaFin : null,
            Turno = (i.Extrusion != null && i.Extrusion.Turno != null) ? i.Extrusion.Turno.Nombre : "",
            Operador = (i.Extrusion != null && i.Extrusion.Operario != null) ? i.Extrusion.Operario.NombreCompleto : "",
            Extrusora = (i.Extrusion != null && i.Extrusion.Extrusora != null) ? i.Extrusion.Extrusora.Nombre : "",
            Producto = (i.Extrusion != null && i.Extrusion.Producto != null) ? i.Extrusion.Producto.Clave : "",
            TipoMaterial = (i.Extrusion != null && i.Extrusion.SiloVirgen != null && i.Extrusion.SiloVirgen.TipoMaterial != null) ? i.Extrusion.SiloVirgen.TipoMaterial : "PCR",
            Concluida = i.Concluida,
            HoraInicio = i.HoraInicio,
            HoraFin = i.HoraFin,
            Descripcion = i.Descripcion,
            DuracionMinutos = i.DuracionMinutos,
            CausaId = i.CausaId,
            CausaCodigo = i.Causa != null ? i.Causa.Codigo : "",
            CausaDescripcion = i.Causa != null ? i.Causa.Descripcion : "",
            CausaTipo = i.Causa != null ? i.Causa.Tipo : "General"
        });

        return Ok(items);
    }

    [HttpPost("extrusion/interrupcion/manual")]
    public async Task<ActionResult<ExtrusionInterrupcion>> RegistrarInterrupcionManual([FromBody] RegistrarInterrupcionManualRequest request)
    {
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var interrupcion = new ExtrusionInterrupcion
        {
            Id = Guid.NewGuid(),
            ExtrusionId = request.ExtrusionId,
            CausaId = request.CausaId,
            Descripcion = request.Descripcion,
            HoraInicio = request.HoraInicio,
            HoraFin = request.HoraFin,
            Concluida = request.Concluida,
            TenantId = defaultTenantId
        };

        _context.ExtrusionInterrupciones.Add(interrupcion);

        var extrusion = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .FirstOrDefaultAsync(e => e.Id == request.ExtrusionId);

        if (extrusion != null)
        {
            var todasInterrupciones = await _context.ExtrusionInterrupciones
                .Where(i => i.ExtrusionId == request.ExtrusionId && !i.IsDeleted)
                .ToListAsync();

            double totalMinutos = todasInterrupciones
                .Where(i => i.HoraFin.HasValue)
                .Sum(i => (i.HoraFin.Value - i.HoraInicio).TotalMinutes);

            if (request.Concluida && request.HoraFin.HasValue)
            {
                totalMinutos += (request.HoraFin.Value - request.HoraInicio).TotalMinutes;
            }

            extrusion.TiempoInterrupcion = (int)Math.Round(totalMinutos);

            bool hayActivas = todasInterrupciones.Any(i => !i.Concluida) || (!request.Concluida);
            extrusion.InterrupcionEnCurso = hayActivas;

            if (extrusion.Extrusora != null)
            {
                extrusion.Extrusora.Estado = hayActivas ? EstadoExtrusora.Detenida : EstadoExtrusora.EnProceso;
            }
        }

        await _context.SaveChangesAsync(default);
        return Ok(interrupcion);
    }

    [HttpPut("extrusion/interrupcion/{id}")]
    public async Task<IActionResult> ActualizarInterrupcionExtrusion(Guid id, [FromBody] ActualizarInterrupcionManualRequest request)
    {
        var result = await _produccionService.ActualizarInterrupcionExtrusionAsync(
            id,
            request.CausaId,
            request.Descripcion,
            request.HoraInicio,
            request.HoraFin,
            request.Concluida
        );

        return result ? NoContent() : BadRequest("No se pudo actualizar la interrupción.");
    }

    [HttpDelete("extrusion/interrupcion/{id}")]
    public async Task<IActionResult> EliminarInterrupcionExtrusion(Guid id)
    {
        var result = await _produccionService.EliminarInterrupcionExtrusionAsync(id);
        return result ? NoContent() : BadRequest("No se pudo eliminar la interrupción.");
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

    [HttpGet("extrusion/programacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusionesProgramacion()
    {
        var items = await _context.Extrusiones
            .Include(e => e.Turno)
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Where(e => !e.IsDeleted && e.Estado == EstadoExtrusion.Programada)
            .OrderByDescending(e => e.Fecha)
            .Select(e => new
            {
                e.Id,
                FechaExtrusora = e.Fecha,
                Turno = e.Turno.Nombre,
                Producto = e.Producto != null ? e.Producto.Clave : "",
                Operador = e.Operario != null ? e.Operario.NombreCompleto : "",
                Programado = e.MetaKg
            })
            .ToListAsync();

        return Ok(items);
    }

    // ── Turnos Por Semana Prensado ─────────────────────────────────────────

    [HttpGet("prensado/turnos-semana")]
    public async Task<IActionResult> GetTurnosSemanaPrensas([FromQuery] DateTime fechaInicio, [FromQuery] DateTime fechaFin)
    {
        var result = await _produccionService.GetTurnosSemanaPrensasAsync(fechaInicio, fechaFin);
        return Ok(result);
    }

    [HttpPost("prensado/turnos-semana/guardar")]
    public async Task<IActionResult> GuardarTurnosSemanaPrensas([FromBody] List<GuardarTurnoPrensaItemRequest> batch)
    {
        try
        {
            var success = await _produccionService.GuardarTurnosSemanaPrensasAsync(batch);
            if (!success) return BadRequest(new { message = "No se pudieron guardar las modificaciones de turnos." });
            return Ok(new { message = "Información actualizada" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"Error al guardar modificaciones: {ex.Message}" });
        }
    }



    [HttpGet("extrusion/operacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusionesOperacion()
    {
        var items = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Where(e => !e.IsDeleted && e.Estado != EstadoExtrusion.Programada)
            .OrderByDescending(e => e.Fecha)
            .Select(e => new
            {
                e.Id,
                Status = e.Estado.ToString(),
                Extrusora = e.Extrusora.Nombre,
                Turno = e.Turno.Nombre,
                Producto = e.Producto != null ? e.Producto.Clave : "",
                Operador = e.Operario != null ? e.Operario.NombreCompleto : "",
                Producido = e.Producido,
                TiempoInterrupcion = e.TiempoInterrupcionMin,
                EnCurso = e.EnCurso,
                ExtrusionId = e.ExtrusionIdLegacy
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("prensado/programacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensadoProgramacion()
    {
        var items = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Where(p => !p.IsDeleted && ((int)p.Estado == 0 || (int)p.Estado == 5))
            .OrderByDescending(p => p.Fecha)
            .Select(p => new
            {
                p.Id,
                Fecha = p.Fecha,
                Prensa = p.Prensa.Nombre,
                Turno = p.Turno.Nombre,
                Producto = p.Producto != null ? p.Producto.Clave : "",
                Operador = p.Operario != null ? p.Operario.NombreCompleto : "",
                Programado = p.Programado
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("prensado/operacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensadoOperacion()
    {
        var items = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Where(p => !p.IsDeleted && (int)p.Estado != 0 && (int)p.Estado != 5)
            .OrderByDescending(p => p.Fecha)
            .Select(p => new
            {
                p.Id,
                Status = p.Estado.ToString(),
                Prensa = p.Prensa.Nombre,
                Turno = p.Turno.Nombre,
                Producto = p.Producto != null ? p.Producto.Clave : "",
                Operador = p.Operario != null ? p.Operario.NombreCompleto : "",
                Producido = p.Producido,
                TiempoInterrupcion = p.TiempoInterrupcionMin,
                EnCurso = p.EnCurso
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("prensado/{id}")]
    public async Task<ActionResult<object>> GetPrensadoDetail(Guid id)
    {
        var item = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .Include(p => p.Producto)
            .Include(p => p.Troquel)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (item == null) return NotFound(new { message = "Orden de prensado no encontrada." });
        return Ok(new
        {
            item.Id,
            IdLegacy = item.PrensadoIdLegacy,
            Fecha = item.Fecha,
            Prensa = item.Prensa.Nombre,
            PrensaId = item.PrensaId,
            Turno = item.Turno.Nombre,
            TurnoId = item.TurnoId,
            Producto = item.Producto.Clave,
            ProductoId = item.ProductoId,
            Operador = item.Operario.NombreCompleto,
            OperadorId = item.OperarioId,
            Estado = (int)item.Estado,
            Status = item.Estado.ToString(),
            LevasUnidadMedida = item.LevasUnidadMedida,
            LevasKgEntrada = item.LevasKgEntrada,
            LevasKgSalida = item.LevasKgSalida,
            LevasGradosEntrada = item.LevasGradosEntrada,
            LevasGradosSalida = item.LevasGradosSalida,
            RodillosUnidadMedida = item.RodillosUnidadMedida,
            RodillosKgEntrada = item.RodillosKgEntrada,
            RodillosKgSalida = item.RodillosKgSalida,
            RodillosGradosEntrada = item.RodillosGradosEntrada,
            RodillosGradosSalida = item.RodillosGradosSalida,
            TroquelId = item.TroquelId,
            TroquelNombre = item.Troquel != null ? item.Troquel.Nombre : "",
            IniciaProceso = item.HoraIniciaProceso,
            FinProceso = item.HoraFinProceso,
            ProductoDescripcion = item.Producto.Nombre,
            Calibre = item.Calibre,
            Ancho = item.Ancho,
            Longitud = item.Longitud,
            VirgenKg = item.KgVirgen,
            MolidoKg = item.KgMolido,
            Meta = item.MetaPallets,
            LoteSilo = item.LoteSilo
        });
    }

    [HttpPut("prensado/{id}")]
    public async Task<IActionResult> UpdatePrensado(Guid id, [FromBody] UpdatePrensadoRequest request)
    {
        var entity = await _context.Prensados.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de prensado no encontrada." });

        entity.Fecha = request.Fecha.Date;
        entity.Estado = (EstadoPrensado)request.Estado;
        entity.OperarioId = request.OperarioId;
        entity.TroquelId = request.TroquelId;
        entity.LevasUnidadMedida = request.LevasUnidadMedida ?? "Kg";
        entity.RodillosUnidadMedida = request.RodillosUnidadMedida ?? "Kg";
        entity.LevasKgEntrada = request.LevasKgEntrada;
        entity.LevasKgSalida = request.LevasKgSalida;
        entity.LevasGradosEntrada = request.LevasGradosEntrada;
        entity.LevasGradosSalida = request.LevasGradosSalida;
        entity.RodillosKgEntrada = request.RodillosKgEntrada;
        entity.RodillosKgSalida = request.RodillosKgSalida;
        entity.RodillosGradosEntrada = request.RodillosGradosEntrada;
        entity.RodillosGradosSalida = request.RodillosGradosSalida;
        if (request.IniciaProceso.HasValue) entity.HoraIniciaProceso = request.IniciaProceso.Value;
        entity.HoraFinProceso = request.FinProceso;
        
        entity.Calibre = request.Calibre;
        entity.Ancho = request.Ancho;
        entity.Longitud = request.Longitud;
        entity.KgVirgen = request.VirgenKg;
        entity.KgMolido = request.MolidoKg;
        entity.MetaPallets = request.Meta;
        entity.LoteSilo = request.LoteSilo;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("prensado/{id}")]
    public async Task<IActionResult> DeletePrensado(Guid id)
    {
        var entity = await _context.Prensados.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de prensado no encontrada." });

        entity.IsDeleted = true;
        entity.DeletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpGet("prensados")]
    public async Task<ActionResult<IEnumerable<Prensado>>> GetPrensados()
        => Ok(await _produccionService.GetPrensadosAsync());

    [HttpGet("carreras")]
    public async Task<ActionResult<IEnumerable<object>>> GetCarreras()
    {
        var items = await _context.Carreras
            .Include(c => c.Prensado)
                .ThenInclude(p => p.Prensa)
            .Include(c => c.Prensado)
                .ThenInclude(p => p.Turno)
            .Include(c => c.Prensado)
                .ThenInclude(p => p.Operario)
            .OrderByDescending(c => c.FechaRegistro)
            .Select(c => new
            {
                c.Id,
                c.CarreraNo,
                c.Estado,
                c.FechaRegistro,
                c.FechaValidacion,
                c.CarreraTroquel,
                c.PaletTerminado,
                PrensadoId = c.PrensadoId,
                PrensaNombre = c.Prensado.Prensa.Nombre,
                TurnoNombre = c.Prensado.Turno.Nombre,
                OperarioNombre = c.Prensado.Operario.NombreCompleto
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("carretes")]
    public async Task<ActionResult<IEnumerable<object>>> GetCarretes()
    {
        var items = await _context.Carretes
            .Include(c => c.Carrera)
                .ThenInclude(ca => ca.Prensado)
                    .ThenInclude(p => p.Producto)
            .OrderByDescending(c => c.NoSerie)
            .Select(c => new
            {
                c.Id,
                c.NoSerie,
                c.NoLinea,
                c.Estado,
                c.Molino,
                c.TerminaPalet,
                c.PaletSerie,
                c.Observaciones,
                CarreraNo = c.Carrera.CarreraNo,
                ProductoNombre = c.Carrera.Prensado.Producto.Nombre
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("palets")]
    public async Task<ActionResult<IEnumerable<object>>> GetPalets()
    {
        var items = await _context.Palets
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Include(p => p.Prensa)
            .OrderByDescending(p => p.NoSerie)
            .Select(p => new
            {
                p.Id,
                p.NoSerie,
                p.Tipo,
                p.Estatus,
                p.Capacidad,
                p.TotalCarretes,
                p.HoraInicioEnsamble,
                p.HoraFinEnsamble,
                ProductoNombre = p.Producto != null ? p.Producto.Nombre : "---",
                OperarioNombre = p.Operario != null ? p.Operario.NombreCompleto : "---",
                PrensaNombre = p.Prensa != null ? p.Prensa.Nombre : "---"
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("interrupciones-prensado")]
    public async Task<ActionResult<IEnumerable<object>>> GetInterrupcionesPrensado()
    {
        var items = await _context.PrensadoInterrupciones
            .Include(i => i.Prensado)
                .ThenInclude(p => p.Prensa)
            .Include(i => i.Causa)
            .OrderByDescending(i => i.HoraInicio)
            .Select(i => new
            {
                i.Id,
                i.PrensadoId,
                i.HoraInicio,
                i.HoraFin,
                i.Concluida,
                i.Descripcion,
                DuracionMinutos = i.HoraFin.HasValue ? (double?)(i.HoraFin.Value - i.HoraInicio).TotalMinutes : null,
                PrensaNombre = i.Prensado.Prensa.Nombre,
                CausaNombre = i.Causa != null ? i.Causa.Descripcion : "Otras causas"
            })
            .ToListAsync();

        return Ok(items);
    }

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

    [HttpGet("extrusion/turnos-semana")]
    public async Task<ActionResult<TurnosSemanaResponseDto>> GetTurnosSemana([FromQuery] string fechaInicio, [FromQuery] string fechaFin)
    {
        if (string.IsNullOrWhiteSpace(fechaInicio) || string.IsNullOrWhiteSpace(fechaFin))
            return BadRequest(new { message = "Se requieren las fechas de inicio y fin." });

        if (!DateTime.TryParse(fechaInicio, System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out var start) ||
            !DateTime.TryParse(fechaFin, System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out var end))
        {
            return BadRequest(new { message = "Formato de fecha inválido. Use yyyy-MM-dd." });
        }
        start = start.Date; end = end.Date;
        
        var dates = new List<DateTime>();
        for (var dt = start; dt <= end; dt = dt.AddDays(1))
        {
            dates.Add(dt);
        }

        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var extrusoras = await _context.Extrusoras.Where(e => !e.IsDeleted).ToListAsync();
        var turnos = await _context.Turnos.Where(t => !t.IsDeleted).ToListAsync();
        var operarios = await _context.Operarios.Where(o => !o.IsDeleted).ToListAsync();

        if (!extrusoras.Any()) return BadRequest(new { message = "No hay extrusoras configuradas." });
        if (!turnos.Any())     return BadRequest(new { message = "No hay turnos configurados." });
        if (!operarios.Any())  return BadRequest(new { message = "No hay operarios configurados. Registre al menos un operario antes de programar turnos." });

        var existingExtrusiones = await _context.Extrusiones
            .Where(e => e.Fecha >= start && e.Fecha <= end)
            .ToListAsync();

        bool anyNew = false;
        foreach (var ext in extrusoras)
        {
            foreach (var trn in turnos)
            {
                var defaultOpId = await _context.ExtrusoraOperarios
                    .Where(eo => eo.ExtrusoraId == ext.Id && eo.TurnoId == trn.Id)
                    .Select(eo => eo.OperarioId)
                    .FirstOrDefaultAsync();

                if (defaultOpId == Guid.Empty)
                {
                    defaultOpId = operarios.First().Id;
                }

                foreach (var date in dates)
                {
                    var exists = existingExtrusiones.Any(e => e.ExtrusoraId == ext.Id && e.TurnoId == trn.Id && e.Fecha.Date == date.Date);
                    if (!exists)
                    {
                        var extShort = ext.Nombre.Replace(" ", "");
                        extShort = extShort.Length == 0 ? "EXT" : extShort.Substring(0, Math.Min(5, extShort.Length));

                        var newExt = new Extrusion
                        {
                            Id = Guid.NewGuid(),
                            Codigo = $"EXT-{date:yyyyMMdd}-{trn.Nombre.Replace(" ", "")}-{extShort}",
                            Fecha = date.Date,
                            FechaInicio = date.Date.Add(trn.HoraInicio),
                            FechaFin = date.Date.Add(trn.HoraFin < trn.HoraInicio ? trn.HoraFin.Add(TimeSpan.FromDays(1)) : trn.HoraFin),
                            Estado = EstadoExtrusion.Programada,
                            Programado = 0,
                            Producido = 0,
                            ExtrusoraId = ext.Id,
                            TurnoId = trn.Id,
                            OperarioId = defaultOpId,
                            TenantId = defaultTenantId
                        };
                        _context.Extrusiones.Add(newExt);
                        anyNew = true;
                    }
                }
            }
        }

        List<Extrusion> allExtrusiones;
        if (anyNew)
        {
            await _context.SaveChangesAsync(default);
            // Re-fetch all extrusions now that the stubs are persisted
            allExtrusiones = await _context.Extrusiones
                .Include(e => e.Extrusora)
                .Include(e => e.Turno)
                .Include(e => e.Producto)
                .Include(e => e.Operario)
                .Where(e => e.Fecha >= start && e.Fecha <= end)
                .ToListAsync();
        }
        else
        {
            allExtrusiones = await _context.Extrusiones
                .Include(e => e.Extrusora)
                .Include(e => e.Turno)
                .Include(e => e.Producto)
                .Include(e => e.Operario)
                .Where(e => e.Fecha >= start && e.Fecha <= end)
                .ToListAsync();
        }

        var resumen = allExtrusiones
            .Where(e => e.ProductoId != null)
            .GroupBy(e => new { e.ProductoId, ProductoNombre = e.Producto!.Nombre, e.ExtrusoraId, ExtrusoraNombre = e.Extrusora.Nombre })
            .Select(g => new ResumenItemDto
            {
                ProductoId = g.Key.ProductoId,
                Producto = g.Key.ProductoNombre,
                ExtrusoraId = g.Key.ExtrusoraId,
                Extrusora = g.Key.ExtrusoraNombre,
                Programado = g.Sum(e => e.Programado),
                Fabricado = g.Sum(e => e.Producido)
            })
            .ToList();

        var daysOfWeekSpanish = new Dictionary<DayOfWeek, string>
        {
            { DayOfWeek.Monday, "Lunes" },
            { DayOfWeek.Tuesday, "Martes" },
            { DayOfWeek.Wednesday, "Miércoles" },
            { DayOfWeek.Thursday, "Jueves" },
            { DayOfWeek.Friday, "Viernes" },
            { DayOfWeek.Saturday, "Sábado" },
            { DayOfWeek.Sunday, "Domingo" }
        };

        var extrusorasListDto = new List<ExtrusoraItemDto>();
        foreach (var ext in extrusoras)
        {
            var turnosListDto = new List<ShiftItemDto>();
            foreach (var trn in turnos)
            {
                var diasListDto = new List<DayItemDto>();
                foreach (var date in dates)
                {
                    var extRecord = allExtrusiones.FirstOrDefault(e => e.ExtrusoraId == ext.Id && e.TurnoId == trn.Id && e.Fecha.Date == date.Date);
                    if (extRecord != null)
                    {
                        diasListDto.Add(new DayItemDto
                        {
                            ExtrusionId = extRecord.Id,
                            ExtrusionIdLegacy = extRecord.Id,
                            Estado = extRecord.Estado.ToString(),
                            Fecha = extRecord.Fecha,
                            Hora = extRecord.Turno.HoraInicio.ToString(@"hh\:mm"),
                            Dia = daysOfWeekSpanish.GetValueOrDefault(extRecord.Fecha.DayOfWeek, extRecord.Fecha.ToString("dddd")),
                            ProductoId = extRecord.ProductoId,
                            ProductoNombre = extRecord.Producto?.Nombre,
                            Plan = extRecord.Programado,
                            Producido = extRecord.Producido,
                            OperarioId = extRecord.OperarioId,
                            OperarioNombre = extRecord.Operario?.Nombre
                        });
                    }
                }

                turnosListDto.Add(new ShiftItemDto
                {
                    TurnoId = trn.Id,
                    TurnoNombre = trn.Nombre,
                    Dias = diasListDto
                });
            }

            extrusorasListDto.Add(new ExtrusoraItemDto
            {
                ExtrusoraId = ext.Id,
                Nombre = ext.Nombre,
                Turnos = turnosListDto
            });
        }

        var response = new TurnosSemanaResponseDto
        {
            Resumen = resumen,
            Extrusoras = extrusorasListDto
        };

        return Ok(response);
    }

    [HttpPost("extrusion/turnos-semana/guardar")]
    public async Task<IActionResult> GuardarTurnosSemana([FromBody] List<GuardarTurnosSemanaRequest> batch)
    {
        if (batch == null || !batch.Any()) return BadRequest("El lote está vacío.");

        foreach (var item in batch)
        {
            var entity = await _context.Extrusiones.FindAsync(item.ExtrusionId);
            if (entity != null)
            {
                if (entity.Estado == EstadoExtrusion.Programada)
                {
                    entity.ProductoId = item.ProductoId;
                    if (item.OperarioId != null)
                    {
                        entity.OperarioId = item.OperarioId.Value;
                    }
                    entity.Programado = item.Plan;

                    if (item.ProductoId != null)
                    {
                        var extProd = await _context.ExtrusoraProductos
                            .FirstOrDefaultAsync(ep => ep.ExtrusoraId == entity.ExtrusoraId && ep.ProductoId == item.ProductoId);
                        
                        if (extProd != null)
                        {
                            entity.Calibre = extProd.DefaultCalibre;
                            entity.Ancho = extProd.DefaultAncho;
                            entity.Longitud = extProd.DefaultLongitud;
                            entity.MetaKg = item.Plan;
                            entity.VirgenKg = extProd.DefaultVirgenKg;
                            entity.MolidoKg = extProd.DefaultMolidoKg;
                            entity.RevHusilloVirgen = extProd.DefaultRevHusilloVirgen;
                            entity.RevHusilloMolido = extProd.DefaultRevHusilloMolido;
                        }
                    }
                }
            }
        }

        await _context.SaveChangesAsync(default);
        return Ok(new { success = true });
    }
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

public record RegistrarInterrupcionManualRequest(
    Guid ExtrusionId,
    Guid CausaId,
    string? Descripcion,
    DateTime HoraInicio,
    DateTime? HoraFin,
    bool Concluida
);

public record ActualizarInterrupcionManualRequest(
    Guid CausaId,
    string? Descripcion,
    DateTime HoraInicio,
    DateTime? HoraFin,
    bool Concluida
);

public class TurnosSemanaResponseDto
{
    public IEnumerable<ResumenItemDto> Resumen { get; set; } = new List<ResumenItemDto>();
    public IEnumerable<ExtrusoraItemDto> Extrusoras { get; set; } = new List<ExtrusoraItemDto>();
}

public class ResumenItemDto
{
    public Guid? ProductoId { get; set; }
    public string Producto { get; set; } = null!;
    public Guid? ExtrusoraId { get; set; }
    public string Extrusora { get; set; } = null!;
    public decimal Programado { get; set; }
    public decimal Fabricado { get; set; }
    public decimal Diferencia => Programado - Fabricado;
}

public class ExtrusoraItemDto
{
    public Guid ExtrusoraId { get; set; }
    public string Nombre { get; set; } = null!;
    public IEnumerable<ShiftItemDto> Turnos { get; set; } = new List<ShiftItemDto>();
}

public class ShiftItemDto
{
    public Guid TurnoId { get; set; }
    public string TurnoNombre { get; set; } = null!;
    public IEnumerable<DayItemDto> Dias { get; set; } = new List<DayItemDto>();
}

public class DayItemDto
{
    public Guid ExtrusionId { get; set; }
    public Guid ExtrusionIdLegacy { get; set; }
    public string Estado { get; set; } = null!;
    public DateTime Fecha { get; set; }
    public string Hora { get; set; } = null!;
    public string Dia { get; set; } = null!;
    public Guid? ProductoId { get; set; }
    public string? ProductoNombre { get; set; }
    public decimal Plan { get; set; }
    public decimal Producido { get; set; }
    public Guid? OperarioId { get; set; }
    public string? OperarioNombre { get; set; }
}

public class GuardarTurnosSemanaRequest
{
    public Guid ExtrusionId { get; set; }
    public Guid? ProductoId { get; set; }
    public Guid? OperarioId { get; set; }
    public decimal Plan { get; set; }
}

public record CreateExtrusionRequest(
    DateTime Fecha,
    Guid ExtrusoraId,
    Guid TurnoId,
    Guid ProductoId,
    Guid OperarioId,
    decimal MetaKg,
    decimal VirgenKg,
    decimal MolidoKg,
    decimal Calibre,
    decimal Ancho,
    decimal Longitud,
    string? LoteSilo,
    string? LotePaqueteAditivos,
    int Estado,
    DateTime? ProcessStart,
    DateTime? ProcessEnd
);

public record UpdateExtrusionRequest(
    DateTime Fecha,
    Guid ExtrusoraId,
    Guid TurnoId,
    Guid? ProductoId,
    Guid OperarioId,
    decimal MetaKg,
    decimal VirgenKg,
    decimal MolidoKg,
    decimal Calibre,
    decimal Ancho,
    decimal Longitud,
    string? LoteSilo,
    string? LotePaqueteAditivos,
    int Estado,
    DateTime? ProcessStart,
    DateTime? ProcessEnd
);

public record UpdatePrensadoRequest(
    DateTime Fecha,
    int Estado,
    Guid OperarioId,
    Guid? TroquelId,
    string? LevasUnidadMedida,
    string? RodillosUnidadMedida,
    decimal LevasKgEntrada,
    decimal LevasKgSalida,
    decimal LevasGradosEntrada,
    decimal LevasGradosSalida,
    decimal RodillosKgEntrada,
    decimal RodillosKgSalida,
    decimal RodillosGradosEntrada,
    decimal RodillosGradosSalida,
    DateTime? IniciaProceso,
    DateTime? FinProceso,
    decimal Calibre,
    string? Ancho,
    decimal Longitud,
    decimal VirgenKg,
    decimal MolidoKg,
    int Meta,
    string? LoteSilo
);

