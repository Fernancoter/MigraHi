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

        var maquina = await _context.Maquinas.FindAsync(extrusoraId);
        if (maquina == null)
        {
            maquina = new Maquina
            {
                Id = extrusora.Id,
                Nombre = extrusora.Nombre,
                Codigo = string.IsNullOrWhiteSpace(extrusora.Codigo) ? "EXT-03" : extrusora.Codigo,
                Tipo = "Extrusora",
                Estado = "Disponible",
                IsActive = true,
                TenantId = extrusora.TenantId
            };
            _context.Maquinas.Add(maquina);
            await _context.SaveChangesAsync(default);
        }

        // Verificar o configurar la referencia ExtrusoraMezcladora para esta extrusora
        var mezcladora = await _context.ExtrusoraMezcladoras
            .FirstOrDefaultAsync(em => em.ExtrusoraId == extrusoraId && !em.IsDeleted);

        if (mezcladora == null)
        {
            mezcladora = new ExtrusoraMezcladora
            {
                Id = Guid.NewGuid(),
                ExtrusoraId = extrusoraId,
                Nombre = $"Mezcladora {extrusora.Nombre}",
                Codigo = $"MEZ-{(extrusora.Codigo ?? "01")}",
                IsActive = true,
                TenantId = extrusora.TenantId
            };
            _context.ExtrusoraMezcladoras.Add(mezcladora);
            await _context.SaveChangesAsync(default);
        }

        // Cálculo automático de kilos virgen y molido en base al % de mezcla
        decimal metaKilos = metaKg > 0 ? metaKg : 200;
        if (virgenKg == 0 && molidoKg == 0)
        {
            virgenKg = metaKilos * 0.80m;
            molidoKg = metaKilos * 0.20m;
        }

        var producto = await _context.Productos.FindAsync(productoId);
        if (producto == null)
        {
            producto = await _context.Productos.FirstOrDefaultAsync(p => p.IsActive) ?? await _context.Productos.FirstOrDefaultAsync();
            if (producto == null) throw new Exception("Producto no encontrado. Registre un producto primero en el ERP Web.");
            productoId = producto.Id;
        }

        var operario = await _context.Operarios.FindAsync(operarioId);
        if (operario == null)
        {
            operario = await _context.Operarios.FirstOrDefaultAsync(o => o.Activo) ?? await _context.Operarios.FirstOrDefaultAsync();
            if (operario != null) operarioId = operario.Id;
        }

        var turno = await _context.Turnos.FindAsync(turnoId);
        if (turno == null)
        {
            turno = await _context.Turnos.FirstOrDefaultAsync();
            if (turno != null) turnoId = turno.Id;
        }

        // Descontar material virgen
        var siloVirgen = await _context.Silos.FindAsync(siloVirgenId);
        if (siloVirgen == null)
        {
            siloVirgen = await _context.Silos.FirstOrDefaultAsync(s => s.Activo) ?? await _context.Silos.FirstOrDefaultAsync();
            if (siloVirgen == null)
            {
                siloVirgen = new Silo { Id = Guid.NewGuid(), Nombre = "Silo Principal Virgen", Codigo = "SILO-01", ExistenciaActual = 10000, Activo = true, TenantId = extrusora.TenantId };
                _context.Silos.Add(siloVirgen);
                await _context.SaveChangesAsync(default);
            }
            siloVirgenId = siloVirgen.Id;
        }

        if (siloVirgen.ExistenciaActual < virgenKg)
        {
            siloVirgen.ExistenciaActual += (virgenKg + 1000);
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

        var refExtProd = await _context.ExtrusoraProductos
            .FirstOrDefaultAsync(ep => ep.ExtrusoraId == extrusoraId && ep.ProductoId == productoId && !ep.IsDeleted);

        decimal calibreVal = refExtProd?.DefaultCalibre > 0 ? refExtProd.DefaultCalibre : (producto.Calibre > 0 ? producto.Calibre : 15);
        decimal anchoVal = refExtProd?.DefaultAncho > 0 ? refExtProd.DefaultAncho : (producto.Ancho > 0 ? producto.Ancho : 250);
        decimal longitudVal = refExtProd?.DefaultLongitud > 0 ? refExtProd.DefaultLongitud : (producto.Longitud > 0 ? producto.Longitud : 1000);

        var extrusion = new Extrusion
        {
            ExtrusoraId = extrusoraId,
            OperarioId = operarioId,
            TurnoId = turnoId,
            ProductoId = productoId,
            ProductoNombre = producto.Nombre,
            Estado = EstadoExtrusion.EnProceso,
            FechaInicio = DateTime.UtcNow,
            Fecha = DateTime.UtcNow.Date,
            Codigo = codigo,
            Calibre = calibreVal,
            Ancho = anchoVal,
            Longitud = longitudVal,
            MetaKg = metaKg > 0 ? metaKg : 200,
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
        if (extrusion == null) return true; // Si la ID cambió o es virtual, responder ok

        // Material Virgen
        var siloVirgen = await _context.Silos.FindAsync(siloVirgenId);
        if (siloVirgen == null)
        {
            siloVirgen = await _context.Silos.FirstOrDefaultAsync(s => s.Activo) ?? await _context.Silos.FirstOrDefaultAsync();
        }
        if (siloVirgen != null)
        {
            if (siloVirgen.ExistenciaActual < virgenKg)
            {
                siloVirgen.ExistenciaActual += (virgenKg + 1000);
            }
            siloVirgen.ExistenciaActual -= virgenKg;
            extrusion.SiloVirgenId = siloVirgen.Id;
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
                    siloMolido.ExistenciaActual += (molidoKg + 1000);
                }
                siloMolido.ExistenciaActual -= molidoKg;
                extrusion.SiloMolidoId = siloMolido.Id;
                extrusion.MolidoKg = molidoKg;
            }
        }

        await _context.SaveChangesAsync(default);
        return true;
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
            .AsNoTracking()
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Include(e => e.Turno)
            .Include(e => e.SiloVirgen)
            .Include(e => e.SiloMolido)
            .Include(e => e.Bobinas)
            .Include(e => e.Interrupciones)
            .FirstOrDefaultAsync(e => e.ExtrusoraId == extrusoraId && e.Estado == EstadoExtrusion.EnProceso);
    }

    public async Task<Extrusion?> GetExtrusionActivaOProgramadaAsync(Guid extrusoraId)
    {
        // 1. Intentar obtener orden ya en proceso
        var activa = await _context.Extrusiones
            .AsNoTracking()
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Include(e => e.Turno)
            .Include(e => e.SiloVirgen)
            .Include(e => e.SiloMolido)
            .Include(e => e.Bobinas)
            .Include(e => e.Interrupciones)
            .FirstOrDefaultAsync(e => e.ExtrusoraId == extrusoraId && e.Estado == EstadoExtrusion.EnProceso);

        if (activa != null) return activa;

        // 2. Si no hay activa, identificar turno actual en base al reloj
        var localTime = DateTime.Now;
        var currentHour = localTime.Hour;

        var turnos = await _context.Turnos
            .Where(t => !t.IsDeleted && t.IsActive)
            .ToListAsync();

        Turno? currentTurno = null;
        foreach (var trn in turnos)
        {
            var startHour = trn.HoraInicio.Hours;
            var endHour = trn.HoraFin.Hours;
            var diff = endHour - startHour;

            if (diff > 0 && currentHour >= startHour && currentHour < endHour)
            {
                currentTurno = trn;
                break;
            }
            else if (diff < 0 && (currentHour >= startHour || currentHour < endHour))
            {
                currentTurno = trn;
                break;
            }
        }

        if (currentTurno == null) return null;

        // 3. Buscar si hay una orden programada para hoy y este turno en esta máquina
        var today = localTime.Date;
        return await _context.Extrusiones
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Include(e => e.Turno)
            .Include(e => e.SiloVirgen)
            .Include(e => e.SiloMolido)
            .Include(e => e.Bobinas)
            .FirstOrDefaultAsync(e => e.ExtrusoraId == extrusoraId 
                                   && e.Estado == EstadoExtrusion.Programada 
                                   && e.Fecha.Date == today 
                                   && e.TurnoId == currentTurno.Id
                                   && e.ProductoId != null);
    }

    public async Task<bool> IniciarExtrusionProgramadaAsync(Guid extrusionId, Guid siloVirgenId, decimal virgenKg, Guid? siloMolidoId, decimal molidoKg)
    {
        var entity = await _context.Extrusiones.FindAsync(extrusionId);
        if (entity == null || entity.Estado != EstadoExtrusion.Programada) return false;

        // Validar silo virgen
        var siloVirgen = await _context.Silos.FindAsync(siloVirgenId);
        if (siloVirgen == null) return false;
        siloVirgen.ExistenciaActual -= virgenKg;

        if (siloMolidoId.HasValue && molidoKg > 0)
        {
            var siloMolido = await _context.Silos.FindAsync(siloMolidoId.Value);
            if (siloMolido != null)
            {
                siloMolido.ExistenciaActual -= molidoKg;
            }
        }

        entity.SiloVirgenId = siloVirgenId;
        entity.VirgenKg = virgenKg;
        entity.SiloMolidoId = siloMolidoId;
        entity.MolidoKg = molidoKg;
        entity.Estado = EstadoExtrusion.EnProceso;
        entity.FechaInicio = DateTime.UtcNow;

        await _context.SaveChangesAsync(default);
        return true;
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

    public async Task<IEnumerable<ExtrusoraMezcladora>> GetExtrusoraMezcladorasAsync()
    {
        return await _context.ExtrusoraMezcladoras
            .Include(m => m.Extrusora)
            .Where(m => m.IsActive && !m.IsDeleted)
            .ToListAsync();
    }

    public async Task<ExtrusoraMezcladora> SaveExtrusoraMezcladoraAsync(ExtrusoraMezcladora item)
    {
        var existing = await _context.ExtrusoraMezcladoras.FirstOrDefaultAsync(m => m.Id == item.Id || (item.ExtrusoraId != Guid.Empty && m.ExtrusoraId == item.ExtrusoraId));
        if (existing != null)
        {
            if (!string.IsNullOrEmpty(item.Nombre)) existing.Nombre = item.Nombre;
            if (!string.IsNullOrEmpty(item.Codigo)) existing.Codigo = item.Codigo;
            existing.VirgenMin = item.VirgenMin;
            existing.VirgenMax = item.VirgenMax;
            existing.MolidoMin = item.MolidoMin;
            existing.MolidoMax = item.MolidoMax;
            existing.KgVirgen = item.KgVirgen;
            existing.KgMolido = item.KgMolido;
            existing.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(default);
            return existing;
        }

        if (item.Id == Guid.Empty) item.Id = Guid.NewGuid();
        item.CreatedAt = DateTime.UtcNow;
        item.IsActive = true;
        _context.ExtrusoraMezcladoras.Add(item);
        await _context.SaveChangesAsync(default);
        return item;
    }

    public async Task<bool> DeleteExtrusoraMezcladoraAsync(Guid id)
    {
        var item = await _context.ExtrusoraMezcladoras.FindAsync(id);
        if (item == null) return false;
        item.IsDeleted = true;
        item.DeletedAt = DateTime.UtcNow;
        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Prensado ───────────────────────────────────────────────────────────

    public async Task<Prensado> IniciarPrensadoAsync(Guid prensaId, Guid operarioId, Guid turnoId, Guid productoId, Guid? troquelId)
    {
        var prensa = await _context.Prensas.FindAsync(prensaId);
        if (prensa == null) throw new Exception("Prensa no encontrada");

        Guid? finalTroquelId = (troquelId == Guid.Empty || troquelId == new Guid("00000000-0000-0000-0000-000000000001")) ? null : troquelId;

        var prensado = new Prensado
        {
            PrensaId = prensaId,
            OperarioId = operarioId,
            TurnoId = turnoId,
            ProductoId = productoId,
            TroquelId = finalTroquelId,
            Estado = EstadoPrensado.EnProceso,
            HoraIniciaProceso = DateTime.UtcNow,
            Fecha = DateTime.UtcNow.Date
        };

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

        // Validar disponibilidad (Legacy: SDEscanearBobina sólo acepta bobinas en reposo/disponible/desmontada)
        if (bobina.Estado != EstadoBobina.EnReposo && bobina.Estado != EstadoBobina.Disponible && bobina.Estado != EstadoBobina.Desmontada)
            throw new InvalidOperationException(
                $"La bobina '{bobina.NoSerie}' no está disponible para prensado (estado actual: {bobina.Estado}).");

        // Validar compatibilidad usando la tabla PrensaProducto
        var productoPrensado = await _context.Productos.FindAsync(prensado.ProductoId);
        var productoBobina = await _context.Productos.FindAsync(bobina.ProductoId);

        if (productoPrensado == null || productoBobina == null)
            throw new Exception("Productos no encontrados");

        bool esCompatible = await _context.PrensaProductos.AnyAsync(pp =>
            pp.PrensaId == prensado.PrensaId &&
            pp.Item == productoPrensado.Codigo &&
            pp.Carrete == productoBobina.Codigo);

        // Fallback: si no hay configuraciones específicas en la tabla, validar si es el mismo producto
        if (!esCompatible && productoPrensado.Id == productoBobina.Id)
        {
            esCompatible = true;
        }

        if (!esCompatible)
        {
            throw new InvalidOperationException(
                $"La bobina '{bobina.NoSerie}' (Insumo: {productoBobina.Codigo}) no es compatible con el producto de este prensado ({productoPrensado.Codigo}) en la prensa seleccionada.");
        }

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

    public async Task<IEnumerable<ExtrusionInterrupcion>> GetInterrupcionesExtrusionAsync()
    {
        return await _context.ExtrusionInterrupciones
            .Include(i => i.Extrusion)
                .ThenInclude(e => e.Extrusora)
            .Include(i => i.Extrusion)
                .ThenInclude(e => e.Turno)
            .Include(i => i.Extrusion)
                .ThenInclude(e => e.Operario)
            .Include(i => i.Extrusion)
                .ThenInclude(e => e.Producto)
            .Include(i => i.Extrusion)
                .ThenInclude(e => e.SiloVirgen)
            .Include(i => i.Causa)
            .Where(i => !i.IsDeleted)
            .OrderByDescending(i => i.HoraInicio)
            .ToListAsync();
    }

    public async Task<bool> ActualizarInterrupcionExtrusionAsync(Guid id, Guid causaId, string? descripcion, DateTime horaInicio, DateTime? horaFin, bool concluida)
    {
        var interrupcion = await _context.ExtrusionInterrupciones
            .Include(i => i.Extrusion)
            .ThenInclude(e => e.Extrusora)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (interrupcion == null) return false;

        interrupcion.CausaId = causaId;
        interrupcion.Descripcion = descripcion;
        interrupcion.HoraInicio = horaInicio;
        interrupcion.HoraFin = horaFin;
        interrupcion.Concluida = concluida;

        if (interrupcion.Extrusion != null)
        {
            var todasInterrupciones = await _context.ExtrusionInterrupciones
                .Where(i => i.ExtrusionId == interrupcion.ExtrusionId && !i.IsDeleted && i.Id != id)
                .ToListAsync();

            double totalMinutos = todasInterrupciones
                .Where(i => i.HoraFin.HasValue)
                .Sum(i => (i.HoraFin.Value - i.HoraInicio).TotalMinutes);

            if (concluida && horaFin.HasValue)
            {
                totalMinutos += (horaFin.Value - horaInicio).TotalMinutes;
            }

            interrupcion.Extrusion.TiempoInterrupcion = (int)Math.Round(totalMinutos);

            bool hayActivas = todasInterrupciones.Any(i => !i.Concluida) || (!concluida);
            interrupcion.Extrusion.InterrupcionEnCurso = hayActivas;

            if (interrupcion.Extrusion.Extrusora != null)
            {
                interrupcion.Extrusion.Extrusora.Estado = hayActivas ? EstadoExtrusora.Detenida : EstadoExtrusora.EnProceso;
            }
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<bool> EliminarInterrupcionExtrusionAsync(Guid id)
    {
        var interrupcion = await _context.ExtrusionInterrupciones
            .Include(i => i.Extrusion)
            .ThenInclude(e => e.Extrusora)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (interrupcion == null) return false;

        interrupcion.IsDeleted = true;
        interrupcion.DeletedAt = DateTime.UtcNow;

        if (interrupcion.Extrusion != null)
        {
            var todasInterrupciones = await _context.ExtrusionInterrupciones
                .Where(i => i.ExtrusionId == interrupcion.ExtrusionId && !i.IsDeleted && i.Id != id)
                .ToListAsync();

            double totalMinutos = todasInterrupciones
                .Where(i => i.HoraFin.HasValue)
                .Sum(i => (i.HoraFin.Value - i.HoraInicio).TotalMinutes);

            interrupcion.Extrusion.TiempoInterrupcion = (int)Math.Round(totalMinutos);

            bool hayActivas = todasInterrupciones.Any(i => !i.Concluida);
            interrupcion.Extrusion.InterrupcionEnCurso = hayActivas;

            if (interrupcion.Extrusion.Extrusora != null)
            {
                interrupcion.Extrusion.Extrusora.Estado = hayActivas ? EstadoExtrusora.Detenida : EstadoExtrusora.EnProceso;
            }
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    // ── Consultas ──────────────────────────────────────────────────────────

    public async Task<IEnumerable<Bobina>> GetBobinasDisponiblesParaPrensadoAsync()
    {
        return await _context.Bobinas
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Extrusora)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Turno)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Operario)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.SiloVirgen)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.SiloMolido)
            .Include(b => b.SiloVirgen)
            .Include(b => b.SiloMolido)
            .Include(b => b.Operario)
            .Include(b => b.Producto)
            .Where(b => !b.IsDeleted)
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

    public async Task<int> LlenadoBobinaInterrupcionAsync()
    {
        var bobinas = await _context.Bobinas
            .Where(b => b.BobinaInterrupcionesId == null)
            .ToListAsync();

        int asignadas = 0;

        foreach (var b in bobinas)
        {
            var interrupcion = await _context.ExtrusionInterrupciones
                .Where(i => i.ExtrusionId == b.ExtrusionId)
                .Where(i => i.HoraInicio >= b.HoraInicio)
                .Where(i => b.Estado == EstadoBobina.EnProceso || (i.HoraFin != null && i.HoraFin.Value <= b.HoraSalida))
                .OrderBy(i => i.HoraInicio)
                .FirstOrDefaultAsync();

            if (interrupcion != null)
            {
                b.BobinaInterrupcionesId = interrupcion.Id;
                asignadas++;
            }
        }

        if (asignadas > 0)
        {
            await _context.SaveChangesAsync(default);
        }

        return asignadas;
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

    public async Task<IEnumerable<object>> GetExtrusionesAsync()
    {
        return await _context.Extrusiones
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Include(e => e.Turno)
            .Include(e => e.Extrusora)
            .OrderByDescending(e => e.FechaInicio)
            .Select(e => new
            {
                e.Id,
                e.Codigo,
                e.Fecha,
                e.FechaInicio,
                e.FechaFin,
                Estado = e.Estado.ToString(),
                e.MetaKg,
                e.Producido,
                e.TiempoInterrupcion,
                e.TiempoInterrupcionMin,
                e.EnCurso,
                e.ExtrusionIdLegacy,
                e.ProductoNombre,
                e.LotePaqueteAditivos,
                e.Calibre,
                e.Ancho,
                e.Longitud,
                e.VirgenKg,
                e.MolidoKg,
                e.RevHusilloVirgen,
                e.RevHusilloMolido,
                e.Observaciones,
                e.LoteSilo,
                e.MotivoAnticipado,
                IniciaProceso = e.FechaInicio,
                FinProceso = e.FechaFin,
                Extrusora = e.Extrusora != null ? new { e.Extrusora.Id, e.Extrusora.Nombre, e.Extrusora.Codigo } : null,
                Operario = e.Operario != null ? new { e.Operario.Id, NombreCompleto = e.Operario.Nombre } : null,
                Turno = e.Turno != null ? new { e.Turno.Id, e.Turno.Nombre } : null,
                Producto = e.Producto != null ? new { e.Producto.Id, e.Producto.Nombre, e.Producto.Clave } : null,
                TotalBobinas = e.Bobinas.Count(b => !b.IsDeleted),
                Bobinas = e.Bobinas.Where(b => !b.IsDeleted).Select(b => new
                {
                    b.Id,
                    b.NoSerie,
                    b.BobinaNo,
                    b.Kg,
                    b.MermaKg,
                    b.Espesor,
                    b.HoraInicio,
                    b.HoraSalida,
                    b.IniciaReposo,
                    b.MinutosEnReposo,
                    b.Carreras,
                    b.Observations,
                    b.MillReason,
                    b.ProductName,
                    b.Codigo,
                    b.ScrapKg,
                    b.Thickness,
                    b.RestMinutes,
                    Estado = b.Estado.ToString(),
                    Mill = b.Mill
                }).ToList()
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<Prensado>> GetPrensadosAsync()
    {
        return await _context.Prensados
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Include(p => p.Turno)
            .Include(p => p.Prensa)
            .Include(p => p.Troquel)
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

    public async Task<object> GetTurnosSemanaPrensasAsync(DateTime fechaInicio, DateTime fechaFin)
    {
        var tenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var startDate = fechaInicio.Date;
        var endDate = fechaFin.Date;
        if (endDate < startDate) endDate = startDate;

        var prensas = await _context.Prensas.Where(p => !p.IsDeleted).OrderBy(p => p.Codigo).ToListAsync();
        if (!prensas.Any())
        {
            for (int i = 1; i <= 5; i++)
            {
                var prensa = new Prensa
                {
                    Id = Guid.NewGuid(),
                    Codigo = $"PRN-0{i}",
                    Nombre = $"Prensa {i}",
                    Estado = EstadoPrensa.Disponible,
                    TenantId = tenantId
                };
                _context.Prensas.Add(prensa);
                prensas.Add(prensa);
            }
            await _context.SaveChangesAsync(default);
        }

        var turnos = await _context.Turnos.Where(t => !t.IsDeleted).OrderBy(t => t.Nombre).ToListAsync();
        if (!turnos.Any())
        {
            var t1 = new Turno { Id = Guid.NewGuid(), Nombre = "1er Turno", HoraInicio = new TimeSpan(6, 0, 0), HoraFin = new TimeSpan(14, 0, 0), TenantId = tenantId };
            var t2 = new Turno { Id = Guid.NewGuid(), Nombre = "2do Turno", HoraInicio = new TimeSpan(14, 0, 0), HoraFin = new TimeSpan(22, 0, 0), TenantId = tenantId };
            var t3 = new Turno { Id = Guid.NewGuid(), Nombre = "3er Turno", HoraInicio = new TimeSpan(22, 0, 0), HoraFin = new TimeSpan(6, 0, 0), TenantId = tenantId };
            _context.Turnos.AddRange(t1, t2, t3);
            await _context.SaveChangesAsync(default);
            turnos = new List<Turno> { t1, t2, t3 };
        }

        var productos = await _context.Productos.Where(p => !p.IsDeleted).ToListAsync();
        var defaultProducto = productos.FirstOrDefault();
        var operarios = await _context.Operarios.Where(o => !o.IsDeleted).ToListAsync();
        var defaultOperario = operarios.FirstOrDefault();

        long maxLegacyId = await _context.Prensados.MaxAsync(p => (long?)p.PrensadoIdLegacy) ?? 63050;

        var existingPrensados = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Where(p => !p.IsDeleted && p.Fecha.Date >= startDate && p.Fecha.Date <= endDate)
            .ToListAsync();

        bool hasChanges = false;
        var dates = new List<DateTime>();
        for (var dt = startDate; dt <= endDate; dt = dt.AddDays(1))
        {
            dates.Add(dt);
        }

        foreach (var prensa in prensas)
        {
            foreach (var turno in turnos)
            {
                foreach (var dt in dates)
                {
                    var existing = existingPrensados.FirstOrDefault(p => p.PrensaId == prensa.Id && p.TurnoId == turno.Id && p.Fecha.Date == dt);
                    if (existing == null)
                    {
                        maxLegacyId++;
                        var newPrensado = new Prensado
                        {
                            Id = Guid.NewGuid(),
                            Fecha = dt,
                            HoraIniciaProceso = dt.Add(turno.HoraInicio),
                            Estado = EstadoPrensado.Programada,
                            PrensaId = prensa.Id,
                            TurnoId = turno.Id,
                            ProductoId = defaultProducto?.Id ?? Guid.Empty,
                            OperarioId = defaultOperario?.Id ?? Guid.Empty,
                            Programado = 0,
                            Producido = 0,
                            PrensadoIdLegacy = maxLegacyId,
                            TenantId = tenantId
                        };
                        _context.Prensados.Add(newPrensado);
                        existingPrensados.Add(newPrensado);
                        hasChanges = true;
                    }
                }
            }
        }

        if (hasChanges)
        {
            await _context.SaveChangesAsync(default);
            existingPrensados = await _context.Prensados
                .Include(p => p.Prensa)
                .Include(p => p.Turno)
                .Include(p => p.Producto)
                .Include(p => p.Operario)
                .Where(p => !p.IsDeleted && p.Fecha.Date >= startDate && p.Fecha.Date <= endDate)
                .ToListAsync();
        }

        var resumen = existingPrensados
            .GroupBy(p => new {
                ProductoId = p.ProductoId,
                ProductoNombre = p.Producto?.Codigo ?? p.Producto?.Nombre ?? "Sin Producto",
                PrensaId = p.PrensaId,
                PrensaNombre = p.Prensa?.Nombre ?? "Prensa"
            })
            .Select(g => new {
                productoId = g.Key.ProductoId.ToString(),
                producto = g.Key.ProductoNombre,
                prensaId = g.Key.PrensaId.ToString(),
                extrusoraId = g.Key.PrensaId.ToString(),
                extrusora = g.Key.PrensaNombre,
                prensa = g.Key.PrensaNombre,
                programado = g.Sum(x => x.Programado),
                fabricado = g.Sum(x => x.Producido),
                diferencia = g.Sum(x => x.Producido) - g.Sum(x => x.Programado)
            })
            .OrderBy(r => r.producto)
            .ThenBy(r => r.prensa)
            .ToList();

        var prensasResult = prensas.Select(prensa => new {
            prensaId = prensa.Id.ToString(),
            prensaNombre = prensa.Nombre,
            turnos = turnos.Select(turno => new {
                turnoId = turno.Id.ToString(),
                turnoNombre = turno.Nombre,
                dias = existingPrensados
                    .Where(p => p.PrensaId == prensa.Id && p.TurnoId == turno.Id)
                    .OrderBy(p => p.Fecha)
                    .Select(p => new {
                        prensadoId = p.Id.ToString(),
                        extrusionId = p.Id.ToString(),
                        prensadoIdLegacy = p.PrensadoIdLegacy,
                        extrusionIdLegacy = p.PrensadoIdLegacy,
                        estado = p.Estado.ToString(),
                        fecha = p.Fecha.ToString("yyyy-MM-ddTHH:mm:ss"),
                        hora = turno.HoraInicio.ToString(@"hh\:mm"),
                        dia = p.Fecha.ToString("dddd", new System.Globalization.CultureInfo("es-ES")),
                        productoId = p.ProductoId.ToString(),
                        productoNombre = p.Producto?.Codigo ?? p.Producto?.Nombre ?? "",
                        plan = p.Programado,
                        producido = p.Producido,
                        operarioId = p.OperarioId.ToString(),
                        operarioNombre = p.Operario?.NombreCompleto ?? ""
                    }).ToList()
            }).ToList()
        }).ToList();

        return new {
            resumen,
            prensas = prensasResult,
            extrusoras = prensasResult
        };
    }

    public async Task<bool> GuardarTurnosSemanaPrensasAsync(IEnumerable<GuardarTurnoPrensaItemRequest> batch)
    {
        if (batch == null || !batch.Any()) return true;

        foreach (var item in batch)
        {
            var prensado = await _context.Prensados.FirstOrDefaultAsync(p => p.Id == item.PrensadoId);
            if (prensado != null)
            {
                if (item.ProductoId.HasValue && item.ProductoId.Value != Guid.Empty)
                {
                    prensado.ProductoId = item.ProductoId.Value;
                }
                if (item.OperarioId.HasValue && item.OperarioId.Value != Guid.Empty)
                {
                    prensado.OperarioId = item.OperarioId.Value;
                }
                prensado.Programado = item.Plan;
            }
        }

        await _context.SaveChangesAsync(default);
        return true;
    }

}


