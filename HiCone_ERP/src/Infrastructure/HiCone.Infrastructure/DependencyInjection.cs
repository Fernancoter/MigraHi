using HiCone.Application.Common.Interfaces;
using HiCone.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace HiCone.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTransient<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddScoped<ICurrentTenantService, CurrentTenantService>();
        services.AddScoped<IAuthService, AuthService>();

        var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? "HiCone_Super_Secret_Key_For_JWT_Auth_2026");

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["Jwt:Issuer"] ?? "HiConeERP",
                ValidAudience = configuration["Jwt:Audience"] ?? "HiConeERP",
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };
        });

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
