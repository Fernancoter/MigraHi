using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Catálogo de extrusoras (máquinas de extrusión).
/// Reemplaza / especializa la entidad genérica Maquina para extrusoras.
/// </summary>
public class Extrusora : TenantEntity
{
    public string Codigo { get; set; } = null!;              // Clave interna
    public string Nombre { get; set; } = null!;              // "Extrusora 1", "EXT-A", etc.
    public string? Modelo { get; set; }
    public string? NumeroSerie { get; set; }
    public bool IsActive { get; set; } = true;
    public EstadoExtrusora Estado { get; set; } = EstadoExtrusora.Disponible;

    // Capacidad nominal
    public decimal CapacidadKgHora { get; set; }
    public int NumeroEstaciones { get; set; } = 1;           // Estaciones de bobinas

    public string? Observaciones { get; set; }

    // ── Colecciones ───────────────────────────────────────────────────────
    public virtual ICollection<Extrusion> Extrusiones { get; set; } = new List<Extrusion>();
    public virtual ICollection<ExtrusoraProducto> Productos { get; set; } = new List<ExtrusoraProducto>();
    public virtual ICollection<ExtrusoraMezcladora> Mezcladoras { get; set; } = new List<ExtrusoraMezcladora>();
}
