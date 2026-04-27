using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Inventario;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Tenant;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace HiCone.Persistence.Seeds;

public class ApplicationDbContextSeeder
{
    private readonly ILogger<ApplicationDbContextSeeder> _logger;
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public ApplicationDbContextSeeder(ILogger<ApplicationDbContextSeeder> logger, ApplicationDbContext context, IConfiguration configuration)
    {
        _logger = logger;
        _context = context;
        _configuration = configuration;
    }

    public async Task SeedAsync()
    {
        try
        {
            await _context.Database.MigrateAsync();
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default Tenant
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        if (!await _context.Tenants.AnyAsync(t => t.Id == defaultTenantId))
        {
            var defaultTenant = new Tenant
            {
                Id = defaultTenantId,
                Name = "HiCone ERP Default",
                Slug = "default",
                Description = "Default corporate tenant",
                IsActive = true
            };
            _context.Tenants.Add(defaultTenant);
        }

        // Permissions
        var permissions = new List<Permission>
        {
            new() { Module = "Users", Name = "Read Users", Code = "users.read" },
            new() { Module = "Users", Name = "Create Users", Code = "users.create" },
            new() { Module = "Users", Name = "Update Users", Code = "users.update" },
            new() { Module = "Users", Name = "Delete Users", Code = "users.delete" },
            new() { Module = "Inventory", Name = "Read Inventory", Code = "inventory.read" },
            new() { Module = "Inventory", Name = "Manage Inventory", Code = "inventory.manage" }
        };

        foreach (var p in permissions)
        {
            if (!await _context.Permissions.AnyAsync(existing => existing.Code == p.Code))
            {
                _context.Permissions.Add(p);
            }
        }

        await _context.SaveChangesAsync(default);

        // Roles
        if (!await _context.Roles.AnyAsync(r => r.Name == "SuperAdmin"))
        {
            var superAdminRole = new Role
            {
                Name = "SuperAdmin",
                Description = "Full system access",
                IsSystem = true
            };
            
            _context.Roles.Add(superAdminRole);
            await _context.SaveChangesAsync(default);

            var allPermissions = await _context.Permissions.ToListAsync();
            foreach (var p in allPermissions)
            {
                _context.RolePermissions.Add(new RolePermission { RoleId = superAdminRole.Id, PermissionId = p.Id });
            }
        }

        await _context.SaveChangesAsync(default);

        // Admin User
        var adminSection = _configuration.GetSection("Seed:Admin");
        var adminUsername = adminSection["Username"] ?? "admin";
        var adminEmail = adminSection["Email"] ?? "admin@hicone.com";
        var adminFirstName = adminSection["FirstName"] ?? "Admin";
        var adminLastName = adminSection["LastName"] ?? "HiCone";
        var adminOperadorId = int.TryParse(adminSection["OperadorId"], out var opId) ? opId : 1;
        var adminPassword = adminSection["Password"];

        if (string.IsNullOrWhiteSpace(adminPassword))
        {
            _logger.LogWarning("Seed:Admin:Password not configured. Skipping admin user creation. Set it via appsettings.Development.json or the SEED__ADMIN__PASSWORD env var.");
        }
        else if (!await _context.Users.AnyAsync(u => u.Email == adminEmail))
        {
            var superAdminRole = await _context.Roles.FirstAsync(r => r.Name == "SuperAdmin");

            var adminUser = new User
            {
                Username = adminUsername,
                Email = adminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                FirstName = adminFirstName,
                LastName = adminLastName,
                TenantId = defaultTenantId,
                OperadorId = adminOperadorId,
                MustChangePassword = false,
                EmailConfirmed = true
            };

            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync(default);

            _context.UserRoles.Add(new UserRole { UserId = adminUser.Id, RoleId = superAdminRole.Id });
            _context.UserTenants.Add(new UserTenant { UserId = adminUser.Id, TenantId = defaultTenantId, IsDefault = true });
        }

        await _context.SaveChangesAsync(default);

        // Articulos
        if (!await _context.Articulos.AnyAsync())
        {
            var categoria = new Categoria { Nombre = "Electrónica", TenantId = defaultTenantId };
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync(default);

            _context.Articulos.AddRange(
                new Articulo { Codigo = "ART-001", Nombre = "Laptop Gaming X", Precio = 25000, Existencia = 15, CategoriaId = categoria.Id, TenantId = defaultTenantId },
                new Articulo { Codigo = "ART-002", Nombre = "Monitor 4K 27\"", Precio = 8500, Existencia = 8, CategoriaId = categoria.Id, TenantId = defaultTenantId },
                new Articulo { Codigo = "ART-003", Nombre = "Teclado Mecánico RGB", Precio = 1200, Existencia = 25, CategoriaId = categoria.Id, TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        // Produccion
        if (!await _context.Palets.AnyAsync())
        {
            var palet = new Palet 
            { 
                Codigo = "PAL-2024-001", 
                Tipo = "Estándar 1.2m", 
                HoraInicioEnsamble = DateTime.UtcNow.AddHours(-2),
                Estado = "En Proceso",
                TenantId = defaultTenantId 
            };
            _context.Palets.Add(palet);
            await _context.SaveChangesAsync(default);

            _context.Bobinas.AddRange(
                new Bobina { Codigo = "BOB-A101", PesoNeto = 45.5m, Metros = 1200, FechaProduccion = DateTime.UtcNow.AddMinutes(-45), Turno = "Matutino", PaletId = palet.Id, TenantId = defaultTenantId },
                new Bobina { Codigo = "BOB-A102", PesoNeto = 46.2m, Metros = 1210, FechaProduccion = DateTime.UtcNow.AddMinutes(-10), Turno = "Matutino", PaletId = palet.Id, TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }
    }
}
