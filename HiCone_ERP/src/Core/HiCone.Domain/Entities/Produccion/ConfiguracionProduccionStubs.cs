using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class SiloProduccion : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public decimal CapacidadKg { get; set; }
    public decimal MinimoKg { get; set; }
    public decimal MaximoKg { get; set; }
    public string? EstadoMaterial { get; set; }
    public string? TipoMaterial { get; set; }
    public bool SiloActivo { get; set; } = true;
    public bool IsArchived { get; set; } = false;
}

public enum PrensadoStatus
{
    Programada,
    EnProceso,
    Intermedia,
    Parada,
    Terminada,
    PorProgramar
}

public enum ExtrusionStatus
{
    Programada,
    EnProceso,
    Intermedia,
    Parada,
    Terminada,
    PorProgramar
}

public class CatEstadoMaterial : TenantEntity
{
    public string Nombre { get; set; } = null!;
}

public class CatTipoMaterial : TenantEntity
{
    public string Nombre { get; set; } = null!;
}

public class CatalogoClave : TenantEntity
{
    public string Valor { get; set; } = null!;
    public int Orden { get; set; }
}

public class ExtrusoraOperario : TenantEntity
{
    public Guid ExtrusoraId { get; set; }
    public Guid OperarioId { get; set; }
    public virtual Operario Operario { get; set; } = null!;
    public Guid? TurnoId { get; set; }
    public virtual Turno? Turno { get; set; }
}
