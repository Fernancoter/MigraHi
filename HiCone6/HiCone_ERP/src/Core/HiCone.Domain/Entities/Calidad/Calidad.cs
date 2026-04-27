using HiCone.Domain.Common;
using HiCone.Domain.Entities.Clientes;
using HiCone.Domain.Entities.Produccion;
using System.Text.Json.Serialization;

namespace HiCone.Domain.Entities.Calidad;

// Inspección de calidad ad-hoc (no en legacy directo, agrupa el flujo)
public class InspeccionCalidad : TenantEntity
{
    public string Folio { get; set; } = null!;
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public string Tipo { get; set; } = "Carrete"; // Carrete | Bobina | Palet
    public string Resultado { get; set; } = "Pendiente"; // Aprobado | Rechazado | Reproceso | Pendiente
    public string? Observaciones { get; set; }

    public Guid? CarreteId { get; set; }
    public Guid? BobinaId { get; set; }
    public Guid? PaletId { get; set; }
    public Guid? OperadorId { get; set; }

    [JsonIgnore] public virtual Carrete? Carrete { get; set; }
    [JsonIgnore] public virtual Bobina? Bobina { get; set; }
    [JsonIgnore] public virtual Palet? Palet { get; set; }
    [JsonIgnore] public virtual Operario? Operador { get; set; }
}

// Catálogo de defectos posibles en un Carrete (legacy: Calidad.CarreteDefecto)
public class CarreteDefecto : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public bool Activo { get; set; } = true;
}

// Reclamo de cliente (legacy: Calidad.Reclamo)
public class Reclamo : TenantEntity
{
    public string Codigo { get; set; } = null!;       // ReclamoCodigo
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public string Estatus { get; set; } = "Abierto";
    public string? Descripcion { get; set; }
    public int CarretesReportados { get; set; }
    public decimal MillaresReportados { get; set; }

    public Guid? ClienteId { get; set; }
    [JsonIgnore] public virtual Cliente? Cliente { get; set; }

    public virtual ICollection<ReclamoDetalle> Detalles { get; set; } = new List<ReclamoDetalle>();
}

// Detalle del reclamo: producto + defecto (legacy: Calidad.ReclamoDetalle)
public class ReclamoDetalle : TenantEntity
{
    public Guid ReclamoId { get; set; }
    public string Codigo { get; set; } = null!;        // ReclamoDetalleCodigo
    public string Estado { get; set; } = "PorRevisar"; // ReclamoDetalleEstado

    public Guid? ProductoId { get; set; }
    public Guid? DefectoId { get; set; }

    public decimal Millar { get; set; }
    public string? ObservacionRCA { get; set; }

    [JsonIgnore] public virtual Reclamo Reclamo { get; set; } = null!;
    [JsonIgnore] public virtual Producto? Producto { get; set; }
    [JsonIgnore] public virtual CarreteDefecto? Defecto { get; set; }
}
