using System.ComponentModel.DataAnnotations.Schema;
using HiCone.Domain.Common;
using HiCone.Domain.Enums;
using HiCone.Domain.Entities.Inventario;

namespace HiCone.Domain.Entities.Produccion;

public class Bobina : TenantEntity
{
    // ── No. de Serie ────────────────────────────────────────────────────────
    public string NoSerie { get; set; } = null!;             // BobinaNoSerie — generado automáticamente
    public int BobinaNo { get; set; }                        // Número secuencial en la extrusión
    public string BobinaOrigen { get; set; } = "Normal";     // Normal, Reproceso

    // Retrocompatibilidad con el módulo de configuración de producción
    public string? Mill { get; set; }
    public string? Station { get; set; }
    [NotMapped] public int BobbinNo { get => BobinaNo; set => BobinaNo = value; }
    [NotMapped] public string SerialNo { get => NoSerie; set => NoSerie = value; }
    public string? Codigo { get; set; }
    public DateTime? RestStart { get; set; }
    public int RestMinutes { get; set; }
    [NotMapped] public decimal ScrapKg { get => MermaKg; set => MermaKg = value; }
    [NotMapped] public decimal Thickness { get => Espesor; set => Espesor = value; }
    public string? Observations { get; set; }
    public string? MillReason { get; set; }
    public string? ProductName { get; set; }
    public string? Reel { get; set; }

    // ── Mediciones ──────────────────────────────────────────────────────────
    public decimal Kg { get; set; }                          // Peso bruto
    public decimal MermaKg { get; set; }
    public decimal Espesor { get; set; }                     // mm
    public decimal DesviacionEstandar { get; set; }

    // ── Tiempos ──────────────────────────────────────────────────────────
    public DateTime HoraInicio { get; set; }
    public DateTime HoraSalida { get; set; }
    public DateTime? IniciaReposo { get; set; }
    public int MinutosEnReposo { get; set; }                 // Tiempo mínimo configurado
    public DateTime? FechaProduccion { get; set; }

    // ── Estado ───────────────────────────────────────────────────────────
    public EstadoBobina Estado { get; set; } = EstadoBobina.EnProceso;
    public ColorEstacion ColorEstacion { get; set; } = ColorEstacion.SinAsignar;
    public MotivoMolino MotivoMolino { get; set; } = MotivoMolino.NoAplica;

    // ── Carreras (Prensado) ───────────────────────────────────────────────
    public int Carreras { get; set; } = 0;                   // Total de carreras procesadas

    // ── Silos / Lotes ─────────────────────────────────────────────────────
    public Guid? SiloVirgenId { get; set; }
    public virtual Silo? SiloVirgen { get; set; }
    public string? LoteVirgen { get; set; }
    public Guid? SiloMolidoId { get; set; }
    public virtual Silo? SiloMolido { get; set; }

    // ── Observaciones ─────────────────────────────────────────────────────
    public string? Observaciones { get; set; }

    // ── FK ────────────────────────────────────────────────────────────────
    public Guid ExtrusionId { get; set; }
    public virtual Extrusion Extrusion { get; set; } = null!;

    public Guid? ProductoId { get; set; }
    public virtual Producto? Producto { get; set; }

    public Guid? OperarioId { get; set; }
    public virtual Operario? Operario { get; set; }

    // ── Colecciones ───────────────────────────────────────────────────────
    public virtual ICollection<PrensadoBobina> PrensadosBobina { get; set; } = new List<PrensadoBobina>();

    // ── Interrupciones ────────────────────────────────────────────────────
    public Guid? BobinaInterrupcionesId { get; set; }

    // ── Computed helpers ──────────────────────────────────────────────────
    public bool ReposoCompletado(int minutosMinimos) =>
        IniciaReposo.HasValue && (DateTime.UtcNow - IniciaReposo.Value).TotalMinutes >= minutosMinimos;
}
