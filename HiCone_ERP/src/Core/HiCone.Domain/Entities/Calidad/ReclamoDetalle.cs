using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Calidad;

/// <summary>
/// Detalle de un reclamo: defectos identificados por carrete.
/// </summary>
public class ReclamoDetalle : TenantEntity
{
    public Guid ReclamoId { get; set; }
    public virtual Reclamo Reclamo { get; set; } = null!;

    public string? NoSeriePallet { get; set; }
    public string? NoSerieCarrete { get; set; }
    public TipoDefecto TipoDefecto { get; set; } = TipoDefecto.Otro;

    public int CantidadMillares { get; set; }
    public string? Descripcion { get; set; }
    public bool YaReportado { get; set; } = false;          // Para evitar duplicados

    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;
}
