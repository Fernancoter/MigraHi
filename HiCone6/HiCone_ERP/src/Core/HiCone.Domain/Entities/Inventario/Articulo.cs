using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Inventario;

public class Articulo : TenantEntity
{
    public string Codigo { get; set; } = null!; // AR_COD_ART
    public string Nombre { get; set; } = null!; // AR_NOM_ART
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }      // AR_PRE_ART
    public decimal Existencia { get; set; }  // De tabla AR_STOCK o similar
    
    public System.Guid? CategoriaId { get; set; }
    public virtual Categoria? Categoria { get; set; }
}

public class Categoria : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    
    public virtual ICollection<Articulo> Articulos { get; set; } = new List<Articulo>();
}
