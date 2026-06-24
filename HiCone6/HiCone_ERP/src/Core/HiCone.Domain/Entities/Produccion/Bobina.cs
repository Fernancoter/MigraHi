using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class Bobina : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public decimal PesoNeto { get; set; }
    public decimal Metros { get; set; }
    public DateTime FechaProduccion { get; set; } = DateTime.UtcNow;
    public string? Turno { get; set; }
    
    public Guid? PaletId { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual Palet? Palet { get; set; }

    // Nuevos campos para Extrusión
    public long BobbinNo { get; set; }
    public string? SerialNo { get; set; }
    public decimal Kg { get; set; }
    public decimal ScrapKg { get; set; }
    public decimal Thickness { get; set; }
    public string? Observations { get; set; }
    public string? MillReason { get; set; }
    public string? ProductName { get; set; }
    public string? Reel { get; set; }
    public DateTime? RestStart { get; set; }
    public int RestMinutes { get; set; }
    public string? Mill { get; set; }
    
    // A o B (Station A / Station B)
    public string? Station { get; set; }

    public Guid? ExtrusionId { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual Extrusion? Extrusion { get; set; }
}

public class Palet : TenantEntity
{
    public string Codigo { get; set; } = null!; // TFPaletTipo en legacy
    public string Tipo { get; set; } = null!;
    public DateTime? HoraInicioEnsamble { get; set; }
    public DateTime? HoraFinEnsamble { get; set; }
    public string Estado { get; set; } = "En Proceso"; // En Proceso, Terminado, Embarcado
    public string? ProductoNombre { get; set; }
    
    public virtual ICollection<Bobina> Bobinas { get; set; } = new List<Bobina>();
}
