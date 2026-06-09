using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/produccion/referencias")]
[Authorize]
public class ReferenciasController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ReferenciasController(IApplicationDbContext context)
    {
        _context = context;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CONFIGURACIÓN SISTEMA
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("configuracion")]
    public async Task<ActionResult<IEnumerable<object>>> GetConfiguracion()
    {
        // Auto-seed para pruebas si está vacío
        if (!await _context.ConfiguracionesSistema.AnyAsync())
        {
            var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
            _context.ConfiguracionesSistema.AddRange(
                new ConfiguracionSistema { Id = Guid.NewGuid(), Key = "BaseUrl", Valor = "https://erphi-cone.com/erp/", TenantId = defaultTenantId },
                new ConfiguracionSistema { Id = Guid.NewGuid(), Key = "ExtrusionAyudaURL", Valor = "https://nedi.mx/knowledge/article/941", TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        var items = await _context.ConfiguracionesSistema
            .OrderBy(c => c.Key)
            .Select(c => new { c.Id, c.Key, c.Valor })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("configuracion")]
    public async Task<ActionResult<Guid>> CreateConfiguracion([FromBody] ConfiguracionDto dto)
    {
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var entity = new ConfiguracionSistema
        {
            Id = Guid.NewGuid(),
            Key = dto.Key,
            Valor = dto.Valor,
            TenantId = defaultTenantId
        };
        _context.ConfiguracionesSistema.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("configuracion/{id}")]
    public async Task<IActionResult> UpdateConfiguracion(Guid id, [FromBody] ConfiguracionDto dto)
    {
        var entity = await _context.ConfiguracionesSistema.FindAsync(id);
        if (entity is null) return NotFound();
        
        entity.Key = dto.Key;
        entity.Valor = dto.Valor;
        
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("configuracion/{id}")]
    public async Task<IActionResult> DeleteConfiguracion(Guid id)
    {
        var item = await _context.ConfiguracionesSistema.FindAsync(id);
        if (item is null) return NotFound();
        _context.ConfiguracionesSistema.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EXTRUSORA PRODUCTO
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("extrusora-producto")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusoraProductos()
    {
        // Auto-seed para pruebas si está vacío
        if (!await _context.ExtrusoraProductos.AnyAsync())
        {
            var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
            var extrusora = await _context.Extrusoras.FirstOrDefaultAsync();
            if (extrusora != null)
            {
                _context.ExtrusoraProductos.AddRange(
                    new ExtrusoraProducto { Id = Guid.NewGuid(), ExtrusoraId = extrusora.Id, ProductoNombre = "74750", ProductoCalibre = 0.015m, ProductoAncho = "2315/16", ProductoLongitud = 17950, ReposoMin = 720, ProcesoMin = 90, TenantId = defaultTenantId },
                    new ExtrusoraProducto { Id = Guid.NewGuid(), ExtrusoraId = extrusora.Id, ProductoNombre = "80607", ProductoCalibre = 0.013m, ProductoAncho = "2315/16", ProductoLongitud = 19400, ReposoMin = 1440, ProcesoMin = 90, TenantId = defaultTenantId }
                );
                await _context.SaveChangesAsync(default);
            }
        }

        var items = await _context.ExtrusoraProductos
            .Include(ep => ep.Extrusora)
            .OrderBy(ep => ep.Extrusora.Nombre).ThenBy(ep => ep.ProductoNombre)
            .Select(ep => new
            {
                ep.Id,
                ExtrusoraId = ep.ExtrusoraId,
                ExtrusoraNombre = ep.Extrusora.Nombre,
                ep.ProductoNombre,
                ep.ProductoCalibre,
                ep.ProductoAncho,
                ep.ProductoLongitud,
                ep.ReposoMin,
                ep.ProcesoMin
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("extrusora-producto")]
    public async Task<ActionResult<Guid>> CreateExtrusoraProducto([FromBody] ExtrusoraProductoDto dto)
    {
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var entity = new ExtrusoraProducto
        {
            Id = Guid.NewGuid(),
            ExtrusoraId = dto.ExtrusoraId,
            ProductoNombre = dto.ProductoNombre,
            ProductoCalibre = dto.ProductoCalibre,
            ProductoAncho = dto.ProductoAncho,
            ProductoLongitud = dto.ProductoLongitud,
            ReposoMin = dto.ReposoMin,
            ProcesoMin = dto.ProcesoMin,
            TenantId = defaultTenantId
        };
        _context.ExtrusoraProductos.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("extrusora-producto/{id}")]
    public async Task<IActionResult> UpdateExtrusoraProducto(Guid id, [FromBody] ExtrusoraProductoDto dto)
    {
        var entity = await _context.ExtrusoraProductos.FindAsync(id);
        if (entity is null) return NotFound();
        
        entity.ExtrusoraId = dto.ExtrusoraId;
        entity.ProductoNombre = dto.ProductoNombre;
        entity.ProductoCalibre = dto.ProductoCalibre;
        entity.ProductoAncho = dto.ProductoAncho;
        entity.ProductoLongitud = dto.ProductoLongitud;
        entity.ReposoMin = dto.ReposoMin;
        entity.ProcesoMin = dto.ProcesoMin;
        
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("extrusora-producto/{id}")]
    public async Task<IActionResult> DeleteExtrusoraProducto(Guid id)
    {
        var item = await _context.ExtrusoraProductos.FindAsync(id);
        if (item is null) return NotFound();
        _context.ExtrusoraProductos.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }
}

public record ConfiguracionDto(string Key, string Valor);
public record ExtrusoraProductoDto(Guid ExtrusoraId, string ProductoNombre, decimal ProductoCalibre, string ProductoAncho, int ProductoLongitud, int ReposoMin, int ProcesoMin);
