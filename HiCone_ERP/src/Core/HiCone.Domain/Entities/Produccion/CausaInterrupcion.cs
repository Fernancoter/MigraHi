using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Catálogo de causas de interrupción (paros).
/// Shared entre extrusoras y prensas.
/// </summary>
public class CausaInterrupcion : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Descripcion { get; set; } = null!;
    public bool Prensa { get; set; } = false;
    public bool Extrusora { get; set; } = false;
    public string Tipo { get; set; } = "General";            // Mecanica, Material, Operacion, General
    public bool IsActive { get; set; } = true;
    public int OrdenVisual { get; set; } = 0;
}
