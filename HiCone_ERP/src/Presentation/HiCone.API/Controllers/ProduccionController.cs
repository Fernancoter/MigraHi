using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

/// <summary>
/// Endpoints principales del módulo Configurar Producción:
/// Tablero de Inicio (Extrusión y Prensado), Operarios y Productos.
/// </summary>
[ApiController]
[Route("api/v1/produccion")]
[Authorize]
public class ProduccionController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IProduccionService _produccionService;

    public ProduccionController(IApplicationDbContext context, IProduccionService produccionService)
    {
        _context = context;
        _produccionService = produccionService;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TABLERO DE INICIO — EXTRUSIÓN
    // ─────────────────────────────────────────────────────────────────────────

    /// <summary>Retorna el listado de programación de extrusión</summary>
    [HttpGet("extrusion/programacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetProgramacionExtrusion()
    {
        var items = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .Where(e => e.Status == ExtrusionStatus.Programada || e.Status == ExtrusionStatus.PorProgramar)
            .OrderBy(e => e.Fecha)
            .Select(e => new
            {
                e.Id,
                FechaExtrusora = e.Fecha,
                Turno = e.Turno != null ? e.Turno.Nombre : "",
                e.Producto,
                Operador = e.Operario != null ? e.Operario.Nombre : "",
                e.Programado
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("extrusion/programacion/batch")]
    public async Task<IActionResult> SaveProgramacionExtrusionBatch([FromBody] ProgramacionBatchDto batch)
    {
        foreach (var dto in batch.Dias)
        {
            var existing = await _context.Extrusiones.FirstOrDefaultAsync(e => e.ExtrusoraId == dto.MaquinaId && e.TurnoId == dto.TurnoId && e.Fecha.Date == dto.Fecha.Date);
            if (existing != null)
            {
                existing.ProductoNombre = dto.Producto;
                existing.OperarioId = dto.OperarioId ?? Guid.Empty;
                existing.Programado = dto.Programado;
            }
            else
            {
                if (!string.IsNullOrEmpty(dto.Producto) || dto.OperarioId != null || dto.Programado > 0)
                {
                    _context.Extrusiones.Add(new Extrusion
                    {
                        Id = Guid.NewGuid(),
                        ExtrusoraId = dto.MaquinaId,
                        TurnoId = dto.TurnoId,
                        Fecha = dto.Fecha.Date,
                        ProductoNombre = dto.Producto,
                        OperarioId = dto.OperarioId ?? Guid.Empty,
                        Programado = dto.Programado,
                        Status = ExtrusionStatus.Programada
                    });
                }
            }
        }
        await _context.SaveChangesAsync(default);
        return Ok();
    }

    [HttpPost("prensado/programacion/batch")]
    public async Task<IActionResult> SaveProgramacionPrensadoBatch([FromBody] ProgramacionBatchDto batch)
    {
        foreach (var dto in batch.Dias)
        {
            var existing = await _context.Prensados.FirstOrDefaultAsync(e => e.PrensaId == dto.MaquinaId && e.TurnoId == dto.TurnoId && e.Fecha.Date == dto.Fecha.Date);
            if (existing != null)
            {
                existing.ProductoNombre = dto.Producto;
                existing.OperarioId = dto.OperarioId ?? Guid.Empty;
                existing.Programado = dto.Programado;
            }
            else
            {
                if (!string.IsNullOrEmpty(dto.Producto) || dto.OperarioId != null || dto.Programado > 0)
                {
                    _context.Prensados.Add(new Prensado
                    {
                        Id = Guid.NewGuid(),
                        PrensaId = dto.MaquinaId,
                        TurnoId = dto.TurnoId,
                        Fecha = dto.Fecha.Date,
                        ProductoNombre = dto.Producto,
                        OperarioId = dto.OperarioId ?? Guid.Empty,
                        Programado = dto.Programado,
                        Status = PrensadoStatus.Programada
                    });
                }
            }
        }
        await _context.SaveChangesAsync(default);
        return Ok();
    }

    /// <summary>Retorna el listado de operación de extrusión</summary>
    [HttpGet("extrusion/operacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetOperacionExtrusion()
    {
        var items = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .Where(e => e.Status != ExtrusionStatus.Programada && e.Status != ExtrusionStatus.PorProgramar)
            .OrderByDescending(e => e.Fecha)
            .Select(e => new
            {
                e.Id,
                Status = e.Status.ToString(),
                Extrusora = e.Extrusora.Nombre,
                Turno = e.Turno != null ? e.Turno.Nombre : "",
                e.Producto,
                Operador = e.Operario != null ? e.Operario.Nombre : "",
                e.Producido,
                TiempoInterrupcion = e.TiempoInterrupcionMin,
                e.EnCurso,
                ExtrusionId = e.ExtrusionIdLegacy
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Obtiene el detalle de una extrusión para el modal</summary>
    [HttpGet("extrusion/{id}")]
    public async Task<ActionResult<object>> GetExtrusion(Guid id)
    {
        var e = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .Include(e => e.Bobinas)
            .Include(e => e.Interrupciones)
                .ThenInclude(i => i.Causa)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (e == null) return NotFound();

        return Ok(new
        {
            e.Id,
            Extrusora = e.Extrusora.Nombre,
            ExtrusoraId = e.ExtrusoraId,
            Turno = e.Turno != null ? e.Turno.Nombre : "",
            TurnoId = e.TurnoId,
            e.Producto,
            ProductoId = e.ProductoId,
            Operador = e.Operario != null ? e.Operario.Nombre : "",
            OperadorId = e.OperarioId,
            e.Fecha,
            e.Status,
            Estado = (int)e.Estado,
            e.Calibre,
            e.Ancho,
            e.Longitud,
            e.KgVirgen,
            e.Target,
            e.KgMolido,
            e.ProcessStart,
            e.ProcessEnd,
            e.LoteSilo,
            e.LotePaqueteAditivos,
            Bobinas = e.Bobinas.Select(b => new
            {
                b.Id,
                b.BobbinNo,
                b.SerialNo,
                b.Kg,
                b.ScrapKg,
                b.Thickness,
                b.Observations,
                b.MillReason,
                b.ProductName,
                b.Reel,
                b.RestStart,
                b.RestMinutes,
                b.Mill,
                b.Station,
                b.Carreras,
                b.IniciaReposo,
                b.MinutosEnReposo,
                b.HoraInicio,
                b.HoraSalida,
                Estado = (int)b.Estado
            }).OrderBy(b => b.Station).ToList(),
            Interrupciones = e.Interrupciones.Select(i => new
            {
                i.Id,
                Causa = i.Causa != null ? $"{i.Causa.Codigo} - {i.Causa.Descripcion}" : "",
                i.HoraInicio,
                i.HoraFin,
                i.Concluida,
                i.Descripcion,
                Duracion = i.DuracionMinutos
            }).OrderByDescending(i => i.HoraInicio).ToList()
        });
    }

    /// <summary>Actualiza una orden de extrusión</summary>
    [HttpPut("extrusion/{id}")]
    public async Task<IActionResult> UpdateExtrusion(Guid id, [FromBody] UpdateExtrusionDto dto)
    {
        var e = await _context.Extrusiones.FindAsync(id);
        if (e == null) return NotFound();

        e.Fecha = dto.Fecha;
        e.ExtrusoraId = dto.ExtrusoraId;
        e.TurnoId = dto.TurnoId;
        e.ProductoId = dto.ProductoId;
        e.OperarioId = dto.OperarioId;
        e.MetaKg = dto.MetaKg;
        e.VirgenKg = dto.VirgenKg;
        e.MolidoKg = dto.MolidoKg;
        e.Calibre = dto.Calibre;
        e.Ancho = dto.Ancho;
        e.Longitud = dto.Longitud;
        e.LoteSilo = dto.LoteSilo;
        e.LotePaqueteAditivos = dto.LotePaqueteAditivos;
        e.Estado = dto.Estado;
        e.ProcessStart = dto.ProcessStart;
        e.ProcessEnd = dto.ProcessEnd;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    /// <summary>Crea una nueva orden de extrusión</summary>
    [HttpPost("extrusion")]
    public async Task<IActionResult> CreateExtrusion([FromBody] UpdateExtrusionDto dto)
    {
        long nextIdLegacy = 1;
        if (await _context.Extrusiones.AnyAsync())
        {
            nextIdLegacy = await _context.Extrusiones.MaxAsync(e => e.ExtrusionIdLegacy) + 1;
        }

        var e = new Extrusion
        {
            Id = Guid.NewGuid(),
            Codigo = $"EXT-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..4].ToUpper()}",
            Fecha = dto.Fecha,
            ExtrusoraId = dto.ExtrusoraId,
            TurnoId = dto.TurnoId,
            ProductoId = dto.ProductoId,
            OperarioId = dto.OperarioId,
            MetaKg = dto.MetaKg,
            VirgenKg = dto.VirgenKg,
            MolidoKg = dto.MolidoKg,
            Calibre = dto.Calibre,
            Ancho = dto.Ancho,
            Longitud = dto.Longitud,
            LoteSilo = dto.LoteSilo,
            LotePaqueteAditivos = dto.LotePaqueteAditivos,
            Estado = dto.Estado,
            ProcessStart = dto.ProcessStart ?? DateTime.UtcNow,
            ProcessEnd = dto.ProcessEnd,
            ExtrusionIdLegacy = nextIdLegacy
        };

        _context.Extrusiones.Add(e);
        await _context.SaveChangesAsync(default);

        return CreatedAtAction(nameof(GetExtrusion), new { id = e.Id }, e);
    }


    /// <summary>Agrega bobinas manualmente (en pares A y B)</summary>
    [HttpPost("extrusion/{id}/bobinas")]
    public async Task<IActionResult> AddBobinasManual(Guid id, [FromBody] AddBobinasDto dto)
    {
        var e = await _context.Extrusiones.FindAsync(id);
        if (e == null) return NotFound();

        // Si el usuario envía un solo valor para "Pares de bobinas", 
        // creamos el par A y B con valores por defecto para el resto.
        var bobinaA = new Bobina
        {
            Id = Guid.NewGuid(),
            ExtrusionId = id,
            Station = "A",
            BobbinNo = (int)dto.ParesBobinas, // Usamos el input para el número
            SerialNo = $"S-{dto.ParesBobinas}-A",
            Kg = 0,
            Codigo = $"B-{dto.ParesBobinas}-A"
        };

        var bobinaB = new Bobina
        {
            Id = Guid.NewGuid(),
            ExtrusionId = id,
            Station = "B",
            BobbinNo = (int)dto.ParesBobinas,
            SerialNo = $"S-{dto.ParesBobinas}-B",
            Kg = 0,
            Codigo = $"B-{dto.ParesBobinas}-B"
        };

        _context.Bobinas.AddRange(bobinaA, bobinaB);
        await _context.SaveChangesAsync(default);

        return Ok(new { Message = "Bobinas agregadas correctamente" });
    }

    /// <summary>Elimina una bobina por Id</summary>
    [HttpDelete("extrusion/{extrusionId}/bobinas/{bobinaId}")]
    public async Task<IActionResult> DeleteBobina(Guid extrusionId, Guid bobinaId)
    {
        var b = await _context.Bobinas.FirstOrDefaultAsync(x => x.Id == bobinaId && x.ExtrusionId == extrusionId);
        if (b == null) return NotFound();

        _context.Bobinas.Remove(b);
        await _context.SaveChangesAsync(default);

        return NoContent();
    }

    /// <summary>Actualiza únicamente el operario asignado a una extrusión</summary>
    [HttpPatch("extrusion/{id}/operador")]
    public async Task<IActionResult> PatchExtrusionOperador(Guid id, [FromBody] PatchOperadorDto dto)
    {
        var e = await _context.Extrusiones.FindAsync(id);
        if (e == null) return NotFound();
        e.OperarioId = dto.OperarioId ?? Guid.Empty;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    /// <summary>Elimina una extrusión completa</summary>
    [HttpDelete("extrusion/{id}")]
    public async Task<IActionResult> DeleteExtrusion(Guid id)
    {
        var e = await _context.Extrusiones.Include(x => x.Bobinas).FirstOrDefaultAsync(x => x.Id == id);
        if (e == null) return NotFound();

        if (e.Bobinas != null && e.Bobinas.Any())
            _context.Bobinas.RemoveRange(e.Bobinas);

        _context.Extrusiones.Remove(e);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    /// <summary>Retorna el tablero de prensado: programación + operación en curso</summary>
    [HttpGet("tablero/prensado")]
    public async Task<ActionResult<object>> GetTableroPrensado()
    {
        var operacion = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .OrderByDescending(p => p.Fecha)
            .Take(50)
            .Select(p => new
            {
                p.Id,
                Prensa = p.Prensa.Nombre,
                Turno = p.Turno != null ? p.Turno.Nombre : "",
                p.Producto,
                Operador = p.Operario != null ? p.Operario.Nombre : "",
                p.Producido,
                TiempoInterrupcion = p.TiempoInterrupcionMin,
                p.EnCurso,
                p.Fecha,
                p.Programado
            })
            .ToListAsync();

        return Ok(new { operacion });
    }

    [HttpGet("prensado/programacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensadoProgramacion()
    {
        var items = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .Where(p => p.Status == PrensadoStatus.Programada || p.Status == PrensadoStatus.PorProgramar)
            .OrderByDescending(p => p.Fecha)
            .Select(p => new
            {
                p.Id,
                p.Fecha,
                Prensa = p.Prensa.Nombre,
                Turno = p.Turno != null ? p.Turno.Nombre : "",
                p.Producto,
                Operador = p.Operario != null ? p.Operario.Nombre : "",
                p.Programado
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
            .Include(p => p.Operario)
            .Where(p => p.Status != PrensadoStatus.Programada && p.Status != PrensadoStatus.PorProgramar)
            .OrderByDescending(p => p.Fecha)
            .Select(p => new
            {
                p.Id,
                Status = p.Status.ToString(),
                Prensa = p.Prensa.Nombre,
                Turno = p.Turno != null ? p.Turno.Nombre : "",
                p.Producto,
                Operador = p.Operario != null ? p.Operario.Nombre : "",
                p.Producido,
                TiempoInterrupcion = p.TiempoInterrupcionMin,
                p.EnCurso
            })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("prensado/{id}")]
    public async Task<ActionResult<object>> GetPrensadoDetail(Guid id)
    {
        var p = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (p == null) return NotFound();

        return Ok(new
        {
            p.Id,
            Prensa = p.Prensa.Nombre,
            Turno = p.Turno != null ? p.Turno.Nombre : "",
            p.Producto,
            Operador = p.Operario != null ? p.Operario.Nombre : "",
            OperadorId = p.OperarioId,
            p.Fecha,
            Status = p.Status.ToString(),
            p.Calibre,
            p.Ancho,
            p.Longitud,
            p.Programado,
            p.Producido,
            p.TiempoInterrupcionMin,
            p.EnCurso,
            VirgenKg = p.KgVirgen,
            Meta = p.Target,
            MolidoKg = p.KgMolido,
            IniciaProceso = p.ProcessStart,
            FinProceso = p.ProcessEnd,
            LoteSilo = p.LoteSilo
        });
    }

    [HttpPatch("prensado/{id}/operador")]
    public async Task<IActionResult> PatchPrensadoOperador(Guid id, [FromBody] PatchOperadorDto dto)
    {
        var p = await _context.Prensados.FindAsync(id);
        if (p == null) return NotFound();
        p.OperarioId = dto.OperarioId ?? Guid.Empty;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpPut("prensado/{id}")]
    public async Task<IActionResult> UpdatePrensado(Guid id, [FromBody] UpdatePrensadoDto dto)
    {
        var p = await _context.Prensados.FindAsync(id);
        if (p == null) return NotFound();

        p.Fecha = dto.Fecha;
        p.Calibre = dto.Calibre;
        p.Ancho = dto.Ancho;
        p.Longitud = dto.Longitud;
        p.Status = dto.Status;
        p.OperarioId = dto.OperarioId ?? Guid.Empty;
        p.KgVirgen = dto.KgVirgen;
        p.Target = dto.Target;
        p.KgMolido = dto.KgMolido;
        p.ProcessStart = dto.ProcessStart;
        p.ProcessEnd = dto.ProcessEnd;
        p.LoteSilo = dto.LoteSilo;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("prensado/{id}")]
    public async Task<IActionResult> DeletePrensado(Guid id)
    {
        var p = await _context.Prensados.FindAsync(id);
        if (p == null) return NotFound();

        _context.Prensados.Remove(p);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // OPERARIOS (Operadores de producción)
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("operarios")]
    public async Task<ActionResult<IEnumerable<object>>> GetOperarios([FromQuery] string? search = null)
    {
        var query = _context.Operarios.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(o => o.Nombre.Contains(search));

        var items = await query
            .OrderBy(o => o.Nombre)
            .Select(o => new { o.Id, o.Nombre, o.Activo })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("operarios/{id}")]
    public async Task<ActionResult<Operario>> GetOperario(Guid id)
    {
        var item = await _context.Operarios.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("operarios")]
    public async Task<ActionResult<Guid>> CreateOperario([FromBody] Operario entity)
    {
        entity.Id = Guid.NewGuid();
        _context.Operarios.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetOperario), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("operarios/{id}")]
    public async Task<IActionResult> UpdateOperario(Guid id, [FromBody] Operario entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.Operarios.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("operarios/{id}")]
    public async Task<IActionResult> DeleteOperario(Guid id)
    {
        var item = await _context.Operarios.FindAsync(id);
        if (item is null) return NotFound();
        _context.Operarios.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRODUCTOS
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("productos")]
    public async Task<ActionResult<IEnumerable<object>>> GetProductos(
        [FromQuery] string? search = null,
        [FromQuery] Guid? categoriaId = null,
        [FromQuery] bool? activo = null)
    {
        var query = _context.Productos.Include(p => p.Categoria).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Nombre.Contains(search) || p.Clave.Contains(search));
        if (categoriaId.HasValue)
            query = query.Where(p => p.CategoriaId == categoriaId);
        if (activo.HasValue)
            query = query.Where(p => p.IsActive == activo);

        var items = await query
            .OrderBy(p => p.Nombre)
            .Select(p => new
            {
                p.Id,
                Categoria = p.Categoria != null ? p.Categoria.Nombre : null,
                p.CategoriaId,
                p.ProductoBase,
                p.Clave,
                p.Nombre,
                p.Descripcion,
                p.PrecioUnitario,
                p.TipoMaterial,
                p.IsActive,
                p.ProductoSAE
            })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("productos/{id}")]
    public async Task<ActionResult<Producto>> GetProducto(Guid id)
    {
        var item = await _context.Productos.Include(p => p.Categoria).FirstOrDefaultAsync(p => p.Id == id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("productos")]
    public async Task<ActionResult<Guid>> CreateProducto([FromBody] Producto entity)
    {
        entity.Id = Guid.NewGuid();
        _context.Productos.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetProducto), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("productos/{id}")]
    public async Task<IActionResult> UpdateProducto(Guid id, [FromBody] Producto entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.Productos.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("productos/{id}")]
    public async Task<IActionResult> DeleteProducto(Guid id)
    {
        var item = await _context.Productos.FindAsync(id);
        if (item is null) return NotFound();
        _context.Productos.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // INTEGRACIÓN DE OPERACIONES DE EXTRUSIÓN Y PRENSADO (IProduccionService)
    // ─────────────────────────────────────────────────────────────────────────

    [HttpPost("extrusion/iniciar")]
    public async Task<IActionResult> IniciarExtrusion([FromBody] IniciarExtrusionDto dto)
    {
        try
        {
            var result = await _produccionService.IniciarExtrusionAsync(
                dto.ExtrusoraId,
                dto.OperarioId,
                dto.TurnoId,
                dto.ProductoId,
                dto.SiloVirgenId,
                dto.VirgenKg,
                dto.SiloMolidoId,
                dto.MolidoKg,
                dto.MetaKg,
                dto.RevHusilloVirgen,
                dto.RevHusilloMolido,
                dto.LotePaqueteAditivos,
                dto.Observaciones);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("extrusion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarExtrusion(Guid id, [FromBody] string? motivo, [FromQuery] Guid? nextExtrusionId = null)
    {
        var result = await _produccionService.FinalizarExtrusionAsync(id, motivo, nextExtrusionId);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo finalizar la extrusión.");
    }

    [HttpPost("extrusion/guardar-bobina")]
    public async Task<IActionResult> GuardarBobina([FromBody] GuardarBobinaDto dto)
    {
        try
        {
            var result = await _produccionService.GuardarBobinaAsync(
                dto.ExtrusionId,
                dto.BobinaNo,
                dto.Origen,
                dto.Peso,
                dto.Calibre,
                dto.Desviacion,
                (ColorEstacion)dto.Color,
                dto.MermaKg,
                (MotivoMolino)dto.Motivo,
                dto.Observaciones);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("extrusion/activa/{extrusoraId}")]
    public async Task<IActionResult> GetExtrusionActiva(Guid extrusoraId)
    {
        var result = await _produccionService.GetExtrusionActivaAsync(extrusoraId);
        if (result == null) return NotFound(new { message = "No hay orden de extrusión activa para esta extrusora." });
        return Ok(result);
    }

    [HttpGet("extrusion/siguiente-bobina-no")]
    public async Task<IActionResult> GetSiguienteBobinaNo([FromQuery] Guid extrusoraId, [FromQuery] Guid productoId)
    {
        var result = await _produccionService.ObtenerSiguienteBobinaNoAsync(extrusoraId, productoId);
        return Ok(result);
    }

    [HttpPost("bobina/{id}/pausar")]
    public async Task<IActionResult> PausarBobina(Guid id)
    {
        var result = await _produccionService.PausarBobinaAsync(id);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo pausar la bobina.");
    }

    [HttpPost("bobina/{id}/validar")]
    public async Task<IActionResult> ValidarBobina(Guid id)
    {
        var result = await _produccionService.ValidarBobinaAsync(id);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo validar la bobina.");
    }

    [HttpPost("bobina/{id}/rechazar")]
    public async Task<IActionResult> RechazarBobina(Guid id, [FromBody] RechazarBobinaDto dto)
    {
        var result = await _produccionService.RechazarBobinaAsync(id, (MotivoMolino)dto.Motivo, dto.Observaciones);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo rechazar la bobina.");
    }

    [HttpPost("bobina/{id}/transferir")]
    public async Task<IActionResult> TransferirBobina(Guid id, [FromBody] TransferirBobinaDto dto)
    {
        var result = await _produccionService.TransferirBobinaAsync(id, dto.ExtrusionDestinoId);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo transferir la bobina.");
    }

    [HttpPost("extrusion/{id}/recalibrar")]
    public async Task<IActionResult> RecalibrarExtrusion(Guid id, [FromBody] RecalibrarExtrusionDto dto)
    {
        var result = await _produccionService.RecalibrarExtrusionAsync(id, dto.Calibre, dto.Ancho, dto.Longitud);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo recalibrar la extrusión.");
    }

    [HttpGet("extrusion/{id}/resultado")]
    public async Task<IActionResult> GetExtrusionResultado(Guid id)
    {
        var result = await _produccionService.GetExtrusionResultadoAsync(id);
        if (result == null) return NotFound(new { message = "No se encontró el resultado de la extrusión." });
        return Ok(result);
    }

    [HttpGet("extrusion/{extrusionId}/bobinas")]
    public async Task<IActionResult> GetBobinasByExtrusion(Guid extrusionId)
    {
        var result = await _produccionService.GetBobinasByExtrusionAsync(extrusionId);
        return Ok(result);
    }

    [HttpGet("extrusiones")]
    public async Task<IActionResult> GetExtrusiones()
    {
        var result = await _produccionService.GetExtrusionesAsync();
        return Ok(result);
    }

    [HttpGet("extrusiones/historial")]
    public async Task<IActionResult> GetHistorialExtrusiones(
        [FromQuery] DateTime? desde = null,
        [FromQuery] DateTime? hasta = null,
        [FromQuery] Guid? extrusoraId = null,
        [FromQuery] Guid? productoId = null)
    {
        var result = await _produccionService.GetHistorialExtrusionesAsync(desde, hasta, extrusoraId, productoId);
        return Ok(result);
    }

    [HttpGet("disponibilidad/bobinas")]
    public async Task<IActionResult> GetBobinasDisponibles()
    {
        var result = await _produccionService.GetBobinasDisponiblesParaPrensadoAsync();
        return Ok(result);
    }

    [HttpGet("causas-interrupcion")]
    public async Task<IActionResult> GetCausasInterrupcion()
    {
        var result = await _produccionService.GetCausasInterrupcionAsync();
        return Ok(result);
    }

    [HttpPost("extrusion/interrupcion")]
    public async Task<IActionResult> RegistrarInterrupcionExtrusion([FromBody] RegistrarInterrupcionDto dto)
    {
        var result = await _produccionService.RegistrarInterrupcionExtrusionAsync(dto.EntidadId, dto.CausaId, dto.Descripcion);
        return Ok(result);
    }

    [HttpPost("extrusion/interrupcion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionExtrusion(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionExtrusionAsync(id);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo finalizar la interrupción.");
    }

    [HttpPost("extrusion/interrupcion/activa/{extrusionId}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionExtrusionActiva(Guid extrusionId)
    {
        var result = await _produccionService.FinalizarInterrupcionExtrusionActivaAsync(extrusionId);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo finalizar la interrupción activa.");
    }

    [HttpGet("maquinas/extrusoras")]
    public async Task<IActionResult> GetExtrusoras()
    {
        var result = await _produccionService.GetEstadoExtrusorasAsync();
        return Ok(result);
    }

    [HttpGet("maquinas/prensas")]
    public async Task<IActionResult> GetPrensas()
    {
        var result = await _produccionService.GetEstadoPrensasAsync();
        return Ok(result);
    }

    [HttpGet("extrusora-productos")]
    public async Task<IActionResult> GetExtrusoraProductos()
    {
        var result = await _produccionService.GetExtrusoraProductosAsync();
        return Ok(result);
    }

    [HttpGet("extrusora-productos/{id}")]
    public async Task<IActionResult> GetExtrusoraProducto(Guid id)
    {
        var result = await _produccionService.GetExtrusoraProductoByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost("extrusora-productos")]
    public async Task<IActionResult> CreateExtrusoraProducto([FromBody] ExtrusoraProducto entity)
    {
        var result = await _produccionService.CreateExtrusoraProductoAsync(entity);
        return CreatedAtAction(nameof(GetExtrusoraProducto), new { id = result.Id }, result);
    }

    [HttpPut("extrusora-productos/{id}")]
    public async Task<IActionResult> UpdateExtrusoraProducto(Guid id, [FromBody] ExtrusoraProducto entity)
    {
        if (id != entity.Id) return BadRequest();
        try
        {
            var result = await _produccionService.UpdateExtrusoraProductoAsync(entity);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("extrusora-productos/{id}")]
    public async Task<IActionResult> DeleteExtrusoraProducto(Guid id)
    {
        var result = await _produccionService.DeleteExtrusoraProductoAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }

    [HttpGet("turnos")]
    public async Task<IActionResult> GetTurnos()
    {
        var result = await _produccionService.GetTurnosAsync();
        return Ok(result);
    }

    [HttpGet("turno-activo")]
    public async Task<IActionResult> GetTurnoActivo()
    {
        var result = await _produccionService.GetTurnoActivoAsync();
        return Ok(result);
    }

    [HttpGet("prensados")]
    public async Task<IActionResult> GetPrensados()
    {
        var result = await _produccionService.GetPrensadosAsync();
        return Ok(result);
    }

    [HttpPost("prensado/iniciar")]
    public async Task<IActionResult> IniciarPrensado([FromBody] IniciarPrensadoDto dto)
    {
        try
        {
            var result = await _produccionService.IniciarPrensadoAsync(dto.PrensaId, dto.OperarioId, dto.TurnoId, dto.ProductoId, dto.TroquelId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("extrusion/turnos-semana")]
    public async Task<IActionResult> GetTurnosSemana([FromQuery] DateTime fechaInicio, [FromQuery] DateTime fechaFin)
    {
        try
        {
            var result = await _produccionService.GetTurnosSemanaAsync(fechaInicio, fechaFin);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("extrusion/turnos-semana/guardar")]
    public async Task<IActionResult> GuardarTurnosSemana([FromBody] List<GuardarTurnoSemanaDiaDto> batch)
    {
        try
        {
            var result = await _produccionService.GuardarTurnosSemanaAsync(batch);
            return Ok(new { success = result });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("prensado/asignar-troquel")]
    public async Task<IActionResult> AsignarTroquel([FromBody] AsignarTroquelDto dto)
    {
        var prensado = await _context.Prensados
            .FirstOrDefaultAsync(p => p.PrensaId == dto.PrensaId && p.Estado == EstadoPrensado.EnProceso);

        if (prensado == null)
        {
            return BadRequest(new { message = "No hay una orden de prensado activa para esta prensa." });
        }

        var troquel = await _context.Troqueles.FindAsync(dto.TroquelId);
        if (troquel != null)
        {
            troquel.Estado = EstadoTroquel.EnUso;
        }

        prensado.TroquelId = dto.TroquelId;
        await _context.SaveChangesAsync(default);

        return Ok(new { success = true });
    }

    [HttpPost("prensado/carrera/cerrar")]
    public async Task<IActionResult> CerrarCarrera([FromBody] CerrarCarreraDto dto)
    {
        var prensado = await _context.Prensados
            .Include(p => p.Carreras)
            .ThenInclude(c => c.Carretes)
            .FirstOrDefaultAsync(p => p.PrensaId == dto.PrensaId && p.Estado == EstadoPrensado.EnProceso);

        if (prensado == null)
        {
            return BadRequest(new { message = "No hay una orden de prensado activa para esta prensa." });
        }

        var carrera = prensado.Carreras.FirstOrDefault(c => c.CarreraNo == dto.CarreraNo);
        if (carrera == null)
        {
            carrera = await _produccionService.IniciarCarreraAsync(prensado.Id);
            carrera.CarreraNo = dto.CarreraNo;
        }

        carrera.Estado = EstadoCarrera.Terminada;
        carrera.FechaValidacion = DateTime.UtcNow;

        var carretesList = carrera.Carretes.OrderBy(c => c.NoLinea).ToList();
        for (int i = 0; i < carretesList.Count; i++)
        {
            if (i < dto.PiezasBuenas)
            {
                carretesList[i].Estado = EstadoCarrete.Terminado;
            }
            else if (i < dto.PiezasBuenas + dto.PiezasMolino)
            {
                carretesList[i].Estado = EstadoCarrete.Molino;
                carretesList[i].Molino = MolinoCarrete.MolinoInterno;
            }
            else
            {
                carretesList[i].Estado = EstadoCarrete.Terminado;
            }
        }

        prensado.Producido += dto.PiezasBuenas;

        await _context.SaveChangesAsync(default);
        return Ok(new { success = true, carreraId = carrera.Id });
    }

    // ── Nuevas Funcionalidades de Bobinas (Exportar, Interrupción, Impresión Múltiple, Eliminadas) ──

    [HttpGet("extrusion/bobinas/export")]
    public async Task<IActionResult> ExportarBobinas([FromQuery] string formato, [FromQuery] string columnas)
    {
        var columnasVisibles = string.IsNullOrEmpty(columnas) ? new List<string>() : columnas.Split(',').ToList();
        var fileContent = await _produccionService.ExportarBobinasAsync(formato, columnasVisibles);
        
        string contentType = formato.ToLower() == "excel" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "application/pdf";
        string fileName = $"Bobinas_{DateTime.Now:yyyyMMddHHmmss}.{(formato.ToLower() == "excel" ? "xlsx" : "pdf")}";
        
        return File(fileContent, contentType, fileName);
    }

    [HttpPost("extrusion/bobinas/llenado-interrupcion")]
    public async Task<IActionResult> LlenadoBobinaInterrupcion()
    {
        var asignadas = await _produccionService.LlenadoBobinaInterrupcionAsync();
        return Ok(new { success = true, asignadas });
    }

    [HttpPost("extrusion/bobinas/imprimir-multiple")]
    public async Task<IActionResult> ImprimirMultipleBobinas([FromBody] List<string> noSeries)
    {
        if (noSeries == null || !noSeries.Any())
            return BadRequest("Se debe proporcionar al menos un número de serie.");

        var fileContent = await _produccionService.ImprimirMultipleBobinasAsync(noSeries);
        return File(fileContent, "application/pdf", $"Etiquetas_Multiples_{DateTime.Now:yyyyMMddHHmmss}.pdf");
    }

    [HttpGet("extrusion/bobinas/eliminadas")]
    public async Task<IActionResult> GetBobinasEliminadas()
    {
        var result = await _produccionService.GetBobinasEliminadasAsync();
        return Ok(result);
    }
}

public class IniciarExtrusionDto
{
    public Guid ExtrusoraId { get; set; }
    public Guid OperarioId { get; set; }
    public Guid TurnoId { get; set; }
    public Guid ProductoId { get; set; }
    public Guid SiloVirgenId { get; set; }
    public decimal VirgenKg { get; set; }
    public Guid? SiloMolidoId { get; set; }
    public decimal MolidoKg { get; set; }
    public decimal MetaKg { get; set; }
    public decimal RevHusilloVirgen { get; set; }
    public decimal RevHusilloMolido { get; set; }
    public string? LotePaqueteAditivos { get; set; }
    public string? Observaciones { get; set; }
}

public class GuardarBobinaDto
{
    public Guid ExtrusionId { get; set; }
    public int BobinaNo { get; set; }
    public string Origen { get; set; } = null!;
    public decimal Peso { get; set; }
    public decimal Calibre { get; set; }
    public decimal Desviacion { get; set; }
    public int Color { get; set; }
    public decimal MermaKg { get; set; }
    public int Motivo { get; set; }
    public string? Observaciones { get; set; }
}

public class RechazarBobinaDto
{
    public int Motivo { get; set; }
    public string? Observaciones { get; set; }
}

public class TransferirBobinaDto
{
    public Guid ExtrusionDestinoId { get; set; }
}

public class RecalibrarExtrusionDto
{
    public decimal? Calibre { get; set; }
    public decimal? Ancho { get; set; }
    public decimal? Longitud { get; set; }
}

public class RegistrarInterrupcionDto
{
    public Guid EntidadId { get; set; }
    public Guid CausaId { get; set; }
    public string? Descripcion { get; set; }
}

public class IniciarPrensadoDto
{
    public Guid PrensaId { get; set; }
    public Guid OperarioId { get; set; }
    public Guid TurnoId { get; set; }
    public Guid ProductoId { get; set; }
    public Guid TroquelId { get; set; }
}

public record PatchOperadorDto(Guid? OperarioId);

public record AddBobinasDto(long ParesBobinas);

public record UpdatePrensadoDto(
    DateTime Fecha,
    decimal Calibre,
    string Ancho,
    int Longitud,
    PrensadoStatus Status,
    Guid? OperarioId,
    decimal KgVirgen,
    decimal Target,
    decimal KgMolido,
    DateTime? ProcessStart,
    DateTime? ProcessEnd,
    string? LoteSilo
);

public class UpdateExtrusionDto
{
    public DateTime Fecha { get; set; }
    public Guid ExtrusoraId { get; set; }
    public Guid TurnoId { get; set; }
    public Guid? ProductoId { get; set; }
    public Guid OperarioId { get; set; }
    public decimal MetaKg { get; set; }
    public decimal VirgenKg { get; set; }
    public decimal MolidoKg { get; set; }
    public decimal Calibre { get; set; }
    public decimal Ancho { get; set; }
    public decimal Longitud { get; set; }
    public string? LoteSilo { get; set; }
    public string? LotePaqueteAditivos { get; set; }
    public EstadoExtrusion Estado { get; set; }
    public DateTime? ProcessStart { get; set; }
    public DateTime? ProcessEnd { get; set; }
}

public class ProgramacionBatchDto
{
    public List<ProgramacionDiaDto> Dias { get; set; } = new();
}

public class ProgramacionDiaDto
{
    public Guid MaquinaId { get; set; }
    public DateTime Fecha { get; set; }
    public Guid TurnoId { get; set; }
    public string? Producto { get; set; }
    public Guid? OperarioId { get; set; }
    public decimal Programado { get; set; }
}

public class AsignarTroquelDto
{
    public Guid PrensaId { get; set; }
    public Guid TroquelId { get; set; }
    public DateTime FechaAsignacion { get; set; }
}

public class CerrarCarreraDto
{
    public Guid PrensaId { get; set; }
    public int CarreraNo { get; set; }
    public int PiezasBuenas { get; set; }
    public int PiezasMolino { get; set; }
    public DateTime FechaRegistro { get; set; }
}



