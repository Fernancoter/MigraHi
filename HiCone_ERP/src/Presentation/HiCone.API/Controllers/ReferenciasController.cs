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
        var items = await _context.ExtrusoraProductos
            .Include(ep => ep.Extrusora)
            .Include(ep => ep.Producto)
            .Where(ep => !ep.IsDeleted)
            .OrderBy(ep => ep.Extrusora.Nombre).ThenBy(ep => ep.Producto.Nombre)
            .Select(ep => new
            {
                ep.Id,
                ep.ExtrusoraId,
                Extrusora = new { ep.Extrusora.Id, ep.Extrusora.Nombre },
                ep.ProductoId,
                Producto = new { ep.Producto.Id, ep.Producto.Nombre },
                ep.DefaultCalibre,
                ep.DefaultAncho,
                ep.DefaultLongitud,
                ep.DefaultMinutosReposo,
                ep.IsActive
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("extrusora-producto")]
    public async Task<ActionResult<Guid>> CreateExtrusoraProducto([FromBody] ExtrusoraProductoDto dto)
    {
        if (dto.ExtrusoraId == Guid.Empty)
            return BadRequest(new { Error = "El campo ExtrusoraId es requerido y no puede estar vacío." });
        if (string.IsNullOrWhiteSpace(dto.ProductoNombre))
            return BadRequest(new { Error = "El campo ProductoNombre es requerido." });

        var extrusoraExiste = await _context.Extrusoras.AnyAsync(e => e.Id == dto.ExtrusoraId);
        if (!extrusoraExiste)
            return BadRequest(new { Error = $"No existe una extrusora con Id {dto.ExtrusoraId}." });

        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var producto = await _context.Productos.FirstOrDefaultAsync(p => p.Nombre == dto.ProductoNombre);
        if (producto == null)
        {
            producto = new Producto
            {
                Id = Guid.NewGuid(),
                Nombre = dto.ProductoNombre,
                Codigo = $"PROD-{DateTime.UtcNow.Ticks.ToString().Substring(8)}",
                TenantId = defaultTenantId
            };
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync(default);
        }

        var entity = new ExtrusoraProducto
        {
            Id = Guid.NewGuid(),
            ExtrusoraId = dto.ExtrusoraId,
            ProductoId = producto.Id,
            DefaultCalibre = dto.ProductoCalibre,
            DefaultAncho = decimal.TryParse(dto.ProductoAncho, out var a) ? a : 0m,
            DefaultLongitud = dto.ProductoLongitud,
            DefaultMinutosReposo = dto.ReposoMin,
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
        
        var producto = await _context.Productos.FirstOrDefaultAsync(p => p.Nombre == dto.ProductoNombre);
        if (producto == null && !string.IsNullOrWhiteSpace(dto.ProductoNombre))
        {
            producto = new Producto
            {
                Id = Guid.NewGuid(),
                Nombre = dto.ProductoNombre,
                Codigo = $"PROD-{DateTime.UtcNow.Ticks.ToString().Substring(8)}",
                TenantId = new Guid("00000000-0000-0000-0000-000000000001")
            };
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync(default);
        }
        var prodId = producto?.Id ?? Guid.Empty;

        entity.ExtrusoraId = dto.ExtrusoraId;
        entity.ProductoId = prodId;
        entity.DefaultCalibre = dto.ProductoCalibre;
        entity.DefaultAncho = decimal.TryParse(dto.ProductoAncho, out var a) ? a : 0m;
        entity.DefaultLongitud = dto.ProductoLongitud;
        entity.DefaultMinutosReposo = dto.ReposoMin;
        
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
