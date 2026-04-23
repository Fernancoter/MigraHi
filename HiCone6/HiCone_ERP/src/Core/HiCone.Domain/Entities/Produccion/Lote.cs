using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class Lote : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    public string? Descripcion { get; set; }
    public string Estado { get; set; } = "Abierto"; // Abierto, Cerrado, En Cuarentena
    
    // Legacy Fields from HiCone6
    public string? LoteEmbarque { get; set; }
    public string? LotePO { get; set; }
    public DateTime? LoteFechaRegistro { get; set; }
    public string? LoteTrunkNo { get; set; }
    public string? LoteTipoMaterial { get; set; }
    public Guid? LoteSiloId { get; set; }
    public decimal LoteKg { get; set; }
    public bool LoteConsumido { get; set; }
    public string? LotePaqueteAditivos { get; set; }
    
    public virtual ICollection<Extrusion> Extrusiones { get; set; } = new List<Extrusion>();
    public virtual ICollection<Bobina> Bobinas { get; set; } = new List<Bobina>();
    public virtual ICollection<Palet> Palets { get; set; } = new List<Palet>();
}
