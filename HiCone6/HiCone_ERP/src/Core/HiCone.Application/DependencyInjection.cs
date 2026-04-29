using System.Reflection;
using HiCone.Application.Services.Identity;
using HiCone.Application.Services.Inventario;
using Microsoft.Extensions.DependencyInjection;

namespace HiCone.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        // Application Services
        services.AddScoped<IIdentityService, IdentityService>();
        services.AddScoped<IInventarioService, InventarioService>();
        
        return services;
    }
}
