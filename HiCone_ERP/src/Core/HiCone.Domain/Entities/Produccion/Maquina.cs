using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class Maquina : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string Tipo { get; set; } = null!; // Extrusora, Prensa, etc.
    public string? Modelo { get; set; }
    public string? NumeroSerie { get; set; }
    public bool IsActive { get; set; } = true;
    public string Estado { get; set; } = "Disponible"; // Disponible, Produciendo, Mantenimiento, Parada
}
