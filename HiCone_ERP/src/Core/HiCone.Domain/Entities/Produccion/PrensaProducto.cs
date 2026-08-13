using HiCone.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Producto habilitado para una prensa, con su identificación de carrete — equivalente a
/// DB.PrensaProducto en el legado. Los nombres de columna vienen definidos por la migración
/// "InitialProductionBaseline" ya existente en el repositorio.
/// </summary>
public class PrensaProducto : TenantEntity
{
    public Guid PrensaId { get; set; }
    public virtual Prensa Prensa { get; set; } = null!;

    public Guid? ProductoId { get; set; }

    public string Item { get; set; } = null!;
    public string Carrete { get; set; } = null!;

    public decimal DefaultLevasKgEntrada { get; set; } = 0;
    public decimal DefaultLevasKgSalida { get; set; } = 0;
    public decimal DefaultLevasGradosEntrada { get; set; } = 0;
    public decimal DefaultLevasGradosSalida { get; set; } = 0;

    public decimal DefaultRodillosKgEntrada { get; set; } = 0;
    public decimal DefaultRodillosKgSalida { get; set; } = 0;
    public decimal DefaultRodillosGradosEntrada { get; set; } = 0;
    public decimal DefaultRodillosGradosSalida { get; set; } = 0;

    public decimal DefaultMetaPallets { get; set; } = 0;
    
    [NotMapped]
    public decimal DefaultProgramado { get; set; } = 0;
    
    public bool IsActive { get; set; } = true;
}
