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
                new SaeProduct { ProductNumber = "BOB-4-STD", ProductName = "Bobina 4\" Estándar (SAE)", IsActive = true, Price = 150.00m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeProduct { ProductNumber = "BOB-6-PRE", ProductName = "Bobina 6\" Premium (SAE)", IsActive = true, Price = 280.00m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeProduct { ProductNumber = "MAT-VIRGEN", ProductName = "Resina Virgen Polietileno", IsActive = true, Price = 45.50m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow }
            );
        }

        if (!await _context.SaeOrders.AnyAsync())
        {
            _context.SaeOrders.AddRange(
                new SaeOrder { OrderDoc = "P-10254", CustomerCode = "BIMBO-01", CustomerName = "Bimbo S.A. de C.V.", OrderDate = DateTime.Now.AddDays(-2), TotalAmount = 15400.50m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeOrder { OrderDoc = "P-10255", CustomerCode = "WALMART-MX", CustomerName = "Walmart de México", OrderDate = DateTime.Now.AddDays(-1), TotalAmount = 45200.00m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow },
                new SaeOrder { OrderDoc = "P-10256", CustomerCode = "NESTLE-PROD", CustomerName = "Nestlé México", OrderDate = DateTime.Now, TotalAmount = 12800.75m, TenantId = tenantId, FechaSincronizacion = DateTime.UtcNow }
            );
        }

        return await _context.SaveChangesAsync(default) > 0;
    }
}
