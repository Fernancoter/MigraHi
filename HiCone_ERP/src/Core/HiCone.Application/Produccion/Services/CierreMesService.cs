using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Produccion.Services;

public class CierreMesService
{
    private readonly IApplicationDbContext _context;

    public CierreMesService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> ProcesarCierreMes(int mes, int anio)
    {
        // 1. Verificar extrusiones abiertas
        var tieneAbiertas = await _context.Extrusiones
            .AnyAsync(e => e.Estado == EstadoExtrusion.EnProceso && e.FechaInicio.Month == mes && e.FechaInicio.Year == anio);

        if (tieneAbiertas) return false;

        // 2. Cerrar Lotes del periodo
        var lotes = await _context.Lotes
            .Where(l => l.Estado == "Abierto" && l.FechaCreacion.Month == mes && l.FechaCreacion.Year == anio)
            .ToListAsync();

        foreach (var lote in lotes)
        {
            lote.Estado = "Cerrado";
        }

        await _context.SaveChangesAsync(default);
        return true;
    }
}

