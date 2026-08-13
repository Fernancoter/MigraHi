using System.ComponentModel.DataAnnotations.Schema;
using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Catálogo de prensas.
/// </summary>
public class Prensa : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string NumeroPrensa { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? Modelo { get; set; }
    public string? NumeroSerie { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Marca { get; set; }
    public EstadoPrensa Estado { get; set; } = EstadoPrensa.Disponible;

    public string? Observaciones { get; set; }
    public string? Imagen { get; set; }

    // ── Colecciones ───────────────────────────────────────────────────────
    public virtual ICollection<Prensado> Prensados { get; set; } = new List<Prensado>();
    public virtual ICollection<PrensaProducto> Productos { get; set; } = new List<PrensaProducto>();
    public virtual ICollection<PrensaTroquel> Troqueles { get; set; } = new List<PrensaTroquel>();
}
