using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Calidad;
using HiCone.Domain.Entities.Inventario;
using HiCone.Domain.Entities.Common;
using HiCone.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Services.Produccion;

public class ProduccionService : IProduccionService
{
    // Reglas de planta (antes eran números mágicos dispersos en el código).
    private const int CarretesPorCarrera = 6;       // Una carrera produce 6 carretes (líneas 1-6)
    private const int CapacidadPaletDefault = 100;  // Carretes esperados por palet cuando no hay default configurado

    private readonly IApplicationDbContext _context;

    public ProduccionService(IApplicationDbContext context)
    {
        _context = context;
    }

    // ── Extrusión ─────────────────────────────────────────────────────────

    public async Task<Extrusion> IniciarExtrusionAsync(
        Guid extrusoraId, 
        Guid operarioId, 
        Guid turnoId, 
        Guid productoId, 
        Guid siloVirgenId, 
        decimal virgenKg, 
        Guid? siloMolidoId, 
        decimal molidoKg, 
        decimal metaKg, 
        decimal revHusilloVirgen, 
        decimal revHusilloMolido, 
        string? lotePaqueteAditivos, 
        string? observaciones)
    {
        var activeExtrusion = await _context.Extrusiones
            .FirstOrDefaultAsync(e => e.ExtrusoraId == extrusoraId && e.Estado == EstadoExtrusion.EnProceso);
        if (activeExtrusion != null)
        {
            throw new InvalidOperationException("La extrusora ya tiene una orden de extrusión activa en proceso.");
        }

        var extrusora = await _context.Extrusoras.FindAsync(extrusoraId);
        if (extrusora == null) throw new Exception("Extrusora no encontrada");

        var producto = await _context.Productos.FindAsync(productoId);
        if (producto == null) throw new Exception("Producto no encontrado");

        // Descontar material virgen
        var siloVirgen = await _context.Silos.FindAsync(siloVirgenId);
        if (siloVirgen == null) throw new Exception("Silo virgen no encontrado");
        if (siloVirgen.ExistenciaActual < virgenKg)
        {
            throw new InvalidOperationException($"Stock insuficiente en el Silo Virgen '{siloVirgen.Nombre}'. Existencia actual: {siloVirgen.ExistenciaActual} kg, Consumo requerido: {virgenKg} kg.");
        }
        siloVirgen.ExistenciaActual -= virgenKg;

        var auditVirgen = new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityName = "Silo",
            EntityId = siloVirgen.Id.ToString(),
            Action = "Salida / Consumo",
            Username = "Sistema",
            ChangesJson = System.Text.Json.JsonSerializer.Serialize(new { 
                Motivo = "Inauguración de Extrusión", 
                KilosDescontados = virgenKg, 
                NuevaExistencia = siloVirgen.ExistenciaActual 
            }),
            Timestamp = DateTime.UtcNow
        };
        _context.AuditLogs.Add(auditVirgen);

        // Descontar material molido
        if (siloMolidoId.HasValue && molidoKg > 0)
        {
            var siloMolido = await _context.Silos.FindAsync(siloMolidoId.Value);
            if (siloMolido == null) throw new Exception("Silo molido no encontrado");
            if (siloMolido.ExistenciaActual < molidoKg)
            {
                throw new InvalidOperationException($"Stock insuficiente en el Silo Molido '{siloMolido.Nombre}'. Existencia actual: {siloMolido.ExistenciaActual} kg, Consumo requerido: {molidoKg} kg.");
            }
            siloMolido.ExistenciaActual -= molidoKg;

            var auditMolido = new AuditLog
            {
                Id = Guid.NewGuid(),
                EntityName = "Silo",
                EntityId = siloMolido.Id.ToString(),
                Action = "Salida / Consumo",
                Username = "Sistema",
                ChangesJson = System.Text.Json.JsonSerializer.Serialize(new { 
                    Motivo = "Inauguración de Extrusión", 
                    KilosDescontados = molidoKg, 
                    NuevaExistencia = siloMolido.ExistenciaActual 
                }),
                Timestamp = DateTime.UtcNow
            };
            _context.AuditLogs.Add(auditMolido);
        }

        // Obtener el último lote del silo virgen
        var ultimoLote = await _context.Lotes
            .Where(l => l.LoteSiloId == siloVirgenId && !l.IsDeleted)
            .OrderByDescending(l => l.LoteFechaRegistro)
            .Select(l => l.LoteEmbarque)
            .FirstOrDefaultAsync();
        string? loteSilo = ultimoLote ?? "Sin Lote";

        // Consecutivo único
        var todayStr = DateTime.UtcNow.ToString("yyyyMMdd");
        var countToday = await _context.Extrusiones
            .CountAsync(e => e.Fecha.Date == DateTime.UtcNow.Date);
        string codigo = $"EXT-{todayStr}-{(countToday + 1):D3}";

        var extrusion = new Extrusion
        {
            ExtrusoraId = extrusoraId,
            OperarioId = operarioId,
            TurnoId = turnoId,
            ProductoId = productoId,
            Estado = EstadoExtrusion.EnProceso,
            FechaInicio = DateTime.UtcNow,
            Fecha = DateTime.UtcNow.Date,
            Codigo = codigo,
            Calibre = producto.Calibre,
            Ancho = producto.Ancho,
            Longitud = producto.Longitud,
            MetaKg = metaKg,
            VirgenKg = virgenKg,
            SiloVirgenId = siloVirgenId,
            MolidoKg = molidoKg,
            SiloMolidoId = siloMolidoId,
            RevHusilloVirgen = revHusilloVirgen,
            RevHusilloMolido = revHusilloMolido,
            LoteSilo = loteSilo,
            LotePaqueteAditivos = lotePaqueteAditivos,
            Observaciones = observaciones
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

        // Pausar/finalizar cualquier bobina asociada que permanezca EnProceso -> cambiar a EnReposo
        var bobinasEnProceso = extrusion.Bobinas.Where(b => b.Estado == EstadoBobina.EnProceso).ToList();
        foreach (var bobina in bobinasEnProceso)
        {
            bobina.Estado = EstadoBobina.EnReposo;
            bobina.IniciaReposo = DateTime.UtcNow;
        }

        // Generar Resultado (KPIs)
        var resultado = new ExtrusionResultado
        {
            ExtrusionId = extrusionId,
            TotalBobinas = extrusion.Bobinas.Count,
            TotalBobinasMolidas = extrusion.Bobinas.Count(b => b.Estado == EstadoBobina.Molido),
            KgProducidos = extrusion.Bobinas.Sum(b => b.Kg),
            KgMerma = extrusion.Bobinas.Sum(b => b.MermaKg),
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

    public async Task<Bobina> GuardarBobinaAsync(
        Guid extrusionId, 
        int bobinaNo, 
        string origen, 
        decimal peso, 
        decimal calibre, 
        decimal desviacion, 
        ColorEstacion color, 
        decimal mermaKg, 
        MotivoMolino motivo, 
        string? observaciones)
    {
        var extrusion = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .FirstOrDefaultAsync(e => e.Id == extrusionId);
        if (extrusion == null) throw new Exception("Extrusión no encontrada");

        var estado = mermaKg > 0 ? EstadoBobina.Molido : EstadoBobina.EnReposo;
        var motivoMolino = mermaKg > 0 ? motivo : MotivoMolino.NoAplica;

        // Auto-generación de NoSerie: B-DDMMYY-{ExtrusoraCode}-{BobinaNo}{origen}
        string extrusoraCode = extrusion.Extrusora?.Codigo ?? extrusion.ExtrusoraId.ToString().Substring(0, 4);
        string dateStr = DateTime.UtcNow.ToString("ddMMyy");
        string noSerie = $"B-{dateStr}-{extrusoraCode}-{bobinaNo}{origen}";

        var bobina = new Bobina
        {
            ExtrusionId = extrusionId,
            BobinaNo = bobinaNo,
            BobinaOrigen = origen,
            Kg = peso,
            Espesor = calibre,
            DesviacionEstandar = desviacion,
            ColorEstacion = color,
            MermaKg = mermaKg,
            MotivoMolino = motivoMolino,
            Estado = estado,
            IniciaReposo = mermaKg > 0 ? null : DateTime.UtcNow,
            MinutosEnReposo = 20,
            HoraInicio = DateTime.UtcNow.AddMinutes(-20),
            HoraSalida = DateTime.UtcNow,
            NoSerie = noSerie,
            ProductoId = extrusion.ProductoId,
            OperarioId = extrusion.OperarioId,
            SiloVirgenId = extrusion.SiloVirgenId,
            SiloMolidoId = extrusion.SiloMolidoId,
            LoteVirgen = extrusion.LoteSilo,
            Observaciones = observaciones
        };

        _context.Bobinas.Add(bobina);

        // Retorno automático de merma a Silo de Molido transaccional
        if (mermaKg > 0)
        {
            if (!extrusion.SiloMolidoId.HasValue)
            {
                throw new InvalidOperationException("No se puede registrar la merma porque la orden de extrusión no tiene configurado un Silo de Molido.");
            }

            var siloMolido = await _context.Silos.FindAsync(extrusion.SiloMolidoId.Value);
            if (siloMolido == null)
            {
                throw new Exception("Silo Molido configurado no encontrado.");
            }

            siloMolido.ExistenciaActual += mermaKg;

            var auditLog = new AuditLog
            {
                Id = Guid.NewGuid(),
                EntityName = "Silo",
                EntityId = siloMolido.Id.ToString(),
                Action = "Ingreso / Merma",
                Username = "Sistema",
                ChangesJson = System.Text.Json.JsonSerializer.Serialize(new { 
                    Motivo = $"Retorno de Merma - Bobina {noSerie}", 
                    KilosIngresados = mermaKg, 
                    NuevaExistencia = siloMolido.ExistenciaActual 
                }),
                Timestamp = DateTime.UtcNow
            };
            _context.AuditLogs.Add(auditLog);
        }

        await _context.SaveChangesAsync(default);
        return bobina;
    }

    public async Task<Extrusion?> GetExtrusionActivaAsync(Guid extrusoraId)
    {
        return await _context.Extrusiones
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Include(e => e.Turno)
            .Include(e => e.SiloVirgen)
            .Include(e => e.SiloMolido)
            .Include(e => e.Bobinas)
            .FirstOrDefaultAsync(e => e.ExtrusoraId == extrusoraId && e.Estado == EstadoExtrusion.EnProceso);
    }

    public async Task<int> ObtenerSiguienteBobinaNoAsync(Guid extrusoraId, Guid productoId)
    {
        var ultimoCierre = await _context.Existencias
            .Where(e => e.Estado == "Completado")
            .OrderByDescending(e => e.FechaHora)
            .FirstOrDefaultAsync();

        var fechaReferencia = ultimoCierre?.FechaHora ?? new DateTime(2020, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        int count = await _context.Bobinas
            .CountAsync(b => b.Extrusion.ExtrusoraId == extrusoraId 
                          && b.ProductoId == productoId 
                          && b.HoraInicio > fechaReferencia 
                          && b.BobinaOrigen == "A");

        return count + 1;
    }

    public async Task<IEnumerable<Operario>> GetOperariosAsync()
    {
        return await _context.Operarios.Where(o => o.IsActive && !o.IsDeleted).ToListAsync();
    }

    public async Task<IEnumerable<Producto>> GetProductosAsync()
    {
        return await _context.Productos.Where(p => p.IsActive && !p.IsDeleted).ToListAsync();
    }

    public async Task<IEnumerable<Turno>> GetTurnosAsync()
    {
        return await _context.Turnos.Where(t => t.IsActive && !t.IsDeleted).ToListAsync();
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

        // Aplicar defaults configurados para esta combinación prensa+producto (Legacy: DPPrensadoDefaults).
        // Antes se ignoraban; ahora el prensado arranca con la meta y parámetros del catálogo.
        var defaults = await _context.PrensaProductos
            .FirstOrDefaultAsync(pp => pp.PrensaId == prensaId && pp.ProductoId == productoId && pp.IsActive);
        if (defaults != null)
        {
            prensado.MetaPallets = (int)defaults.DefaultMetaPallets;
            prensado.LevasKgEntrada = defaults.DefaultLevasKgEntrada;
            prensado.LevasKgSalida = defaults.DefaultLevasKgSalida;
            prensado.LevasGradosEntrada = defaults.DefaultLevasGradosEntrada;
            prensado.LevasGradosSalida = defaults.DefaultLevasGradosSalida;
            prensado.RodillosKgEntrada = defaults.DefaultRodillosKgEntrada;
            prensado.RodillosKgSalida = defaults.DefaultRodillosKgSalida;
            prensado.RodillosGradosEntrada = defaults.DefaultRodillosGradosEntrada;
            prensado.RodillosGradosSalida = defaults.DefaultRodillosGradosSalida;
        }

        prensa.Estado = EstadoPrensa.EnProceso;
        _context.Prensados.Add(prensado);
        await _context.SaveChangesAsync(default);
        return prensado;
    }

    // Monta una bobina en el prensado para poder iniciar carreras.
    // Equivale a CrearPrensadoBobina + SDBobinaEnPrensado + SetEstadoBobina del legado GeneXus.
    public async Task<bool> MontarBobinaEnPrensadoAsync(Guid prensadoId, Guid bobinaId)
    {
        var prensado = await _context.Prensados
            .Include(p => p.Bobinas)
            .FirstOrDefaultAsync(p => p.Id == prensadoId);
        if (prensado == null) throw new Exception("Prensado no encontrado");

        var bobina = await _context.Bobinas.FindAsync(bobinaId);
        if (bobina == null) throw new Exception("Bobina no encontrada");

        // Validar disponibilidad (Legacy: SDEscanearBobina sólo acepta bobinas en reposo/proceso)
        if (bobina.Estado != EstadoBobina.EnReposo && bobina.Estado != EstadoBobina.EnProceso)
            throw new InvalidOperationException(
                $"La bobina '{bobina.NoSerie}' no está disponible para prensado (estado actual: {bobina.Estado}).");

        // Sólo una bobina activa a la vez: desactivar la anterior (Legacy: cambio de bobina en la prensa)
        foreach (var pbActiva in prensado.Bobinas.Where(b => b.Activa))
        {
            pbActiva.Activa = false;
            pbActiva.HoraFin = DateTime.UtcNow;
        }

        // Crear el vínculo Prensado-Bobina (Legacy: CrearPrensadoBobina)
        var prensadoBobina = new PrensadoBobina
        {
            PrensadoId = prensadoId,
            BobinaId = bobinaId,
            Activa = true,
            CantCarreras = 0,
            HoraInicio = DateTime.UtcNow
        };
        _context.PrensadoBobinas.Add(prensadoBobina);

        // La bobina pasa a estar montada en la prensa (Legacy: SetEstadoBobina → EnPrensado)
        bobina.Estado = EstadoBobina.EnPrensado;

        return await _context.SaveChangesAsync(default) > 0;
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

        for (int i = 1; i <= CarretesPorCarrera; i++)
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

    // Cierra el prensado y genera sus KPIs. Espeja a FinalizarExtrusionAsync.
    // Legacy: SDCerrarPrensado + GuardarPrensadoResultado.
    public async Task<bool> FinalizarPrensadoAsync(Guid prensadoId, string? motivoAnticipado = null)
    {
        var prensado = await _context.Prensados
            .Include(p => p.Carreras)
            .Include(p => p.Bobinas).ThenInclude(pb => pb.Bobina)
            .Include(p => p.Palets)
            .Include(p => p.Interrupciones)
            .FirstOrDefaultAsync(p => p.Id == prensadoId);

        if (prensado == null) return false;

        prensado.Estado = string.IsNullOrEmpty(motivoAnticipado)
            ? EstadoPrensado.Finalizado
            : EstadoPrensado.Anticipado;
        prensado.HoraFinProceso = DateTime.UtcNow;
        prensado.MotivoAnticipado = motivoAnticipado;

        // Liberar la prensa
        var prensa = await _context.Prensas.FindAsync(prensado.PrensaId);
        if (prensa != null) prensa.Estado = EstadoPrensa.Disponible;

        // Desmontar bobinas activas -> vuelven a reposo
        foreach (var pb in prensado.Bobinas.Where(b => b.Activa))
        {
            pb.Activa = false;
            pb.HoraFin = DateTime.UtcNow;
            if (pb.Bobina != null && pb.Bobina.Estado == EstadoBobina.EnPrensado)
            {
                pb.Bobina.Estado = EstadoBobina.EnReposo;
                pb.Bobina.IniciaReposo = DateTime.UtcNow;
            }
        }

        // KPIs
        var totalCarreras = prensado.Carreras.Count;
        var totalCarrerasValidadas = prensado.Carreras.Count(c =>
            c.Estado == EstadoCarrera.Validada || c.Estado == EstadoCarrera.Terminada);
        var totalPalets = prensado.Palets.Count;
        var tiempoInterrupcion = prensado.Interrupciones
            .Where(i => i.HoraFin.HasValue)
            .Sum(i => (int)(i.HoraFin!.Value - i.HoraInicio).TotalMinutes);
        var bobinasMolidas = prensado.Bobinas.Count(b => b.Bobina != null && b.Bobina.Estado == EstadoBobina.Molido);
        var eficiencia = prensado.MetaPallets > 0
            ? Math.Round((decimal)totalPalets / prensado.MetaPallets * 100m, 2)
            : 0m;

        prensado.TotalPallets = totalPalets;
        prensado.TiempoInterrupcionMinutos = tiempoInterrupcion;

        var resultado = new PrensadoResultado
        {
            PrensadoId = prensadoId,
            TotalPalets = totalPalets,
            TotalPaletsMeta = prensado.MetaPallets,
            TotalCarreras = totalCarreras,
            TotalCarrerasValidadas = totalCarrerasValidadas,
            TotalBobinasMolidas = bobinasMolidas,
            KgMerma = prensado.BobinaMermaKg,
            TiempoInterrupcionMinutos = tiempoInterrupcion,
            EficienciaPorc = eficiencia,
            FechaRegistro = DateTime.UtcNow
        };
        _context.PrensadoResultados.Add(resultado);

        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Captura desde planta / app móvil (escaneo por NoSerie) ──────────────

    // Legacy: SDEscanearCarrete - localiza el carrete por su etiqueta y actualiza su estado.
    public async Task<Carrete> RegistrarCarreteEscaneadoAsync(string noSerie, string estado)
    {
        if (string.IsNullOrWhiteSpace(noSerie))
            throw new InvalidOperationException("El NoSerie del carrete es obligatorio.");

        var carrete = await _context.Carretes.FirstOrDefaultAsync(c => c.NoSerie == noSerie);
        if (carrete == null)
            throw new InvalidOperationException($"No se encontró un carrete con NoSerie '{noSerie}'.");

        carrete.Estado = ParseEstadoCarrete(estado);
        await _context.SaveChangesAsync(default);
        return carrete;
    }

    // Legacy: SDEscanearPallet - localiza el palet por su etiqueta y actualiza su estatus.
    public async Task<Palet> RegistrarPaletEscaneadoAsync(string noSerie, string estado)
    {
        if (string.IsNullOrWhiteSpace(noSerie))
            throw new InvalidOperationException("El NoSerie del palet es obligatorio.");

        var palet = await _context.Palets.FirstOrDefaultAsync(p => p.NoSerie == noSerie);
        if (palet == null)
            throw new InvalidOperationException($"No se encontró un palet con NoSerie '{noSerie}'.");

        palet.Estatus = ParseEstatusPalet(estado);
        if (palet.Estatus == EstatusPalet.Terminado && palet.HoraFinEnsamble == null)
            palet.HoraFinEnsamble = DateTime.UtcNow;

        await _context.SaveChangesAsync(default);
        return palet;
    }

    // La app móvil envía "Validado" para un carrete, pero el enum del carrete no lo tiene:
    // escanear/validar un carrete equivale a marcarlo Terminado.
    private static EstadoCarrete ParseEstadoCarrete(string? estado)
    {
        if (string.IsNullOrWhiteSpace(estado)) return EstadoCarrete.Terminado;
        return estado.Trim().ToLowerInvariant() switch
        {
            "validado" or "validada" or "terminado" or "ok" => EstadoCarrete.Terminado,
            "rechazado" => EstadoCarrete.Rechazado,
            "molino" => EstadoCarrete.Molino,
            "enproceso" => EstadoCarrete.EnProceso,
            _ => Enum.TryParse<EstadoCarrete>(estado, true, out var e) ? e : EstadoCarrete.Terminado
        };
    }

    private static EstatusPalet ParseEstatusPalet(string? estado)
    {
        if (string.IsNullOrWhiteSpace(estado)) return EstatusPalet.Terminado;
        return Enum.TryParse<EstatusPalet>(estado, true, out var e) ? e : EstatusPalet.Terminado;
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
        // Serie secuencial por día (antes usaba Random() -> podía colisionar).
        var hoy = DateTime.UtcNow.Date;
        var consecutivo = await _context.Palets.CountAsync(p => p.HoraInicioEnsamble >= hoy) + 1;

        // TODO: la capacidad real (carretes por palet) debería venir del catálogo por producto.
        // Hoy no existe ese campo; se usa el default hasta que se defina (ver registro 2026-06-08).
        var palet = new Palet
        {
            ProductoId = productoId,
            OperarioId = operarioId,
            PrensaId = prensaId,
            Estatus = EstatusPalet.EnEnsamble,
            HoraInicioEnsamble = DateTime.UtcNow,
            NoSerie = $"PAL-{hoy:yyyyMMdd}-{consecutivo:D4}",
            Capacidad = CapacidadPaletDefault
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

        var extrusion = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .FirstOrDefaultAsync(e => e.Id == extrusionId);

        if (extrusion != null)
        {
            extrusion.InterrupcionEnCurso = true;
            if (extrusion.Extrusora != null)
            {
                extrusion.Extrusora.Estado = EstadoExtrusora.Detenida;
            }
        }

        _context.ExtrusionInterrupciones.Add(interrupcion);
        await _context.SaveChangesAsync(default);
        return interrupcion;
    }

    public async Task<bool> FinalizarInterrupcionExtrusionAsync(Guid interrupcionId)
    {
        var interrupcion = await _context.ExtrusionInterrupciones
            .Include(i => i.Extrusion)
            .ThenInclude(e => e.Extrusora)
            .FirstOrDefaultAsync(i => i.Id == interrupcionId);

        if (interrupcion == null) return false;

        interrupcion.HoraFin = DateTime.UtcNow;
        interrupcion.Concluida = true;

        if (interrupcion.Extrusion != null)
        {
            interrupcion.Extrusion.InterrupcionEnCurso = false;
            
            if (interrupcion.DuracionMinutos.HasValue)
            {
                interrupcion.Extrusion.TiempoInterrupcion += (int)Math.Round(interrupcion.DuracionMinutos.Value);
            }

            if (interrupcion.Extrusion.Extrusora != null)
            {
                interrupcion.Extrusion.Extrusora.Estado = EstadoExtrusora.EnProceso;
            }
        }

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

        var prensado = await _context.Prensados
            .Include(p => p.Prensa)
            .FirstOrDefaultAsync(p => p.Id == prensadoId);

        if (prensado != null)
        {
            prensado.InterrupcionEnCurso = true;
            if (prensado.Prensa != null)
            {
                prensado.Prensa.Estado = EstadoPrensa.Detenida;
            }
        }

        _context.PrensadoInterrupciones.Add(interrupcion);
        await _context.SaveChangesAsync(default);
        return interrupcion;
    }

    public async Task<bool> FinalizarInterrupcionPrensadoAsync(Guid interrupcionId)
    {
        var interrupcion = await _context.PrensadoInterrupciones
            .Include(i => i.Prensado)
            .ThenInclude(p => p.Prensa)
            .FirstOrDefaultAsync(i => i.Id == interrupcionId);

        if (interrupcion == null) return false;

        interrupcion.HoraFin = DateTime.UtcNow;
        interrupcion.Concluida = true;

        if (interrupcion.Prensado != null)
        {
            interrupcion.Prensado.InterrupcionEnCurso = false;
            
            if (interrupcion.DuracionMinutos.HasValue)
            {
                interrupcion.Prensado.TiempoInterrupcionMinutos += (int)Math.Round(interrupcion.DuracionMinutos.Value);
            }

            if (interrupcion.Prensado.Prensa != null)
            {
                interrupcion.Prensado.Prensa.Estado = EstadoPrensa.EnProceso;
            }
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> FinalizarInterrupcionExtrusionActivaAsync(Guid extrusionId)
    {
        var interrupcion = await _context.ExtrusionInterrupciones
            .Include(i => i.Extrusion)
            .ThenInclude(e => e.Extrusora)
            .FirstOrDefaultAsync(i => i.ExtrusionId == extrusionId && !i.Concluida);

        if (interrupcion == null) return false;

        interrupcion.HoraFin = DateTime.UtcNow;
        interrupcion.Concluida = true;

        if (interrupcion.Extrusion != null)
        {
            interrupcion.Extrusion.InterrupcionEnCurso = false;
            
            if (interrupcion.DuracionMinutos.HasValue)
            {
                interrupcion.Extrusion.TiempoInterrupcion += (int)Math.Round(interrupcion.DuracionMinutos.Value);
            }

            if (interrupcion.Extrusion.Extrusora != null)
            {
                interrupcion.Extrusion.Extrusora.Estado = EstadoExtrusora.EnProceso;
            }
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> FinalizarInterrupcionPrensadoActivaAsync(Guid prensadoId)
    {
        var interrupcion = await _context.PrensadoInterrupciones
            .Include(i => i.Prensado)
            .ThenInclude(p => p.Prensa)
            .FirstOrDefaultAsync(i => i.PrensadoId == prensadoId && !i.Concluida);

        if (interrupcion == null) return false;

        interrupcion.HoraFin = DateTime.UtcNow;
        interrupcion.Concluida = true;

        if (interrupcion.Prensado != null)
        {
            interrupcion.Prensado.InterrupcionEnCurso = false;
            
            if (interrupcion.DuracionMinutos.HasValue)
            {
                interrupcion.Prensado.TiempoInterrupcionMinutos += (int)Math.Round(interrupcion.DuracionMinutos.Value);
            }

            if (interrupcion.Prensado.Prensa != null)
            {
                interrupcion.Prensado.Prensa.Estado = EstadoPrensa.EnProceso;
            }
        }

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

    // ── Gestión de Bobinas ─────────────────────────────────────────────────
    // Legacy: SDPausarBobinas - Cambia estado de bobina a EnReposo
    public async Task<bool> PausarBobinaAsync(Guid bobinaId)
    {
        var bobina = await _context.Bobinas.FindAsync(bobinaId);
        if (bobina == null) return false;

        bobina.Estado = EstadoBobina.EnReposo;
        bobina.IniciaReposo = DateTime.UtcNow;
        return await _context.SaveChangesAsync(default) > 0;
    }

    // Legacy: SDRechazarBobina - Envía bobina a molino con merma
    public async Task<bool> RechazarBobinaAsync(Guid bobinaId, MotivoMolino motivo, string? observaciones)
    {
        var bobina = await _context.Bobinas
            .Include(b => b.Extrusion)
            .FirstOrDefaultAsync(b => b.Id == bobinaId);
        if (bobina == null) return false;

        bobina.Estado = EstadoBobina.Molido;
        bobina.MotivoMolino = motivo;
        bobina.Observaciones = observaciones;

        // Retorno de kg a silo de molido (lógica legacy)
        if (bobina.Extrusion?.SiloMolidoId != null)
        {
            var siloMolido = await _context.Silos.FindAsync(bobina.Extrusion.SiloMolidoId.Value);
            if (siloMolido != null)
            {
                siloMolido.ExistenciaActual += bobina.Kg;
                
                var auditLog = new AuditLog
                {
                    Id = Guid.NewGuid(),
                    EntityName = "Silo",
                    EntityId = siloMolido.Id.ToString(),
                    Action = "Ingreso / Rechazo",
                    Username = "Sistema",
                    ChangesJson = System.Text.Json.JsonSerializer.Serialize(new { 
                        Motivo = $"Rechazo de Bobina {bobina.NoSerie}", 
                        KilosIngresados = bobina.Kg, 
                        NuevaExistencia = siloMolido.ExistenciaActual 
                    }),
                    Timestamp = DateTime.UtcNow
                };
                _context.AuditLogs.Add(auditLog);
            }
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    // Legacy: ValidarBobina - Aprueba medición y pasa a Disponible
    public async Task<bool> ValidarBobinaAsync(Guid bobinaId)
    {
        var bobina = await _context.Bobinas.FindAsync(bobinaId);
        if (bobina == null) return false;

        if (bobina.Estado != EstadoBobina.EnReposo && bobina.Estado != EstadoBobina.EnMedicion)
            return false;

        bobina.Estado = EstadoBobina.Disponible;
        return await _context.SaveChangesAsync(default) > 0;
    }

    // Legacy: ReasignarBobinaTurno - Transfiere bobina a otra extrusión
    public async Task<bool> TransferirBobinaAsync(Guid bobinaId, Guid extrusionDestinoId)
    {
        var bobina = await _context.Bobinas.FindAsync(bobinaId);
        if (bobina == null) return false;

        var destino = await _context.Extrusiones.FindAsync(extrusionDestinoId);
        if (destino == null) return false;

        bobina.ExtrusionId = extrusionDestinoId;
        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Recalibración ──────────────────────────────────────────────────────
    // Legacy: SDRecalibrarExtrusion - Cambia calibre/ancho/longitud en caliente consultando ExtrusoraProducto
    public async Task<bool> RecalibrarExtrusionAsync(Guid extrusionId, decimal? calibre, decimal? ancho, decimal? longitud)
    {
        var extrusion = await _context.Extrusiones.FindAsync(extrusionId);
        if (extrusion == null) return false;

        if (calibre.HasValue) extrusion.Calibre = calibre.Value;
        if (ancho.HasValue) extrusion.Ancho = ancho.Value;
        if (longitud.HasValue) extrusion.Longitud = longitud.Value;

        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Resultado y KPIs ───────────────────────────────────────────────────
    // Legacy: ObtenerExtrusionResultado
    public async Task<ExtrusionResultado?> GetExtrusionResultadoAsync(Guid extrusionId)
    {
        return await _context.ExtrusionResultados
            .FirstOrDefaultAsync(r => r.ExtrusionId == extrusionId);
    }

    public async Task<PrensadoResultado?> GetPrensadoResultadoAsync(Guid prensadoId)
    {
        return await _context.PrensadoResultados
            .FirstOrDefaultAsync(r => r.PrensadoId == prensadoId);
    }

    // ── Consultas adicionales ──────────────────────────────────────────────

    public async Task<IEnumerable<Bobina>> GetBobinasByExtrusionAsync(Guid extrusionId)
    {
        return await _context.Bobinas
            .Where(b => b.ExtrusionId == extrusionId)
            .OrderByDescending(b => b.HoraSalida)
            .ToListAsync();
    }

    // Legacy: SDTurnoActual - Determina turno actual por hora del día
    public async Task<Turno?> GetTurnoActivoAsync()
    {
        var turnos = await _context.Turnos
            .Where(t => t.IsActive && !t.IsDeleted)
            .ToListAsync();
        
        var horaActual = DateTime.Now.TimeOfDay;
        
        foreach (var turno in turnos)
        {
            var inicio = turno.HoraInicio;
            var fin = turno.HoraFin;
            if (fin > inicio)
            {
                if (horaActual >= inicio && horaActual < fin) return turno;
            }
            else // Turno nocturno (cruza medianoche)
            {
                if (horaActual >= inicio || horaActual < fin) return turno;
            }
        }

        return turnos.FirstOrDefault();
    }

    public async Task<IEnumerable<Extrusion>> GetHistorialExtrusionesAsync(DateTime? desde, DateTime? hasta, Guid? extrusoraId, Guid? productoId)
    {
        var query = _context.Extrusiones
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Include(e => e.Turno)
            .Include(e => e.Extrusora)
            .Include(e => e.Bobinas)
            .AsQueryable();

        if (desde.HasValue) query = query.Where(e => e.Fecha >= desde.Value);
        if (hasta.HasValue) query = query.Where(e => e.Fecha <= hasta.Value);
        if (extrusoraId.HasValue) query = query.Where(e => e.ExtrusoraId == extrusoraId.Value);
        if (productoId.HasValue) query = query.Where(e => e.ProductoId == productoId.Value);

        return await query
            .OrderByDescending(e => e.FechaInicio)
            .Take(100)
            .ToListAsync();
    }

    public async Task<IEnumerable<Extrusion>> GetExtrusionesAsync()
    {
        return await _context.Extrusiones
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Include(e => e.Turno)
            .Include(e => e.Extrusora)
            .Include(e => e.Bobinas)
            .ToListAsync();
    }

    public async Task<IEnumerable<Prensado>> GetPrensadosAsync()
    {
        return await _context.Prensados
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Include(p => p.Turno)
            .Include(p => p.Prensa)
            .ToListAsync();
    }

    public async Task<IEnumerable<ExtrusoraProducto>> GetExtrusoraProductosAsync()
    {
        return await _context.ExtrusoraProductos
            .Include(ep => ep.Extrusora)
            .Include(ep => ep.Producto)
            .Where(ep => !ep.IsDeleted)
            .ToListAsync();
    }
}

