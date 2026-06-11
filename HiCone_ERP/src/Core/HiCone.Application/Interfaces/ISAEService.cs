using HiCone.Application.Services.SAE;
using HiCone.Domain.Entities.SAE;

namespace HiCone.Application.Interfaces;

public interface ISAEService
{
    Task<IEnumerable<SaeProduct>> GetProductosSAEAsync();
    Task<IEnumerable<SaeOrder>> GetOrdenesPendientesAsync();
    Task<IEnumerable<SaeRemission>> GetRemisionesAsync(string orderDoc);
    Task<bool> SincronizarSAEAsync();
    Task<bool> FinalizarRemisionSAEAsync(string orderDoc, string remissionDoc);
    Task<SaeOrder?> GetOrderByDocAsync(string orderDoc);
    Task<IEnumerable<SaeOrder>> GetAllOrdersAsync();
    Task<IEnumerable<SaeCustomer>> GetClientesSAEAsync();
    Task<IEnumerable<SaeSalesPerson>> GetSalesPersonsAsync();
    Task<IEnumerable<SaeBudget>> GetBudgetsAsync(int year, string? consolidatedName, string? productNumber);
    Task<bool> SaveBudgetsAsync(List<SaeBudget> budgets);
    Task<IEnumerable<SaeBudgetSummary>> GetFTBReportAsync(int year, int month);
    Task<object> GetKPIsAsync();
    Task<IEnumerable<ItwOutlookRowDto>> GetItwOutlookAsync();
    Task<IEnumerable<RealtimeInventoryRowDto>> GetRealtimeInventoryAsync();
}
