using HiCone.Domain.Common;
using System.Text.Json.Serialization;

namespace HiCone.Domain.Entities.Produccion;

// Operario en planta (legacy: DB.Operador)
public class Operario : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? UserGuid { get; set; }      // OperadorUserGUID (legacy)
    public string? FotografiaUrl { get; set; } // OperadorFotografia
    public bool Activo { get; set; } = true;

    public Guid? UserId { get; set; }
}

// Turno productivo (legacy: DB.Turno)
public class Turno : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public TimeSpan HoraInicio { get; set; }
    public TimeSpan HoraFin { get; set; }
    public int Orden { get; set; }
}

// Catálogo de causas para interrupciones (legacy: Reportes.CausaInterrupcion + Downtime.DownTimeCode)
public class CausaInterrupcion : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? Descripcion { get; set; }
    public bool AplicaPrensa { get; set; }
    public bool AplicaExtrusora { get; set; }
    public string? Tipo { get; set; } // mantenimiento / falla / cambio formato / etc.
}

// Extrusora — máquina que procesa pellets y produce Bobinas (legacy: DB.Extrusora)
public class Extrusora : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? ImagenUrl { get; set; }
    public bool Activa { get; set; } = true;

    public Guid? TurnoActualId { get; set; }
    public Guid? OperadorActualId { get; set; }

    [JsonIgnore] public virtual Turno? TurnoActual { get; set; }
    [JsonIgnore] public virtual Operario? OperadorActual { get; set; }
}

// Productos que una extrusora puede generar (legacy: DB.ExtrusoraProducto)
public class ExtrusoraProducto : TenantEntity
{
    public Guid ExtrusoraId { get; set; }
    public Guid ProductoId { get; set; }

    public decimal Calibre { get; set; }
    public decimal Ancho { get; set; }
    public decimal Longitud { get; set; }
    public decimal TiempoReposo { get; set; }
    public decimal TiempoProceso { get; set; }

    [JsonIgnore] public virtual Extrusora Extrusora { get; set; } = null!;
    [JsonIgnore] public virtual Producto Producto { get; set; } = null!;
}

// Configuración de mezcladora por extrusora (legacy: DB.ExtrusoraMezcladora)
public class ExtrusoraMezcladora : TenantEntity
{
    public Guid ExtrusoraId { get; set; }
    public decimal HusilloVirgenMin { get; set; }
    public decimal HusilloVirgenMax { get; set; }
    public decimal HusilloMolidoMin { get; set; }
    public decimal HusilloMolidoMax { get; set; }
    public decimal KgVirgen { get; set; }
    public decimal KgMolido { get; set; }

    [JsonIgnore] public virtual Extrusora Extrusora { get; set; } = null!;
}

// Prensa — máquina que comprime/corta Bobinas usando un Troquel (legacy: DB.Prensa)
public class Prensa : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
    public string? ImagenUrl { get; set; }
    public bool Activa { get; set; } = true;

    public Guid? TurnoActualId { get; set; }
    public Guid? OperadorActualId { get; set; }
    public Guid? TroquelActualId { get; set; }

    [JsonIgnore] public virtual Turno? TurnoActual { get; set; }
    [JsonIgnore] public virtual Operario? OperadorActual { get; set; }
    [JsonIgnore] public virtual Troquel? TroquelActual { get; set; }
}

// Productos que una prensa puede generar (legacy: DB.PrensaProducto)
public class PrensaProducto : TenantEntity
{
    public Guid PrensaId { get; set; }
    public Guid ProductoId { get; set; }
    public decimal? PiezasPorMinuto { get; set; }

    [JsonIgnore] public virtual Prensa Prensa { get; set; } = null!;
    [JsonIgnore] public virtual Producto Producto { get; set; } = null!;
}

// Troquel — molde para una Prensa que define forma/tamaño del Carrete (legacy: DB.Troquel)
public class Troquel : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public bool Activo { get; set; } = true;
    public bool EnPrensa { get; set; }
    public string? Estado { get; set; }

    public Guid? ProductoId { get; set; }
    public Guid? CategoriaId { get; set; }

    [JsonIgnore] public virtual Producto? Producto { get; set; }
    [JsonIgnore] public virtual ProductoCategoria? Categoria { get; set; }
}

// Asignación N:M Prensa ↔ Troquel (legacy: DB.PrensaTroquel)
public class PrensaTroquel : TenantEntity
{
    public Guid PrensaId { get; set; }
    public Guid TroquelId { get; set; }
    public bool Activo { get; set; } = true;

    [JsonIgnore] public virtual Prensa Prensa { get; set; } = null!;
    [JsonIgnore] public virtual Troquel Troquel { get; set; } = null!;
}

// Wrapper genérico de máquina para retrocompatibilidad con frontend (no en legacy)
public class Maquina : TenantEntity
{
    public string Codigo { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string Tipo { get; set; } = null!; // Extrusora | Prensa | Otro
    public bool Activa { get; set; } = true;
    public string? Estado { get; set; }
}
