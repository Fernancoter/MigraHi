using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Calidad;
using HiCone.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Services.Produccion;

public class ProduccionService : IProduccionService
{
    private readonly IApplicationDbContext _context;

    public ProduccionService(IApplicationDbContext context)
    {
        _context = context;
    }

    // ── Extrusión ─────────────────────────────────────────────────────────

    public async Task<Extrusion> IniciarExtrusionAsync(Guid extrusoraId, Guid operarioId, Guid turnoId, Guid productoId)
    {
        var extrusora = await _context.Extrusoras.FindAsync(extrusoraId);
        if (extrusora == null) throw new Exception("Extrusora no encontrada");

        var producto = await _context.Productos.FindAsync(productoId);
        if (producto == null) throw new Exception("Producto no encontrado");

        var extrusion = new Extrusion
        {
            ExtrusoraId = extrusoraId,
            OperarioId = operarioId,
            TurnoId = turnoId,
            ProductoId = productoId,
            Estado = EstadoExtrusion.EnProceso,
            FechaInicio = DateTime.UtcNow,
            Codigo = $"EXT-{DateTime.Now:yyyyMMdd}-{new Random().Next(100, 999)}",
            Calibre = producto.Calibre,
            Ancho = producto.Ancho,
            Longitud = producto.Longitud
        };

        extrusora.Estado = EstadoExtrusora.EnProceso;
        _context.Extrusiones.Add(extrusion);
        await _context.SaveChangesAsync(default);

        return extrusion;
    }

    public async Task<bool> FinalizarExtrusionAsync(Guid extrusionId, string? motivoAnticipado = null)
    {
        var extrusion = await _context.Extrusiones
            .Include(e => e.Bobinas)
            .FirstOrDefaultAsync(e => e.Id == extrusionId);

        if (extrusion == null) return false;

        extrusion.Estado = string.IsNullOrEmpty(motivoAnticipado) 
            ? EstadoExtrusion.Finalizada 
            : EstadoExtrusion.Anticipada;
        
        extrusion.FechaFin = DateTime.UtcNow;
        extrusion.MotivoAnticipado = motivoAnticipado;

        // Actualizar máquina
        var extrusora = await _context.Extrusoras.FindAsync(extrusion.ExtrusoraId);
        if (extrusora != null) extrusora.Estado = EstadoExtrusora.Disponible;

        // Generar Resultado (KPIs)
        var resultado = new ExtrusionResultado
        {
            ExtrusionId = extrusionId,
            TotalBobinas = extrusion.Bobinas.Count,
            TotalBobinasMolidas = extrusion.Bobinas.Count(b => b.Estado == EstadoBobina.Molido),
            KgProducidos = extrusion.Bobinas.Sum(b => b.Kg),
            FechaRegistro = DateTime.UtcNow
        };
        _context.ExtrusionResultados.Add(resultado);

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> RegistrarConsumoExtrusionAsync(Guid extrusionId, Guid siloVirgenId, decimal virgenKg, Guid? siloMolidoId, decimal molidoKg)
    {
        var extrusion = await _context.Extrusiones.FindAsync(extrusionId);
        if (extrusion == null) throw new Exception("Extrusión no encontrada");

        // Material Virgen
        var siloVirgen = await _context.Silos.FindAsync(siloVirgenId);
        if (siloVirgen != null)
        {
            if (siloVirgen.ExistenciaActual < virgenKg)
            {
                throw new InvalidOperationException($"Stock insuficiente en el Silo Virgen '{siloVirgen.Nombre}'. Existencia actual: {siloVirgen.ExistenciaActual} kg, Consumo requerido: {virgenKg} kg.");
            }
            siloVirgen.ExistenciaActual -= virgenKg;
            extrusion.SiloVirgenId = siloVirgenId;
            extrusion.VirgenKg = virgenKg;
        }

        // Material Molido
        if (siloMolidoId.HasValue && molidoKg > 0)
        {
            var siloMolido = await _context.Silos.FindAsync(siloMolidoId.Value);
            if (siloMolido != null)
            {
                if (siloMolido.ExistenciaActual < molidoKg)
                {
                    throw new InvalidOperationException($"Stock insuficiente en el Silo Molido '{siloMolido.Nombre}'. Existencia actual: {siloMolido.ExistenciaActual} kg, Consumo requerido: {molidoKg} kg.");
                }
                siloMolido.ExistenciaActual -= molidoKg;
                extrusion.SiloMolidoId = siloMolidoId.Value;
                extrusion.MolidoKg = molidoKg;
            }
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<Bobina> registrarBobinaAsync(Guid extrusionId, int bobinaNo, decimal peso, decimal calibre, decimal ancho, ColorEstacion color)
    {
        var extrusion = await _context.Extrusiones.FindAsync(extrusionId);
        if (extrusion == null) throw new Exception("Extrusión no encontrada");

        var bobina = new Bobina
        {
            ExtrusionId = extrusionId,
            BobinaNo = bobinaNo,
            Kg = peso,
            Espesor = calibre,
            ColorEstacion = color,
            Estado = EstadoBobina.EnProceso,
            HoraInicio = DateTime.UtcNow.AddMinutes(-20),
            HoraSalida = DateTime.UtcNow,
            NoSerie = $"BOB-{DateTime.Now:yyyyMMdd}-{bobinaNo:D3}",
            ProductoId = extrusion.ProductoId
        };

        _context.Bobinas.Add(bobina);
        await _context.SaveChangesAsync(default);
        return bobina;
    }

    // ── Prensado ───────────────────────────────────────────────────────────

    public async Task<Prensado> IniciarPrensadoAsync(Guid prensaId, Guid operarioId, Guid turnoId, Guid productoId, Guid troquelId)
    {
        var prensa = await _context.Prensas.FindAsync(prensaId);
        if (prensa == null) throw new Exception("Prensa no encontrada");

        var prensado = new Prensado
        {
            PrensaId = prensaId,
            OperarioId = operarioId,
            TurnoId = turnoId,
            ProductoId = productoId,
            TroquelId = troquelId,
            Estado = EstadoPrensado.EnProceso,
            HoraIniciaProceso = DateTime.UtcNow,
            Fecha = DateTime.UtcNow.Date
        };

        prensa.Estado = EstadoPrensa.EnProceso;
        _context.Prensados.Add(prensado);
        await _context.SaveChangesAsync(default);
        return prensado;
    }

    public async Task<Carrera> IniciarCarreraAsync(Guid prensadoId)
    {
        var prensado = await _context.Prensados
            .Include(p => p.Bobinas)
            .FirstOrDefaultAsync(p => p.Id == prensadoId);

        if (prensado == null) throw new Exception("Prensado no encontrado");

        var bobinaActiva = prensado.Bobinas.FirstOrDefault(b => b.Activa);
        if (bobinaActiva == null) throw new Exception("No hay bobina activa en la prensa");

        var noCarrera = await _context.Carreras.CountAsync(c => c.PrensadoId == prensadoId) + 1;

        var carrera = new Carrera
        {
            PrensadoId = prensadoId,
            CarreraNo = noCarrera,
            Estado = EstadoCarrera.EnProceso,
            FechaRegistro = DateTime.UtcNow,
            InicioPrensadoBobinaId = bobinaActiva.BobinaId
        };

        _context.Carreras.Add(carrera);
        await _context.SaveChangesAsync(default);

        for (int i = 1; i <= 6; i++)
        {
            var carrete = new Carrete
            {
                CarreraId = carrera.Id,
                NoLinea = i,
                NoSerie = $"CAR-{carrera.Id.ToString()[..4]}-{noCarrera:D3}-{i}",
                Estado = EstadoCarrete.EnProceso
            };
            _context.Carretes.Add(carrete);
        }

        bobinaActiva.CantCarreras++;
        await _context.SaveChangesAsync(default);

        return carrera;
    }

    public async Task<bool> FinalizarCarreraAsync(Guid carreraId)
    {
        var carrera = await _context.Carreras
            .Include(c => c.Carretes)
            .FirstOrDefaultAsync(c => c.Id == carreraId);

        if (carrera == null) return false;

        carrera.Estado = EstadoCarrera.Terminada;
        
        foreach (var carrete in carrera.Carretes)
        {
            if (carrete.Estado == EstadoCarrete.EnProceso)
                carrete.Estado = EstadoCarrete.Terminado;
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> RegistrarDefectoCarreteAsync(Guid carreteId, TipoDefecto tipo, string descripcion)
    {
        var carrete = await _context.Carretes.FindAsync(carreteId);
        if (carrete == null) return false;

        carrete.Estado = EstadoCarrete.Rechazado;
        carrete.Observaciones = descripcion;

        var defecto = new CarreteDefecto
        {
            NoSerieCarrete = carrete.NoSerie,
            TipoDefecto = tipo,
            Descripcion = descripcion,
            FechaReporte = DateTime.UtcNow
        };

        _context.CarreteDefectos.Add(defecto);
        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Pallets ───────────────────────────────────────────────────────────

    public async Task<Palet> CrearPaletAsync(Guid productoId, Guid operarioId, Guid prensaId)
    {
        var palet = new Palet
        {
            ProductoId = productoId,
            OperarioId = operarioId,
            PrensaId = prensaId,
            Estatus = EstatusPalet.EnEnsamble,
            HoraInicioEnsamble = DateTime.UtcNow,
            NoSerie = $"PAL-{DateTime.Now:yyyyMMdd}-{new Random().Next(100, 999)}",
            Capacidad = 100
        };

        _context.Palets.Add(palet);
        await _context.SaveChangesAsync(default);
        return palet;
    }

    public async Task<bool> AgregarCarreteAPaletAsync(Guid paletId, Guid carreteId)
    {
        var palet = await _context.Palets.FindAsync(paletId);
        var carrete = await _context.Carretes.FindAsync(carreteId);

        if (palet == null || carrete == null) return false;

        var paletCarrete = new PaletCarrete
        {
            PaletId = paletId,
            CarreteId = carreteId,
            FechaEnsamble = DateTime.UtcNow,
            PosicionEnPalet = palet.TotalCarretes + 1
        };

        palet.TotalCarretes++;
        _context.PaletCarretes.Add(paletCarrete);
        
        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> FinalizarPaletAsync(Guid paletId)
    {
        var palet = await _context.Palets.FindAsync(paletId);
        if (palet == null) return false;

        palet.Estatus = EstatusPalet.Terminado;
        palet.HoraFinEnsamble = DateTime.UtcNow;

        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Interrupciones (Downtime) ──────────────────────────────────────────
    
    public async Task<ExtrusionInterrupcion> RegistrarInterrupcionExtrusionAsync(Guid extrusionId, Guid causaId, string? descripcion)
    {
        var interrupcion = new ExtrusionInterrupcion
        {
            ExtrusionId = extrusionId,
            CausaId = causaId,
            Descripcion = descripcion,
            HoraInicio = DateTime.UtcNow,
            Concluida = false
        };

        _context.ExtrusionInterrupciones.Add(interrupcion);
        await _context.SaveChangesAsync(default);
        return interrupcion;
    }

    public async Task<bool> FinalizarInterrupcionExtrusionAsync(Guid interrupcionId)
    {
        var interrupcion = await _context.ExtrusionInterrupciones.FindAsync(interrupcionId);
        if (interrupcion == null) return false;

        interrupcion.HoraFin = DateTime.UtcNow;
        interrupcion.Concluida = true;

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<PrensadoInterrupcion> RegistrarInterrupcionPrensadoAsync(Guid prensadoId, Guid causaId, string? descripcion)
    {
        var interrupcion = new PrensadoInterrupcion
        {
            PrensadoId = prensadoId,
            CausaId = causaId,
            Descripcion = descripcion,
            HoraInicio = DateTime.UtcNow,
            Concluida = false
        };

        _context.PrensadoInterrupciones.Add(interrupcion);
        await _context.SaveChangesAsync(default);
        return interrupcion;
    }

    public async Task<bool> FinalizarInterrupcionPrensadoAsync(Guid interrupcionId)
    {
        var interrupcion = await _context.PrensadoInterrupciones.FindAsync(interrupcionId);
        if (interrupcion == null) return false;

        interrupcion.HoraFin = DateTime.UtcNow;
        interrupcion.Concluida = true;

        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Consultas ──────────────────────────────────────────────────────────

    public async Task<IEnumerable<Bobina>> GetBobinasDisponiblesParaPrensadoAsync()
    {
        return await _context.Bobinas
            .Where(b => b.Estado == EstadoBobina.EnReposo || b.Estado == EstadoBobina.EnProceso)
            .OrderByDescending(b => b.HoraSalida)
            .ToListAsync();
    }

    public async Task<IEnumerable<Extrusora>> GetEstadoExtrusorasAsync()
    {
        return await _context.Extrusoras.ToListAsync();
    }

    public async Task<IEnumerable<Prensa>> GetEstadoPrensasAsync()
    {
        return await _context.Prensas.ToListAsync();
    }

    public async Task<IEnumerable<CausaInterrupcion>> GetCausasInterrupcionAsync()
    {
        return await _context.CausasInterrupcion
            .Where(c => c.IsActive)
            .OrderBy(c => c.OrdenVisual)
            .ToListAsync();
    }
}
