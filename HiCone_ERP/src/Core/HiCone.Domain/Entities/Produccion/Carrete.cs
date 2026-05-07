using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Carrete producido en una línea de la carrera.
/// Hay exactamente 6 carretes por carrera (líneas 1-6).
/// Equivale a Carrete en el legado GeneXus.
/// </summary>
public class Carrete : TenantEntity
{
    // ── Identificación ──────────────────────────────────────────────────────
    public string NoSerie { get; set; } = null!;             // Generado: CarreteNoSerie
    public int NoLinea { get; set; }                         // 1-6 dentro de la carrera

    // ── Estado ────────────────────────────────────────────────────────────
    public EstadoCarrete Estado { get; set; } = EstadoCarrete.EnProceso;
    public MolinoCarrete Molino { get; set; } = MolinoCarrete.NoAplica;

    // ── Pallet ────────────────────────────────────────────────────────────
    public bool TerminaPalet { get; set; } = false;          // Este carrete cierra un palet
    public string? PaletSerie { get; set; }                  // NoSerie del palet que cierra

    // ── Observaciones ─────────────────────────────────────────────────────
    public string? Observaciones { get; set; }

    // ── FK ─────────────────────────────────────────────────────────────────
    public Guid CarreraId { get; set; }
    public virtual Carrera Carrera { get; set; } = null!;

    // ── Colecciones ────────────────────────────────────────────────────────
    public virtual ICollection<PaletCarrete> PaletCarretes { get; set; } = new List<PaletCarrete>();
}
