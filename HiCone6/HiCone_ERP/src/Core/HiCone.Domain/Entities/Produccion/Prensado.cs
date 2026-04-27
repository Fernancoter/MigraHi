using HiCone.Domain.Common;
using System.Text.Json.Serialization;

namespace HiCone.Domain.Entities.Produccion;

// Sesión de prensado: consume Bobinas y produce Carretes (legacy: DB.Prensado)
public class Prensado : TenantEntity
{
    public string Folio { get; set; } = null!;
    public DateTime Fecha { get; set; } = DateTime.UtcNow;
    public DateTime? FechaFin { get; set; }
    public string Estado { get; set; } = "EnProceso";

    public Guid PrensaId { get; set; }
    public Guid? TurnoId { get; set; }
    public Guid? OperadorId { get; set; }
    public Guid? ProductoId { get; set; }
    public Guid? TroquelId { get; set; }

    [JsonIgnore] public virtual Prensa Prensa { get; set; } = null!;
    [JsonIgnore] public virtual Turno? Turno { get; set; }
    [JsonIgnore] public virtual Operario? Operador { get; set; }
    [JsonIgnore] public virtual Producto? Producto { get; set; }
    [JsonIgnore] public virtual Troquel? Troquel { get; set; }

    public virtual ICollection<PrensadoBobina> BobinasConsumidas { get; set; } = new List<PrensadoBobina>();
    public virtual ICollection<PrensadoInterrupcion> Interrupciones { get; set; } = new List<PrensadoInterrupcion>();
    public virtual ICollection<Carrera> Carreras { get; set; } = new List<Carrera>();
    public virtual PrensadoResultado? Resultado { get; set; }
}

// Bobinas consumidas en un Prensado (legacy: DB.PrensadoBobina)
public class PrensadoBobina : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public Guid BobinaId { get; set; }
    public int CantCarrera { get; set; }
    public decimal? KgProcesados { get; set; }
    public DateTime? HoraInicio { get; set; }
    public DateTime? HoraFin { get; set; }

    [JsonIgnore] public virtual Prensado Prensado { get; set; } = null!;
    [JsonIgnore] public virtual Bobina Bobina { get; set; } = null!;
}

// Resultado consolidado del prensado (legacy: DB.PrensadoResultado)
public class PrensadoResultado : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public int PiezasBuenas { get; set; }
    public int PiezasMolino { get; set; }
    public decimal MermaKg { get; set; }
    public int NoPalets { get; set; }
    public int CarretesSobrantes { get; set; }
    public string? Observaciones { get; set; }

    [JsonIgnore] public virtual Prensado Prensado { get; set; } = null!;
}

// Interrupción durante prensado (legacy: DB.PrensadoInterrupcion)
public class PrensadoInterrupcion : TenantEntity
{
    public Guid PrensadoId { get; set; }
    public Guid? CausaId { get; set; }
    public DateTime HoraInicio { get; set; }
    public DateTime? HoraFin { get; set; }
    public TimeSpan? Duracion { get; set; }
    public bool Concluida { get; set; }
    public string? Motivo { get; set; }

    [JsonIgnore] public virtual Prensado Prensado { get; set; } = null!;
    [JsonIgnore] public virtual CausaInterrupcion? Causa { get; set; }
}

// Carrera: una sesión de Prensa usando un Troquel; consume N Bobinas → produce M Carretes (legacy: DB.Carrera)
public class Carrera : TenantEntity
{
    public string Numero { get; set; } = null!;       // CarreraNo
    public string Estado { get; set; } = "EnProceso"; // CarreraEstado
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;
    public DateTime? FechaValidacion { get; set; }
    public bool PaletTerminado { get; set; }

    public Guid? PrensadoId { get; set; }
    public Guid? TroquelId { get; set; }

    [JsonIgnore] public virtual Prensado? Prensado { get; set; }
    [JsonIgnore] public virtual Troquel? Troquel { get; set; }

    public virtual ICollection<Carrete> Carretes { get; set; } = new List<Carrete>();
}

// Carrete: producto terminado, sale de una Carrera (legacy: DB.Carrete)
public class Carrete : TenantEntity
{
    public string NoLinea { get; set; } = null!;     // CarreteNoLinea
    public string NoSerie { get; set; } = null!;     // CarreteNoSerie
    public string Estado { get; set; } = "EnLinea";  // CarreteEstado
    public bool EnMolino { get; set; }
    public string? Molino { get; set; }
    public decimal MermaMolino { get; set; }

    public Guid? CarreraId { get; set; }
    public Guid? PaletId { get; set; }

    [JsonIgnore] public virtual Carrera? Carrera { get; set; }
    [JsonIgnore] public virtual Palet? Palet { get; set; }
}

// Asignación N:M Palet ↔ Carrete (legacy: DB.PaletCarrete)
public class PaletCarrete : TenantEntity
{
    public Guid PaletId { get; set; }
    public Guid CarreteId { get; set; }
    public int Orden { get; set; }

    [JsonIgnore] public virtual Palet Palet { get; set; } = null!;
    [JsonIgnore] public virtual Carrete Carrete { get; set; } = null!;
}

// Orden de etiquetado para carretes/palets (legacy: DB.OrdenEtiquetado)
public class OrdenEtiquetado : TenantEntity
{
    public string Folio { get; set; } = null!;
    public DateTime FechaInicio { get; set; } = DateTime.UtcNow;
    public DateTime? FechaTermina { get; set; }
    public string? Observaciones { get; set; }

    public decimal VelLineaUno { get; set; }
    public decimal VelLineaDos { get; set; }
    public int PiezasBuenas { get; set; }

    public Guid? OperadorId { get; set; }
    public Guid? TurnoId { get; set; }

    [JsonIgnore] public virtual Operario? Operador { get; set; }
    [JsonIgnore] public virtual Turno? Turno { get; set; }
}
