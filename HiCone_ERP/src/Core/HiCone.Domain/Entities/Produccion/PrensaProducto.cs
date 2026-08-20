using HiCone.Domain.Common;

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

    public string Item { get; set; } = null!;
    public string Carrete { get; set; } = null!;
}
