using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Producto terminado: configuración de empaque de un producto HiCone, equivalente a
/// DB.ProductoTerminado en el legado GeneXus. Los pallets de embarque referencian
/// ProductoTerminado para validar contra remisiones.
///
/// Los nombres de columna (incluyendo "CarreteMiliar"/"PaletMiliar", que replican una
/// grafía del legado) vienen definidos por la migración "InitialProductionBaseline" ya
/// existente en el repositorio — se conservan tal cual para no romper la base de datos
/// compartida del equipo, en vez de usar la ortografía correcta "Millar".
/// </summary>
public class ProductoTerminado : TenantEntity
{
    public string? Nombre { get; set; }
    public int TerminadoPalets { get; set; }
    public int CarreteMiliar { get; set; }
    public int PaletMiliar { get; set; }
    public decimal TerminadoPeso { get; set; }
    public decimal PesoCarrete { get; set; }
    public decimal PesoPalet { get; set; }
    public bool ConEtiqueta { get; set; }
    public bool Etiquetable { get; set; }
    public string? Producto { get; set; }
    public string? CodigoSap { get; set; }
    public int Mrd { get; set; }
    public bool IsActive { get; set; } = true;

    public virtual ICollection<Palet> Palets { get; set; } = new List<Palet>();
}
