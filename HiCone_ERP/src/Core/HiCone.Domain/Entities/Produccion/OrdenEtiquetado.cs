using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// Orden de etiquetado de carretes terminados.
/// Equivale a OrdenEtiquetado del legado GeneXus.
/// </summary>
public class OrdenEtiquetado : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public DateTime Fecha { get; set; } = DateTime.UtcNow.Date;
    public bool Completada { get; set; } = false;
    public DateTime? FechaCompletada { get; set; }

    public Guid? PrensadoId { get; set; }
    public virtual Prensado? Prensado { get; set; }

    public Guid? OperarioId { get; set; }
    public virtual Operario? Operario { get; set; }

    public string? Observaciones { get; set; }
}
