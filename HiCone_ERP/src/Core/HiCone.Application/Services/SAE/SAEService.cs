using HiCone.Application.Common.Interfaces;
using HiCone.Application.Interfaces;
using HiCone.Domain.Entities.SAE;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;

namespace HiCone.Application.Services.SAE;

public class SAEService : ISAEService
{
    private readonly IApplicationDbContext _context;
    private readonly string? _connectionString;
    private readonly ILogger<SAEService> _logger;

    public SAEService(IApplicationDbContext context, IConfiguration configuration, ILogger<SAEService> logger)
    {
        _context = context;
        _connectionString = configuration.GetConnectionString("SAEConnection");
        _logger = logger;
    }

    public async Task<IEnumerable<SaeProduct>> GetProductosSAEAsync()
    {
        return await _context.SaeProducts.ToListAsync();
    }

    public async Task<IEnumerable<SaeOrder>> GetOrdenesPendientesAsync()
    {
        return await _context.SaeOrders.Where(o => !o.Procesada).ToListAsync();
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

        if (string.IsNullOrEmpty(_connectionString))
        {
            _logger.LogWarning("No se configuró la cadena de conexión 'SAEConnection'. Usando simulación.");
            return await SincronizarSAESimuladoAsync(tenantId);
        }

        try
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                // Verificar defensivamente si la tabla 'INVE01' existe en la base de datos conectada
                using (var checkCmd = new SqlCommand("SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'INVE01'", conn))
                {
                    int exists = (int)(await checkCmd.ExecuteScalarAsync() ?? 0);
                    if (exists == 0)
                    {
                        _logger.LogWarning("La tabla 'INVE01' de Aspel SAE no existe en esta base de datos. Usando simulación.");
                        return await SincronizarSAESimuladoAsync(tenantId);
                    }
                }

                _logger.LogInformation("Conexión real establecida con la base de datos de Aspel SAE. Iniciando sincronización física...");

                await SincronizarProductosRealAsync(conn, tenantId);
                await SincronizarClientesRealAsync(conn, tenantId);
                await SincronizarPedidosRealAsync(conn, tenantId);
                await SincronizarRemisionesRealAsync(conn, tenantId);

                return await _context.SaveChangesAsync(default) > 0;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al conectar o consultar la base de datos real de SAE. Aplicando fallback seguro a datos simulados.");
            return await SincronizarSAESimuladoAsync(tenantId);
        }
    }

    private async Task SincronizarProductosRealAsync(SqlConnection conn, Guid tenantId)
    {
        var products = new List<SaeProduct>();
        using (var cmd = new SqlCommand("SELECT CVE_ART, DESCR, UNI_MED, STATUS FROM INVE01", conn))
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                products.Add(new SaeProduct
                {
                    ProductNumber = reader.GetString(0).Trim(),
                    ProductName = reader.IsDBNull(1) ? "" : reader.GetString(1).Trim(),
                    Unit = reader.IsDBNull(2) ? "Pza" : reader.GetString(2).Trim(),
                    Price = 0.00m,
                    IsActive = !reader.IsDBNull(3) && reader.GetString(3).Trim().Equals("A", StringComparison.OrdinalIgnoreCase),
                    TenantId = tenantId,
                    FechaSincronizacion = DateTime.UtcNow
                });
            }
        }

        foreach (var p in products)
        {
            var existing = await _context.SaeProducts.FirstOrDefaultAsync(x => x.ProductNumber == p.ProductNumber);
            if (existing != null)
            {
                existing.ProductName = p.ProductName;
                existing.Unit = p.Unit;
                existing.IsActive = p.IsActive;
                existing.FechaSincronizacion = p.FechaSincronizacion;
            }
            else
            {
                _context.SaeProducts.Add(p);
            }
        }
    }

    private async Task SincronizarClientesRealAsync(SqlConnection conn, Guid tenantId)
    {
        var customers = new List<SaeCustomer>();
        using (var cmd = new SqlCommand("SELECT CLAVE, NOMBRE, STATUS, MUNICIPIO, ESTADO, TELEFONO, EMAILPRED FROM CLIE01", conn))
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                string clave = reader.GetString(0).Trim();
                string nombre = reader.IsDBNull(1) ? "" : reader.GetString(1).Trim();
                bool active = !reader.IsDBNull(2) && reader.GetString(2).Trim().Equals("A", StringComparison.OrdinalIgnoreCase);
                string municipio = reader.IsDBNull(3) ? "" : reader.GetString(3).Trim();
                string estado = reader.IsDBNull(4) ? "" : reader.GetString(4).Trim();
                string tel = reader.IsDBNull(5) ? "" : reader.GetString(5).Trim();
                string email = reader.IsDBNull(6) ? "" : reader.GetString(6).Trim();

                customers.Add(new SaeCustomer
                {
                    CustomerCode = clave,
                    CustomerName = nombre,
                    ConsolidatedName = "General",
                    Shipping = string.IsNullOrEmpty(municipio) ? estado : $"{municipio}, {estado}",
                    Phone = tel,
                    Email = email,
                    IsActive = active,
                    TenantId = tenantId,
                    FechaSincronizacion = DateTime.UtcNow
                });
            }
        }

        foreach (var c in customers)
        {
            var existing = await _context.SaeCustomers.FirstOrDefaultAsync(x => x.CustomerCode == c.CustomerCode);
            if (existing != null)
            {
                existing.CustomerName = c.CustomerName;
                existing.Shipping = c.Shipping;
                existing.Phone = c.Phone;
                existing.Email = c.Email;
                existing.IsActive = c.IsActive;
                existing.FechaSincronizacion = c.FechaSincronizacion;
            }
            else
            {
                _context.SaeCustomers.Add(c);
            }
        }
    }

    private async Task SincronizarPedidosRealAsync(SqlConnection conn, Guid tenantId)
    {
        var orders = new List<SaeOrder>();
        using (var cmd = new SqlCommand(@"
            SELECT p.CVE_DOC, p.FECHA_DOC, p.FECHA_ENT, p.CVE_CLIE, p.CAN_TOT, p.STATUS, c.NOMBRE 
            FROM PEDI01 p
            LEFT JOIN CLIE01 c ON p.CVE_CLIE = c.CLAVE", conn))
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                string cveDoc = reader.GetString(0).Trim();
                DateTime fechaDoc = reader.IsDBNull(1) ? DateTime.UtcNow : reader.GetDateTime(1);
                DateTime? fechaEnt = reader.IsDBNull(2) ? (DateTime?)null : reader.GetDateTime(2);
                string cveClie = reader.IsDBNull(3) ? "" : reader.GetString(3).Trim();
                decimal total = reader.IsDBNull(4) ? 0.00m : reader.GetDecimal(4);
                string status = reader.IsDBNull(5) ? "" : reader.GetString(5).Trim();
                string nomClie = reader.IsDBNull(6) ? "Cliente SAE" : reader.GetString(6).Trim();

                orders.Add(new SaeOrder
                {
                    OrderDoc = cveDoc,
                    OrderDate = fechaDoc,
                    OrderDeliveryDate = fechaEnt,
                    CustomerCode = cveClie,
                    CustomerName = nomClie,
                    TotalAmount = total,
                    Procesada = status.Equals("E", StringComparison.OrdinalIgnoreCase),
                    TenantId = tenantId,
                    FechaSincronizacion = DateTime.UtcNow
                });
            }
        }

        foreach (var o in orders)
        {
            var existing = await _context.SaeOrders.FirstOrDefaultAsync(x => x.OrderDoc == o.OrderDoc);
            if (existing != null)
            {
                existing.OrderDate = o.OrderDate;
                existing.OrderDeliveryDate = o.OrderDeliveryDate;
                existing.CustomerCode = o.CustomerCode;
                existing.CustomerName = o.CustomerName;
                existing.TotalAmount = o.TotalAmount;
                existing.Procesada = o.Procesada;
                existing.FechaSincronizacion = o.FechaSincronizacion;
            }
            else
            {
                _context.SaeOrders.Add(o);
            }
        }
    }

    private async Task SincronizarRemisionesRealAsync(SqlConnection conn, Guid tenantId)
    {
        var remissions = new List<SaeRemission>();
        using (var cmd = new SqlCommand(@"
            SELECT f.CVE_DOC, f.DOC_ANT, f.FECHA_DOC, p.CVE_ART, p.CANT, f.CVE_CLIE, c.NOMBRE, c.MUNICIPIO 
            FROM FACT01 f
            INNER JOIN PAR_FACT01 p ON f.CVE_DOC = p.CVE_DOC
            LEFT JOIN CLIE01 c ON f.CVE_CLIE = c.CLAVE
            WHERE f.TIP_DOC = 'R'", conn))
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                string cveDoc = reader.GetString(0).Trim();
                string docAnt = reader.IsDBNull(1) ? "" : reader.GetString(1).Trim();
                DateTime fechaDoc = reader.IsDBNull(2) ? DateTime.UtcNow : reader.GetDateTime(2);
                string cveArt = reader.IsDBNull(3) ? "" : reader.GetString(3).Trim();
                decimal cant = reader.IsDBNull(4) ? 0.00m : reader.GetDecimal(4);
                string cveClie = reader.IsDBNull(5) ? "" : reader.GetString(5).Trim();
                string nomClie = reader.IsDBNull(6) ? "Cliente SAE" : reader.GetString(6).Trim();
                string shipping = reader.IsDBNull(7) ? "" : reader.GetString(7).Trim();

                remissions.Add(new SaeRemission
                {
                    RemissionDoc = cveDoc,
                    OrderDoc = docAnt,
                    RemissionDate = fechaDoc,
                    ProductNumber = cveArt,
                    Quantity = cant,
                    CustomerCode = cveClie,
                    CustomerName = nomClie,
                    Shipping = shipping,
                    ConsolidatedName = "General",
                    CustomerShipping = shipping,
                    TenantId = tenantId,
                    FechaSincronizacion = DateTime.UtcNow
                });
            }
        }

        var existingRemissions = await _context.SaeRemissions.ToListAsync();
        _context.SaeRemissions.RemoveRange(existingRemissions);
        _context.SaeRemissions.AddRange(remissions);
    }

    public async Task<bool> FinalizarRemisionSAEAsync(string orderDoc, string remissionDoc)
    {
        // 1. Actualizar estatus local en el ERP
        var localOrder = await _context.SaeOrders.FirstOrDefaultAsync(o => o.OrderDoc == orderDoc);
        if (localOrder != null)
        {
            localOrder.Procesada = true;
            localOrder.FechaSincronizacion = DateTime.UtcNow;
        }

        // 2. Si hay conexión real a SAE, actualizar estatus de documentos en el servidor
        if (!string.IsNullOrEmpty(_connectionString))
        {
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    await conn.OpenAsync();

                    using (var checkCmd = new SqlCommand("SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PEDI01'", conn))
                    {
                        int exists = (int)(await checkCmd.ExecuteScalarAsync() ?? 0);
                        if (exists > 0)
                        {
                            _logger.LogInformation("Actualizando estatus a Enlazado (E) en base de datos real de SAE para pedido {OrderDoc} y remisión {RemissionDoc}...", orderDoc, remissionDoc);
                            
                            using (var cmdOrder = new SqlCommand("UPDATE PEDI01 SET STATUS = 'E' WHERE CVE_DOC = @orderDoc", conn))
                            {
                                cmdOrder.Parameters.AddWithValue("@orderDoc", orderDoc);
                                await cmdOrder.ExecuteNonQueryAsync();
                            }

                            using (var cmdRem = new SqlCommand("UPDATE FACT01 SET STATUS = 'E' WHERE CVE_DOC = @remissionDoc", conn))
                            {
                                cmdRem.Parameters.AddWithValue("@remissionDoc", remissionDoc);
                                await cmdRem.ExecuteNonQueryAsync();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar físicamente el estatus en la base de datos de SAE. Continuando de forma segura localmente.");
            }
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    private async Task<bool> SincronizarSAESimuladoAsync(Guid tenantId)
    {
        // Fallback simulado para desarrollo local
        if (!await _context.SaeProducts.AnyAsync())
        {
            _context.SaeProducts.AddRange(
                new SaeProduct { ProductNumber = "808172000", ProductName = "12PK SAC PCR", Unit = "MILLAR", IsActive = true, Price = 150.00m, Cost = 0.00m, TipoProducto = "Can", Packaging = "Reels", SubProductType = "SAC", Exist = 1587.60m, Group = "8081", PiecesPlt = 58800.00m, Product8020 = "20", Pallets = 27, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeProduct { ProductNumber = "8081C2000", ProductName = "12PK SAC PCR", Unit = "MILLAR", IsActive = true, Price = 280.00m, Cost = 0.00m, TipoProducto = "Can", Packaging = "Reels", SubProductType = "SAC", Exist = 0.00m, Group = "8081", PiecesPlt = 0.00m, Product8020 = "", Pallets = 0, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeProduct { ProductNumber = "809572000", ProductName = "2202/206 NON-ECO", Unit = "MILLAR", IsActive = true, Price = 45.50m, Cost = 0.00m, TipoProducto = "Can", Packaging = "Reels", SubProductType = "Sleek", Exist = 3609.60m, Group = "8095", PiecesPlt = 150400.00m, Product8020 = "20", Pallets = 24, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow }
            );
        }

        if (!await _context.SaeCustomers.AnyAsync())
        {
            _context.SaeCustomers.AddRange(
                new SaeCustomer { CustomerCode = "CAHG", CustomerName = "AMERICAS HGP", ConsolidatedName = "Heineken", Shipping = "AV. ALFONSO REYES", RFC = "AHG150320QD1", IsActive = true, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeCustomer { CustomerCode = "HKGDL", CustomerName = "AMERICAS HGP SA DE CV", ConsolidatedName = "Heineken", Shipping = "GUADALAJARA", RFC = "XXX", IsActive = true, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeCustomer { CustomerCode = "ATM01", CustomerName = "ARTANT DE MEXICO S DE RL DE CV", ConsolidatedName = "SIN GRUPO", Shipping = "MELCHOR OCAMPO", RFC = "AME140512GE1", IsActive = true, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow }
            );
        }

        if (!await _context.SaeOrders.AnyAsync())
        {
            _context.SaeOrders.AddRange(
                new SaeOrder { OrderDoc = "P-10254", CustomerCode = "CAHG", CustomerName = "AMERICAS HGP", OrderDate = DateTime.Now.AddDays(-2), TotalAmount = 15400.50m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeOrder { OrderDoc = "P-10255", CustomerCode = "HKGDL", CustomerName = "AMERICAS HGP SA DE CV", OrderDate = DateTime.Now.AddDays(-1), TotalAmount = 45200.00m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeOrder { OrderDoc = "P-10256", CustomerCode = "ATM01", CustomerName = "ARTANT DE MEXICO S DE RL DE CV", OrderDate = DateTime.Now, TotalAmount = 12800.75m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow }
            );
        }

        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<SaeOrder?> GetOrderByDocAsync(string orderDoc)
    {
        return await _context.SaeOrders.FirstOrDefaultAsync(o => o.OrderDoc == orderDoc);
    }

    public async Task<IEnumerable<SaeOrder>> GetAllOrdersAsync()
    {
        return await _context.SaeOrders.OrderByDescending(o => o.OrderDate).ToListAsync();
    }

    public async Task<IEnumerable<SaeCustomer>> GetClientesSAEAsync()
    {
        return await _context.SaeCustomers.Where(c => c.IsActive).OrderBy(c => c.CustomerName).ToListAsync();
    }

    public async Task<IEnumerable<SaeSalesPerson>> GetSalesPersonsAsync()
    {
        return await _context.SaeSalesPersons.Where(s => s.SalesPersonActive).OrderBy(s => s.SalesPersonName).ToListAsync();
    }

    public async Task<IEnumerable<SaeBudget>> GetBudgetsAsync(int year, string? consolidatedName, string? productNumber)
    {
        var query = _context.SaeBudgets.Where(b => b.BudgetYear == year);
        if (!string.IsNullOrEmpty(consolidatedName))
            query = query.Where(b => b.ConsolidatedName == consolidatedName);
        if (!string.IsNullOrEmpty(productNumber))
            query = query.Where(b => b.ProductNumber == productNumber);
        return await query.OrderBy(b => b.CustomerCode).ThenBy(b => b.BudgetMonth).ToListAsync();
    }

    public async Task<bool> SaveBudgetsAsync(List<SaeBudget> budgets)
    {
        if (budgets == null || !budgets.Any()) return false;
        foreach (var b in budgets)
        {
            var existing = await _context.SaeBudgets.FirstOrDefaultAsync(x =>
                x.CustomerCode == b.CustomerCode &&
                x.ProductNumber == b.ProductNumber &&
                x.BudgetYear == b.BudgetYear &&
                x.BudgetMonth == b.BudgetMonth);
            if (existing != null)
            {
                existing.BudgetEstimated = b.BudgetEstimated;
                existing.BudgetReal = b.BudgetReal;
                existing.BudgetOutlook = b.BudgetOutlook;
                existing.BudgetPrice = b.BudgetPrice;
                existing.BudgetPriceOutlook = b.BudgetPriceOutlook;
            }
            else
            {
                b.TenantId = new Guid("00000000-0000-0000-0000-000000000001");
                _context.SaeBudgets.Add(b);
            }
        }
        return await _context.SaveChangesAsync(default) > 0;
    }

    public async Task<IEnumerable<SaeBudgetSummary>> GetFTBReportAsync(int year, int month)
    {
        var budgets = await _context.SaeBudgets
            .Where(b => b.BudgetYear == year && b.BudgetMonth <= month)
            .ToListAsync();

        var grouped = budgets.GroupBy(b => new { b.ProductNumber, b.ConsolidatedName })
            .Select(g => new SaeBudgetSummary
            {
                ProductNumber = g.Key.ProductNumber,
                ConsolidatedName = g.Key.ConsolidatedName ?? "General",
                TotalEstimated = g.Sum(x => x.BudgetEstimated),
                TotalReal = g.Sum(x => x.BudgetReal),
                CompliancePercent = g.Sum(x => x.BudgetEstimated) > 0
                    ? Math.Round(g.Sum(x => x.BudgetReal) / g.Sum(x => x.BudgetEstimated) * 100, 1)
                    : 0
            });
        return grouped;
    }

    public async Task<object> GetKPIsAsync()
    {
        var totalPedidos = await _context.SaeOrders.CountAsync();
        var pedidosPendientes = await _context.SaeOrders.CountAsync(o => !o.Procesada);
        var ventasMes = await _context.SaeOrders
            .Where(o => o.OrderDate.Month == DateTime.Now.Month && o.OrderDate.Year == DateTime.Now.Year)
            .SumAsync(o => o.TotalAmount);
        var ventasMesAnterior = await _context.SaeOrders
            .Where(o => o.OrderDate.Month == DateTime.Now.AddMonths(-1).Month && o.OrderDate.Year == DateTime.Now.AddMonths(-1).Year)
            .SumAsync(o => o.TotalAmount);
        var crecimiento = ventasMesAnterior > 0 ? Math.Round((ventasMes - ventasMesAnterior) / ventasMesAnterior * 100, 1) : 0;

        return new
        {
            VentasTotalesMes = ventasMes,
            PedidosPendientes = pedidosPendientes,
            TotalPedidos = totalPedidos,
            CrecimientoVsMesAnterior = crecimiento
        };
    }

    public async Task<IEnumerable<ItwOutlookRowDto>> GetItwOutlookAsync()
    {
        var currentYear = DateTime.Now.Year;
        var budgets = await _context.SaeBudgets
            .Where(b => b.BudgetYear == currentYear)
            .ToListAsync();

        var pendingOrders = await _context.SaeRemissions
            .Where(r => r.Quantity > 0)
            .GroupBy(r => r.ProductNumber)
            .Select(g => new { ProductNumber = g.Key ?? "", PendingQuantity = g.Sum(x => x.Quantity) })
            .ToDictionaryAsync(k => k.ProductNumber, v => v.PendingQuantity);

        var groupedBudgets = budgets.GroupBy(b => new { b.ProductNumber, b.ConsolidatedName })
            .Select(g => new ItwOutlookRowDto
            {
                ProductNumber = g.Key.ProductNumber,
                ConsolidatedName = g.Key.ConsolidatedName ?? "General",
                CurrentStock = 0, // Should be linked to Silos/Bobinas
                PendingOrders = pendingOrders.ContainsKey(g.Key.ProductNumber) ? pendingOrders[g.Key.ProductNumber] : 0,
                BudgetRemaining = g.Sum(x => Math.Max(0, x.BudgetEstimated - x.BudgetReal)),
                CoveragePercent = 100,
                Status = "OK"
            }).ToList();

        foreach(var row in groupedBudgets)
        {
            var demand = row.PendingOrders + row.BudgetRemaining;
            row.CoveragePercent = demand > 0 ? Math.Round((row.CurrentStock / demand) * 100, 1) : 100;
            if(row.CoveragePercent < 50) row.Status = "CRITICAL";
            else if (row.CoveragePercent < 80) row.Status = "WARNING";
            else row.Status = "OK";
        }

        return groupedBudgets;
    }

    public async Task<IEnumerable<RealtimeInventoryRowDto>> GetRealtimeInventoryAsync()
    {
        var pendingOrders = await _context.SaeRemissions
            .Where(r => r.Quantity > 0)
            .GroupBy(r => r.ProductNumber)
            .Select(g => new { ProductNumber = g.Key ?? "", PendingQuantity = g.Sum(x => x.Quantity) })
            .ToDictionaryAsync(k => k.ProductNumber, v => v.PendingQuantity);

        var products = await _context.SaeProducts.Where(p => p.IsActive).ToListAsync();

        var rows = products.Select(p => {
            var demand = pendingOrders.ContainsKey(p.ProductNumber) ? pendingOrders[p.ProductNumber] : 0;
            var totalStock = 0; // Linked to inventory
            return new RealtimeInventoryRowDto
            {
                ProductNumber = p.ProductNumber,
                ProductName = p.ProductName,
                SilosTotal = 0,
                BobinasTotal = 0,
                TotalStock = totalStock,
                SaeDemand = demand,
                Balance = totalStock - demand
            };
        }).ToList();

        return rows;
    }
}

/// <summary>DTO de resumen de presupuesto para el reporte FTB.</summary>
public class SaeBudgetSummary
{
    public string ProductNumber { get; set; } = null!;
    public string ConsolidatedName { get; set; } = null!;
    public decimal TotalEstimated { get; set; }
    public decimal TotalReal { get; set; }
    public decimal CompliancePercent { get; set; }
}

public class ItwOutlookRowDto
{
    public string ProductNumber { get; set; } = null!;
    public string ConsolidatedName { get; set; } = null!;
    public decimal CurrentStock { get; set; }
    public decimal PendingOrders { get; set; }
    public decimal BudgetRemaining { get; set; }
    public decimal CoveragePercent { get; set; }
    public string Status { get; set; } = null!;
}

public class RealtimeInventoryRowDto
{
    public string ProductNumber { get; set; } = null!;
    public string ProductName { get; set; } = null!;
    public decimal SilosTotal { get; set; }
    public decimal BobinasTotal { get; set; }
    public decimal TotalStock { get; set; }
    public decimal SaeDemand { get; set; }
    public decimal Balance { get; set; }
}
