using HiCone.Domain.Common;
using HiCone.Domain.Enums;
using HiCone.Domain.Entities.Logistica;

namespace HiCone.Domain.Entities.Produccion;

public class Palet : TenantEntity
{
    // ── No. de Serie ───────────────────────────────────────────────────────
    public string NoSerie { get; set; } = null!;             // Generado: PaletNoSerie
    public TipoPalet Tipo { get; set; } = TipoPalet.Normal;

    // ── Estado ───────────────────────────────────────────────────────────
    public EstatusPalet Estatus { get; set; } = EstatusPalet.EnEnsamble;

    // ── Capacidad ────────────────────────────────────────────────────────
    public int Capacidad { get; set; }                       // Total de carretes esperados
    public int TotalCarretes { get; set; }                   // Carretes actuales

    // ── Tiempos ──────────────────────────────────────────────────────────
    public DateTime HoraInicioEnsamble { get; set; }
    public DateTime? HoraFinEnsamble { get; set; }

    // ── FK ────────────────────────────────────────────────────────────────
    public Guid? ProductoId { get; set; }
    public virtual Producto? Producto { get; set; }

    public Guid? ProductoTerminadoId { get; set; }
    public virtual ProductoTerminado? ProductoTerminado { get; set; }

    public Guid? PrensadoId { get; set; }
    public virtual Prensado? Prensado { get; set; }

    public Guid? OperarioId { get; set; }
    public virtual Operario? Operario { get; set; }

    public Guid? PrensaId { get; set; }
    public virtual Prensa? Prensa { get; set; }

    // FK al prensado donde terminó (puede diferir si hubo cambio de turno)
    public Guid? PrensadoFinId { get; set; }

    // ── Colecciones ───────────────────────────────────────────────────────
    public virtual ICollection<PaletCarrete> PaletCarretes { get; set; } = new List<PaletCarrete>();
    public virtual ICollection<EmbarquePallet> EmbarquePallets { get; set; } = new List<EmbarquePallet>();
}
