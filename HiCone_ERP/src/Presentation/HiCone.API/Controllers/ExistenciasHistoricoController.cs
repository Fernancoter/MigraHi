using HiCone.Application.Common.Interfaces;
using HiCone.Application.Services.Inventario;
using HiCone.Domain.Entities.Inventario;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ExistenciasHistoricoController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ExistenciasHistoricoController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetHistorial()
    {
        var historial = await _context.Existencias
            .OrderByDescending(e => e.FechaHora)
            .Select(e => new
            {
                id = e.Id,
                fecha = e.FechaHora.ToString("dd/MM/yyyy"),
                hora = e.FechaHora.ToString("hh:mm tt"),
                usuario = e.Usuario,
                observaciones = e.Observaciones,
                estado = e.Estado
            })
            .ToListAsync();

        return Ok(historial);
    }

    [HttpPost("Cierre")]
    public async Task<ActionResult<Guid>> CrearNuevoCierre([FromBody] NuevoCierreRequest request)
    {
        // 1. Crear encabezado
        var nuevaExistencia = new Existencia
        {
            FechaHora = DateTime.UtcNow,
            Usuario = request.Usuario ?? "Admin", // Ideally from User context
            Estado = "Abierto",
            Observaciones = request.Observaciones
        };

        _context.Existencias.Add(nuevaExistencia);

        // 2. Tomar "Snapshot" de los Silos actuales
        var silos = await _context.Silos.ToListAsync();
        foreach (var silo in silos)
        {
            var detalleSilo = new ExistenciaSilo
            {
                Existencia = nuevaExistencia,
                SiloId = silo.Id,
                Cantidad = silo.ExistenciaActual
            };
            _context.ExistenciasSilos.Add(detalleSilo);
        }

        // 3. Tomar "Snapshot" de Productos (Artículos) actuales
        var productos = await _context.Productos.ToListAsync();
        foreach (var prod in productos)
        {
            var detalleProd = new ExistenciaProducto
            {
                Existencia = nuevaExistencia,
                ProductoId = prod.Id,
                CantidadSistema = 0,
                CantidadReal = 0
            };
            _context.ExistenciaProductos.Add(detalleProd);
        }

        await _context.SaveChangesAsync(default);

        return Ok(nuevaExistencia.Id);
    }

    [HttpPut("{id}/Completar")]
    public async Task<IActionResult> CompletarCierre(Guid id, [FromBody] List<ExistenciaSiloDto> ajustes)
    {
        var existencia = await _context.Existencias
            .Include(e => e.Silos)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (existencia == null) return NotFound();

        // Marcar como Completado
        existencia.Estado = "Completado";

        // Ajustar el stock real en los detalles de Existencia y en los Silos
        foreach (var ajuste in ajustes)
        {
            var detalleSilo = existencia.Silos.FirstOrDefault(s => s.SiloId == ajuste.SiloId);
            if (detalleSilo != null)
            {
                detalleSilo.Cantidad = ajuste.CantidadReal;
            }

            var silo = await _context.Silos.FindAsync(ajuste.SiloId);
            if (silo != null)
            {
                // El ajuste físico es la cantidad real capturada
                silo.ExistenciaActual = ajuste.CantidadReal;
            }
        }

        await _context.SaveChangesAsync(default);

        return NoContent();
    }
}



public class NuevoCierreRequest
{
    public string? Usuario { get; set; }
    public string? Observaciones { get; set; }
}
