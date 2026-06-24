using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Calidad
{
    public class InspeccionCalidad : TenantEntity { }
    public class Reclamo : TenantEntity { }
    public class ReclamoDetalle : TenantEntity { }
    public class CarreteDefecto : TenantEntity { }
}

namespace HiCone.Domain.Entities.Logistica
{
    public class Embarque : TenantEntity
    {
        public string Folio { get; set; } = string.Empty;
        public DateTime Fecha { get; set; } = DateTime.UtcNow;
        public string ClienteNombre { get; set; } = string.Empty;
        public string ClienteGrupo { get; set; } = string.Empty;
        public string DestinoEnvia { get; set; } = string.Empty;
    }
    
    public class EmbarqueDetalle : TenantEntity
    {
        public Guid EmbarqueId { get; set; }
        public virtual Embarque Embarque { get; set; } = null!;
        public string ProductoNombre { get; set; } = string.Empty;
    }
    
    public class EmbarquePallet : TenantEntity
    {
        public Guid EmbarqueId { get; set; }
        public virtual Embarque Embarque { get; set; } = null!;
        public Guid PaletId { get; set; }
        public virtual HiCone.Domain.Entities.Produccion.Palet? Palet { get; set; }
        public string NoPallet { get; set; } = string.Empty;
    }
}

namespace HiCone.Domain.Entities.SAE
{
    public class SaeOrder : TenantEntity { }
    public class SaeRemission : TenantEntity { }
    public class SaeCustomer : TenantEntity { }
    public class SaeProduct : TenantEntity { }
}
