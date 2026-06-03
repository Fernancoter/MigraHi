using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Productos habilitados para una extrusora con sus valores predeterminados.
/// Equivale a gestionarExtrusoraProducto del legado.
/// </summary>
public class ExtrusoraProducto : TenantEntity
{
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;

    public Guid ProductoId { get; set; }
    public virtual Producto Producto { get; set; } = null!;

    // Valores predeterminados para esta combinación extrusora+producto
    public decimal DefaultCalibre { get; set; }
    public decimal DefaultAncho { get; set; }
    public decimal DefaultLongitud { get; set; }
    public decimal DefaultVirgenKg { get; set; }
    public decimal DefaultMolidoKg { get; set; }
    public decimal DefaultRevHusilloVirgen { get; set; }
    public decimal DefaultRevHusilloMolido { get; set; }
    public decimal DefaultMetaKg { get; set; }
    public int DefaultMinutosReposo { get; set; } = 60;
    public bool IsActive { get; set; } = true;
}
