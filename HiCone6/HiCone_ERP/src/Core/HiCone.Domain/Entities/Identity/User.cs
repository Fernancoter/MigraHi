using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Identity;

public class User : TenantEntity
{
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? PhoneNumber { get; set; }
    public string? AvatarUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public bool EmailConfirmed { get; set; }
    public DateTime? LastLoginAt { get; set; }

    // Perfil de usuario (Migración GAM)
    public string? Gender { get; set; }            // M, F, O (Otro)
    public string? AuthenticationType { get; set; } // Local, GAM, LDAP, Google

    // Business Context (Legacy Alignment)
    public int? OperadorId { get; set; } 
    public int? CompanyId { get; set; }
    public string? Namespace { get; set; }
    public string? ExternalId { get; set; }
    public DateTime? Birthday { get; set; }
    public DateTime? ActivationDate { get; set; }
    public bool ReceivesInformation { get; set; } = true;
    public bool CannotChangePassword { get; set; } = false;
    public bool PasswordNeverExpires { get; set; } = false;
    public string? SecurityPolicyId { get; set; }
    public bool IsRepositoryEnabled { get; set; } = true;
    
    // Security State
    public bool MustChangePassword { get; set; }
    public DateTime? PasswordExpiresAt { get; set; }
    public int AccessFailedCount { get; set; }
    public bool IsLockedOut { get; set; }
    public DateTime? LockoutEnd { get; set; }

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public virtual ICollection<UserTenant> UserTenants { get; set; } = new List<UserTenant>();
}

public class UserRole
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

    public virtual User User { get; set; } = null!;
    public virtual Role Role { get; set; } = null!;
}

public class UserTenant
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid TenantId { get; set; }
    public bool IsDefault { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

    public virtual User User { get; set; } = null!;
}

public class RefreshToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Token { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? RevokedAt { get; set; }
    public string? ReplacedBy { get; set; }
    public string? DeviceInfo { get; set; }

    public virtual User User { get; set; } = null!;
}
