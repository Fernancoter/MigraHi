using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Categorías de productos.
/// Equivale a ProductoCategoria del legado.
/// </summary>
public class ProductoCategoria : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public string? ClaveExterna { get; set; }                // Clave en SAE
    public bool IsActive { get; set; } = true;

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
