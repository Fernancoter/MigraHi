using HiCone.Domain.Common;
using HiCone.Domain.Enums;

namespace HiCone.Domain.Entities.Logistica;

/// <summary>
/// Embarque de productos: desde la sincronización con SAE hasta la carga física.
/// Contiene todos los campos identificados en el legado GeneXus.
/// </summary>
public class Embarque : TenantEntity
{
    // ── Codificación ──────────────────────────────────────────────────────
    public string Codigo { get; set; } = null!;              // EmbarqueCodigo (generado)
    public EstatusEmbarque Estatus { get; set; } = EstatusEmbarque.PorProgramar;

    // ── Datos SAE ─────────────────────────────────────────────────────────
    public string OrderDoc { get; set; } = null!;            // Número de orden SAE
    public string RemissionDoc { get; set; } = null!;        // Número de remisión SAE
    public string? FolioCarga { get; set; }

    // ── Cliente ───────────────────────────────────────────────────────────
    public string? Cliente { get; set; }
    public string? ClienteGrupo { get; set; }                // Consolidated/Grupo
    public string? ClienteEnvia { get; set; }                // Quien envía desde el cliente

    // ── Fechas ────────────────────────────────────────────────────────────
    public DateTime Fecha { get; set; }                      // Fecha del embarque
    public DateTime? OrderDate { get; set; }                 // Fecha de la orden SAE
    public DateTime? OrderDeliveryDate { get; set; }         // Fecha de entrega comprometida
    public DateTime? HoraEstimadaInicio { get; set; }
    public DateTime? HoraInicio { get; set; }
    public DateTime? HoraFin { get; set; }

    // ── Diferencias de días ────────────────────────────────────────────────
    public int? DiffDiasPedido { get; set; }
    public int? DiffDiasEntrega { get; set; }

    // ── Transporte ───────────────────────────────────────────────────────
    public string? Transporte { get; set; }
    public string? Placas { get; set; }
    public string? Conductor { get; set; }
    public string? Destino { get; set; }
    public string? Recibe { get; set; }
    public string? Elaboro { get; set; }

    // ── Contenido ─────────────────────────────────────────────────────────
    public int NoProductos { get; set; }

    // ── Observaciones ─────────────────────────────────────────────────────
    public string? Observaciones { get; set; }
    public string? CargaObservaciones { get; set; }

    // ── Colecciones ────────────────────────────────────────────────────────
    public virtual ICollection<EmbarqueDetalle> Detalles { get; set; } = new List<EmbarqueDetalle>();
    public virtual ICollection<EmbarquePallet> Pallets { get; set; } = new List<EmbarquePallet>();
}
