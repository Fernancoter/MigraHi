using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Productos habilitados para una prensa.
/// </summary>
public class PrensaProducto : TenantEntity
{
    public Guid PrensaId { get; set; }
    public virtual Prensa Prensa { get; set; } = null!;

    public Guid ProductoId { get; set; }
    public virtual Producto Producto { get; set; } = null!;

    // Defaults para esta combinación prensa+producto
    public decimal DefaultLevasKgEntrada { get; set; }
    public decimal DefaultLevasKgSalida { get; set; }
    public decimal DefaultLevasGradosEntrada { get; set; }
    public decimal DefaultLevasGradosSalida { get; set; }
    public decimal DefaultRodillosKgEntrada { get; set; }
    public decimal DefaultRodillosKgSalida { get; set; }
    public decimal DefaultRodillosGradosEntrada { get; set; }
    public decimal DefaultRodillosGradosSalida { get; set; }
    public decimal DefaultMetaPallets { get; set; }
    public bool IsActive { get; set; } = true;
}
