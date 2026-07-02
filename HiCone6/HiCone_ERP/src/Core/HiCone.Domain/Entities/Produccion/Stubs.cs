using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Produccion;

// Stubs temporales para permitir la compilación en la rama security/refactor
// Estas clases parecen haber sido referenciadas pero no creadas/comiteadas aún.

public class Producto : TenantEntity
{
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public bool IsActive { get; set; } = true;
    
    public Guid? CategoriaId { get; set; }
    public virtual Inventario.Categoria? Categoria { get; set; }
}

public class Extrusion : TenantEntity
{
    public DateTime Fecha { get; set; }
    public Guid ExtrusoraId { get; set; }
    public virtual Extrusora Extrusora { get; set; } = null!;
}

public class Extrusora : TenantEntity
{
    public string Nombre { get; set; } = null!;
}

<<<<<<< HEAD
public class ExtrusoraProducto : TenantEntity { }
public class ExtrusoraMezcladora : TenantEntity { }
public class Prensa : TenantEntity { }
public class PrensaProducto : TenantEntity { }
public class Troquel : TenantEntity { }
public class PrensaTroquel : TenantEntity { }
public class Turno : TenantEntity { }
public class CausaInterrupcion : TenantEntity { }
public class ProductoCategoria : TenantEntity { }
public class ProductoTerminado : TenantEntity { }
public class ExtrusionResultado : TenantEntity { }
public class ExtrusionInterrupcion : TenantEntity { }
public class Prensado : TenantEntity { }
public class PrensadoBobina : TenantEntity { }
public class PrensadoResultado : TenantEntity { }
public class PrensadoInterrupcion : TenantEntity { }
public class Carrera : TenantEntity { }
public class Carrete : TenantEntity { }
public class PaletCarrete : TenantEntity { }
public class OrdenEtiquetado : TenantEntity { }
public class Maquina : TenantEntity { }
=======
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
    public decimal KgVirgen { get; set; }
    public decimal Target { get; set; }
    public decimal KgMolido { get; set; }
    public DateTime? ProcessStart { get; set; }
    public DateTime? ProcessEnd { get; set; }
    public string? LoteSilo { get; set; }
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
public class CausaInterrupcion : TenantEntity
{
    public string Descripcion { get; set; } = null!;
    public bool Prensa { get; set; } = true;
    public bool Extrusora { get; set; } = true;
}
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

public class Carrete : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string NoSerie { get; set; } = string.Empty;
    public string Observaciones { get; set; } = string.Empty;
}

public class PaletCarrete : TenantEntity
{
    public Guid PaletId { get; set; }
    public virtual Palet Palet { get; set; } = null!;
    
    public Guid CarreteId { get; set; }
    public virtual Carrete Carrete { get; set; } = null!;
}

public class OrdenEtiquetado : TenantEntity
{
    public DateTime FechaOrden { get; set; } = DateTime.UtcNow;
    public string NoOrden { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; } = DateTime.UtcNow;
    public DateTime FechaTermina { get; set; } = DateTime.UtcNow;
    public string OperadorNombre { get; set; } = string.Empty;
    public string TurnoNombre { get; set; } = string.Empty;
    public int PiezasBuenas { get; set; }
    public int PiezasMolino { get; set; }
    public string EtiquetadoraActiva { get; set; } = string.Empty;
    public string VelLineaUno { get; set; } = string.Empty;
    public string VelLineaDos { get; set; } = string.Empty;
    public decimal HorasUtiles { get; set; }
    public decimal Eficiencia { get; set; }
    public string Observaciones { get; set; } = string.Empty;
}

public class Maquina : TenantEntity { public string Nombre { get; set; } = null!; }
>>>>>>> origin/information_report/refactor
