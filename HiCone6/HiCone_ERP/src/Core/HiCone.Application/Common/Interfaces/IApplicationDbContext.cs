using HiCone.Domain.Entities.Clientes;
using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Inventario;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Tenant;
using HiCone.Domain.Entities.Ventas;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Tenant> Tenants { get; }
    DbSet<TenantSetting> TenantSettings { get; }
    DbSet<User> Users { get; }
    DbSet<Role> Roles { get; }
    DbSet<Permission> Permissions { get; }
    DbSet<RolePermission> RolePermissions { get; }
    DbSet<UserRole> UserRoles { get; }
    DbSet<UserTenant> UserTenants { get; }
    DbSet<RefreshToken> RefreshTokens { get; }

    // Inventario
    DbSet<Articulo> Articulos { get; }
    DbSet<Categoria> Categorias { get; }

    // Clientes
    DbSet<Cliente> Clientes { get; }

    // Ventas
    DbSet<Venta> Ventas { get; }
    DbSet<VentaDetalle> VentaDetalles { get; }

    // Produccion
    DbSet<Bobina> Bobinas { get; }
    DbSet<Palet> Palets { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
