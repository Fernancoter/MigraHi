using HiCone.Domain.Common;
using HiCone.Domain.Entities.Produccion;

namespace HiCone.Domain.Entities.Logistica;

/// <summary>
/// Línea de detalle de un embarque: un producto con su cantidad requerida de pallets.
/// Equivale a EmbarqueDetalle del legado GeneXus.
/// </summary>
public class EmbarqueDetalle : TenantEntity
{
    public Guid EmbarqueId { get; set; }
    public virtual Embarque Embarque { get; set; } = null!;

    // Producto de la remisión SAE
    public string? ProductoSAE { get; set; }                 // ProductNumber de SAE
    public int CantidadPalletsRequerida { get; set; }
    public int CantidadPalletsEscaneados { get; set; }

    // Vinculación al catálogo interno
    public Guid? ProductoTerminadoId { get; set; }
    public virtual ProductoTerminado? ProductoTerminado { get; set; }

    public Guid? ProductoId { get; set; }
    public virtual Producto? Producto { get; set; }

    public bool ConfirmadoPorAdministracion { get; set; } = false;
    public bool Validado { get; set; } = false;
    public DateTime? FechaValidacion { get; set; }
}
