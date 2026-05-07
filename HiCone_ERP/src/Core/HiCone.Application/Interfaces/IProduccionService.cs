using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;

namespace HiCone.Application.Interfaces;

public interface IProduccionService
{
    // ── Extrusión ─────────────────────────────────────────────────────────
    Task<Extrusion> IniciarExtrusionAsync(Guid extrusoraId, Guid operarioId, Guid turnoId, Guid productoId);
    Task<bool> FinalizarExtrusionAsync(Guid extrusionId, string? motivoAnticipado = null);
    Task<bool> RegistrarConsumoExtrusionAsync(Guid extrusionId, Guid siloVirgenId, decimal virgenKg, Guid? siloMolidoId, decimal molidoKg);
    Task<Bobina> registrarBobinaAsync(Guid extrusionId, int bobinaNo, decimal peso, decimal calibre, decimal ancho, ColorEstacion color);
    
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
    Task<PrensadoInterrupcion> RegistrarInterrupcionPrensadoAsync(Guid prensadoId, Guid causaId, string? descripcion);
    Task<bool> FinalizarInterrupcionPrensadoAsync(Guid interrupcionId);

    // ── Consultas ──────────────────────────────────────────────────────────
    Task<IEnumerable<Bobina>> GetBobinasDisponiblesParaPrensadoAsync();
    Task<IEnumerable<Extrusora>> GetEstadoExtrusorasAsync();
    Task<IEnumerable<Prensa>> GetEstadoPrensasAsync();
    Task<IEnumerable<CausaInterrupcion>> GetCausasInterrupcionAsync();
}
