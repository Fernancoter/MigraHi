using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

// Stubs temporales para permitir la compilación en la rama security/refactor
// Estas clases parecen haber sido referenciadas pero no creadas/comiteadas aún.

public class Producto : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public bool IsActive { get; set; } = true;
    
    public Guid? CategoriaId { get; set; }
    public virtual Inventario.Categoria? Categoria { get; set; }
}

public class Extrusion : TenantEntity
{
    public DateTime Fecha { get; set; }
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;
}

public class Extrusora : TenantEntity
{
    public string Nombre { get; set; } = null!;
}

public class ExtrusoraProducto : TenantEntity { }
public class ExtrusoraMezcladora : TenantEntity { }
public class Prensa : TenantEntity { }
public class PrensaProducto : TenantEntity { }
public class Troquel : TenantEntity { }
public class PrensaTroquel : TenantEntity { }
public class Turno : TenantEntity { }
public class CausaInterrupcion : TenantEntity { }
public class ProductoCategoria : TenantEntity { }
public class ProductoTerminado : TenantEntity { }
public class ExtrusionResultado : TenantEntity { }
public class ExtrusionInterrupcion : TenantEntity { }
public class Prensado : TenantEntity { }
public class PrensadoBobina : TenantEntity { }
public class PrensadoResultado : TenantEntity { }
public class PrensadoInterrupcion : TenantEntity { }
public class Carrera : TenantEntity { }
public class Carrete : TenantEntity { }
public class PaletCarrete : TenantEntity { }
public class OrdenEtiquetado : TenantEntity { }
public class Maquina : TenantEntity { }
