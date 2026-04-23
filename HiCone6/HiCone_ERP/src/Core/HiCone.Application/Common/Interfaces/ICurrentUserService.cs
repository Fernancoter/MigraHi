namespace HiCone.Application.Common.Interfaces;

public interface ICurrentUserService
{
    string? UserId { get; }
    string? Email { get; }
    Guid? TenantId { get; }
    int? OperadorId { get; }
    IEnumerable<string> Permissions { get; }
}
