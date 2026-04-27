using HiCone.Domain.Common;
using HiCone.Domain.Entities.Inventario;
using System.Text.Json.Serialization;

namespace HiCone.Domain.Entities.Produccion;

// Sesión de extrusión: evento raíz que produce Bobinas (legacy: DB.Extrusion)
public class Extrusion : TenantEntity
{
    public string Folio { get; set; } = null!;
    public DateTime FechaInicio { get; set; } = DateTime.UtcNow;
    public DateTime? FechaFin { get; set; }
    public string Estado { get; set; } = "EnProceso"; // EnProceso, Cerrada, Cancelada

    public Guid ExtrusoraId { get; set; }
    public Guid? TurnoId { get; set; }
    public Guid? OperadorId { get; set; }
    public Guid? ProductoId { get; set; }
    public Guid? SiloId { get; set; }
    public Guid? LoteId { get; set; }

    [JsonIgnore] public virtual Extrusora Extrusora { get; set; } = null!;
    [JsonIgnore] public virtual Turno? Turno { get; set; }
    [JsonIgnore] public virtual Operario? Operador { get; set; }
    [JsonIgnore] public virtual Producto? Producto { get; set; }
    [JsonIgnore] public virtual Silo? Silo { get; set; }
    [JsonIgnore] public virtual Lote? Lote { get; set; }

    public virtual ICollection<Bobina> Bobinas { get; set; } = new List<Bobina>();
    public virtual ICollection<ExtrusionInterrupcion> Interrupciones { get; set; } = new List<ExtrusionInterrupcion>();
    public virtual ExtrusionResultado? Resultado { get; set; }
}

// Resultado consolidado de la extrusión (legacy: DB.ExtrusionResultado)
public class ExtrusionResultado : TenantEntity
{
    public Guid ExtrusionId { get; set; }
    public decimal VelLaminadora { get; set; }
    public decimal VelHusillo { get; set; }
    public int BobinasMolino { get; set; }
    public int BobinasReposo { get; set; }
    public decimal TotalKg { get; set; }
    public decimal TotalMermaKg { get; set; }
    public string? Observaciones { get; set; }

    [JsonIgnore] public virtual Extrusion Extrusion { get; set; } = null!;
}

// Interrupción durante extrusión (legacy: DB.ExtrusionInterrupcion + DB.Interrupcion)
public class ExtrusionInterrupcion : TenantEntity
{
    public Guid ExtrusionId { get; set; }
    public Guid? CausaId { get; set; }
    public DateTime HoraInicio { get; set; }
    public DateTime? HoraFin { get; set; }
    public TimeSpan? Duracion { get; set; }
    public bool Concluida { get; set; }
    public string? Motivo { get; set; }
    public string? Observaciones { get; set; }

    [JsonIgnore] public virtual Extrusion Extrusion { get; set; } = null!;
    [JsonIgnore] public virtual CausaInterrupcion? Causa { get; set; }
}
