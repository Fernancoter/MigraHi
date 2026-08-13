using HiCone.Domain.Entities.Logistica;
using HiCone.Domain.Enums;

namespace HiCone.Application.Interfaces;

public interface ILogisticaService
{
    // ── Gestión de Embarques ──────────────────────────────────────────────
    Task<Embarque> CrearEmbarqueDesdeSaeAsync(string orderDoc, string remissionDoc);
    Task<bool> ProgramarTransporteAsync(Guid embarqueId, string transporte, string placas, string conductor);
    Task<bool> IniciarCargaAsync(Guid embarqueId);
    
    // ── Validación de Carga ───────────────────────────────────────────────
    Task<(bool Success, string Message)> ValidarPaletParaEmbarqueAsync(Guid embarqueId, string noSeriePalet);
    Task<(bool Success, string Message)> FinalizarEmbarqueAsync(Guid embarqueId, string elaboradoPor);

    // ── Consultas ──────────────────────────────────────────────────────────
    Task<IEnumerable<Embarque>> GetEmbarquesActivosAsync();
    Task<object> GetResumenCargaAsync(Guid embarqueId);
}
