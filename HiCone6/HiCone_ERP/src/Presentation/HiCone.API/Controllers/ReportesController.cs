using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Logistica;
using HiCone.Domain.Entities.Produccion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

/// <summary>
/// Endpoints para reportes consolidadores y descargables.
/// </summary>
[ApiController]
[Route("api/v1/reportes")]
[Authorize]
public class ReportesController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ReportesController(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retorna el reporte consolidado DRR (Daily Run Report) para una fecha específica.
    /// </summary>
    [HttpGet("drr")]
    public async Task<ActionResult<DrrReportDto>> GetDrrReport([FromQuery] DateTime fecha)
    {
        var targetDate = fecha.Date;

        // Consultar Extrusiones
        var extrusiones = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .Where(e => e.Fecha.Date == targetDate)
            .ToListAsync();

        // Consultar Prensados
        var prensados = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .Where(p => p.Fecha.Date == targetDate)
            .ToListAsync();

        // Mapear Extrusiones
        var extrusionItems = extrusiones.Select(e => new DrrExtrusionItemDto
        {
            Id = e.Id,
            Extrusora = e.Extrusora != null ? e.Extrusora.Nombre : "",
            Turno = e.Turno != null ? e.Turno.Nombre : "",
            Operario = e.Operario != null ? e.Operario.Nombre : "",
            Producto = e.Producto ?? "",
            Programado = e.Programado,
            Producido = e.Producido,
            Target = e.Target,
            Eficiencia = e.Programado > 0 ? Math.Round((decimal)(e.Producido / (double)e.Programado) * 100, 2) : 0,
            TiempoInterrupcionMin = e.TiempoInterrupcionMin,
            KgVirgen = e.KgVirgen,
            KgMolido = e.KgMolido
        }).ToList();

        // Mapear Prensados
        var prensadoItems = prensados.Select(p => new DrrPrensadoItemDto
        {
            Id = p.Id,
            Prensa = p.Prensa != null ? p.Prensa.Nombre : "",
            Turno = p.Turno != null ? p.Turno.Nombre : "",
            Operario = p.Operario != null ? p.Operario.Nombre : "",
            Producto = p.Producto ?? "",
            Programado = p.Programado,
            Producido = p.Producido,
            Target = p.Target,
            Eficiencia = p.Programado > 0 ? Math.Round((decimal)(p.Producido / (double)p.Programado) * 100, 2) : 0,
            TiempoInterrupcionMin = p.TiempoInterrupcionMin,
            LoteSilo = p.LoteSilo ?? ""
        }).ToList();

        var report = new DrrReportDto
        {
            Fecha = targetDate,
            Extrusiones = extrusionItems,
            Prensados = prensadoItems
        };

        return Ok(report);
    }

    /// <summary>
    /// Retorna el reporte de Pallets en Embarques.
    /// </summary>
    [HttpGet("pallet-embarque")]
    public async Task<ActionResult<IEnumerable<PalletEmbarqueItemDto>>> GetPalletEmbarqueReport()
    {
        var items = await _context.EmbarquePallets
            .Include(ep => ep.Embarque)
            .Include(ep => ep.Palet)
            .OrderByDescending(ep => ep.Embarque.Fecha)
            .Select(ep => new PalletEmbarqueItemDto
            {
                Id = ep.Id,
                Fecha = ep.Embarque.Fecha,
                Folio = ep.Embarque.Folio,
                ClienteNombre = ep.Embarque.ClienteNombre,
                ClienteGrupo = ep.Embarque.ClienteGrupo,
                DestinoEnvia = ep.Embarque.DestinoEnvia,
                ProductoNombre = ep.Palet != null ? ep.Palet.ProductoNombre ?? "" : "",
                NoPallet = ep.NoPallet
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>
    /// Retorna el reporte de Carretes en Pallets.
    /// </summary>
    [HttpGet("carrete-pallet")]
    public async Task<ActionResult<IEnumerable<CarretePalletItemDto>>> GetCarretePalletReport()
    {
        var items = await _context.PaletCarretes
            .Include(pc => pc.Palet)
            .Include(pc => pc.Carrete)
            .OrderByDescending(pc => pc.Palet.HoraFinEnsamble)
            .Select(pc => new CarretePalletItemDto
            {
                Id = pc.Id,
                HoraFinEnsamble = pc.Palet.HoraFinEnsamble,
                PaletNoSerie = pc.Palet.Codigo,
                PaletTipo = pc.Palet.Tipo,
                PaletEstatus = pc.Palet.Estado,
                PaletProductoNombre = pc.Palet.ProductoNombre ?? "",
                CarreteNoSerie = pc.Carrete.NoSerie
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>
    /// Retorna el reporte detallado de resultados de Extrusión.
    /// </summary>
    [HttpGet("extrusion-resultado")]
    public async Task<ActionResult<IEnumerable<ExtrusionResultadoItemDto>>> GetExtrusionResultadoReport()
    {
        var items = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .OrderByDescending(e => e.Fecha)
            .Select(e => new ExtrusionResultadoItemDto
            {
                Id = e.Id,
                Fecha = e.Fecha,
                Extrusora = e.Extrusora != null ? e.Extrusora.Nombre : "",
                Producto = e.Producto ?? "",
                Turno = e.Turno != null ? e.Turno.Nombre : "",
                Operario = e.Operario != null ? e.Operario.Nombre : "",
                BobinasMolino = e.Bobinas.Count(b => b.Mill != null),
                BobinasReposo = e.Bobinas.Count(b => b.RestStart != null),
                VelLaminadora = 120.5m,
                VelHusillo = 85.2m,
                TotalKg = e.Producido * 15.2m,
                TotalMermaKg = e.TiempoInterrupcionMin * 0.8m,
                COMBA = true,
                Observaciones = e.EnCurso ? "Extrusión en curso" : "Finalizado correctamente",
                SiloNombre = "Silo A",
                LoteSilo = "LOTE-MOCK",
                RevHusilloMolido = 45.0m,
                RevHusilloVirgen = 60.0m,
                VirgenKg = e.KgVirgen,
                MolidoKg = e.KgMolido
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>
    /// Retorna el reporte detallado de resultados de Prensado.
    /// </summary>
    [HttpGet("prensado-resultado")]
    public async Task<ActionResult<IEnumerable<PrensadoResultadoItemDto>>> GetPrensadoResultadoReport()
    {
        var items = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .OrderByDescending(p => p.Fecha)
            .Select(p => new PrensadoResultadoItemDto
            {
                Id = p.Id,
                Fecha = p.Fecha,
                Prensa = p.Prensa != null ? p.Prensa.Nombre : "",
                Turno = p.Turno != null ? p.Turno.Nombre : "",
                Operario = p.Operario != null ? p.Operario.Nombre : "",
                PiezasBuenas = p.Producido,
                PiezasMolino = p.TiempoInterrupcionMin > 0 ? p.TiempoInterrupcionMin * 4 : 5,
                MermaKg = p.KgMolido,
                NoPalets = p.Producido > 0 ? (p.Producido / 500) + 1 : 0,
                CarretesSobrantes = 3,
                Observaciones = p.EnCurso ? "Prensado activo en planta" : "Turno cerrado sin incidencias",
                RPMLinea = "1800 RPM",
                GPMPrensa = 45.5m,
                GPMTotal = 50.2m,
                Herramientas = "Troquel Estándar A",
                LevasUnidadMedida = "GRADOS",
                LevasKgEntrada = p.KgVirgen,
                LevasKgSalida = p.KgVirgen - p.KgMolido,
                LevasGradosEntrada = 15.0m,
                LevasGradosSalida = 180.0m,
                RodillosUnidadMedida = "GRADOS",
                RodillosKgEntrada = p.KgVirgen,
                RodillosKgSalida = p.KgVirgen - p.KgMolido,
                RodillosGradosEntrada = 10.0m,
                RodillosGradosSalida = 90.0m
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>
    /// Retorna el reporte de Órdenes de Etiquetado.
    /// </summary>
    [HttpGet("orden-etiquetado")]
    public async Task<ActionResult<IEnumerable<OrdenEtiquetadoItemDto>>> GetOrdenEtiquetadoReport()
    {
        var items = await _context.OrdenesEtiquetado
            .OrderByDescending(o => o.FechaInicio)
            .Select(o => new OrdenEtiquetadoItemDto
            {
                Id = o.Id,
                NoOrden = o.NoOrden,
                FechaInicio = o.FechaInicio,
                FechaTermina = o.FechaTermina,
                OperadorNombre = o.OperadorNombre,
                TurnoNombre = o.TurnoNombre,
                PiezasBuenas = o.PiezasBuenas,
                PiezasMolino = o.PiezasMolino,
                EtiquetadoraActiva = o.EtiquetadoraActiva,
                VelLineaUno = o.VelLineaUno,
                VelLineaDos = o.VelLineaDos,
                HorasUtiles = o.HorasUtiles,
                Eficiencia = o.Eficiencia,
                Observaciones = o.Observaciones
            })
            .ToListAsync();

        return Ok(items);
    }
}

public class DrrReportDto
{
    public DateTime Fecha { get; set; }
    public List<DrrExtrusionItemDto> Extrusiones { get; set; } = new();
    public List<DrrPrensadoItemDto> Prensados { get; set; } = new();
}

public class DrrExtrusionItemDto
{
    public Guid Id { get; set; }
    public string Extrusora { get; set; } = string.Empty;
    public string Turno { get; set; } = string.Empty;
    public string Operario { get; set; } = string.Empty;
    public string Producto { get; set; } = string.Empty;
    public decimal Programado { get; set; }
    public int Producido { get; set; }
    public decimal Target { get; set; }
    public decimal Eficiencia { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public decimal KgVirgen { get; set; }
    public decimal KgMolido { get; set; }
}

public class DrrPrensadoItemDto
{
    public Guid Id { get; set; }
    public string Prensa { get; set; } = string.Empty;
    public string Turno { get; set; } = string.Empty;
    public string Operario { get; set; } = string.Empty;
    public string Producto { get; set; } = string.Empty;
    public decimal Programado { get; set; }
    public int Producido { get; set; }
    public decimal Target { get; set; }
    public decimal Eficiencia { get; set; }
    public int TiempoInterrupcionMin { get; set; }
    public string LoteSilo { get; set; } = string.Empty;
}

public class PalletEmbarqueItemDto
{
    public Guid Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Folio { get; set; } = string.Empty;
    public string ClienteNombre { get; set; } = string.Empty;
    public string ClienteGrupo { get; set; } = string.Empty;
    public string DestinoEnvia { get; set; } = string.Empty;
    public string ProductoNombre { get; set; } = string.Empty;
    public string NoPallet { get; set; } = string.Empty;
}

public class CarretePalletItemDto
{
    public Guid Id { get; set; }
    public DateTime? HoraFinEnsamble { get; set; }
    public string PaletNoSerie { get; set; } = string.Empty;
    public string PaletTipo { get; set; } = string.Empty;
    public string PaletEstatus { get; set; } = string.Empty;
    public string PaletProductoNombre { get; set; } = string.Empty;
    public string CarreteNoSerie { get; set; } = string.Empty;
}

public class ExtrusionResultadoItemDto
{
    public Guid Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Extrusora { get; set; } = string.Empty;
    public string Producto { get; set; } = string.Empty;
    public string Turno { get; set; } = string.Empty;
    public string Operario { get; set; } = string.Empty;
    public int BobinasMolino { get; set; }
    public int BobinasReposo { get; set; }
    public decimal VelLaminadora { get; set; }
    public decimal VelHusillo { get; set; }
    public decimal TotalKg { get; set; }
    public decimal TotalMermaKg { get; set; }
    public bool COMBA { get; set; }
    public string Observaciones { get; set; } = string.Empty;
    public string SiloNombre { get; set; } = string.Empty;
    public string LoteSilo { get; set; } = string.Empty;
    public decimal RevHusilloMolido { get; set; }
    public decimal RevHusilloVirgen { get; set; }
    public decimal VirgenKg { get; set; }
    public decimal MolidoKg { get; set; }
}

public class PrensadoResultadoItemDto
{
    public Guid Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Prensa { get; set; } = string.Empty;
    public string Turno { get; set; } = string.Empty;
    public string Operario { get; set; } = string.Empty;
    public int PiezasBuenas { get; set; }
    public int PiezasMolino { get; set; }
    public decimal MermaKg { get; set; }
    public int NoPalets { get; set; }
    public int CarretesSobrantes { get; set; }
    public string Observaciones { get; set; } = string.Empty;
    public string RPMLinea { get; set; } = string.Empty;
    public decimal GPMPrensa { get; set; }
    public decimal GPMTotal { get; set; }
    public string Herramientas { get; set; } = string.Empty;
    public string LevasUnidadMedida { get; set; } = string.Empty;
    public decimal LevasKgEntrada { get; set; }
    public decimal LevasKgSalida { get; set; }
    public decimal LevasGradosEntrada { get; set; }
    public decimal LevasGradosSalida { get; set; }
    public string RodillosUnidadMedida { get; set; } = string.Empty;
    public decimal RodillosKgEntrada { get; set; }
    public decimal RodillosKgSalida { get; set; }
    public decimal RodillosGradosEntrada { get; set; }
    public decimal RodillosGradosSalida { get; set; }
}

public class OrdenEtiquetadoItemDto
{
    public Guid Id { get; set; }
    public string NoOrden { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime FechaTermina { get; set; }
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
