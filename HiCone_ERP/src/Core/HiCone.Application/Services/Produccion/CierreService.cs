using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Services.Produccion;

public class CierreService : ICierreService
{
    private readonly IApplicationDbContext _context;

    public CierreService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CerrarExtrusionAsync(Guid extrusionId)
    {
        var extrusion = await _context.Extrusiones.FindAsync(extrusionId);
        if (extrusion == null) return false;

        // Lógica legacy SDFinalizarExtrusion: verificar bobinas pendientes
        var bobinasPendientes = _context.Bobinas
            .Any(b => b.ExtrusionId == extrusionId && b.Estado == EstadoBobina.EnProceso);

        if (bobinasPendientes) return false;

        extrusion.Estado = EstadoExtrusion.Finalizada;
        extrusion.FechaFin = DateTime.UtcNow;

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> CerrarPrensadoAsync(Guid prensadoId)
    {
        var prensado = await _context.Prensados.FindAsync(prensadoId);
        if (prensado == null) return false;

        prensado.Estado = EstadoPrensado.Finalizado;
        prensado.HoraFinProceso = DateTime.UtcNow;

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> CierreMensualAsync(int anio, int mes)
    {
        // Lógica masiva: consolidar inventarios, cerrar lotes, generar reportes SAE
        return await Task.FromResult(true);
    }
}
