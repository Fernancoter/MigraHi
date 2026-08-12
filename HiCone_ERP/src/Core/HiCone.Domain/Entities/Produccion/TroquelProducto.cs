using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Compatibilidad entre un troquel y un producto — equivalente a DB.Troquel.Producto
/// (nivel subordinado de la transacción Troquel) en el legado GeneXus.
/// </summary>
public class TroquelProducto : TenantEntity
{
    public Guid TroquelId { get; set; }
    public virtual Troquel Troquel { get; set; } = null!;

    public Guid ProductoId { get; set; }
    public virtual Producto Producto { get; set; } = null!;
}
