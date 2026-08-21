using System.ComponentModel.DataAnnotations.Schema;
using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class Operario : TenantEntity
{
    public string NumeroEmpleado { get; set; } = null!;
    public string NombreCompleto { get; set; } = null!;
    public string? Especialidad { get; set; }
    public string? TurnoPreferido { get; set; }
    public bool IsActive { get; set; } = true;

    // Propiedades de retrocompatibilidad para el módulo de configuración de producción
    [NotMapped]
    public string Nombre { get => NombreCompleto; set => NombreCompleto = value; }
    
    [NotMapped]
    public bool Activo { get => IsActive; set => IsActive = value; }

    public virtual ICollection<Extrusion> Extrusiones { get; set; } = new List<Extrusion>();
}
