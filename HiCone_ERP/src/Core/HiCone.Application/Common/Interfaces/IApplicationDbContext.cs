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
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    // ── Identity & Tenant ────────────────────────────────────────────────
    DbSet<Tenant> Tenants { get; }
    DbSet<TenantSetting> TenantSettings { get; }
    DbSet<User> Users { get; }
    DbSet<Role> Roles { get; }
    DbSet<Permission> Permissions { get; }
    DbSet<SecurityApplication> SecurityApplications { get; }
    DbSet<SecurityApplicationPermission> SecurityApplicationPermissions { get; }
    DbSet<RolePermission> RolePermissions { get; }
    DbSet<UserRole> UserRoles { get; }
    DbSet<UserTenant> UserTenants { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    DbSet<AuditLog> AuditLogs { get; }

    // ── Inventario ────────────────────────────────────────────────────────
    DbSet<Articulo> Articulos { get; }
    DbSet<Categoria> Categorias { get; }
    DbSet<Silo> Silos { get; }
    DbSet<Existencia> Existencias { get; }
    DbSet<ExistenciaSilo> ExistenciasSilos { get; }
    DbSet<ExistenciaProducto> ExistenciaProductos { get; }

    // ── Clientes ──────────────────────────────────────────────────────────
    DbSet<Cliente> Clientes { get; }

    // ── Ventas ────────────────────────────────────────────────────────────
    DbSet<Venta> Ventas { get; }
    DbSet<VentaDetalle> VentaDetalles { get; }

    // ── Produccion — Catálogos Base ──────────────────────────────────────
    DbSet<Extrusora> Extrusoras { get; }
    DbSet<ExtrusoraProducto> ExtrusoraProductos { get; }
    DbSet<ExtrusoraMezcladora> ExtrusoraMezcladoras { get; }
    DbSet<Prensa> Prensas { get; }
    DbSet<PrensaProducto> PrensaProductos { get; }
    DbSet<Troquel> Troqueles { get; }
    DbSet<PrensaTroquel> PrensaTroqueles { get; }
    DbSet<TroquelProducto> TroquelProductos { get; }
    DbSet<Operario> Operarios { get; }
    DbSet<Operador> Operadores { get; }
    DbSet<Turno> Turnos { get; }
    DbSet<CausaInterrupcion> CausasInterrupcion { get; }
    DbSet<ConfiguracionSistema> ConfiguracionesSistema { get; }


    // ── Produccion — Catálogos Productos ─────────────────────────────────
    DbSet<Producto> Productos { get; }
    DbSet<ProductoCategoria> ProductoCategorias { get; }
    DbSet<ProductoTerminado> ProductosTerminados { get; }

    // ── Produccion — Extrusión ────────────────────────────────────────────
    DbSet<Extrusion> Extrusiones { get; }
    DbSet<ExtrusionResultado> ExtrusionResultados { get; }
    DbSet<ExtrusionInterrupcion> ExtrusionInterrupciones { get; }
    DbSet<Bobina> Bobinas { get; }
    DbSet<Lote> Lotes { get; }

    // ── Produccion — Prensado ─────────────────────────────────────────────
    DbSet<Prensado> Prensados { get; }
    DbSet<PrensadoBobina> PrensadoBobinas { get; }
    DbSet<PrensadoResultado> PrensadoResultados { get; }
    DbSet<PrensadoInterrupcion> PrensadoInterrupciones { get; }
    DbSet<Carrera> Carreras { get; }
    DbSet<Carrete> Carretes { get; }
    DbSet<Palet> Palets { get; }
    DbSet<PaletCarrete> PaletCarretes { get; }
    DbSet<OrdenEtiquetado> OrdenesEtiquetado { get; }

    // Retrocompatibilidad
    DbSet<Maquina> Maquinas { get; }

    // ── Logística ──────────────────────────────────────────────────────────
    DbSet<Embarque> Embarques { get; }
    DbSet<EmbarqueDetalle> EmbarqueDetalles { get; }
    DbSet<EmbarquePallet> EmbarquePallets { get; }

    // ── Calidad ────────────────────────────────────────────────────────────
    DbSet<InspeccionCalidad> InspeccionesCalidad { get; }
    DbSet<Reclamo> Reclamos { get; }
    DbSet<ReclamoDetalle> ReclamoDetalles { get; }
    DbSet<CarreteDefecto> CarreteDefectos { get; }

    // ── SAE ────────────────────────────────────────────────────────────────
    DbSet<SaeOrder> SaeOrders { get; }
    DbSet<SaeRemission> SaeRemissions { get; }
    DbSet<SaeCustomer> SaeCustomers { get; }
    DbSet<SaeProduct> SaeProducts { get; }
    DbSet<SaeBudget> SaeBudgets { get; }
    DbSet<SaeSalesPerson> SaeSalesPersons { get; }

    // Retrocompatibilidad con el módulo de configuración de producción
    DbSet<SiloProduccion> SilosProduccion { get; }
    DbSet<CatEstadoMaterial> CatEstadosMaterial { get; }
    DbSet<CatTipoMaterial> CatTiposMaterial { get; }
    DbSet<CatalogoClave> CatalogoClaves { get; }
    DbSet<ExtrusoraOperario> ExtrusoraOperarios { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

