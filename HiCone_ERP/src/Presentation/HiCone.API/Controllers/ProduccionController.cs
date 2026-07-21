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

    [HttpPost("productos")]
    public async Task<ActionResult<Guid>> CreateProducto([FromBody] ProductoDto dto)
    {
        var entity = new Producto
        {
            Id = Guid.NewGuid(),
            Codigo = dto.Clave,
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            CategoriaId = dto.CategoriaId,
            IsActive = dto.IsActive ?? true,
            ProductoSAE = dto.ProductoSAE,
            PrecioUnitario = dto.PrecioUnitario,
            ClaveExternaSAE = dto.ClaveExterna,
            TipoMaterial = Enum.TryParse<TipoMaterial>(dto.TipoMaterial, out var tm) ? tm : TipoMaterial.Virgen,
            ProductoBase = dto.ProductoBase,
            TenantId = Guid.Parse("00000000-0000-0000-0000-000000000001")
        };
        _context.Productos.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("productos/{id}")]
    public async Task<IActionResult> UpdateProducto(Guid id, [FromBody] ProductoDto dto)
    {
        var entity = await _context.Productos.FindAsync(id);
        if (entity == null) return NotFound();

        entity.Codigo = dto.Clave;
        entity.Nombre = dto.Nombre;
        entity.Descripcion = dto.Descripcion;
        entity.CategoriaId = dto.CategoriaId;
        entity.IsActive = dto.IsActive ?? true;
        entity.ProductoSAE = dto.ProductoSAE;
        entity.PrecioUnitario = dto.PrecioUnitario;
        entity.ClaveExternaSAE = dto.ClaveExterna;
        entity.TipoMaterial = Enum.TryParse<TipoMaterial>(dto.TipoMaterial, out var tm) ? tm : TipoMaterial.Virgen;
        entity.ProductoBase = dto.ProductoBase;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("productos/{id}")]
    public async Task<IActionResult> DeleteProducto(Guid id)
    {
        var entity = await _context.Productos.FindAsync(id);
        if (entity == null) return NotFound();

        entity.IsDeleted = true;
        entity.DeletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(default);
        return NoContent();
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

    [HttpGet("extrusion/turnos-semana")]
    public async Task<ActionResult<TurnosSemanaResponseDto>> GetTurnosSemana([FromQuery] string fechaInicio, [FromQuery] string fechaFin)
    {
        if (string.IsNullOrWhiteSpace(fechaInicio) || string.IsNullOrWhiteSpace(fechaFin))
            return BadRequest("Se requieren las fechas de inicio y fin.");

        DateTime start = DateTime.Parse(fechaInicio).Date;
        DateTime end = DateTime.Parse(fechaFin).Date;
        
        var dates = new List<DateTime>();
        for (var dt = start; dt <= end; dt = dt.AddDays(1))
        {
            dates.Add(dt);
        }

        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var extrusoras = await _context.Extrusoras.Where(e => !e.IsDeleted).ToListAsync();
        var turnos = await _context.Turnos.Where(t => !t.IsDeleted).ToListAsync();
        var operarios = await _context.Operarios.Where(o => !o.IsDeleted).ToListAsync();

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
                    var firstOp = operarios.FirstOrDefault();
                    if (firstOp != null)
                    {
                        defaultOpId = firstOp.Id;
                    }
                    else
                    {
                        defaultOpId = defaultTenantId;
                    }
                }

                foreach (var date in dates)
                {
                    var exists = existingExtrusiones.Any(e => e.ExtrusoraId == ext.Id && e.TurnoId == trn.Id && e.Fecha.Date == date.Date);
                    if (!exists)
                    {
                        var newExt = new Extrusion
                        {
                            Id = Guid.NewGuid(),
                            Codigo = $"EXT-{date:yyyyMMdd}-{trn.Nombre.Replace(" ", "")}-{ext.Nombre.Replace(" ", "").Substring(0, Math.Min(5, ext.Nombre.Length))}",
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

public record ProductoDto(
    string Clave, 
    string Nombre, 
    string? Descripcion, 
    Guid? CategoriaId, 
    bool? IsActive, 
    string? ProductoSAE, 
    decimal PrecioUnitario, 
    string? ClaveExterna, 
    string? TipoMaterial, 
    string? ProductoBase
);

