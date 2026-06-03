using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Interrupción ocurrida durante un PRENSADO.
/// </summary>
public class PrensadoInterrupcion : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public virtual Prensado Prensado { get; set; } = null!;

    public Guid? CausaId { get; set; }
    public virtual CausaInterrupcion? Causa { get; set; }

    public DateTime HoraInicio { get; set; } = DateTime.UtcNow;
    public DateTime? HoraFin { get; set; }
    public bool Concluida { get; set; } = false;
    public string? Descripcion { get; set; }

    public double? DuracionMinutos =>
        HoraFin.HasValue ? (HoraFin.Value - HoraInicio).TotalMinutes : null;
}
