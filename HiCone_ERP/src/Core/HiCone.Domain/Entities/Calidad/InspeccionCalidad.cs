using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Calidad;

public class InspeccionCalidad : TenantEntity
{
    public string NumeroReporte { get; set; } = null!;
    public DateTime FechaInspeccion { get; set; } = DateTime.UtcNow;
    public string Resultado { get; set; } = "Pendiente"; // Aprobado, Rechazado, Condicional/Pendiente
    
    public Guid? BobinaId { get; set; }
    public string? Inspector { get; set; }
    public string? Hallazgos { get; set; }
}
