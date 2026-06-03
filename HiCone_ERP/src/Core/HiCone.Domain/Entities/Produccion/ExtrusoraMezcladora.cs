using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Mezcladora asociada a una extrusora.
/// Equivale a ExtrusoraMezcladora del legado.
/// </summary>
public class ExtrusoraMezcladora : TenantEntity
{
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;

    public string Nombre { get; set; } = null!;
    public string? Codigo { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Observaciones { get; set; }
}
