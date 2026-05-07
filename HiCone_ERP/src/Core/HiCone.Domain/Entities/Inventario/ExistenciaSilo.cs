using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Inventario;

public class ExistenciaSilo : TenantEntity
{
    public Guid SiloId { get; set; }
    public virtual Silo Silo { get; set; } = null!;

    public Guid? ExistenciaId { get; set; }
    public virtual Existencia? Existencia { get; set; }

    public decimal Cantidad { get; set; } // ExistenciaSiloCantidad en legacy
    public string? LoteVirgen { get; set; } // ExistenciaSiloVirgenLote en legacy
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;
    
    public string? Observaciones { get; set; }
}
