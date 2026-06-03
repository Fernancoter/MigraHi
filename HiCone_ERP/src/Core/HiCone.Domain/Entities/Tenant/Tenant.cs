using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Tenant;

public class Tenant : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public string? LogoUrl { get; set; }

    public virtual ICollection<TenantSetting> Settings { get; set; } = new List<TenantSetting>();
}

public class TenantSetting : BaseEntity
{
    public Guid TenantId { get; set; }
    public string Key { get; set; } = null!;
    public string Value { get; set; } = null!;
    public string? DataType { get; set; }

    public virtual Tenant Tenant { get; set; } = null!;
}
