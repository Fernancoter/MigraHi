using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Calidad;

/// <summary>
/// Defecto específico reportado en un carrete.
/// Equivale a CarreteDefecto del legado GeneXus.
/// </summary>
public class CarreteDefecto : TenantEntity
{
    public string NoSerieCarrete { get; set; } = null!;
    public TipoDefecto TipoDefecto { get; set; } = TipoDefecto.Otro;
    public string? Descripcion { get; set; }
    public string? EvidenciaUrl { get; set; }               // URL de foto/evidencia
    public DateTime FechaReporte { get; set; } = DateTime.UtcNow;
    public string? ReportadoPor { get; set; }

    public Guid? ReclamoDetalleId { get; set; }
    public virtual ReclamoDetalle? ReclamoDetalle { get; set; }
}
