using HiCone.Application.Common.Interfaces;

namespace HiCone.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}

public class CurrentUserService : ICurrentUserService
{
    public string? UserId => "00000000-0000-0000-0000-000000000001"; // Seed Admin
    public string? Email => "admin@hicone.com";
    public Guid? TenantId => new Guid("00000000-0000-0000-0000-000000000001");
    public IEnumerable<string> Permissions => new List<string> { "users.read", "users.write", "inventory.read", "inventory.manage" };
}
