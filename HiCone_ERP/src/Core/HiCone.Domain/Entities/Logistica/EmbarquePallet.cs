using HiCone.Domain.Common;
using HiCone.Domain.Entities.Produccion;

namespace HiCone.Domain.Entities.Logistica;

/// <summary>
/// Pallets físicamente asignados a un embarque.
/// Equivale a EmbarquePallet del legado GeneXus.
/// </summary>
public class EmbarquePallet : TenantEntity
{
    public Guid EmbarqueId { get; set; }
    public virtual Embarque Embarque { get; set; } = null!;

    public Guid PaletId { get; set; }
    public virtual Palet Palet { get; set; } = null!;

    // Detalle al que pertenece este pallet dentro del embarque
    public Guid? EmbarqueDetalleId { get; set; }
    public virtual EmbarqueDetalle? EmbarqueDetalle { get; set; }

    public DateTime FechaEscaneo { get; set; } = DateTime.UtcNow;
    public bool Validado { get; set; } = false;
    public string? EscaneadoPor { get; set; }
}
