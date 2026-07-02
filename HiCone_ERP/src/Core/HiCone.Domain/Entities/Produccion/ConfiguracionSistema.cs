using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

public class ConfiguracionSistema : TenantEntity
{
    public string Key { get; set; } = null!;
    public string Valor { get; set; } = null!;
}
