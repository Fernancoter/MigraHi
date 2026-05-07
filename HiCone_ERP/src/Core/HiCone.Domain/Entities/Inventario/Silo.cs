using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Inventario;

public class Silo : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public string Codigo { get; set; } = null!;
    public decimal CapacidadMaxima { get; set; } // SiloCapacidad
    public decimal ExistenciaActual { get; set; }
    
    // Legacy Fields
    public decimal KgMinimo { get; set; }
    public decimal KgMaximo { get; set; }
    public string? EstadoMaterial { get; set; } // Virgen, Molido, etc.
    public string? TipoMaterial { get; set; }   // HDPE, PP, etc.
    public bool Activo { get; set; } = true;

    public Guid? ArticuloId { get; set; }
    public virtual Articulo? Articulo { get; set; }

    public string Estado { get; set; } = "Operativo"; // Operativo, En Limpieza, etc.
    public string? Ubicacion { get; set; }
    
    public virtual ICollection<ExistenciaSilo> HistorialExistencias { get; set; } = new List<ExistenciaSilo>();
}
