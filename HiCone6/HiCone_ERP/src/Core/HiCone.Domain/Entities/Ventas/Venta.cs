using HiCone.Domain.Common;
using HiCone.Domain.Entities.Clientes;
using HiCone.Domain.Entities.Inventario;

namespace HiCone.Domain.Entities.Ventas;

public class Venta : TenantEntity
{
    public string Folio { get; set; } = null!; // VE_FOL_VEN
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    
    public Guid ClienteId { get; set; }
    public virtual Cliente Cliente { get; set; } = null!;
    
    public decimal Subtotal { get; set; }
    public decimal Impuesto { get; set; }
    public decimal Total { get; set; } // VE_TOT_VEN
    
    public string? Observaciones { get; set; }
    
    public virtual ICollection<VentaDetalle> Detalles { get; set; } = new List<VentaDetalle>();
}

public class VentaDetalle : TenantEntity
{
    public Guid VentaId { get; set; }
    public virtual Venta Venta { get; set; } = null!;
    
    public Guid ArticuloId { get; set; }
    public virtual Articulo Articulo { get; set; } = null!;
    
    public decimal Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal Importe { get; set; }
}
