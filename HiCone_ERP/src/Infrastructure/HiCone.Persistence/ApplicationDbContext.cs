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
using HiCone.Domain.Entities.Common;
using HiCone.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // ── Identity & Tenant ────────────────────────────────────────────────
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<TenantSetting> TenantSettings => Set<TenantSetting>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<SecurityApplication> SecurityApplications => Set<SecurityApplication>();
    public DbSet<SecurityApplicationPermission> SecurityApplicationPermissions => Set<SecurityApplicationPermission>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<UserTenant> UserTenants => Set<UserTenant>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

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
    public DbSet<TroquelProducto> TroquelProductos => Set<TroquelProducto>();
    public DbSet<Operario> Operarios => Set<Operario>();
    public DbSet<Operador> Operadores => Set<Operador>();
    public DbSet<Turno> Turnos => Set<Turno>();
    public DbSet<CausaInterrupcion> CausasInterrupcion => Set<CausaInterrupcion>();
    public DbSet<ConfiguracionSistema> ConfiguracionesSistema => Set<ConfiguracionSistema>();


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
    public DbSet<SaeBudget> SaeBudgets => Set<SaeBudget>();
    public DbSet<SaeSalesPerson> SaeSalesPersons => Set<SaeSalesPerson>();

    // Retrocompatibilidad con el módulo de configuración de producción
    public DbSet<SiloProduccion> SilosProduccion => Set<SiloProduccion>();
    public DbSet<CatEstadoMaterial> CatEstadosMaterial => Set<CatEstadoMaterial>();
    public DbSet<CatTipoMaterial> CatTiposMaterial => Set<CatTipoMaterial>();
    public DbSet<CatalogoClave> CatalogoClaves => Set<CatalogoClave>();
    public DbSet<ExtrusoraOperario> ExtrusoraOperarios => Set<ExtrusoraOperario>();
    public DbSet<IdempotencyRecord> IdempotencyRecords => Set<IdempotencyRecord>();

    // ── Retrocompatibilidad con Maquina ────────────────────────────────────

    public DbSet<Maquina> Maquinas => Set<Maquina>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdempotencyRecord>(b =>
        {
            b.ToTable("idempotency_records");
            b.HasKey(e => e.Key);
            b.Property(e => e.Key).HasMaxLength(128);
            b.Property(e => e.Path).HasMaxLength(255);
            b.Property(e => e.Method).HasMaxLength(10);
            b.Property(e => e.ResponseContentType).HasMaxLength(100);
            b.HasIndex(e => e.ExpiresAt);
        });

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        // Global query filters for Soft Delete
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDeletable).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = System.Linq.Expressions.Expression.Parameter(entityType.ClrType, "e");
                var property = System.Linq.Expressions.Expression.Property(parameter, nameof(ISoftDeletable.IsDeleted));
                var condition = System.Linq.Expressions.Expression.Equal(property, System.Linq.Expressions.Expression.Constant(false));
                var lambda = System.Linq.Expressions.Expression.Lambda(condition, parameter);

                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
            }
        }
    }
}


