using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class Interrupcion : TenantEntity
{
    public DateTime HoraInicio { get; set; } = DateTime.UtcNow;
    public DateTime? HoraFin { get; set; }
    public string? Motivo { get; set; } // Falla Mecánica, Falta de Material, Cambio de Turno, etc.
    public string? Descripcion { get; set; }
    public bool Concluida { get; set; } = false;

    public Guid ExtrusionId { get; set; }
    public virtual Extrusion Extrusion { get; set; } = null!;
    
    public double? DuracionMinutos => HoraFin.HasValue ? (HoraFin.Value - HoraInicio).TotalMinutes : null;
}
