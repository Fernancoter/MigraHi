using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Identity;

public class Permission
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Module { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!; // unique
    public string? Description { get; set; }

    public virtual ICollection<SecurityApplicationPermission> SecurityApplicationPermissions { get; set; } = new List<SecurityApplicationPermission>();
}

public class SecurityApplication
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    
    public virtual ICollection<SecurityApplicationPermission> SecurityApplicationPermissions { get; set; } = new List<SecurityApplicationPermission>();
}

public class SecurityApplicationPermission
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SecurityApplicationId { get; set; }
    public Guid PermissionId { get; set; }

    public virtual SecurityApplication SecurityApplication { get; set; } = null!;
    public virtual Permission Permission { get; set; } = null!;
}

public class Role : BaseEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsSystem { get; set; }
    public Guid? TenantId { get; set; } // null = global role

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}

public class RolePermission
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RoleId { get; set; }
    public Guid PermissionId { get; set; }

    public virtual Role Role { get; set; } = null!;
    public virtual Permission Permission { get; set; } = null!;
}
