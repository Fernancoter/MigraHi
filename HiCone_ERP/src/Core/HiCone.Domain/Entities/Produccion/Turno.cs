using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class Turno : TenantEntity
{
    public string Nombre { get; set; } = null!; // Matutino, Vespertino, Nocturno
    public TimeSpan HoraInicio { get; set; }
    public TimeSpan HoraFin { get; set; }
    public bool IsActive { get; set; } = true;
}
