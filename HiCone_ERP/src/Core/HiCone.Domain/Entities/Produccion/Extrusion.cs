using System.ComponentModel.DataAnnotations.Schema;
using HiCone.Domain.Common;
using HiCone.Domain.Enums;
using HiCone.Domain.Entities.Inventario;

namespace HiCone.Domain.Entities.Produccion;

public class Extrusion : TenantEntity
{
    // ── Identificación ──────────────────────────────────────────────────────
    public string Codigo { get; set; } = null!;              // No. de Extrusión (generado)
    public DateTime Fecha { get; set; } = DateTime.UtcNow.Date;
    public DateTime FechaInicio { get; set; } = DateTime.UtcNow;
    public DateTime? FechaFin { get; set; }
    public EstadoExtrusion Estado { get; set; } = EstadoExtrusion.Programada;

    // Retrocompatibilidad con el módulo de configuración de producción
    public decimal Programado { get; set; }
    public string? ProductoNombre { get; set; }
    public int Status { get; set; } = 1;
    [Column(TypeName = "decimal(18,2)")]
    public decimal Producido { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public bool EnCurso { get; set; }
    public long ExtrusionIdLegacy { get; set; }
    public decimal KgVirgen { get; set; }
    public decimal KgMolido { get; set; }
    public decimal Target { get; set; }
    [NotMapped]
    public DateTime? ProcessStart { get => FechaInicio; set { if(value.HasValue) FechaInicio = value.Value; } }
    [NotMapped]
    public DateTime? ProcessEnd { get => FechaFin; set => FechaFin = value; }


    // ── Parámetros de proceso ───────────────────────────────────────────────
    public decimal Calibre { get; set; }                     // mm
    [Column(TypeName = "decimal(18,2)")]
    public decimal Ancho { get; set; }                       // mm
    [Column(TypeName = "decimal(18,2)")]
    public decimal Longitud { get; set; }                    // m
    public decimal MetaKg { get; set; }                      // Meta de kg a producir
    public decimal VirgenKg { get; set; }                    // Kg de material virgen
    public decimal MolidoKg { get; set; }                    // Kg de material molido
    public decimal RevHusilloVirgen { get; set; }
    public decimal RevHusilloMolido { get; set; }
    public int TotalBobinasMeta { get; set; }

    // ── Lotes / Silos ──────────────────────────────────────────────────────
    public string? LoteSilo { get; set; }                    // Lote del silo virgen
    public string? LotePaqueteAditivos { get; set; }
    public Guid? SiloVirgenId { get; set; }
    public virtual Silo? SiloVirgen { get; set; }
    public Guid? SiloMolidoId { get; set; }
    public virtual Silo? SiloMolido { get; set; }

    // ── Motivo anticipado ──────────────────────────────────────────────────
    public string? MotivoAnticipado { get; set; }
    public int TiempoInterrupcion { get; set; }              // minutos acumulados
    public bool InterrupcionEnCurso { get; set; } = false;
    public int BobinasTotalesReposo { get; set; }

    // ── Observaciones ──────────────────────────────────────────────────────
    public string? Observaciones { get; set; }

    // ── FK ─────────────────────────────────────────────────────────────────
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;
    public Guid MaquinaId { get; set; }

    public Guid OperarioId { get; set; }
    public virtual Operario Operario { get; set; } = null!;

    public Guid TurnoId { get; set; }
    public virtual Turno Turno { get; set; } = null!;

    public Guid? ProductoId { get; set; }
    public virtual Producto? Producto { get; set; }

    // ── Colecciones ────────────────────────────────────────────────────────
    public virtual ICollection<Bobina> Bobinas { get; set; } = new List<Bobina>();
    public virtual ICollection<ExtrusionInterrupcion> Interrupciones { get; set; } = new List<ExtrusionInterrupcion>();
    public virtual ExtrusionResultado? Resultado { get; set; }
}
