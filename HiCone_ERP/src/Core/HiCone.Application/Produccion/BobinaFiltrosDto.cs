using HiCone.Domain.Enums;

namespace HiCone.Application.Produccion;

/// <summary>
/// Filtros de búsqueda para la exportación del listado de bobinas.
/// Equivalente al GridState de BobinaWWExport en el sistema GeneXus original.
/// </summary>
public class BobinaFiltrosDto
{
    /// <summary>Fecha de inicio del rango de búsqueda (hora inicio de la bobina).</summary>
    public DateTime? FechaDesde { get; set; }

    /// <summary>Fecha de fin del rango de búsqueda (hora salida de la bobina).</summary>
    public DateTime? FechaHasta { get; set; }

    /// <summary>Filtro por máquina extrusora específica.</summary>
    public Guid? ExtrusoraId { get; set; }

    /// <summary>
    /// Filtro por estado del ciclo de vida de la bobina.
    /// Usa el enum oficial EstadoBobina: EnProceso=1, EnReposo=2, Disponible=12, etc.
    /// </summary>
    public EstadoBobina? Estado { get; set; }

    /// <summary>Filtro por producto extruido.</summary>
    public Guid? ProductoId { get; set; }

    /// <summary>Filtro por código de lote de materia prima virgen.</summary>
    public string? LoteVirgen { get; set; }

    /// <summary>Formato de salida del reporte: "excel" o "pdf".</summary>
    public string Formato { get; set; } = "excel";
}
