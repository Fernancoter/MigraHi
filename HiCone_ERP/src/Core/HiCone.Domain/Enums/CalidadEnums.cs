namespace HiCone.Domain.Enums;

/// <summary>Estatus de un reclamo de calidad</summary>
public enum EstatusReclamo
{
    Abierto = 1,
    EnProceso = 2,
    Resuelto = 3,
    Cerrado = 4
}

/// <summary>Tipo de defecto reportado</summary>
public enum TipoDefecto
{
    Calibre = 1,
    Peso = 2,
    Espesor = 3,
    DanioFisico = 4,
    ContaminacionColor = 5,
    Otro = 6
}
