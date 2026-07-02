using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProduccionController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ProduccionController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("palets")]
    public async Task<ActionResult<IEnumerable<Palet>>> GetPalets()
    {
        return await _context.Palets
            .Include(p => p.Bobinas)
            .OrderByDescending(p => p.HoraInicioEnsamble)
            .ToListAsync();
    }

<<<<<<< HEAD
    [HttpGet("bobinas")]
    public async Task<ActionResult<IEnumerable<Bobina>>> GetBobinas()
=======
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
>>>>>>> origin/information_report/refactor
    {
        return await _context.Bobinas
            .Include(b => b.Palet)
            .OrderByDescending(b => b.FechaProduccion)
            .ToListAsync();
    }

    [HttpPost("palets")]
    public async Task<ActionResult<Guid>> CreatePalet(Palet palet)
    {
        _context.Palets.Add(palet);
        await _context.SaveChangesAsync(default);
        return palet.Id;
    }

    [HttpPost("bobinas")]
    public async Task<ActionResult<Guid>> CreateBobina(Bobina bobina)
    {
        _context.Bobinas.Add(bobina);
        await _context.SaveChangesAsync(default);
        return bobina.Id;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // OBSERVACIONES / INTERRUPCIONES
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("observaciones/extrusoras")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusorasObservaciones()
    {
        var items = await (from ei in _context.ExtrusionInterrupciones
                           join e in _context.Extrusiones on ei.ExtrusionId equals e.Id
                           join ex in _context.Extrusoras on e.ExtrusoraId equals ex.Id
                           join t in _context.Turnos on e.TurnoId equals t.Id into tGroup
                           from t in tGroup.DefaultIfEmpty()
                           select new
                           {
                               id = ei.Id,
                               fecha = e.Fecha,
                               extrusora = ex.Nombre,
                               turno = t != null ? t.Nombre : "",
                               interrupcion = "0.00",
                               tiempo = (ei.DuracionMin / 60.0).ToString("F2"),
                               descripcion = ""
                           }).ToListAsync();
        return Ok(items);
    }

    [HttpGet("observaciones/prensas")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensasObservaciones()
    {
        var items = await (from pi in _context.PrensadoInterrupciones
                           join p in _context.Prensados on pi.PrensadoId equals p.Id
                           join pr in _context.Prensas on p.PrensaId equals pr.Id
                           join t in _context.Turnos on p.TurnoId equals t.Id into tGroup
                           from t in tGroup.DefaultIfEmpty()
                           select new
                           {
                               id = pi.Id,
                               fecha = p.Fecha,
                               prensa = pr.Nombre,
                               turno = t != null ? t.Nombre : "",
                               interrupcion = "0.00",
                               tiempo = (pi.DuracionMin / 60.0).ToString("F2"),
                               descripcion = ""
                           }).ToListAsync();
        return Ok(items);
    }
<<<<<<< HEAD
=======

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
    // OBSERVACIONES / INTERRUPCIONES
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("observaciones/extrusoras")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusorasObservaciones()
    {
        var items = await (from ei in _context.ExtrusionInterrupciones
                           join e in _context.Extrusiones on ei.ExtrusionId equals e.Id
                           join ex in _context.Extrusoras on e.ExtrusoraId equals ex.Id
                           join t in _context.Turnos on e.TurnoId equals t.Id into tGroup
                           from t in tGroup.DefaultIfEmpty()
                           select new
                           {
                               id = ei.Id,
                               fecha = e.Fecha,
                               extrusora = ex.Nombre,
                               turno = t != null ? t.Nombre : "",
                               interrupcion = "0.00",
                               tiempo = (ei.DuracionMin / 60.0).ToString("F2"),
                               descripcion = ""
                           }).ToListAsync();
        return Ok(items);
    }

    [HttpGet("observaciones/prensas")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensasObservaciones()
    {
        var items = await (from pi in _context.PrensadoInterrupciones
                           join p in _context.Prensados on pi.PrensadoId equals p.Id
                           join pr in _context.Prensas on p.PrensaId equals pr.Id
                           join t in _context.Turnos on p.TurnoId equals t.Id into tGroup
                           from t in tGroup.DefaultIfEmpty()
                           select new
                           {
                               id = pi.Id,
                               fecha = p.Fecha,
                               prensa = pr.Nombre,
                               turno = t != null ? t.Nombre : "",
                               interrupcion = "0.00",
                               tiempo = (pi.DuracionMin / 60.0).ToString("F2"),
                               descripcion = ""
                           }).ToListAsync();
        return Ok(items);
    }
>>>>>>> origin/information_report/refactor
}
<<<<<<< HEAD
=======

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
<<<<<<< HEAD
>>>>>>> origin/information_report/refactor
=======
>>>>>>> origin/information_report/refactor
