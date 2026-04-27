using HiCone.Domain.Common;
using HiCone.Domain.Entities.Clientes;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.SAE;
using System.Text.Json.Serialization;

namespace HiCone.Domain.Entities.Logistica;

// Embarque: shipment a cliente, agrupa N Palets contra N Orders (legacy: DB.Embarque)
public class Embarque : TenantEntity
{
    public string Codigo { get; set; } = null!;        // EmbarqueCodigo
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public DateTime? FechaSalida { get; set; }
    public string Estado { get; set; } = "Programado"; // Programado, EnCarga, EnTransito, Entregado, Cancelado

    // Cliente
    public Guid? ClienteId { get; set; }
    public string? ClienteGrupo { get; set; }
    public string? ClienteEnvia { get; set; }

    // SAE references
    public string? OrderDoc { get; set; }              // EmbarqueOrderDoc
    public string? RemissionDoc { get; set; }          // EmbarqueRemissionDoc

    // Logística
    public string? Transporte { get; set; }
    public string? Conductor { get; set; }
    public string? Placas { get; set; }
    public string? Observaciones { get; set; }

    [JsonIgnore] public virtual Cliente? Cliente { get; set; }

    public virtual ICollection<EmbarqueDetalle> Detalles { get; set; } = new List<EmbarqueDetalle>();
    public virtual ICollection<EmbarquePallet> Palets { get; set; } = new List<EmbarquePallet>();
}

// Detalle de productos en un Embarque (legacy: DB.EmbarqueDetalle)
public class EmbarqueDetalle : TenantEntity
{
    public Guid EmbarqueId { get; set; }
    public Guid ProductoId { get; set; }
    public int CantidadPallets { get; set; }
    public bool ConfirmadoPorAdministracion { get; set; }
    public bool Embarcado { get; set; }
    public string? Observaciones { get; set; }

    [JsonIgnore] public virtual Embarque Embarque { get; set; } = null!;
    [JsonIgnore] public virtual Producto Producto { get; set; } = null!;
}

// Asignación de Palets físicos a un Embarque (legacy: DB.EmbarquePallet)
public class EmbarquePallet : TenantEntity
{
    public Guid EmbarqueId { get; set; }
    public Guid? EmbarqueDetalleId { get; set; }
    public string NoPallet { get; set; } = null!;     // EmbarquePalletNoPallet
    public bool Valido { get; set; } = true;
    public string? MotivoError { get; set; }
    public DateTime Hora { get; set; } = DateTime.UtcNow;

    public Guid? PaletId { get; set; }

    [JsonIgnore] public virtual Embarque Embarque { get; set; } = null!;
    [JsonIgnore] public virtual EmbarqueDetalle? Detalle { get; set; }
    [JsonIgnore] public virtual Palet? Palet { get; set; }
}
