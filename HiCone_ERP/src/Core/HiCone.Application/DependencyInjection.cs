using System.Reflection;
using HiCone.Application.Interfaces;
using HiCone.Application.Services.Logistica;
using HiCone.Application.Services.Produccion;
using HiCone.Application.Services.SAE;
using HiCone.Application.Services.Calidad;
using Microsoft.Extensions.DependencyInjection;

namespace HiCone.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        // Core ERP Services
        services.AddScoped<IProduccionService, ProduccionService>();
        services.AddScoped<ILogisticaService, LogisticaService>();
        services.AddScoped<ICierreService, CierreService>();
        services.AddScoped<ISAEService, SAEService>();
        services.AddScoped<ICalidadService, CalidadService>();
        services.AddScoped<HiCone.Application.Services.Inventario.IInventarioService, HiCone.Application.Services.Inventario.InventarioService>();

        return services;
    }
}
