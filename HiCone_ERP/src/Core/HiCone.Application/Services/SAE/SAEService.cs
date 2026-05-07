using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.SAE;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace HiCone.Application.Services.SAE;

public class SAEService : ISAEService
{
    private readonly IApplicationDbContext _context;
    private readonly string? _connectionString;

    public SAEService(IApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _connectionString = configuration.GetConnectionString("SAEConnection");
    }

    public async Task<IEnumerable<SaeProduct>> GetProductosSAEAsync()
    {
        return await _context.SaeProducts.ToListAsync();
    }

    public async Task<IEnumerable<SaeOrder>> GetOrdenesPendientesAsync()
    {
        return await _context.SaeOrders.ToListAsync();
    }

    public async Task<IEnumerable<SaeRemission>> GetRemisionesAsync(string orderDoc)
    {
        return await _context.SaeRemissions
            .Where(r => r.OrderDoc == orderDoc)
            .ToListAsync();
    }

    public async Task<bool> SincronizarSAEAsync()
    {
        var tenantId = new Guid("00000000-0000-0000-0000-000000000001");

        // 1. Simular productos desde SAE
        if (!await _context.SaeProducts.AnyAsync())
        {
            _context.SaeProducts.AddRange(
                new SaeProduct { ProductNumber = "BOB-4-STD", ProductName = "Bobina 4\" Estándar (SAE)", IsActive = true, Price = 150.00m, TenantId = tenantId },
                new SaeProduct { ProductNumber = "BOB-6-PRE", ProductName = "Bobina 6\" Premium (SAE)", IsActive = true, Price = 280.00m, TenantId = tenantId },
                new SaeProduct { ProductNumber = "MAT-VIRGEN", ProductName = "Resina Virgen Polietileno", IsActive = true, Price = 45.50m, TenantId = tenantId }
            );
        }

        // 2. Simular órdenes pendientes desde SAE
        if (!await _context.SaeOrders.AnyAsync())
        {
            _context.SaeOrders.AddRange(
                new SaeOrder { OrderDoc = "P-10254", CustomerCode = "BIMBO-01", CustomerName = "Bimbo S.A. de C.V.", OrderDate = DateTime.Now.AddDays(-2), TotalAmount = 15400.50m, TenantId = tenantId },
                new SaeOrder { OrderDoc = "P-10255", CustomerCode = "WALMART-MX", CustomerName = "Walmart de México", OrderDate = DateTime.Now.AddDays(-1), TotalAmount = 45200.00m, TenantId = tenantId },
                new SaeOrder { OrderDoc = "P-10256", CustomerCode = "NESTLE-PROD", CustomerName = "Nestlé México", OrderDate = DateTime.Now, TotalAmount = 12800.75m, TenantId = tenantId }
            );
        }

        return await _context.SaveChangesAsync(default) > 0;
    }
}
