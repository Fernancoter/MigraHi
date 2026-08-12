namespace HiCone.Domain.Enums;

/// <summary>Estados del proceso de extrusión</summary>
public enum EstadoExtrusion
{
    Programada = 1,
    EnProceso = 2,
    Finalizada = 3,
    Anticipada = 4,   // Finalización anticipada con motivo
    Cancelada = 5
}

/// <summary>Estados de una bobina a lo largo de su ciclo de vida</summary>
public enum EstadoBobina
{
    EnProceso = 1,      // Recién creada en extrusión
    EnReposo = 2,       // Esperando tiempo mínimo de reposo antes de prensado
    EnPrensado = 3,     // Siendo procesada en prensa
    Utilizada = 4,      // Completamente utilizada
    Rechazada = 5,      // Rechazada por calidad
    Molido = 6,         // Enviada al molino (reciclaje)
    Pausada = 7,
    Desmontada = 8,
    Transferida = 9,
    Consumida = 10,
    EnMedicion = 11,
    Disponible = 12
}

/// <summary>Color de estación asignado a una bobina</summary>
public enum ColorEstacion
{
    SinAsignar = 0,
    Rojo = 1,
    Azul = 2,
    Verde = 3,
    Amarillo = 4,
    Naranja = 5,
    Blanco = 6
}

/// <summary>Motivo por el cual una bobina fue enviada al molino</summary>
// Valores confirmados contra el sistema legado (GeneXus), ver docs/hallazgo_motivomolino_bobina.md.
// Regla real: si se captura Kg (bobina buena) se fuerza NoAplica y el campo se deshabilita;
// si se captura MermaKg (bobina rechazada) se habilita para elegir entre las otras dos.
public enum MotivoMolino
{
    NoAplica = 0,
    FallaMecanica = 1,
    LimpiezaContaminacion = 2
}

/// <summary>Estados de una carrera de prensado</summary>
public enum EstadoCarrera
{
    EnProceso = 1,
    Terminada = 2,
    Validada = 3,
    Cancelada = 4
}

/// <summary>Estados de un carrete dentro de una carrera</summary>
public enum EstadoCarrete
{
    EnProceso = 1,
    Terminado = 2,
    Rechazado = 3,
    Molino = 4          // Enviado al molino
}

/// <summary>Tipo de molino asignado al carrete</summary>
public enum MolinoCarrete
{
    NoAplica = 0,
    MolinoInterno = 1,
    MolinoExterno = 2
}

/// <summary>Estados del proceso de prensado</summary>
public enum EstadoPrensado
{
    Programada = 0,
    EnProceso = 1,
    Finalizado = 2,
    Anticipado = 3,     // Finalización anticipada con motivo
    Cancelado = 4
}


/// <summary>Estatus del palet</summary>
public enum EstatusPalet
{
    EnEnsamble = 1,     // Siendo ensamblado con carretes
    Terminado = 2,      // Listo para inspección
    Embarcado = 3,      // Ya incluido en un embarque
    Rechazado = 4,
    Aprobado = 5        // Aprobado por Calidad (Listo para embarque)
}

/// <summary>Tipo de palet (origen)</summary>
public enum TipoPalet
{
    Normal = 1,         // Producido internamente
    Externo = 2         // Escaneado de cliente externo
}

/// <summary>Tipo de material usado en producción</summary>
public enum TipoMaterial
{
    Virgen = 1,
    Molido = 2,
    Mixto = 3
}

/// <summary>Estado del troquel</summary>
public enum EstadoTroquel
{
    Disponible = 1,
    EnUso = 2,
    Mantenimiento = 3,
    FueraDeServicio = 4
}

/// <summary>Estado de una extrusora</summary>
public enum EstadoExtrusora
{
    Disponible = 1,
    EnProceso = 2,
    Detenida = 3,
    Mantenimiento = 4
}

/// <summary>Estado de una prensa</summary>
public enum EstadoPrensa
{
    Disponible = 1,
    EnProceso = 2,
    Detenida = 3,
    Mantenimiento = 4
}
