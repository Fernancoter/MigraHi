using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Relación muchos-a-muchos entre Palet y Carrete.
/// Registra qué carretes forman parte de un palet.
/// </summary>
public class PaletCarrete : TenantEntity
{
    public Guid PaletId { get; set; }
    public virtual Palet Palet { get; set; } = null!;

    public Guid CarreteId { get; set; }
    public virtual Carrete Carrete { get; set; } = null!;

    public DateTime FechaEnsamble { get; set; } = DateTime.UtcNow;
    public int PosicionEnPalet { get; set; }                 // Orden dentro del palet
}
