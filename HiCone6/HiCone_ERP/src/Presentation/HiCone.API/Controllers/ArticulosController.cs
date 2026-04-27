using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Inventario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]")]
public class ArticulosController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ArticulosController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulos()
    {
        return await _context.Articulos
            .Include(a => a.Categoria)
            .OrderBy(a => a.Nombre)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateArticulo(Articulo articulo)
    {
        _context.Articulos.Add(articulo);
        await _context.SaveChangesAsync(default);

        return articulo.Id;
    }
}
