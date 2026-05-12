using System.ComponentModel.DataAnnotations.Schema;
using HiCone.Domain.Common;
using HiCone.Domain.Entities.Identity;

namespace HiCone.Domain.Entities.Produccion;

[Table("operadores")]
public class Operador : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public string? Codigo { get; set; }
    public bool Activo { get; set; } = true;
    
    // Vinculación con Identity (GAM)
    public Guid? UserGUID { get; set; }
    public virtual User? User { get; set; }
}
