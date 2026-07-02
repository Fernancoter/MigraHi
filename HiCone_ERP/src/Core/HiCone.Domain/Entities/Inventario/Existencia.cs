using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Inventario;

public class Existencia : TenantEntity
{
    public DateTime FechaHora { get; set; } = DateTime.UtcNow;
    public string Usuario { get; set; } = null!;
    public string Estado { get; set; } = "Abierto"; // Abierto, Cerrado
    public string? Observaciones { get; set; }

    public virtual ICollection<ExistenciaSilo> Silos { get; set; } = new List<ExistenciaSilo>();
    public virtual ICollection<ExistenciaProducto> Productos { get; set; } = new List<ExistenciaProducto>();
}

public class ExistenciaProducto : TenantEntity
{
    public Guid ExistenciaId { get; set; }
    public virtual Existencia Existencia { get; set; } = null!;

    public Guid ProductoId { get; set; }
    public virtual Produccion.Producto Producto { get; set; } = null!;

    public decimal CantidadReal { get; set; }
    public decimal CantidadSistema { get; set; }
    
    public decimal ProducidoEnTurno { get; set; }
    public decimal EnTurnoSegunSistema { get; set; }
}
