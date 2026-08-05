using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Producto terminado: relaciona el producto HiCone con el número de producto SAE.
/// Los pallets de embarque referencian ProductoTerminado para validar contra remisiones.
/// </summary>
public class ProductoTerminado : TenantEntity
{
    public string Nombre { get; set; } = null!;              // TerminadoProductoNombre (= ProductNumber SAE)
    public string? Descripcion { get; set; }

    public Guid? ProductoId { get; set; }
    public virtual Producto? Producto { get; set; }

    public bool IsActive { get; set; } = true;

    public virtual ICollection<Palet> Palets { get; set; } = new List<Palet>();
}
