using HiCone.Domain.Entities.Calidad;
using HiCone.Domain.Enums;

namespace HiCone.Application.Interfaces;

public interface ICalidadService
{
    // ── Gestión de Reclamos ──────────────────────────────────────────────
    Task<Reclamo> AbrirReclamoAsync(string cliente, string orderDoc, string descripcion);
    Task<bool> AgregarDetalleReclamoAsync(Guid reclamoId, string noSerieCarrete, TipoDefecto defecto, string observacion);
    Task<bool> ResolverReclamoAsync(Guid reclamoId, string accionCorrectiva, string resueltoPor);
    
    // ── Inspecciones y Bloqueos ──────────────────────────────────────────
    Task<bool> MarcarCarreteDefectuosoAsync(string noSerieCarrete, TipoDefecto tipo, string descripcion);
    Task<IEnumerable<Reclamo>> GetReclamosActivosAsync();
    
    // ── Trazabilidad ──────────────────────────────────────────────────────
    Task<object?> GetTrazabilidadCarreteAsync(string noSerieCarrete);
}
