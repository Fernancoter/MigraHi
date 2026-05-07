using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Calidad;

/// <summary>
/// Reclamo de cliente por deficiencia en los productos.
/// Equivale a Reclamo en el legado GeneXus.
/// </summary>
public class Reclamo : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public DateTime Fecha { get; set; } = DateTime.UtcNow.Date;
    public EstatusReclamo Estatus { get; set; } = EstatusReclamo.Abierto;

    // Cliente / referencia
    public string? Cliente { get; set; }
    public string? OrderDoc { get; set; }                    // Referencia a orden SAE
    public string? RemissionDoc { get; set; }

    // Descripción general
    public string Descripcion { get; set; } = null!;
    public string? AccionCorrectiva { get; set; }
    public string? Observaciones { get; set; }

    // Cierre
    public DateTime? FechaCierre { get; set; }
    public string? CerradoPor { get; set; }

    // ── Colecciones ────────────────────────────────────────────────────────
    public virtual ICollection<ReclamoDetalle> Detalles { get; set; } = new List<ReclamoDetalle>();
}
