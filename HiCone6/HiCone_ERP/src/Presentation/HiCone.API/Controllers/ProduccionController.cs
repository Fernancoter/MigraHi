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

    /// <summary>Retorna el tablero de extrusión: programación + operación en curso</summary>
    [HttpGet("tablero/extrusion")]
    public async Task<ActionResult<object>> GetTableroExtrusion()
    {
        var operacion = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .OrderByDescending(e => e.Fecha)
            .Take(50)
            .Select(e => new
            {
                e.Id,
                Extrusora = e.Extrusora.Nombre,
                Turno = e.Turno != null ? e.Turno.Nombre : "",
                e.Producto,
                Operador = e.Operario != null ? e.Operario.Nombre : "",
                e.Producido,
                TiempoInterrupcion = e.TiempoInterrupcionMin,
                e.EnCurso,
                ExtrusionId = e.ExtrusionIdLegacy,
                e.Fecha,
                e.Programado
            })
            .ToListAsync();

        return Ok(new { operacion });
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
