using HiCone.Application.Common.Interfaces;
using HiCone.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HiCone.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTransient<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddScoped<ICurrentTenantService, CurrentTenantService>();

        return services;
    }
}

public class CurrentTenantService : ICurrentTenantService
{
    private readonly ICurrentUserService _currentUserService;

    public CurrentTenantService(ICurrentUserService currentUserService)
    {
        _currentUserService = currentUserService;
    }

    public Guid? TenantId => _currentUserService.TenantId;
}
