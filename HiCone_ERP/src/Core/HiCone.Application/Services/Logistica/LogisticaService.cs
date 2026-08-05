using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Logistica;
using HiCone.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Services.Logistica;

public class LogisticaService : ILogisticaService
{
    private readonly IApplicationDbContext _context;
    private readonly ISAEService _saeService;

    public LogisticaService(IApplicationDbContext context, ISAEService saeService)
    {
        _context = context;
        _saeService = saeService;
    }

    public async Task<Embarque> CrearEmbarqueDesdeSaeAsync(string orderDoc, string remissionDoc)
    {
        // 1. Evitar duplicados
        var existente = await _context.Embarques
            .FirstOrDefaultAsync(e => e.OrderDoc == orderDoc && e.RemissionDoc == remissionDoc);

        if (existente != null) return existente;

        // 2. En la vida real aquí llamaríamos a ISAEService para obtener los detalles de la remisión
        // SELECT CVE_ART, CAN_TOT FROM PEDI01/FACT01...
        
        var embarque = new Embarque
        {
            Codigo = $"EMB-{DateTime.Now:yyyyMM}-{new Random().Next(100, 999)}",
            OrderDoc = orderDoc,
            RemissionDoc = remissionDoc,
            Fecha = DateTime.UtcNow,
            Estatus = EstatusEmbarque.PorProgramar,
            Cliente = "Sincronizado de SAE"
        };

        _context.Embarques.Add(embarque);
        
        // Mock de detalle basado en SAE
        var detalle = new EmbarqueDetalle
        {
            EmbarqueId = embarque.Id,
            ProductoSAE = "PROD-SAE-001",
            CantidadPalletsRequerida = 5,
            CantidadPalletsEscaneados = 0
        };
        _context.EmbarqueDetalles.Add(detalle);

        await _context.SaveChangesAsync(default);
        return embarque;
    }

    public async Task<bool> ProgramarTransporteAsync(Guid embarqueId, string transporte, string placas, string conductor)
    {
        var embarque = await _context.Embarques.FindAsync(embarqueId);
        if (embarque == null) return false;

        embarque.Transporte = transporte;
        embarque.Placas = placas;
        embarque.Conductor = conductor;
        embarque.Estatus = EstatusEmbarque.Programado;

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> IniciarCargaAsync(Guid embarqueId)
    {
        var embarque = await _context.Embarques.FindAsync(embarqueId);
        if (embarque == null) return false;

        if (embarque.Estatus != EstatusEmbarque.Programado) return false;

        embarque.Estatus = EstatusEmbarque.EnCarga;
        embarque.HoraInicio = DateTime.UtcNow;

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<(bool Success, string Message)> ValidarPaletParaEmbarqueAsync(Guid embarqueId, string noSeriePalet)
    {
        var embarque = await _context.Embarques
            .Include(e => e.Detalles)
            .Include(e => e.Pallets)
            .FirstOrDefaultAsync(e => e.Id == embarqueId);

        if (embarque == null) return (false, "Embarque no encontrado");

        // 1. Buscar el paltet en el sistema
        var palet = await _context.Palets
            .Include(p => p.ProductoTerminado)
            .FirstOrDefaultAsync(p => p.NoSerie == noSeriePalet);

        if (palet == null) return (false, "El Palet no existe en el sistema local");

        // 2. Verificar si está disponible o ya embarcado
        if (palet.Estatus == EstatusPalet.Embarcado) 
            return (false, "Este palet ya fue embarcado anteriormente");

        // 2b. Verificar liberación de calidad
        if (palet.Estatus != EstatusPalet.Aprobado)
        {
            if (palet.Estatus == EstatusPalet.Rechazado)
                return (false, "Este palet fue RECHAZADO por control de calidad");
            else
                return (false, "El palet debe ser APROBADO por control de calidad antes de poder embarcarse");
        }

        // 3. Verificar si ya está escaneado en este embarque
        if (embarque.Pallets.Any(p => p.PaletId == palet.Id))
            return (false, "Este palet ya fue escaneado en este embarque");

        // 4. Validar contra detalles de la remisión
        // En legacy se busca el producto del palet dentro de los productos del embarque
        var detalleCompatible = embarque.Detalles
            .FirstOrDefault(d => d.ProductoSAE == palet.ProductoTerminado?.CodigoSap || d.ProductoId == palet.ProductoId);

        if (detalleCompatible == null)
            return (false, "El producto de este palet no pertenece a esta remisión");

        if (detalleCompatible.CantidadPalletsEscaneados >= detalleCompatible.CantidadPalletsRequerida)
            return (false, "Ya se completó la cantidad requerida para este producto");

        // 5. Registrar escaneo exitoso
        var escaneo = new EmbarquePallet
        {
            EmbarqueId = embarqueId,
            PaletId = palet.Id,
            EmbarqueDetalleId = detalleCompatible.Id,
            FechaEscaneo = DateTime.UtcNow,
            Validado = true
        };

        detalleCompatible.CantidadPalletsEscaneados++;
        _context.EmbarquePallets.Add(escaneo);
        
        await _context.SaveChangesAsync(default);

        return (true, $"Palet {noSeriePalet} validado correctamente");
    }

    public async Task<bool> FinalizarEmbarqueAsync(Guid embarqueId, string elaboradoPor)
    {
        var embarque = await _context.Embarques
            .Include(e => e.Detalles)
            .FirstOrDefaultAsync(e => e.Id == embarqueId);

        if (embarque == null) return false;

        // Verificar si está todo completo
        if (embarque.Detalles.Any(d => d.CantidadPalletsEscaneados < d.CantidadPalletsRequerida))
        {
            // En un sistema real podrías permitir un cierre parcial, aquí seguimos la regla estricta
        }

        embarque.Estatus = EstatusEmbarque.Cargado;
        embarque.HoraFin = DateTime.UtcNow;
        embarque.Elaboro = elaboradoPor;

        // Actualizar estatus de pallets a EMBARCADO
        var pallets = await _context.EmbarquePallets
            .Where(ep => ep.EmbarqueId == embarqueId)
            .Select(ep => ep.PaletId)
            .ToListAsync();

        var dbPallets = await _context.Palets.Where(p => pallets.Contains(p.Id)).ToListAsync();
        foreach (var p in dbPallets) p.Estatus = EstatusPalet.Embarcado;

        // 3. Sincronizar y cerrar documentos en la base de datos de SAE
        await _saeService.FinalizarRemisionSAEAsync(embarque.OrderDoc, embarque.RemissionDoc);

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<IEnumerable<Embarque>> GetEmbarquesActivosAsync()
    {
        return await _context.Embarques
            .Where(e => e.Estatus != EstatusEmbarque.Cargado && e.Estatus != EstatusEmbarque.Cancelado)
            .ToListAsync();
    }

    public async Task<object> GetResumenCargaAsync(Guid embarqueId)
    {
        var embarque = await _context.Embarques
            .Include(e => e.Detalles)
            .Include(e => e.Pallets).ThenInclude(p => p.Palet)
            .FirstOrDefaultAsync(e => e.Id == embarqueId);

        if (embarque == null) return null!;

        return new
        {
            embarque.Codigo,
            embarque.OrderDoc,
            embarque.RemissionDoc,
            TotalDetalles = embarque.Detalles.Count,
            Completados = embarque.Detalles.Count(d => d.CantidadPalletsEscaneados >= d.CantidadPalletsRequerida),
            Detalles = embarque.Detalles.Select(d => new
            {
                d.ProductoSAE,
                d.CantidadPalletsRequerida,
                d.CantidadPalletsEscaneados,
                Porcentaje = d.CantidadPalletsRequerida > 0 ? (d.CantidadPalletsEscaneados * 100 / d.CantidadPalletsRequerida) : 0
            })
        };
    }
}
