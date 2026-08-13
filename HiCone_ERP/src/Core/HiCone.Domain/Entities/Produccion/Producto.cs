using System.ComponentModel.DataAnnotations.Schema;
using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Catálogo unificado de productos HiCone.
/// Equivale a Producto en el legado con sus atributos de proceso.
/// </summary>
public class Producto : TenantEntity
{
    public string Clave { get; set; } = null!;
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public string? ProductoBase { get; set; }
    public decimal PrecioUnitario { get; set; }
    public string? ProductoSAE { get; set; }

    // Parámetros de proceso

    public TipoMaterial TipoMaterial { get; set; } = TipoMaterial.Virgen;
    public decimal Calibre { get; set; }                     // mm
    public decimal Ancho { get; set; }                       // mm
    public decimal Longitud { get; set; }                    // m
    public int MinutosReposoMinimo { get; set; } = 60;       // Tiempo mínimo de reposo bobina

    // Relaciones
    public Guid? CategoriaId { get; set; }
    public virtual ProductoCategoria? Categoria { get; set; }

    // Clave externa SAE
    public string? ClaveExternaSAE { get; set; }

    public bool IsActive { get; set; } = true;
    public bool Etiquetable { get; set; } = true;            // Si genera orden de etiquetado

    // ── Colecciones ───────────────────────────────────────────────────────
    public virtual ICollection<ExtrusoraProducto> ExtrusoraProductos { get; set; } = new List<ExtrusoraProducto>();
    public virtual ICollection<Bobina> Bobinas { get; set; } = new List<Bobina>();
    public virtual ICollection<Palet> Palets { get; set; } = new List<Palet>();
    public virtual ICollection<TroquelProducto> TroquelProductos { get; set; } = new List<TroquelProducto>();
}
