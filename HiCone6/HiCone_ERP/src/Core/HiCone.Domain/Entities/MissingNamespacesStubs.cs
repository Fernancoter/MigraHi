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
    public class Embarque : TenantEntity { }
    public class EmbarqueDetalle : TenantEntity { }
    public class EmbarquePallet : TenantEntity { }
}

namespace HiCone.Domain.Entities.SAE
{
    public class SaeOrder : TenantEntity { }
    public class SaeRemission : TenantEntity { }
    public class SaeCustomer : TenantEntity { }
    public class SaeProduct : TenantEntity { }
}
