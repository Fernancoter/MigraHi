using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Ventas;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class VentasController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public VentasController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
    {
        return await _context.Ventas
            .Include(v => v.Cliente)
            .OrderByDescending(v => v.Fecha)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Venta>> GetVenta(Guid id)
    {
        var venta = await _context.Ventas
            .Include(v => v.Cliente)
            .Include(v => v.Detalles)
                .ThenInclude(d => d.Articulo)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (venta == null) return NotFound();

        return venta;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateVenta(Venta venta)
    {
        // En un sistema real usaríamos el patrón Command de MediatR para manejar lógica de stock
        _context.Ventas.Add(venta);
        await _context.SaveChangesAsync(default);

        return CreatedAtAction(nameof(GetVenta), new { id = venta.Id }, venta.Id);
    }
}
