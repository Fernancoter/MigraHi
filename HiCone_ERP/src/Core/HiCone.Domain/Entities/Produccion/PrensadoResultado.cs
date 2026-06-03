using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

/// <summary>
/// KPIs y resultado final registrado al cerrar un prensado.
/// </summary>
public class PrensadoResultado : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public virtual Prensado Prensado { get; set; } = null!;

    public int TotalPalets { get; set; }
    public int TotalPaletsMeta { get; set; }
    public int TotalCarreras { get; set; }
    public int TotalCarrerasValidadas { get; set; }
    public int TotalBobinasMolidas { get; set; }
    public decimal KgMerma { get; set; }
    public int TiempoInterrupcionMinutos { get; set; }
    public decimal EficienciaPorc { get; set; }

    public string? ObservacionesFinales { get; set; }
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;
}
