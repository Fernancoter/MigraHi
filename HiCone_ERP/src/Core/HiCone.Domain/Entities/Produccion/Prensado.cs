using System.ComponentModel.DataAnnotations.Schema;
using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Proceso de prensado: una sesión de producción en una prensa.
/// Equivale a Prensado en el legado GeneXus.
/// </summary>
public class Prensado : TenantEntity
{
    // ── Identificación ──────────────────────────────────────────────────────
    public DateTime Fecha { get; set; } = DateTime.UtcNow.Date;
    public DateTime HoraIniciaProceso { get; set; } = DateTime.UtcNow;
    public DateTime? HoraFinProceso { get; set; }
    public EstadoPrensado Estado { get; set; } = EstadoPrensado.EnProceso;

    // Retrocompatibilidad con el módulo de configuración de producción
    public decimal Programado { get; set; }
    public string? LoteSilo { get; set; }
    public decimal Calibre { get; set; }
    public string? Ancho { get; set; }
    public decimal Longitud { get; set; }
    public string? ProductoNombre { get; set; }
    
    [NotMapped]
    public PrensadoStatus Status { get => (PrensadoStatus)Estado; set => Estado = (EstadoPrensado)value; }
    public decimal KgVirgen { get; set; }
    public decimal KgMolido { get; set; }
    public decimal Target { get; set; }
    
    [NotMapped]
    public DateTime? ProcessStart { get => HoraIniciaProceso; set { if(value.HasValue) HoraIniciaProceso = value.Value; } }
    
    [NotMapped]
    public DateTime? ProcessEnd { get => HoraFinProceso; set => HoraFinProceso = value; }
    public decimal Producido { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public bool EnCurso { get; set; }
    public long PrensadoIdLegacy { get; set; }


    // ── Parámetros de proceso ───────────────────────────────────────────────

    public string LevasUnidadMedida { get; set; } = "Kg";
    public string RodillosUnidadMedida { get; set; } = "Kg";
    public decimal LevasKgEntrada { get; set; }
    public decimal LevasKgSalida { get; set; }
    public decimal LevasGradosEntrada { get; set; }
    public decimal LevasGradosSalida { get; set; }
    public decimal RodillosKgEntrada { get; set; }
    public decimal RodillosKgSalida { get; set; }
    public decimal RodillosGradosEntrada { get; set; }
    public decimal RodillosGradosSalida { get; set; }

    // Meta
    public int MetaPallets { get; set; }
    public int TotalPallets { get; set; }

    // Tiempos de interrupción
    public int TiempoInterrupcionMinutos { get; set; }
    public bool InterrupcionEnCurso { get; set; } = false;

    // Bobina activa en esta sesión
    public decimal BobinaMermaKg { get; set; }

    // Motivo anticipado
    public string? MotivoAnticipado { get; set; }

    // ── FK ─────────────────────────────────────────────────────────────────
    public Guid PrensaId { get; set; }
    public virtual Prensa Prensa { get; set; } = null!;

    public Guid TurnoId { get; set; }
    public virtual Turno Turno { get; set; } = null!;

    public Guid ProductoId { get; set; }
    public virtual Producto Producto { get; set; } = null!;

    public Guid OperarioId { get; set; }
    public virtual Operario Operario { get; set; } = null!;

    public Guid? TroquelId { get; set; }
    public virtual Troquel? Troquel { get; set; }

    // ── Colecciones ────────────────────────────────────────────────────────
    public virtual ICollection<PrensadoBobina> Bobinas { get; set; } = new List<PrensadoBobina>();
    public virtual ICollection<Carrera> Carreras { get; set; } = new List<Carrera>();
    public virtual ICollection<PrensadoInterrupcion> Interrupciones { get; set; } = new List<PrensadoInterrupcion>();
    public virtual ICollection<Palet> Palets { get; set; } = new List<Palet>();
    public virtual PrensadoResultado? Resultado { get; set; }
}
