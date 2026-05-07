using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Interrupción ocurrida durante una EXTRUSIÓN.
/// Separada de Interrupcion genérica para mayor claridad.
/// </summary>
public class ExtrusionInterrupcion : TenantEntity
{
    public Guid ExtrusionId { get; set; }
    public virtual Extrusion Extrusion { get; set; } = null!;

    public Guid? CausaId { get; set; }
    public virtual CausaInterrupcion? Causa { get; set; }

    public DateTime HoraInicio { get; set; } = DateTime.UtcNow;
    public DateTime? HoraFin { get; set; }
    public bool Concluida { get; set; } = false;
    public string? Descripcion { get; set; }
    public string? Observaciones { get; set; }

    // Calculado en lectura
    public double? DuracionMinutos =>
        HoraFin.HasValue ? (HoraFin.Value - HoraInicio).TotalMinutes : null;
}
