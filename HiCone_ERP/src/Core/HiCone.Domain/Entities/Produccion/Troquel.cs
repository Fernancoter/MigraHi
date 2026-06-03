using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Catálogo de troqueles (moldes/herramientas de las prensas).
/// </summary>
public class Troquel : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public EstadoTroquel Estado { get; set; } = EstadoTroquel.Disponible;
    public bool IsActive { get; set; } = true;

    // Compatibilidades
    public string? ProductosCompatibles { get; set; }        // JSON o lista CSV de ProductoIds
    public string? Observaciones { get; set; }

    // Mantenimiento
    public DateTime? FechaUltimoMantenimiento { get; set; }
    public int CiclosAcumulados { get; set; }
    public int CiclosVideoMantenimiento { get; set; } = 10000;

    // ── Colecciones ───────────────────────────────────────────────────────
    public virtual ICollection<PrensaTroquel> PrensaTroqueles { get; set; } = new List<PrensaTroquel>();
}
