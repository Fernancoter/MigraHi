using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

/// <summary>
/// CRUD para los catálogos base del módulo de Producción:
/// Categorías, Turnos, Extrusoras, Prensas, Silos.
/// Todos los endpoints requieren JWT autenticado.
/// </summary>
[ApiController]
[Route("api/v1/produccion/catalogos")]
[Authorize]
public class CatalogosController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public CatalogosController(IApplicationDbContext context)
    {
        _context = context;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CATEGORÍAS
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("categorias")]
    public async Task<ActionResult<IEnumerable<object>>> GetCategorias([FromQuery] string? search = null)
    {
        var query = _context.ProductoCategorias.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(c => c.Nombre.Contains(search));

        var items = await query
            .OrderBy(c => c.Nombre)
            .Select(c => new { c.Id, c.Nombre })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("categorias/{id}")]
    public async Task<ActionResult<ProductoCategoria>> GetCategoria(Guid id)
    {
        var item = await _context.ProductoCategorias.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("categorias")]
    public async Task<ActionResult<Guid>> CreateCategoria([FromBody] ProductoCategoria entity)
    {
        entity.Id = Guid.NewGuid();
        _context.ProductoCategorias.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetCategoria), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("categorias/{id}")]
    public async Task<IActionResult> UpdateCategoria(Guid id, [FromBody] ProductoCategoria entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.ProductoCategorias.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("categorias/{id}")]
    public async Task<IActionResult> DeleteCategoria(Guid id)
    {
        var item = await _context.ProductoCategorias.FindAsync(id);
        if (item is null) return NotFound();
        _context.ProductoCategorias.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TURNOS
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("turnos")]
    public async Task<ActionResult<IEnumerable<object>>> GetTurnos()
    {
        var items = await _context.Turnos
            .OrderBy(t => t.HoraInicio)
            .Select(t => new { t.Id, t.Nombre, HoraInicio = t.HoraInicio.ToString("HH:mm"), HoraFin = t.HoraFin.ToString("HH:mm") })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("turnos/{id}")]
    public async Task<ActionResult<Turno>> GetTurno(Guid id)
    {
        var item = await _context.Turnos.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("turnos")]
    public async Task<ActionResult<Guid>> CreateTurno([FromBody] TurnoDto dto)
    {
        var entity = new Turno
        {
            Id = Guid.NewGuid(),
            Nombre = dto.Nombre,
            HoraInicio = TimeOnly.Parse(dto.HoraInicio),
            HoraFin = TimeOnly.Parse(dto.HoraFin),
            TenantId = dto.TenantId
        };
        _context.Turnos.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetTurno), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("turnos/{id}")]
    public async Task<IActionResult> UpdateTurno(Guid id, [FromBody] TurnoDto dto)
    {
        var entity = await _context.Turnos.FindAsync(id);
        if (entity is null) return NotFound();
        entity.Nombre = dto.Nombre;
        entity.HoraInicio = TimeOnly.Parse(dto.HoraInicio);
        entity.HoraFin = TimeOnly.Parse(dto.HoraFin);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("turnos/{id}")]
    public async Task<IActionResult> DeleteTurno(Guid id)
    {
        var item = await _context.Turnos.FindAsync(id);
        if (item is null) return NotFound();
        _context.Turnos.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EXTRUSORAS
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("extrusoras")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusoras([FromQuery] string? search = null)
    {
        var query = _context.Extrusoras.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(e => e.Nombre.Contains(search));

        var items = await query
            .OrderBy(e => e.Nombre)
            .Select(e => new { e.Id, e.Nombre })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("extrusoras/{id}")]
    public async Task<ActionResult<Extrusora>> GetExtrusora(Guid id)
    {
        var item = await _context.Extrusoras.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("extrusoras")]
    public async Task<ActionResult<Guid>> CreateExtrusora([FromBody] Extrusora entity)
    {
        entity.Id = Guid.NewGuid();
        _context.Extrusoras.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetExtrusora), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("extrusoras/{id}")]
    public async Task<IActionResult> UpdateExtrusora(Guid id, [FromBody] Extrusora entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.Extrusoras.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("extrusoras/{id}")]
    public async Task<IActionResult> DeleteExtrusora(Guid id)
    {
        var item = await _context.Extrusoras.FindAsync(id);
        if (item is null) return NotFound();
        _context.Extrusoras.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRENSAS
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("prensas")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensas([FromQuery] string? search = null)
    {
        var query = _context.Prensas.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Nombre.Contains(search));

        var items = await query
            .OrderBy(p => p.Nombre)
            .Select(p => new { p.Id, p.Nombre, p.Marca, p.Modelo })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("prensas/{id}")]
    public async Task<ActionResult<Prensa>> GetPrensa(Guid id)
    {
        var item = await _context.Prensas.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("prensas")]
    public async Task<ActionResult<Guid>> CreatePrensa([FromBody] Prensa entity)
    {
        entity.Id = Guid.NewGuid();
        _context.Prensas.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetPrensa), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("prensas/{id}")]
    public async Task<IActionResult> UpdatePrensa(Guid id, [FromBody] Prensa entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.Prensas.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("prensas/{id}")]
    public async Task<IActionResult> DeletePrensa(Guid id)
    {
        var item = await _context.Prensas.FindAsync(id);
        if (item is null) return NotFound();
        _context.Prensas.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SILOS DE PRODUCCIÓN
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("silos")]
    public async Task<ActionResult<IEnumerable<object>>> GetSilos([FromQuery] bool? activo = null)
    {
        var query = _context.SilosProduccion.AsQueryable();
        if (activo.HasValue)
            query = query.Where(s => s.SiloActivo == activo.Value);

        var items = await query
            .OrderBy(s => s.Nombre)
            .Select(s => new
            {
                s.Id, s.Nombre, s.CapacidadKg, s.MinimoKg, s.MaximoKg,
                s.EstadoMaterial, s.TipoMaterial, s.SiloActivo
            })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("silos/{id}")]
    public async Task<ActionResult<SiloProduccion>> GetSilo(Guid id)
    {
        var item = await _context.SilosProduccion.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("silos")]
    public async Task<ActionResult<Guid>> CreateSilo([FromBody] SiloProduccion entity)
    {
        entity.Id = Guid.NewGuid();
        _context.SilosProduccion.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetSilo), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("silos/{id}")]
    public async Task<IActionResult> UpdateSilo(Guid id, [FromBody] SiloProduccion entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.SilosProduccion.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("silos/{id}")]
    public async Task<IActionResult> DeleteSilo(Guid id)
    {
        var item = await _context.SilosProduccion.FindAsync(id);
        if (item is null) return NotFound();
        _context.SilosProduccion.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// DTOs
// ─────────────────────────────────────────────────────────────────────────────
public record TurnoDto(string Nombre, string HoraInicio, string HoraFin, Guid TenantId);
