using HiCone.Domain.Common;
using System.Text.Json.Serialization;

namespace HiCone.Domain.Entities.Produccion;

// Categoría de producto (legacy: DB.ProductoCategoria)
public class ProductoCategoria : TenantEntity
{
    public string Codigo { get; set; } = null!; // ProductoCategoriaClaveExterna
    public string Nombre { get; set; } = null!;

    [JsonIgnore] public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}

// Producto manufacturado (legacy: DB.Producto)
public class Producto : TenantEntity
{
    public string Clave { get; set; } = null!;        // ProductoClave
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public decimal PrecioUnitario { get; set; }
    public string? UnidadMedida { get; set; }
    public bool IsActive { get; set; } = true;

    public Guid? CategoriaId { get; set; }
    [JsonIgnore] public virtual ProductoCategoria? Categoria { get; set; }
}

// Producto terminado: configuración de empaque (legacy: DB.ProductoTerminado)
public class ProductoTerminado : TenantEntity
{
    public Guid ProductoId { get; set; }
    public int CarretesPorPalet { get; set; }     // ProductoTerminadoPalets (inverso)
    public decimal CarreteMillar { get; set; }    // ProductoTerminadoCarreteMillar
    public decimal PaletMillar { get; set; }      // ProductoTerminadoPaletMillar
    public decimal PesoCarrete { get; set; }
    public decimal PesoPalet { get; set; }
    public decimal PesoTotal { get; set; }

    [JsonIgnore] public virtual Producto Producto { get; set; } = null!;
}
