using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGOS BASE
// ─────────────────────────────────────────────────────────────────────────────

/// <summary>Operario/Operador de producción (PDF: sección Operadores)</summary>
public class Operario : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public bool Activo { get; set; } = true;
}

/// <summary>Turno de producción: 1er, 2do, 3er Turno (PDF: Catálogos > Turnos)</summary>
public class Turno : TenantEntity
{
    public string Nombre { get; set; } = null!;        // "1er Turno", "2do Turno", "3er Turno"
    public TimeOnly HoraInicio { get; set; }
    public TimeOnly HoraFin { get; set; }
}

/// <summary>Extrusora (PDF: Catálogos > Extrusoras — Extrusora 1, 2, 3)</summary>
public class Extrusora : TenantEntity
{
    public string Nombre { get; set; } = null!;

    // Relaciones
    public virtual ICollection<ExtrusoraProducto> ExtrusoraProductos { get; set; } = [];
    public virtual ICollection<ExtrusoraMezcladora> ExtrusoraMezcladoras { get; set; } = [];
    public virtual ICollection<Extrusion> Extrusiones { get; set; } = [];
}

/// <summary>Prensa (PDF: Catálogos > Prensas — Prensa 1 a 5)</summary>
public class Prensa : TenantEntity
{
    public string Nombre { get; set; } = null!;        // "Prensa 1" ... "Prensa 5"
    public string? Marca { get; set; }
    public string? Modelo { get; set; }

    // Relaciones
    public virtual ICollection<PrensaProducto> PrensaProductos { get; set; } = [];
}

/// <summary>Silo de producción (PDF: Catálogos > Silos)</summary>
public class SiloProduccion : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public decimal CapacidadKg { get; set; }
    public decimal MinimoKg { get; set; }
    public decimal MaximoKg { get; set; }
    public string? EstadoMaterial { get; set; }
    public string? TipoMaterial { get; set; }
    public bool SiloActivo { get; set; } = true;
}

/// <summary>Categoría de producto (PDF: Catálogos > Categorías — Bobina, Carrete)</summary>
public class ProductoCategoria : TenantEntity
{
    public string Nombre { get; set; } = null!;

    // Relaciones
    public virtual ICollection<Producto> Productos { get; set; } = [];
}

/// <summary>Configuración del sistema en pares Key-Value (PDF: Referencias > Configuración)</summary>
public class ConfiguracionSistema : TenantEntity
{
    public string Key { get; set; } = null!;
    public string Valor { get; set; } = null!;
}

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGOS DE PRODUCTOS
// ─────────────────────────────────────────────────────────────────────────────

/// <summary>Producto (PDF: sección Productos)</summary>
public class Producto : TenantEntity
{
    public Guid? CategoriaId { get; set; }
    public virtual ProductoCategoria? Categoria { get; set; }

    public string? ProductoBase { get; set; }
    public string Clave { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public decimal PrecioUnitario { get; set; }
    public string? TipoMaterial { get; set; }       // "PCR", etc.
    public bool IsActive { get; set; } = true;
    public string? ProductoSAE { get; set; }
}

/// <summary>Producto terminado (PDF: Referencias > Producto Terminado)</summary>
public class ProductoTerminado : TenantEntity
{
    public int TerminadoPalets { get; set; }
    public int CarreteMiliar { get; set; }
    public int PaletMiliar { get; set; }
    public decimal TerminadoPeso { get; set; }
    public decimal PesoCarrete { get; set; }
    public decimal PesoPalet { get; set; }
    public bool ConEtiqueta { get; set; }
    public bool Etiquetable { get; set; }
    public string? Producto { get; set; }
    public string? CodigoSAP { get; set; }
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCIAS EXTRUSORA
// ─────────────────────────────────────────────────────────────────────────────

/// <summary>Relación Extrusora-Producto con tiempos (PDF: Referencias > Extrusora Producto)</summary>
public class ExtrusoraProducto : TenantEntity
{
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;

    public string ProductoNombre { get; set; } = null!;
    public decimal ProductoCalibre { get; set; }
    public string ProductoAncho { get; set; } = null!;   // Ej: "2315/16"
    public int ProductoLongitud { get; set; }
    public int ReposoMin { get; set; }
    public int ProcesoMin { get; set; }
}

/// <summary>Configuración de mezcladora por extrusora (PDF: Referencias > Extrusora Mezcladora)</summary>
public class ExtrusoraMezcladora : TenantEntity
{
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;

    public decimal VirgenMin { get; set; }
    public decimal VirgenMax { get; set; }
    public decimal MoldoMin { get; set; }
    public decimal MoldoMax { get; set; }
    public decimal KgVirgen { get; set; }
    public decimal KgMoldo { get; set; }
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCIAS PRENSA
// ─────────────────────────────────────────────────────────────────────────────

/// <summary>Relación Prensa-Producto (PDF: Referencias > Prensa Producto)</summary>
public class PrensaProducto : TenantEntity
{
    public Guid PrensaId { get; set; }
    public virtual Prensa Prensa { get; set; } = null!;

    public string Item { get; set; } = null!;
    public string Carrete { get; set; } = null!;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTRUSIÓN (Tablero de Inicio)
// ─────────────────────────────────────────────────────────────────────────────

public enum ExtrusionStatus
{
    Programada,
    EnProceso,
    Intermedia,
    Terminada,
    PorProgramar
}

/// <summary>Registro de extrusión en curso (PDF: Tablero > Extrusión)</summary>
public class Extrusion : TenantEntity
{
    public DateTime Fecha { get; set; }
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;

    public Guid? TurnoId { get; set; }
    public virtual Turno? Turno { get; set; }

    public string? Producto { get; set; }
    public Guid? OperarioId { get; set; }
    public virtual Operario? Operario { get; set; }

    public int Producido { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public bool EnCurso { get; set; }
    public long ExtrusionIdLegacy { get; set; }         // ID heredado del sistema GeneXus

    public decimal Programado { get; set; }
    public ExtrusionStatus Status { get; set; } = ExtrusionStatus.PorProgramar;

    // Nuevos campos para el bloque de información
    public decimal Calibre { get; set; }
    public string Ancho { get; set; } = "000/000";
    public int Longitud { get; set; }
    public decimal KgVirgen { get; set; }
    public decimal Target { get; set; }
    public decimal KgMolido { get; set; }
    public DateTime? ProcessStart { get; set; }
    public DateTime? ProcessEnd { get; set; }

    public virtual ICollection<Bobina> Bobinas { get; set; } = [];
}

// ─────────────────────────────────────────────────────────────────────────────
// PRENSADO (Tablero de Inicio)
// ─────────────────────────────────────────────────────────────────────────────

public enum PrensadoStatus
{
    Programada,
    EnProceso,
    Intermedia,
    Parada,
    Terminada,
    PorProgramar
}

/// <summary>Registro de prensado en curso (PDF: Tablero > Prensado)</summary>
public class Prensado : TenantEntity
{
    public DateTime Fecha { get; set; }
    public Guid PrensaId { get; set; }
    public virtual Prensa Prensa { get; set; } = null!;

    public Guid? TurnoId { get; set; }
    public virtual Turno? Turno { get; set; }

    public string? Producto { get; set; }
    public Guid? OperarioId { get; set; }
    public virtual Operario? Operario { get; set; }

    public int Producido { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public bool EnCurso { get; set; }
    public decimal Programado { get; set; }
    public PrensadoStatus Status { get; set; } = PrensadoStatus.PorProgramar;

    public decimal Calibre { get; set; }
    public string Ancho { get; set; } = "0000/00";
    public int Longitud { get; set; }
}

// ─────────────────────────────────────────────────────────────────────────────
// STUBS MÍNIMOS (para compatibilidad con DbSets existentes en DbContext)
// ─────────────────────────────────────────────────────────────────────────────

public class Troquel : TenantEntity { public string Nombre { get; set; } = null!; }
public class PrensaTroquel : TenantEntity
{
    public Guid PrensaId { get; set; }
    public Guid TroquelId { get; set; }
}
public class CausaInterrupcion : TenantEntity { public string Descripcion { get; set; } = null!; }
public class ExtrusionResultado : TenantEntity
{
    public Guid ExtrusionId { get; set; }
    public int BobinasFabricadas { get; set; }
}
public class ExtrusionInterrupcion : TenantEntity
{
    public Guid ExtrusionId { get; set; }
    public int DuracionMin { get; set; }
}
public class PrensadoBobina : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public Guid BobinaId { get; set; }
}
public class PrensadoResultado : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public int CarretesFabricados { get; set; }
}
public class PrensadoInterrupcion : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public int DuracionMin { get; set; }
}
public class Carrera : TenantEntity { public int NumeroCarrera { get; set; } }
public class Carrete : TenantEntity { public string Codigo { get; set; } = null!; }
public class PaletCarrete : TenantEntity
{
    public Guid PaletId { get; set; }
    public Guid CarreteId { get; set; }
}
public class OrdenEtiquetado : TenantEntity { public DateTime FechaOrden { get; set; } }
public class Maquina : TenantEntity { public string Nombre { get; set; } = null!; }
