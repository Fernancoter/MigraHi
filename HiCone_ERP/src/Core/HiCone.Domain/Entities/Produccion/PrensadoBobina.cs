using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Relación entre un Prensado y las Bobinas consumidas en él.
/// Equivale a PrensadoBobina del legado.
/// </summary>
public class PrensadoBobina : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public virtual Prensado Prensado { get; set; } = null!;

    public Guid BobinaId { get; set; }
    public virtual Bobina Bobina { get; set; } = null!;

    public int CantCarreras { get; set; } = 0;              // Carreras procesadas con esta bobina
    public bool Activa { get; set; } = true;                // Si es la bobina actualmente en uso
    public DateTime HoraInicio { get; set; } = DateTime.UtcNow;
    public DateTime? HoraFin { get; set; }
}
