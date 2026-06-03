using HiCone.Domain.Entities.SAE;

namespace HiCone.Application.Interfaces;

public interface ISAEService
{
    Task<IEnumerable<SaeProduct>> GetProductosSAEAsync();
    Task<IEnumerable<SaeOrder>> GetOrdenesPendientesAsync();
    Task<IEnumerable<SaeRemission>> GetRemisionesAsync(string orderDoc);
    Task<bool> SincronizarSAEAsync();
    Task<bool> FinalizarRemisionSAEAsync(string orderDoc, string remissionDoc);
}
