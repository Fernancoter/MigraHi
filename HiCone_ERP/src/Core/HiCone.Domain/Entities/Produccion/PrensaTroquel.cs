using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Historial de troqueles usados en una prensa (cuándo estuvo calibrado).
/// </summary>
public class PrensaTroquel : TenantEntity
{
    public Guid PrensaId { get; set; }
    public virtual Prensa Prensa { get; set; } = null!;

    public Guid TroquelId { get; set; }
    public virtual Troquel Troquel { get; set; } = null!;

    public DateTime FechaAsignacion { get; set; } = DateTime.UtcNow;
    public DateTime? FechaDesasignacion { get; set; }
    public bool Activo { get; set; } = true;

    public string? Observaciones { get; set; }
}
