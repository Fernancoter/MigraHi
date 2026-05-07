using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Carrera de prensado: un ciclo de producción dentro de un prensado.
/// Al iniciar una carrera, se crean automáticamente 6 Carretes.
/// Equivale a Carrera en el legado GeneXus.
/// </summary>
public class Carrera : TenantEntity
{
    // ── Identificación ──────────────────────────────────────────────────────
    public int CarreraNo { get; set; }                       // Número secuencial en el prensado
    public EstadoCarrera Estado { get; set; } = EstadoCarrera.EnProceso;

    // ── Tiempos ──────────────────────────────────────────────────────────
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;
    public DateTime? FechaValidacion { get; set; }

    // ── Datos del troquel calibrado ────────────────────────────────────────
    public string? CarreraTroquel { get; set; }              // Nombre del troquel en uso

    // ── Pallet al que terminó ──────────────────────────────────────────────
    public bool PaletTerminado { get; set; } = false;

    // ── FK ─────────────────────────────────────────────────────────────────
    public Guid PrensadoId { get; set; }
    public virtual Prensado Prensado { get; set; } = null!;

    // Bobina activa cuando inició esta carrera
    public Guid InicioPrensadoBobinaId { get; set; }

    public Guid? InterrupcionId { get; set; }                // Si fue interrumpida

    // ── Colecciones ────────────────────────────────────────────────────────
    public virtual ICollection<Carrete> Carretes { get; set; } = new List<Carrete>();
}
