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
        // a. No debe haber extrusiones en proceso del periodo
        var extrusionesAbiertas = await _context.Extrusiones
            .AnyAsync(e => e.Estado == EstadoExtrusion.EnProceso
                        && e.FechaInicio.Month == mes
                        && e.FechaInicio.Year == anio);
        if (extrusionesAbiertas) return false;

        // b. No debe haber prensados en proceso del periodo
        var prensadosAbiertos = await _context.Prensados
            .AnyAsync(p => p.Estado == EstadoPrensado.EnProceso
                        && p.HoraIniciaProceso.Month == mes
                        && p.HoraIniciaProceso.Year == anio);
        if (prensadosAbiertos) return false;

        // c. Cerrar los lotes abiertos del periodo
        var lotes = await _context.Lotes
            .Where(l => l.Estado == "Abierto"
                     && l.FechaCreacion.Month == mes
                     && l.FechaCreacion.Year == anio)
            .ToListAsync();

        foreach (var lote in lotes)
        {
            lote.Estado = "Cerrado";
        }

        // d. Persistir cambios
        await _context.SaveChangesAsync(default);

        // e. TODO: consolidación de inventario (snapshot de existencias y silos)
        // TODO: generación de reportes SAE del cierre mensual

        return true;
    }
}
