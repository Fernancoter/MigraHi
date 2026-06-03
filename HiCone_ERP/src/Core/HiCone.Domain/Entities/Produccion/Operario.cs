using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class Operario : TenantEntity
{
    public string NumeroEmpleado { get; set; } = null!;
    public string NombreCompleto { get; set; } = null!;
    public string? Especialidad { get; set; }
    public string? TurnoPreferido { get; set; }
    public bool IsActive { get; set; } = true;

    public virtual ICollection<Extrusion> Extrusiones { get; set; } = new List<Extrusion>();
}
