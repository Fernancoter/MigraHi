using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.SAE;

/// <summary>Orden de venta sincronizada desde SAE (lectura).</summary>
public class SaeOrder : TenantEntity
{
    public string OrderDoc { get; set; } = null!;
    public DateTime OrderDate { get; set; }
    public DateTime? OrderDeliveryDate { get; set; }
    public string? CustomerCode { get; set; }
    public string? CustomerName { get; set; }
    public string? SalesPersonCode { get; set; }
    public string? Shipping { get; set; }                   // Dirección de envío
    public decimal TotalAmount { get; set; }
    public bool Procesada { get; set; } = false;
    public DateTime? FechaSincronizacion { get; set; }
}

/// <summary>Remisión sincronizada desde SAE (lectura).</summary>
public class SaeRemission : TenantEntity
{
    public string RemissionDoc { get; set; } = null!;
    public string OrderDoc { get; set; } = null!;
    public DateTime RemissionDate { get; set; }
    public string? ProductNumber { get; set; }
    public decimal Quantity { get; set; }
    public string? CustomerCode { get; set; }
    public string? CustomerName { get; set; }
    public string? Shipping { get; set; }
    public string? ConsolidatedName { get; set; }           // Grupo de cliente
    public string? CustomerShipping { get; set; }
    public DateTime? FechaSincronizacion { get; set; }
}

/// <summary>Cliente sincronizado desde SAE.</summary>
public class SaeCustomer : TenantEntity
{
    public string CustomerCode { get; set; } = null!;
    public string CustomerName { get; set; } = null!;
    public string? ConsolidatedName { get; set; }
    public string? Shipping { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? RFC { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? FechaSincronizacion { get; set; }
}

/// <summary>Producto sincronizado desde SAE.</summary>
public class SaeProduct : TenantEntity
{
    public string ProductNumber { get; set; } = null!;
    public string ProductName { get; set; } = null!;
    public string? Unit { get; set; }
    public decimal Price { get; set; }
    public decimal Cost { get; set; }
    public string? TipoProducto { get; set; }
    public string? Packaging { get; set; }
    public string? SubProductType { get; set; }
    public decimal Exist { get; set; }
    public string? Group { get; set; }
    public decimal PiecesPlt { get; set; }
    public string? Product8020 { get; set; }
    public int Pallets { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? FechaSincronizacion { get; set; }
}

/// <summary>Presupuesto mensual por cliente y producto.</summary>
public class SaeBudget : TenantEntity
{
    public string CustomerCode { get; set; } = null!;
    public string? CustomerName { get; set; }
    public string? ConsolidatedName { get; set; }
    public string ProductNumber { get; set; } = null!;
    public int BudgetYear { get; set; }
    public int BudgetMonth { get; set; }
    public decimal BudgetEstimated { get; set; }
    public decimal BudgetReal { get; set; }
    public decimal BudgetOutlook { get; set; }
    public decimal BudgetPrice { get; set; }
    public decimal BudgetPriceOutlook { get; set; }
}
