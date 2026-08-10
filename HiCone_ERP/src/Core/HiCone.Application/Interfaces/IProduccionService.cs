using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;

namespace HiCone.Application.Interfaces;

public interface IProduccionService
{
    // ── Extrusión ─────────────────────────────────────────────────────────
    Task<Extrusion> IniciarExtrusionAsync(
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
        string? observaciones);

    Task<bool> FinalizarExtrusionAsync(Guid extrusionId, string? motivoAnticipado = null);
    Task<bool> RegistrarConsumoExtrusionAsync(Guid extrusionId, Guid siloVirgenId, decimal virgenKg, Guid? siloMolidoId, decimal molidoKg);
    
    Task<Bobina> GuardarBobinaAsync(
        Guid extrusionId, 
        int bobinaNo, 
        string origen, 
        decimal peso, 
        decimal calibre, 
        decimal desviacion, 
        ColorEstacion color, 
        decimal mermaKg, 
        MotivoMolino motivo, 
        string? observaciones);

    Task<Extrusion?> GetExtrusionActivaAsync(Guid extrusoraId);
    Task<int> ObtenerSiguienteBobinaNoAsync(Guid extrusoraId, Guid productoId);

    Task<IEnumerable<Operario>> GetOperariosAsync();
    Task<IEnumerable<Producto>> GetProductosAsync();
    Task<IEnumerable<Turno>> GetTurnosAsync();
    
    // ── Prensado (Carreras y Carretes) ─────────────────────────────────────
    Task<Prensado> IniciarPrensadoAsync(Guid prensaId, Guid operarioId, Guid turnoId, Guid productoId, Guid troquelId);
    Task<bool> MontarBobinaEnPrensadoAsync(Guid prensadoId, Guid bobinaId);
    Task<Carrera> IniciarCarreraAsync(Guid prensadoId);
    Task<bool> FinalizarCarreraAsync(Guid carreraId);
    Task<bool> RegistrarDefectoCarreteAsync(Guid carreteId, TipoDefecto tipo, string descripcion);
    
    // ── Pallets ────────────────────────────────────────────────────────────
    Task<Palet> CrearPaletAsync(Guid productoId, Guid operarioId, Guid prensaId);
    Task<bool> AgregarCarreteAPaletAsync(Guid paletId, Guid carreteId);
    Task<bool> FinalizarPaletAsync(Guid paletId);

    // ── Interrupciones (Downtime) ──────────────────────────────────────────
    Task<ExtrusionInterrupcion> RegistrarInterrupcionExtrusionAsync(Guid extrusionId, Guid causaId, string? descripcion);
    Task<bool> FinalizarInterrupcionExtrusionAsync(Guid interrupcionId);
    Task<bool> FinalizarInterrupcionExtrusionActivaAsync(Guid extrusionId);
    Task<PrensadoInterrupcion> RegistrarInterrupcionPrensadoAsync(Guid prensadoId, Guid causaId, string? descripcion);
    Task<bool> FinalizarInterrupcionPrensadoAsync(Guid interrupcionId);
    Task<bool> FinalizarInterrupcionPrensadoActivaAsync(Guid prensadoId);
    Task<IEnumerable<ExtrusionInterrupcion>> GetInterrupcionesExtrusionAsync();
    Task<bool> ActualizarInterrupcionExtrusionAsync(Guid id, Guid causaId, string? descripcion, DateTime horaInicio, DateTime? horaFin, bool concluida);
    Task<bool> EliminarInterrupcionExtrusionAsync(Guid id);

    // ── Gestión de Bobinas (Legacy: SetEstadoBobina, ValidarBobina, SDPausarBobinas, SDRechazarBobina) ──
    Task<bool> PausarBobinaAsync(Guid bobinaId);
    Task<bool> RechazarBobinaAsync(Guid bobinaId, MotivoMolino motivo, string? observaciones);
    Task<bool> ValidarBobinaAsync(Guid bobinaId);
    Task<bool> TransferirBobinaAsync(Guid bobinaId, Guid extrusionDestinoId);

    // ── Recalibración (Legacy: SDRecalibrarExtrusion) ──
    Task<bool> RecalibrarExtrusionAsync(Guid extrusionId, decimal? calibre, decimal? ancho, decimal? longitud);

    // ── Resultado y KPIs (Legacy: ObtenerExtrusionResultado) ──
    Task<ExtrusionResultado?> GetExtrusionResultadoAsync(Guid extrusionId);

    // ── Consultas ──────────────────────────────────────────────────────────
    Task<IEnumerable<Bobina>> GetBobinasDisponiblesParaPrensadoAsync();
    Task<IEnumerable<Bobina>> GetBobinasByExtrusionAsync(Guid extrusionId);
    Task<IEnumerable<Extrusora>> GetEstadoExtrusorasAsync();
    Task<IEnumerable<Prensa>> GetEstadoPrensasAsync();
    Task<IEnumerable<CausaInterrupcion>> GetCausasInterrupcionAsync();
    Task<Turno?> GetTurnoActivoAsync();
    Task<IEnumerable<Extrusion>> GetHistorialExtrusionesAsync(DateTime? desde, DateTime? hasta, Guid? extrusoraId, Guid? productoId);
    Task<IEnumerable<object>> GetExtrusionesAsync();
    Task<IEnumerable<Prensado>> GetPrensadosAsync();
    Task<IEnumerable<ExtrusoraProducto>> GetExtrusoraProductosAsync();

    // ── Turnos Por Semana Prensas ──────────────────────────────────────────
    Task<object> GetTurnosSemanaPrensasAsync(DateTime fechaInicio, DateTime fechaFin);
    Task<bool> GuardarTurnosSemanaPrensasAsync(IEnumerable<GuardarTurnoPrensaItemRequest> batch);
}

public record GuardarTurnoPrensaItemRequest(Guid PrensadoId, Guid? ProductoId, Guid? OperarioId, decimal Plan);

