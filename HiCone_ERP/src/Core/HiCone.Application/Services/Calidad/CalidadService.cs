using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Calidad;
using HiCone.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Services.Calidad;

public class CalidadService : ICalidadService
{
    private readonly IApplicationDbContext _context;

    public CalidadService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Reclamo> AbrirReclamoAsync(string cliente, string orderDoc, string descripcion)
    {
        var reclamo = new Reclamo
        {
            Codigo = $"REC-{DateTime.Now:yyyyMM}-{new Random().Next(100, 999)}",
            Fecha = DateTime.UtcNow,
            Estatus = EstatusReclamo.Abierto,
            Cliente = cliente,
            OrderDoc = orderDoc,
            Descripcion = descripcion
        };

        _context.Reclamos.Add(reclamo);
        await _context.SaveChangesAsync(default);
        return reclamo;
    }

    public async Task<bool> AgregarDetalleReclamoAsync(Guid reclamoId, string noSerieCarrete, TipoDefecto defecto, string observacion)
    {
        var reclamo = await _context.Reclamos.FindAsync(reclamoId);
        if (reclamo == null) return false;

        var detalle = new ReclamoDetalle
        {
            ReclamoId = reclamoId,
            NoSerieCarrete = noSerieCarrete,
            TipoDefecto = defecto,
            Descripcion = observacion,
            FechaRegistro = DateTime.UtcNow
        };

        _context.ReclamoDetalles.Add(detalle);
        
        // También registramos el defecto en la tabla maestra de defectos
        var carreteDefecto = new CarreteDefecto
        {
            NoSerieCarrete = noSerieCarrete,
            TipoDefecto = defecto,
            Descripcion = observacion,
            FechaReporte = DateTime.UtcNow,
            ReclamoDetalleId = detalle.Id
        };
        _context.CarreteDefectos.Add(carreteDefecto);

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> ResolverReclamoAsync(Guid reclamoId, string accionCorrectiva, string resueltoPor)
    {
        var reclamo = await _context.Reclamos.FindAsync(reclamoId);
        if (reclamo == null) return false;

        reclamo.Estatus = EstatusReclamo.Resuelto;
        reclamo.AccionCorrectiva = accionCorrectiva;
        reclamo.FechaCierre = DateTime.UtcNow;
        reclamo.CerradoPor = resueltoPor;

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> MarcarCarreteDefectuosoAsync(string noSerieCarrete, TipoDefecto tipo, string descripcion)
    {
        var defecto = new CarreteDefecto
        {
            NoSerieCarrete = noSerieCarrete,
            TipoDefecto = tipo,
            Descripcion = descripcion,
            FechaReporte = DateTime.UtcNow
        };

        _context.CarreteDefectos.Add(defecto);
        
        // Buscar el carrete si existe para actualizar su estado
        var carrete = await _context.Carretes.FirstOrDefaultAsync(c => c.NoSerie == noSerieCarrete);
        if (carrete != null)
        {
            carrete.Estado = EstadoCarrete.Rechazado;
            carrete.Observaciones = descripcion;
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> AprobarPaletAsync(Guid paletId, string inspector, string? observaciones)
    {
        var palet = await _context.Palets.FindAsync(paletId);
        if (palet == null || palet.Estatus == EstatusPalet.Embarcado) return false;

        palet.Estatus = EstatusPalet.Aprobado;

        // Registrar inspección formal de calidad
        var inspeccion = new InspeccionCalidad
        {
            Id = Guid.NewGuid(),
            NumeroReporte = $"REP-PAL-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(100, 999)}",
            FechaInspeccion = DateTime.UtcNow,
            Resultado = "Aprobado",
            Inspector = inspector,
            Hallazgos = observaciones ?? "Aprobado sin observaciones"
        };
        _context.InspeccionesCalidad.Add(inspeccion);

        // Registrar auditoría de sistema
        var audit = new HiCone.Domain.Entities.Common.AuditLog
        {
            Id = Guid.NewGuid(),
            EntityName = "Palet",
            EntityId = paletId.ToString(),
            Action = "Calidad / Aprobado",
            Username = inspector,
            ChangesJson = System.Text.Json.JsonSerializer.Serialize(new { 
                Resultado = "Aprobado", 
                Observaciones = observaciones ?? "Ninguna",
                NoSeriePalet = palet.NoSerie
            }),
            Timestamp = DateTime.UtcNow
        };
        _context.AuditLogs.Add(audit);

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> RechazarPaletAsync(Guid paletId, string inspector, string? observaciones)
    {
        var palet = await _context.Palets.FindAsync(paletId);
        if (palet == null || palet.Estatus == EstatusPalet.Embarcado) return false;

        palet.Estatus = EstatusPalet.Rechazado;

        // Registrar inspección formal
        var inspeccion = new InspeccionCalidad
        {
            Id = Guid.NewGuid(),
            NumeroReporte = $"REP-PAL-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(100, 999)}",
            FechaInspeccion = DateTime.UtcNow,
            Resultado = "Rechazado",
            Inspector = inspector,
            Hallazgos = observaciones ?? "Defectos encontrados en inspección"
        };
        _context.InspeccionesCalidad.Add(inspeccion);

        // Registrar auditoría
        var audit = new HiCone.Domain.Entities.Common.AuditLog
        {
            Id = Guid.NewGuid(),
            EntityName = "Palet",
            EntityId = paletId.ToString(),
            Action = "Calidad / Rechazado",
            Username = inspector,
            ChangesJson = System.Text.Json.JsonSerializer.Serialize(new { 
                Resultado = "Rechazado", 
                Observaciones = observaciones ?? "Ninguna",
                NoSeriePalet = palet.NoSerie
            }),
            Timestamp = DateTime.UtcNow
        };
        _context.AuditLogs.Add(audit);

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<IEnumerable<Reclamo>> GetReclamosActivosAsync()
    {
        return await _context.Reclamos
            .Where(r => r.Estatus != EstatusReclamo.Cerrado)
            .OrderByDescending(r => r.Fecha)
            .ToListAsync();
    }

    public async Task<object?> GetTrazabilidadCarreteAsync(string noSerieCarrete)
    {
        var carrete = await _context.Carretes
            .Include(c => c.Carrera)
                .ThenInclude(ca => ca.Prensado)
                    .ThenInclude(p => p.Prensa)
            .Include(c => c.Carrera)
                .ThenInclude(ca => ca.Prensado)
                    .ThenInclude(p => p.Operario)
            .FirstOrDefaultAsync(c => c.NoSerie == noSerieCarrete);

        if (carrete == null) return null;

        // Trazabilidad hacia atrás: Bobina y Extrusión
        var bobinaId = carrete.Carrera.InicioPrensadoBobinaId;
        var bobina = await _context.Bobinas
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Extrusora)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Operario)
            .FirstOrDefaultAsync(b => b.Id == bobinaId);

        return new
        {
            Carrete = new {
                carrete.NoSerie,
                carrete.Estado,
                carrete.NoLinea,
                carrete.Observaciones
            },
            Prensado = new {
                carrete.Carrera.Prensado.Id,
                Prensa = carrete.Carrera.Prensado.Prensa?.Nombre,
                Operario = carrete.Carrera.Prensado.Operario?.NombreCompleto,
                Fecha = carrete.Carrera.Prensado.Fecha,
                CarreraNo = carrete.Carrera.CarreraNo
            },
            Extrusion = bobina != null ? new {
                bobina.ExtrusionId,
                Extrusora = bobina.Extrusion?.Extrusora?.Nombre,
                Operario = bobina.Extrusion?.Operario?.NombreCompleto,
                Fecha = bobina.Extrusion?.FechaInicio,
                BobinaNo = bobina.BobinaNo,
                PesoBobina = bobina.Kg
            } : null
        };
    }
}
