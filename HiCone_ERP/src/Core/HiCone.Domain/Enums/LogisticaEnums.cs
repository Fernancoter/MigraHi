namespace HiCone.Domain.Enums;

/// <summary>Estatus del embarque a lo largo del proceso</summary>
public enum EstatusEmbarque
{
    PorProgramar = 1,   // Creado desde SAE, pendiente de datos de transporte
    Programado = 2,     // Con datos de transporte, esperando carga
    EnCarga = 3,        // Proceso de carga física iniciado
    Cargado = 4,        // Carga completada, todos los pallets validados
    Cancelado = 5
}
