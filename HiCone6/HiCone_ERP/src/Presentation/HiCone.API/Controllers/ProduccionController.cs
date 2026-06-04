using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
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

    public ProduccionController(IApplicationDbContext context)
    {
        _context = context;
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
                existing.Producto = dto.Producto;
                existing.OperarioId = dto.OperarioId;
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
                        Producto = dto.Producto,
                        OperarioId = dto.OperarioId,
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
                existing.Producto = dto.Producto;
                existing.OperarioId = dto.OperarioId;
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
                        Producto = dto.Producto,
                        OperarioId = dto.OperarioId,
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
            .FirstOrDefaultAsync(x => x.Id == id);

        if (e == null) return NotFound();

        return Ok(new
        {
            e.Id,
            Extrusora = e.Extrusora.Nombre,
            Turno = e.Turno != null ? e.Turno.Nombre : "",
            e.Producto,
            Operador = e.Operario != null ? e.Operario.Nombre : "",
            OperadorId = e.OperarioId,
            e.Fecha,
            e.Status,
            e.Calibre,
            e.Ancho,
            e.Longitud,
            e.KgVirgen,
            e.Target,
            e.KgMolido,
            e.ProcessStart,
            e.ProcessEnd,
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
                b.Station
            }).OrderBy(b => b.Station).ToList()
        });
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
            BobbinNo = dto.ParesBobinas, // Usamos el input para el número
            SerialNo = $"S-{dto.ParesBobinas}-A",
            Kg = 0,
            Codigo = $"B-{dto.ParesBobinas}-A"
        };

        var bobinaB = new Bobina
        {
            Id = Guid.NewGuid(),
            ExtrusionId = id,
            Station = "B",
            BobbinNo = dto.ParesBobinas,
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
        e.OperarioId = dto.OperarioId;
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
        p.OperarioId = dto.OperarioId;
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
        p.OperarioId = dto.OperarioId;
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
