namespace HiCone.Application.Interfaces;

public interface ICierreService
{
    Task<bool> CerrarExtrusionAsync(Guid extrusionId);
    Task<bool> CerrarPrensadoAsync(Guid prensadoId);
    Task<bool> CierreMensualAsync(int anio, int mes);
}
