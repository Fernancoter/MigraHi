using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// KPIs y resultado final registrado al cerrar una extrusión.
/// Equivale a ExtrusionResultado del legado.
/// </summary>
public class ExtrusionResultado : TenantEntity
{
    public Guid ExtrusionId { get; set; }
    public virtual Extrusion Extrusion { get; set; } = null!;

    // Producción real
    public int TotalBobinas { get; set; }
    public int TotalBobinasMolidas { get; set; }
    public int TotalBobinasRechazadas { get; set; }
    public int TotalBobinasTurno { get; set; }
    public int TotalBobinasSiguienteTurno { get; set; }
    public int TotalBobinasMeta { get; set; }
    public int BobinasTotalesReposo { get; set; }

    // Tiempos
    public int TiempoInterrupcionMinutos { get; set; }
    public decimal TiempoProcesoHoras { get; set; }
    public decimal EficienciaPorc { get; set; }              // (producido/meta)*100

    // Materiales
    public decimal KgProducidos { get; set; }
    public decimal KgMerma { get; set; }
    public decimal KgMolido { get; set; }

    // Observaciones finales
    public string? ObservacionesFinales { get; set; }
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;
}
