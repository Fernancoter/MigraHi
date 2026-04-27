using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.SAE;

// Espejo sincronizado de SAE: cliente externo
public class SaeCustomer : TenantEntity
{
    public string CodigoExterno { get; set; } = null!; // ID en SAE
    public string Nombre { get; set; } = null!;
    public string? Rfc { get; set; }
    public string? Direccion { get; set; }
    public bool Activo { get; set; } = true;
    public DateTime? UltimaSincronizacion { get; set; }
}

// Espejo sincronizado de SAE: producto externo
public class SaeProduct : TenantEntity
{
    public string CodigoExterno { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? UnidadMedida { get; set; }
    public decimal Precio { get; set; }
    public decimal Existencia { get; set; }
    public bool Activo { get; set; } = true;
    public DateTime? UltimaSincronizacion { get; set; }
}

// Espejo sincronizado de SAE: pedido (legacy: DB.Order)
public class SaeOrder : TenantEntity
{
    public string OrderDoc { get; set; } = null!;
    public string? OrderNumPar { get; set; }
    public string? OrderKey { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime? DeliveryDate { get; set; }

    public Guid? CustomerId { get; set; }
    public string? CustomerCodigo { get; set; }

    public decimal Cantidad { get; set; }
    public decimal Total { get; set; }
    public string Estado { get; set; } = "Abierta"; // Abierta, Parcial, Cerrada, Cancelada
    public DateTime? UltimaSincronizacion { get; set; }
}

// Espejo sincronizado de SAE: remisión (legacy: DB.Remission)
public class SaeRemission : TenantEntity
{
    public string RemissionDoc { get; set; } = null!;
    public DateTime RemissionDate { get; set; }
    public decimal Cantidad { get; set; }
    public decimal Pxs { get; set; }
    public decimal Precio { get; set; }
    public decimal Total { get; set; }

    public Guid? CustomerId { get; set; }
    public string? OrderDoc { get; set; }
    public DateTime? UltimaSincronizacion { get; set; }
}
