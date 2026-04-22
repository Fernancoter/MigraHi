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

    [HttpGet("bobinas")]
    public async Task<ActionResult<IEnumerable<Bobina>>> GetBobinas()
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
}
