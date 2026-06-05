using System.Security.Claims;
using HiCone.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace HiCone.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? UserId => _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    
    public string? Email => _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;

    public Guid? TenantId 
    {
        get 
        {
            var tenantId = _httpContextAccessor.HttpContext?.User?.FindFirst("tenantId")?.Value;
            return string.IsNullOrEmpty(tenantId) ? null : Guid.Parse(tenantId);
        }
    }

    public int? OperadorId 
    {
        get 
        {
            var operadorId = _httpContextAccessor.HttpContext?.User?.FindFirst("operadorId")?.Value;
            return string.IsNullOrEmpty(operadorId) ? null : int.Parse(operadorId);
        }
    }

    public IEnumerable<string> Permissions => 
        _httpContextAccessor.HttpContext?.User?.FindAll("permission").Select(c => c.Value) ?? Enumerable.Empty<string>();
}
