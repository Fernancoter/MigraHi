using HiCone.Application.Produccion;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Common;
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

    Task<bool> FinalizarExtrusionAsync(Guid extrusionId, string? motivoAnticipado = null, Guid? nextExtrusionId = null);
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

    // ── Gestión de Bobinas (Legacy: SetEstadoBobina, ValidarBobina, SDPausarBobinas, SDRechazarBobina) ──
    Task<bool> PausarBobinaAsync(Guid bobinaId);
    Task<bool> RechazarBobinaAsync(Guid bobinaId, MotivoMolino motivo, string? observaciones);
    Task<bool> ValidarBobinaAsync(Guid bobinaId);
    Task<bool> TransferirBobinaAsync(Guid bobinaId, Guid extrusionDestinoId);

    // ── Nuevas Funcionalidades (Exportar, Interrupción, Impresión Múltiple, Eliminadas) ──
    /// <summary>Exporta el listado filtrado de bobinas a Excel (.xlsx) con ClosedXML.</summary>
    Task<byte[]> ExportarBobinasAsync(BobinaFiltrosDto filtros);
    Task<int> LlenadoBobinaInterrupcionAsync();
    /// <summary>Genera un PDF con etiquetas Code 128 (QuestPDF+BarcodeLib) para cada número de serie recibido.</summary>
    Task<byte[]> ImprimirMultipleBobinasAsync(List<string> noSeries);
    Task<IEnumerable<AuditLog>> GetBobinasEliminadasAsync();

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
    Task<IEnumerable<Extrusion>> GetExtrusionesAsync();
    Task<IEnumerable<Prensado>> GetPrensadosAsync();
    Task<IEnumerable<ExtrusoraProducto>> GetExtrusoraProductosAsync();
    Task<ExtrusoraProducto?> GetExtrusoraProductoByIdAsync(Guid id);
    Task<ExtrusoraProducto> CreateExtrusoraProductoAsync(ExtrusoraProducto entity);
    Task<ExtrusoraProducto> UpdateExtrusoraProductoAsync(ExtrusoraProducto entity);
    Task<bool> DeleteExtrusoraProductoAsync(Guid id);

    // ── Turnos por Semana ──────────────────────────────────────────────────
    Task<TurnosSemanaResponseDto> GetTurnosSemanaAsync(DateTime startDate, DateTime endDate);
    Task<bool> GuardarTurnosSemanaAsync(List<GuardarTurnoSemanaDiaDto> batch);
}

public class TurnoSemanaDiaDto
{
    public Guid ExtrusionId { get; set; }
    public string ExtrusionIdLegacy { get; set; } = string.Empty;
    public DateTime Fecha { get; set; }
    public string Dia { get; set; } = string.Empty;
    public string Hora { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public Guid? ProductoId { get; set; }
    public string ProductoNombre { get; set; } = string.Empty;
    public Guid OperarioId { get; set; }
    public string OperarioNombre { get; set; } = string.Empty;
    public decimal Plan { get; set; }
    public decimal Producido { get; set; }
}

public class TurnoSemanaShiftDto
{
    public Guid TurnoId { get; set; }
    public string TurnoNombre { get; set; } = string.Empty;
    public List<TurnoSemanaDiaDto> Dias { get; set; } = new();
}

public class TurnoSemanaExtrusoraDto
{
    public Guid ExtrusoraId { get; set; }
    public string ExtrusoraNombre { get; set; } = string.Empty;
    public List<TurnoSemanaShiftDto> Turnos { get; set; } = new();
}

public class ResumenTurnoSemanaDto
{
    public string Producto { get; set; } = string.Empty;
    public string Extrusora { get; set; } = string.Empty;
    public decimal Programado { get; set; }
    public decimal Fabricado { get; set; }
    public decimal Diferencia { get; set; }
}

public class TurnosSemanaResponseDto
{
    public List<TurnoSemanaExtrusoraDto> Extrusoras { get; set; } = new();
    public List<ResumenTurnoSemanaDto> Resumen { get; set; } = new();
}

public class GuardarTurnoSemanaDiaDto
{
    public Guid ExtrusionId { get; set; }
    public Guid? ProductoId { get; set; }
    public Guid OperarioId { get; set; }
    public decimal Plan { get; set; }
}
