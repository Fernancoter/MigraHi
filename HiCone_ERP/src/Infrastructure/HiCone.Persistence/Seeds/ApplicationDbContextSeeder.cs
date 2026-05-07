using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Inventario;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Tenant;
using HiCone.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HiCone.Persistence.Seeds;

public class ApplicationDbContextSeeder
{
    private readonly ILogger<ApplicationDbContextSeeder> _logger;
    private readonly ApplicationDbContext _context;

    public ApplicationDbContextSeeder(ILogger<ApplicationDbContextSeeder> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task SeedAsync()
    {
        try
        {
            // Nota: En desarrollo usamos EnsureCreated para rapidez, 
            // pero lo ideal son migraciones.
            await _context.Database.EnsureCreatedAsync();
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
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        
        // 1. Tenant Base
        if (!await _context.Tenants.AnyAsync())
        {
            _context.Tenants.Add(new Tenant { Id = defaultTenantId, Name = "HiCone ERP Corporate", Slug = "default", IsActive = true });
            await _context.SaveChangesAsync(default);
        }

        // 2. Catálogos de Personal (Operarios y Turnos)
        if (!await _context.Turnos.AnyAsync())
        {
            _context.Turnos.AddRange(
                new Turno { Nombre = "Matutino", HoraInicio = new TimeSpan(6, 0, 0), HoraFin = new TimeSpan(14, 0, 0), TenantId = defaultTenantId },
                new Turno { Nombre = "Vespertino", HoraInicio = new TimeSpan(14, 0, 0), HoraFin = new TimeSpan(22, 0, 0), TenantId = defaultTenantId },
                new Turno { Nombre = "Nocturno", HoraInicio = new TimeSpan(22, 0, 0), HoraFin = new TimeSpan(6, 0, 0), TenantId = defaultTenantId }
            );

            _context.Operarios.AddRange(
                new Operario { NumeroEmpleado = "OP-001", NombreCompleto = "Juan Producción", Especialidad = "Extrusión", TenantId = defaultTenantId },
                new Operario { NumeroEmpleado = "OP-002", NombreCompleto = "Pedro Prensa", Especialidad = "Prensado", TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        // 3. Catálogo de Maquinaria (Extrusoras y Prensas)
        if (!await _context.Extrusoras.AnyAsync())
        {
            _context.Extrusoras.AddRange(
                new Extrusora { Codigo = "EXT-01", Nombre = "Extrusora Principal #1", CapacidadKgHora = 150, NumeroEstaciones = 1, Estado = EstadoExtrusora.Disponible, TenantId = defaultTenantId },
                new Extrusora { Codigo = "EXT-02", Nombre = "Extrusora Secundaria #2", CapacidadKgHora = 120, NumeroEstaciones = 1, Estado = EstadoExtrusora.Disponible, TenantId = defaultTenantId }
            );

            _context.Prensas.AddRange(
                new Prensa { Codigo = "PRE-A1", Nombre = "Prensa Hidráulica A1", Estado = EstadoPrensa.Disponible, TenantId = defaultTenantId },
                new Prensa { Codigo = "PRE-B2", Nombre = "Prensa Hidráulica B2", Estado = EstadoPrensa.Disponible, TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        // 4. Catálogos de Productos
        if (!await _context.Productos.AnyAsync())
        {
            var cat1 = new ProductoCategoria { Nombre = "Bobinas de Empaque", TenantId = defaultTenantId };
            _context.ProductoCategorias.Add(cat1);
            await _context.SaveChangesAsync(default);

            var prod1 = new Producto 
            { 
                Codigo = "BOB-4-STD", 
                Nombre = "Bobina 4\" Estándar", 
                Calibre = 0.05m, 
                Ancho = 100, 
                Longitud = 1000, 
                CategoriaId = cat1.Id, 
                TenantId = defaultTenantId 
            };
            var prod2 = new Producto 
            { 
                Codigo = "BOB-6-PREM", 
                Nombre = "Bobina 6\" Premium", 
                Calibre = 0.08m, 
                Ancho = 150, 
                Longitud = 800, 
                CategoriaId = cat1.Id, 
                TenantId = defaultTenantId 
            };
            _context.Productos.AddRange(prod1, prod2);
            await _context.SaveChangesAsync(default);
        }

        // 5. Catálogo de Troqueles
        if (!await _context.Troqueles.AnyAsync())
        {
            _context.Troqueles.AddRange(
                new Troquel { Codigo = "TRQ-001", Nombre = "Troquel 12 Cavidades", Estado = EstadoTroquel.Disponible, TenantId = defaultTenantId },
                new Troquel { Codigo = "TRQ-002", Nombre = "Troquel 24 Cavidades High-Speed", Estado = EstadoTroquel.Disponible, TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        // 6. Causas de Interrupción
        if (!await _context.CausasInterrupcion.AnyAsync())
        {
            _context.CausasInterrupcion.AddRange(
                new CausaInterrupcion { Codigo = "P-MECC", Descripcion = "Falla Mecánica", Tipo = "Mecánica", TenantId = defaultTenantId },
                new CausaInterrupcion { Codigo = "P-MAT", Descripcion = "Falta de Material", Tipo = "Suministro", TenantId = defaultTenantId },
                new CausaInterrupcion { Codigo = "P-OPER", Descripcion = "Cambio de Turno / Operador", Tipo = "Operación", TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        // 7. Silos e Inventario Inicial
        if (!await _context.Silos.AnyAsync())
        {
            _context.Silos.AddRange(
                new Silo { Codigo = "SILO-01", Nombre = "Silo Principal Virgen", CapacidadMaxima = 50000, ExistenciaActual = 25000, Estado = "Operativo", TenantId = defaultTenantId },
                new Silo { Codigo = "SILO-02", Nombre = "Silo Molido Interno", CapacidadMaxima = 20000, ExistenciaActual = 4500, Estado = "Operativo", TenantId = defaultTenantId }
            );
            await _context.SaveChangesAsync(default);
        }

        // 8. Seguridad (Roles, Permisos y Usuario Admin)
        if (!await _context.Roles.AnyAsync())
        {
            // Permisos (Functionality Keys)
            var pSilosView = new Permission { Module = "Inventario", Name = "Ver Silos", Code = "Silo_View", Description = "Ver lista de silos" };
            var pSilosAdd = new Permission { Module = "Inventario", Name = "Agregar Silo", Code = "Silo_Add" };
            var pLotesAdd = new Permission { Module = "Inventario", Name = "Agregar Lote", Code = "Lote_Add" };
            var pSecUsers = new Permission { Module = "Seguridad", Name = "Gestionar Usuarios", Code = "User_Manage" };
            
            _context.Permissions.AddRange(pSilosView, pSilosAdd, pLotesAdd, pSecUsers);
            await _context.SaveChangesAsync(default);

            // Roles
            var adminRole = new Role { Name = "Administrador", Description = "Acceso Total", IsSystem = true, TenantId = defaultTenantId };
            var operRole = new Role { Name = "Operador", Description = "Operaciones de Producción", TenantId = defaultTenantId };
            
            _context.Roles.AddRange(adminRole, operRole);
            await _context.SaveChangesAsync(default);

            // Asignar Permisos a Admin
            _context.RolePermissions.AddRange(
                new RolePermission { RoleId = adminRole.Id, PermissionId = pSilosView.Id },
                new RolePermission { RoleId = adminRole.Id, PermissionId = pSilosAdd.Id },
                new RolePermission { RoleId = adminRole.Id, PermissionId = pLotesAdd.Id },
                new RolePermission { RoleId = adminRole.Id, PermissionId = pSecUsers.Id }
            );

            // Usuario Admin Inicial
            var adminUser = new User
            {
                Email = "admin@hicone.com",
                PasswordHash = "Admin123!",
                FirstName = "Admin",
                LastName = "HiCone",
                IsActive = true,
                CompanyId = 1,
                OperadorId = 0,
                TenantId = defaultTenantId
            };
            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync(default);

            _context.UserRoles.Add(new UserRole { UserId = adminUser.Id, RoleId = adminRole.Id });
            await _context.SaveChangesAsync(default);
        }

        _logger.LogInformation("Database Seeding completed successfully.");
    }
}
