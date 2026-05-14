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

        var bobinaA = new Bobina
        {
            Id = Guid.NewGuid(),
            ExtrusionId = id,
            Station = "A",
            BobbinNo = dto.BobbinNoA,
            SerialNo = dto.SerialNoA,
            Kg = dto.KgA,
            Codigo = $"B-{dto.BobbinNoA}"
        };

        var bobinaB = new Bobina
        {
            Id = Guid.NewGuid(),
            ExtrusionId = id,
            Station = "B",
            BobbinNo = dto.BobbinNoB,
            SerialNo = dto.SerialNoB,
            Kg = dto.KgB,
            Codigo = $"B-{dto.BobbinNoB}"
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

public record AddBobinasDto(
    long BobbinNoA, string SerialNoA, decimal KgA,
    long BobbinNoB, string SerialNoB, decimal KgB
);
