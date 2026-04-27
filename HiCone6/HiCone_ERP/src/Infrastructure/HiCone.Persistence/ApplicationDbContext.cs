using System.Reflection;
using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Common;
using HiCone.Domain.Entities.Calidad;
using HiCone.Domain.Entities.Clientes;
using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Inventario;
using HiCone.Domain.Entities.Logistica;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.SAE;
using HiCone.Domain.Entities.Tenant;
using HiCone.Domain.Entities.Ventas;
using HiCone.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    private readonly ICurrentTenantService? _currentTenantService;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ICurrentTenantService currentTenantService)
        : base(options)
    {
        _currentTenantService = currentTenantService;
    }

    // ── Identity & Tenant ────────────────────────────────────────────────
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<TenantSetting> TenantSettings => Set<TenantSetting>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<UserTenant> UserTenants => Set<UserTenant>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    // ── Inventario ────────────────────────────────────────────────────────
    public DbSet<Articulo> Articulos => Set<Articulo>();
    public DbSet<Silo> Silos => Set<Silo>();
    public DbSet<Existencia> Existencias => Set<Existencia>();
    public DbSet<ExistenciaSilo> ExistenciasSilos => Set<ExistenciaSilo>();
    public DbSet<ExistenciaProducto> ExistenciaProductos => Set<ExistenciaProducto>();
    public DbSet<Categoria> Categorias => Set<Categoria>();

    // ── Clientes ──────────────────────────────────────────────────────────
    public DbSet<Cliente> Clientes => Set<Cliente>();

    // ── Ventas ────────────────────────────────────────────────────────────
    public DbSet<Venta> Ventas => Set<Venta>();
    public DbSet<VentaDetalle> VentaDetalles => Set<VentaDetalle>();

    // ── Produccion — Catálogos Base ──────────────────────────────────────
    public DbSet<Extrusora> Extrusoras => Set<Extrusora>();
    public DbSet<ExtrusoraProducto> ExtrusoraProductos => Set<ExtrusoraProducto>();
    public DbSet<ExtrusoraMezcladora> ExtrusoraMezcladoras => Set<ExtrusoraMezcladora>();
    public DbSet<Prensa> Prensas => Set<Prensa>();
    public DbSet<PrensaProducto> PrensaProductos => Set<PrensaProducto>();
    public DbSet<Troquel> Troqueles => Set<Troquel>();
    public DbSet<PrensaTroquel> PrensaTroqueles => Set<PrensaTroquel>();
    public DbSet<Operario> Operarios => Set<Operario>();
    public DbSet<Turno> Turnos => Set<Turno>();
    public DbSet<CausaInterrupcion> CausasInterrupcion => Set<CausaInterrupcion>();

    // ── Produccion — Catálogos Productos ─────────────────────────────────
    public DbSet<Producto> Productos => Set<Producto>();
    public DbSet<ProductoCategoria> ProductoCategorias => Set<ProductoCategoria>();
    public DbSet<ProductoTerminado> ProductosTerminados => Set<ProductoTerminado>();

    // ── Produccion — Extrusión ────────────────────────────────────────────
    public DbSet<Extrusion> Extrusiones => Set<Extrusion>();
    public DbSet<ExtrusionResultado> ExtrusionResultados => Set<ExtrusionResultado>();
    public DbSet<ExtrusionInterrupcion> ExtrusionInterrupciones => Set<ExtrusionInterrupcion>();
    public DbSet<Bobina> Bobinas => Set<Bobina>();
    public DbSet<Lote> Lotes => Set<Lote>();

    // ── Produccion — Prensado ─────────────────────────────────────────────
    public DbSet<Prensado> Prensados => Set<Prensado>();
    public DbSet<PrensadoBobina> PrensadoBobinas => Set<PrensadoBobina>();
    public DbSet<PrensadoResultado> PrensadoResultados => Set<PrensadoResultado>();
    public DbSet<PrensadoInterrupcion> PrensadoInterrupciones => Set<PrensadoInterrupcion>();
    public DbSet<Carrera> Carreras => Set<Carrera>();
    public DbSet<Carrete> Carretes => Set<Carrete>();
    public DbSet<Palet> Palets => Set<Palet>();
    public DbSet<PaletCarrete> PaletCarretes => Set<PaletCarrete>();
    public DbSet<OrdenEtiquetado> OrdenesEtiquetado => Set<OrdenEtiquetado>();

    // ── Logística ─────────────────────────────────────────────────────────
    public DbSet<Embarque> Embarques => Set<Embarque>();
    public DbSet<EmbarqueDetalle> EmbarqueDetalles => Set<EmbarqueDetalle>();
    public DbSet<EmbarquePallet> EmbarquePallets => Set<EmbarquePallet>();

    // ── Calidad ────────────────────────────────────────────────────────────
    public DbSet<InspeccionCalidad> InspeccionesCalidad => Set<InspeccionCalidad>();
    public DbSet<Reclamo> Reclamos => Set<Reclamo>();
    public DbSet<ReclamoDetalle> ReclamoDetalles => Set<ReclamoDetalle>();
    public DbSet<CarreteDefecto> CarreteDefectos => Set<CarreteDefecto>();

    // ── SAE (espejo sincronizado) ──────────────────────────────────────────
    public DbSet<SaeOrder> SaeOrders => Set<SaeOrder>();
    public DbSet<SaeRemission> SaeRemissions => Set<SaeRemission>();
    public DbSet<SaeCustomer> SaeCustomers => Set<SaeCustomer>();
    public DbSet<SaeProduct> SaeProducts => Set<SaeProduct>();

    // ── Retrocompatibilidad con Maquina ────────────────────────────────────
    public DbSet<Maquina> Maquinas => Set<Maquina>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        // Global query filter that combines Soft Delete + Tenant scoping where applicable.
        // For TenantEntity-derived types we filter by current tenantId and ignore rows of other tenants.
        // The filter resolves at query time via the captured _currentTenantService field, so each request
        // sees only its own tenant's data even if it tries to query directly.
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var clrType = entityType.ClrType;
            var isSoftDeletable = typeof(ISoftDeletable).IsAssignableFrom(clrType);
            var isTenantScoped = typeof(TenantEntity).IsAssignableFrom(clrType);

            if (!isSoftDeletable && !isTenantScoped) continue;

            var parameter = System.Linq.Expressions.Expression.Parameter(clrType, "e");
            System.Linq.Expressions.Expression? body = null;

            if (isSoftDeletable)
            {
                var prop = System.Linq.Expressions.Expression.Property(parameter, nameof(ISoftDeletable.IsDeleted));
                body = System.Linq.Expressions.Expression.Equal(prop, System.Linq.Expressions.Expression.Constant(false));
            }

            if (isTenantScoped)
            {
                // e.TenantId == _currentTenantService.TenantId (or no filter when service is unavailable / system context)
                var tenantProp = System.Linq.Expressions.Expression.Property(parameter, nameof(TenantEntity.TenantId));
                var contextRef = System.Linq.Expressions.Expression.Constant(this);
                var serviceField = typeof(ApplicationDbContext).GetField("_currentTenantService",
                    System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic)!;
                var serviceAccess = System.Linq.Expressions.Expression.Field(contextRef, serviceField);

                // ScopedTenantId(serviceAccess) == e.TenantId  OR  serviceAccess == null  (system access)
                var helperMethod = typeof(ApplicationDbContext).GetMethod(nameof(IsTenantMatch),
                    System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic)!;
                var tenantCheck = System.Linq.Expressions.Expression.Call(helperMethod, serviceAccess, tenantProp);

                body = body == null ? tenantCheck : System.Linq.Expressions.Expression.AndAlso(body, tenantCheck);
            }

            if (body != null)
            {
                var lambda = System.Linq.Expressions.Expression.Lambda(body, parameter);
                modelBuilder.Entity(clrType).HasQueryFilter(lambda);
            }
        }
    }

    private static bool IsTenantMatch(ICurrentTenantService? service, Guid entityTenantId)
    {
        if (service is null) return true;                       // bootstrap / migrations / seeders
        var current = service.TenantId;
        if (current is null || current == Guid.Empty) return true; // unauthenticated / system jobs
        return current == entityTenantId;
    }
}
