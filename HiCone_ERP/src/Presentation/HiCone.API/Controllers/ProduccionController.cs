using HiCone.Application.Interfaces;
using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiCone.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class ProduccionController : ControllerBase
{
    private readonly IProduccionService _produccionService;
    private readonly IApplicationDbContext _context;

    public ProduccionController(IProduccionService produccionService, IApplicationDbContext context)
    {
        _produccionService = produccionService;
        _context = context;
    }

    // ── Extrusión ─────────────────────────────────────────────────────────

    [HttpGet("extrusion/{id}")]
    public async Task<ActionResult<Extrusion>> GetExtrusion(Guid id)
    {
        var item = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Operario)
            .Include(e => e.Producto)
            .Include(e => e.Bobinas)
            .Include(e => e.Interrupciones)
            .Include(e => e.Resultado)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (item == null) return NotFound(new { message = "Orden de extrusión no encontrada." });
        return Ok(item);
    }

    [HttpPost("extrusion")]
    public async Task<ActionResult<Extrusion>> CreateExtrusion([FromBody] CreateExtrusionRequest request)
    {
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var codigo = $"EXT-{DateTime.UtcNow:yyyyMMddHHmmss}";

        var entity = new Extrusion
        {
            Id = Guid.NewGuid(),
            Codigo = codigo,
            Fecha = request.Fecha.Date,
            FechaInicio = request.ProcessStart ?? DateTime.UtcNow,
            FechaFin = request.ProcessEnd,
            Estado = (EstadoExtrusion)request.Estado,
            ExtrusoraId = request.ExtrusoraId,
            TurnoId = request.TurnoId,
            OperarioId = request.OperarioId,
            ProductoId = request.ProductoId,
            Calibre = request.Calibre,
            Ancho = request.Ancho,
            Longitud = request.Longitud,
            MetaKg = request.MetaKg,
            VirgenKg = request.VirgenKg,
            MolidoKg = request.MolidoKg,
            LoteSilo = request.LoteSilo,
            LotePaqueteAditivos = request.LotePaqueteAditivos,
            Observaciones = request.Observaciones,
            MotivoAnticipado = request.MotivoAnticipado,
            SiloVirgenId = request.SiloVirgenId,
            SiloMolidoId = request.SiloMolidoId,
            TenantId = defaultTenantId
        };

        _context.Extrusiones.Add(entity);
        await _context.SaveChangesAsync(default);

        return Ok(entity);
    }

    [HttpPut("extrusion/{id}")]
    public async Task<IActionResult> UpdateExtrusion(Guid id, [FromBody] UpdateExtrusionRequest request)
    {
        var entity = await _context.Extrusiones.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de extrusión no encontrada." });

        entity.Fecha = request.Fecha.Date;
        entity.FechaInicio = request.ProcessStart ?? entity.FechaInicio;
        entity.FechaFin = request.ProcessEnd;
        entity.Estado = (EstadoExtrusion)request.Estado;
        entity.ExtrusoraId = request.ExtrusoraId;
        entity.TurnoId = request.TurnoId;
        if (request.ProductoId.HasValue)
        {
            entity.ProductoId = request.ProductoId.Value;
        }
        entity.OperarioId = request.OperarioId;
        entity.Calibre = request.Calibre;
        entity.Ancho = request.Ancho;
        entity.Longitud = request.Longitud;
        entity.MetaKg = request.MetaKg;
        entity.VirgenKg = request.VirgenKg;
        entity.MolidoKg = request.MolidoKg;
        entity.LoteSilo = request.LoteSilo;
        entity.LotePaqueteAditivos = request.LotePaqueteAditivos;
        entity.Observaciones = request.Observaciones;
        entity.MotivoAnticipado = request.MotivoAnticipado;
        entity.SiloVirgenId = request.SiloVirgenId;
        entity.SiloMolidoId = request.SiloMolidoId;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("extrusion/{id}")]
    public async Task<IActionResult> DeleteExtrusion(Guid id)
    {
        var entity = await _context.Extrusiones.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de extrusión no encontrada." });

        entity.IsDeleted = true;
        entity.DeletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [AllowAnonymous]
    [HttpPost("extrusion/iniciar")]
    public async Task<ActionResult<Extrusion>> IniciarExtrusion([FromBody] IniciarExtrusionRequest request)
    {
        try
        {
            var result = await _produccionService.IniciarExtrusionAsync(
                request.ExtrusoraId, 
                request.OperarioId, 
                request.TurnoId, 
                request.ProductoId,
                request.SiloVirgenId,
                request.VirgenKg,
                request.SiloMolidoId,
                request.MolidoKg,
                request.MetaKg,
                request.RevHusilloVirgen,
                request.RevHusilloMolido,
                request.LotePaqueteAditivos,
                request.Observaciones
            );
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [AllowAnonymous]
    [HttpPost("extrusion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarExtrusion(Guid id, [FromBody] FinalizarExtrusionRequest? request)
    {
        try
        {
            var exists = await _context.Extrusiones.AnyAsync(e => e.Id == id);
            if (!exists)
            {
                return NotFound(new { message = "La orden de extrusión no existe en la base de datos (posiblemente fue eliminada o la base de datos fue reiniciada). Por favor, recargue la página." });
            }
            var result = await _produccionService.FinalizarExtrusionAsync(id, request?.Motivo);
            return result ? Ok() : BadRequest(new { message = "No se pudo finalizar la extrusión." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message, detail = ex.InnerException?.Message });
        }
    }

    [AllowAnonymous]
    [HttpPost("extrusion/guardar-bobina")]
    public async Task<ActionResult<Bobina>> GuardarBobina([FromBody] GuardarBobinaRequest request)
    {
        try
        {
            var result = await _produccionService.GuardarBobinaAsync(
                request.ExtrusionId,
                request.BobinaNo,
                request.Origen,
                request.Peso,
                request.Calibre,
                request.Desviacion,
                request.Color,
                request.MermaKg,
                request.Motivo,
                request.Observaciones
            );
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message, inner = ex.InnerException?.Message });
        }
    }

    [AllowAnonymous]
    [HttpGet("extrusion/activa/{extrusoraId}")]
    public async Task<ActionResult<Extrusion>> GetExtrusionActiva(string extrusoraId)
    {
        Guid targetId = Guid.Empty;
        if (Guid.TryParse(extrusoraId, out var g))
        {
            targetId = g;
        }
        else
        {
            var ext = await _context.Extrusoras.FirstOrDefaultAsync(e => e.Nombre.Contains(extrusoraId) || e.NumeroExtrusora == extrusoraId || e.Codigo == extrusoraId);
            if (ext != null) targetId = ext.Id;
        }

        if (targetId == Guid.Empty)
        {
            var firstExt = await _context.Extrusoras.FirstOrDefaultAsync();
            if (firstExt != null) targetId = firstExt.Id;
        }

        var result = await _produccionService.GetExtrusionActivaAsync(targetId);
        if (result == null) return NotFound(new { message = "No hay extrusión activa para esta extrusora." });
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("extrusion/siguiente-bobina-no")]
    public async Task<ActionResult<int>> ObtenerSiguienteBobinaNo([FromQuery] Guid extrusoraId, [FromQuery] Guid productoId)
    {
        var result = await _produccionService.ObtenerSiguienteBobinaNoAsync(extrusoraId, productoId);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("extrusora-mezcladora")]
    public async Task<ActionResult<IEnumerable<ExtrusoraMezcladora>>> GetExtrusoraMezcladoras()
    {
        var result = await _produccionService.GetExtrusoraMezcladorasAsync();
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("extrusora-mezcladora")]
    public async Task<ActionResult<ExtrusoraMezcladora>> SaveExtrusoraMezcladora([FromBody] ExtrusoraMezcladoraDto dto)
    {
        if (dto.ExtrusoraId == Guid.Empty)
            return BadRequest(new { Error = "El campo ExtrusoraId es requerido y no puede estar vacío." });
        if (string.IsNullOrWhiteSpace(dto.Nombre))
            return BadRequest(new { Error = "El campo Nombre es requerido." });

        var item = new ExtrusoraMezcladora
        {
            Id = dto.Id ?? Guid.Empty,
            ExtrusoraId = dto.ExtrusoraId,
            Nombre = dto.Nombre,
            Codigo = dto.Codigo,
            VirgenMin = dto.VirgenMin,
            VirgenMax = dto.VirgenMax,
            MolidoMin = dto.MolidoMin,
            MolidoMax = dto.MolidoMax,
            KgVirgen = dto.KgVirgen,
            KgMolido = dto.KgMolido
        };
        var result = await _produccionService.SaveExtrusoraMezcladoraAsync(item);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpDelete("extrusora-mezcladora/{id}")]
    public async Task<IActionResult> DeleteExtrusoraMezcladora(Guid id)
    {
        var result = await _produccionService.DeleteExtrusoraMezcladoraAsync(id);
        return result ? Ok() : NotFound();
    }

    [AllowAnonymous]
    [HttpGet("operarios")]
    public async Task<ActionResult<IEnumerable<Operario>>> GetOperarios()
    {
        var result = await _produccionService.GetOperariosAsync();
        return Ok(result);
    }

    [HttpPost("operarios")]
    public async Task<ActionResult<Operario>> CreateOperario([FromBody] OperarioCreateDto dto)
    {
        var count = await _context.Operarios.CountAsync();
        var operario = new Operario
        {
            Id = Guid.NewGuid(),
            NumeroEmpleado = !string.IsNullOrWhiteSpace(dto.NumeroEmpleado) ? dto.NumeroEmpleado : $"EMP-{(count + 1):D3}",
            NombreCompleto = dto.Nombre ?? dto.NombreCompleto ?? "Nuevo Operario",
            IsActive = dto.Activo ?? dto.IsActive ?? true
        };
        _context.Operarios.Add(operario);
        await _context.SaveChangesAsync(default);
        return Ok(operario);
    }

    [HttpPut("operarios/{id}")]
    public async Task<IActionResult> UpdateOperario(Guid id, [FromBody] OperarioCreateDto dto)
    {
        var item = await _context.Operarios.FindAsync(id);
        if (item == null) return NotFound();

        if (!string.IsNullOrWhiteSpace(dto.Nombre) || !string.IsNullOrWhiteSpace(dto.NombreCompleto))
            item.NombreCompleto = dto.Nombre ?? dto.NombreCompleto!;

        if (dto.Activo.HasValue) item.IsActive = dto.Activo.Value;
        else if (dto.IsActive.HasValue) item.IsActive = dto.IsActive.Value;

        await _context.SaveChangesAsync(default);
        return Ok(item);
    }

    [HttpDelete("operarios/{id}")]
    public async Task<IActionResult> DeleteOperario(Guid id)
    {
        var item = await _context.Operarios.FindAsync(id);
        if (item == null) return NotFound();

        item.IsDeleted = true;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpGet("productos")]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
    {
        var result = await _produccionService.GetProductosAsync();
        return Ok(result);
    }

    [HttpPost("productos")]
    public async Task<ActionResult<Producto>> CreateProducto([FromBody] ProductoCreateDto dto)
    {
        var count = await _context.Productos.CountAsync();
        var codeVal = !string.IsNullOrWhiteSpace(dto.Clave) ? dto.Clave : (!string.IsNullOrWhiteSpace(dto.Codigo) ? dto.Codigo : $"HC-PROD-{(count + 1):D3}");
        var producto = new Producto
        {
            Id = Guid.NewGuid(),
            Clave = codeVal,
            Codigo = codeVal,
            Nombre = !string.IsNullOrWhiteSpace(dto.Nombre) ? dto.Nombre : "Nuevo Producto",
            Descripcion = dto.Descripcion,
            PrecioUnitario = dto.PrecioUnitario ?? 0,
            CategoriaId = dto.CategoriaId,
            ProductoBase = dto.ProductoBase,
            ProductoSAE = dto.ProductoSAE,
            IsActive = dto.IsActive ?? true,
            TenantId = new Guid("00000000-0000-0000-0000-000000000001")
        };
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync(default);
        return Ok(producto);
    }

    [HttpPut("productos/{id}")]
    public async Task<IActionResult> UpdateProducto(Guid id, [FromBody] ProductoCreateDto dto)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null) return NotFound();

        if (!string.IsNullOrWhiteSpace(dto.Clave)) producto.Codigo = dto.Clave;
        if (!string.IsNullOrWhiteSpace(dto.Codigo)) producto.Codigo = dto.Codigo;
        if (!string.IsNullOrWhiteSpace(dto.Nombre)) producto.Nombre = dto.Nombre;
        if (dto.Descripcion != null) producto.Descripcion = dto.Descripcion;
        if (dto.PrecioUnitario.HasValue) producto.PrecioUnitario = dto.PrecioUnitario.Value;
        if (dto.CategoriaId.HasValue) producto.CategoriaId = dto.CategoriaId;
        if (dto.ProductoBase != null) producto.ProductoBase = dto.ProductoBase;
        if (dto.ProductoSAE != null) producto.ProductoSAE = dto.ProductoSAE;
        if (dto.IsActive.HasValue) producto.IsActive = dto.IsActive.Value;

        await _context.SaveChangesAsync(default);
        return Ok(producto);
    }

    [HttpDelete("productos/{id}")]
    public async Task<IActionResult> DeleteProducto(Guid id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null) return NotFound();
        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpGet("turnos")]
    public async Task<ActionResult<IEnumerable<Turno>>> GetTurnos()
    {
        var result = await _produccionService.GetTurnosAsync();
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("extrusion/{id}/consumo")]
    public async Task<IActionResult> RegistrarConsumoExtrusion(Guid id, [FromBody] RegistrarConsumoRequest request)
    {
        try
        {
            var virgenId = request.SiloVirgenId.HasValue && request.SiloVirgenId.Value != Guid.Empty
                ? request.SiloVirgenId.Value
                : (await _context.Silos.FirstOrDefaultAsync(s => s.Activo))?.Id ?? Guid.Empty;

            var virgenKg = request.VirgenKg.HasValue && request.VirgenKg.Value > 0 ? request.VirgenKg.Value : 160m;
            var molidoKg = request.MolidoKg.HasValue ? request.MolidoKg.Value : 40m;

            var result = await _produccionService.RegistrarConsumoExtrusionAsync(id, virgenId, virgenKg, request.SiloMolidoId, molidoKg);
            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // ── Prensado ───────────────────────────────────────────────────────────

    [AllowAnonymous]
    [HttpPost("prensado/iniciar")]
    public async Task<ActionResult<Prensado>> IniciarPrensado([FromBody] IniciarPrensadoRequest request)
    {
        try
        {
            var result = await _produccionService.IniciarPrensadoAsync(request.PrensaId, request.OperarioId, request.TurnoId, request.ProductoId, request.TroquelId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message, detail = ex.InnerException?.Message });
        }
    }

    [HttpPost("prensado/{id}/montar-bobina")]
    public async Task<IActionResult> MontarBobina(Guid id, [FromBody] Guid bobinaId)
    {
        var result = await _produccionService.MontarBobinaEnPrensadoAsync(id, bobinaId);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("prensado/{id}/iniciar-carrera")]
    public async Task<ActionResult<Carrera>> IniciarCarrera(Guid id)
    {
        var result = await _produccionService.IniciarCarreraAsync(id);
        return Ok(result);
    }

    [HttpPost("prensado/carrera/{id}/finalizar")]
    public async Task<IActionResult> FinalizarCarrera(Guid id)
    {
        var result = await _produccionService.FinalizarCarreraAsync(id);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("prensado/{id}/concluir")]
    public async Task<IActionResult> ConcluirPrensado(Guid id, [FromBody] ConcluirPrensadoRequest request)
    {
        var entity = await _context.Prensados.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de prensado no encontrada." });

        entity.LevasUnidadMedida = request.LevasUnidadMedida ?? "Kg";
        entity.RodillosUnidadMedida = request.RodillosUnidadMedida ?? "Kg";
        entity.LevasKgEntrada = request.LevasKgEntrada;
        entity.LevasKgSalida = request.LevasKgSalida;
        entity.LevasGradosEntrada = request.LevasGradosEntrada;
        entity.LevasGradosSalida = request.LevasGradosSalida;
        entity.RodillosKgEntrada = request.RodillosKgEntrada;
        entity.RodillosKgSalida = request.RodillosKgSalida;
        entity.RodillosGradosEntrada = request.RodillosGradosEntrada;
        entity.RodillosGradosSalida = request.RodillosGradosSalida;
        entity.HoraFinProceso = request.FinProceso ?? DateTime.UtcNow;
        entity.Estado = EstadoPrensado.Finalizado;
        entity.EnCurso = false;

        await _context.SaveChangesAsync(default);
        return Ok(new { message = "Prensado concluido exitosamente." });
    }

    // ── Pallets ────────────────────────────────────────────────────────────

    [HttpGet("palets/buscar")]
    public async Task<ActionResult> BuscarPalets([FromQuery] string? productoCodigo, [FromQuery] string? noSerie)
    {
        var query = _context.Palets
            .Include(p => p.Producto)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(productoCodigo))
        {
            query = query.Where(p => p.Producto != null && (p.Producto.Codigo == productoCodigo || p.Producto.Nombre == productoCodigo));
        }

        if (!string.IsNullOrWhiteSpace(noSerie))
        {
            query = query.Where(p => p.NoSerie.Contains(noSerie));
        }

        var list = await query.Select(p => new {
            id = p.Id,
            noSerie = p.NoSerie,
            estatus = p.Estatus.ToString(),
            producto = p.Producto != null ? p.Producto.Codigo : "Sin Producto",
            carretes = p.TotalCarretes > 0 ? p.TotalCarretes : 32
        }).ToListAsync();

        return Ok(list);
    }

    [HttpPost("palets")]
    public async Task<ActionResult<Palet>> CrearPalet([FromBody] CrearPaletRequest request)
    {
        var result = await _produccionService.CrearPaletAsync(request.ProductoId, request.OperarioId, request.PrensaId);
        return Ok(result);
    }

    [HttpPost("palets/{id}/agregar-carrete")]
    public async Task<IActionResult> AgregarCarrete(Guid id, [FromBody] Guid carreteId)
    {
        var result = await _produccionService.AgregarCarreteAPaletAsync(id, carreteId);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("palets/{id}/finalizar")]
    public async Task<IActionResult> FinalizarPalet(Guid id)
    {
        var result = await _produccionService.FinalizarPaletAsync(id);
        return result ? Ok() : BadRequest();
    }


    // ── Interrupciones (Downtime) ──────────────────────────────────────────
    
    [HttpGet("causas-interrupcion")]
    public async Task<ActionResult<IEnumerable<CausaInterrupcion>>> GetCausasInterrupcion()
        => Ok(await _produccionService.GetCausasInterrupcionAsync());

    [HttpPost("extrusion/interrupcion")]
    public async Task<ActionResult<ExtrusionInterrupcion>> RegistrarInterrupcionExtrusion([FromBody] RegistrarInterrupcionRequest request)
    {
        var result = await _produccionService.RegistrarInterrupcionExtrusionAsync(request.EntidadId, request.CausaId, request.Descripcion);
        return Ok(result);
    }

    [HttpPost("extrusion/interrupcion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionExtrusion(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionExtrusionAsync(id);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("extrusion/interrupcion/activa/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionExtrusionActiva(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionExtrusionActivaAsync(id);
        return result ? Ok() : BadRequest("No se encontró interrupción activa para esta extrusión");
    }

    [HttpGet("interrupciones-extrusion")]
    public async Task<ActionResult<IEnumerable<object>>> GetInterrupcionesExtrusion()
    {
        var interrupciones = await _produccionService.GetInterrupcionesExtrusionAsync();
        var items = interrupciones.Select(i => new
        {
            i.Id,
            i.ExtrusionId,
            ExtrusionIdLegacy = i.Extrusion != null ? i.Extrusion.ExtrusionIdLegacy : 0,
            Fecha = i.Extrusion != null ? i.Extrusion.Fecha : DateTime.UtcNow.Date,
            Estado = i.Extrusion != null ? i.Extrusion.Estado.ToString() : "",
            HoraInicioExtrusion = i.Extrusion != null ? i.Extrusion.FechaInicio : DateTime.UtcNow,
            HoraFinExtrusion = i.Extrusion != null ? i.Extrusion.FechaFin : null,
            Turno = (i.Extrusion != null && i.Extrusion.Turno != null) ? i.Extrusion.Turno.Nombre : "",
            Operador = (i.Extrusion != null && i.Extrusion.Operario != null) ? i.Extrusion.Operario.NombreCompleto : "",
            Extrusora = (i.Extrusion != null && i.Extrusion.Extrusora != null) ? i.Extrusion.Extrusora.Nombre : "",
            Producto = (i.Extrusion != null && i.Extrusion.Producto != null) ? i.Extrusion.Producto.Clave : "",
            TipoMaterial = (i.Extrusion != null && i.Extrusion.SiloVirgen != null && i.Extrusion.SiloVirgen.TipoMaterial != null) ? i.Extrusion.SiloVirgen.TipoMaterial : "PCR",
            Concluida = i.Concluida,
            HoraInicio = i.HoraInicio,
            HoraFin = i.HoraFin,
            Descripcion = i.Descripcion,
            DuracionMinutos = i.DuracionMinutos,
            CausaId = i.CausaId,
            CausaCodigo = i.Causa != null ? i.Causa.Codigo : "",
            CausaDescripcion = i.Causa != null ? i.Causa.Descripcion : "",
            CausaTipo = i.Causa != null ? i.Causa.Tipo : "General"
        });

        return Ok(items);
    }

    [HttpPost("extrusion/interrupcion/manual")]
    public async Task<ActionResult<ExtrusionInterrupcion>> RegistrarInterrupcionManual([FromBody] RegistrarInterrupcionManualRequest request)
    {
        var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
        var interrupcion = new ExtrusionInterrupcion
        {
            Id = Guid.NewGuid(),
            ExtrusionId = request.ExtrusionId,
            CausaId = request.CausaId,
            Descripcion = request.Descripcion,
            HoraInicio = request.HoraInicio,
            HoraFin = request.HoraFin,
            Concluida = request.Concluida,
            TenantId = defaultTenantId
        };

        _context.ExtrusionInterrupciones.Add(interrupcion);

        var extrusion = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .FirstOrDefaultAsync(e => e.Id == request.ExtrusionId);

        if (extrusion != null)
        {
            var todasInterrupciones = await _context.ExtrusionInterrupciones
                .Where(i => i.ExtrusionId == request.ExtrusionId && !i.IsDeleted)
                .ToListAsync();

            double totalMinutos = todasInterrupciones
                .Where(i => i.HoraFin.HasValue)
                .Sum(i => (i.HoraFin.Value - i.HoraInicio).TotalMinutes);

            if (request.Concluida && request.HoraFin.HasValue)
            {
                totalMinutos += (request.HoraFin.Value - request.HoraInicio).TotalMinutes;
            }

            extrusion.TiempoInterrupcion = (int)Math.Round(totalMinutos);

            bool hayActivas = todasInterrupciones.Any(i => !i.Concluida) || (!request.Concluida);
            extrusion.InterrupcionEnCurso = hayActivas;

            if (extrusion.Extrusora != null)
            {
                extrusion.Extrusora.Estado = hayActivas ? EstadoExtrusora.Detenida : EstadoExtrusora.EnProceso;
            }
        }

        await _context.SaveChangesAsync(default);
        return Ok(interrupcion);
    }

    [HttpPut("extrusion/interrupcion/{id}")]
    public async Task<IActionResult> ActualizarInterrupcionExtrusion(Guid id, [FromBody] ActualizarInterrupcionManualRequest request)
    {
        var result = await _produccionService.ActualizarInterrupcionExtrusionAsync(
            id,
            request.CausaId,
            request.Descripcion,
            request.HoraInicio,
            request.HoraFin,
            request.Concluida
        );

        return result ? NoContent() : BadRequest("No se pudo actualizar la interrupción.");
    }

    [HttpDelete("extrusion/interrupcion/{id}")]
    public async Task<IActionResult> EliminarInterrupcionExtrusion(Guid id)
    {
        var result = await _produccionService.EliminarInterrupcionExtrusionAsync(id);
        return result ? NoContent() : BadRequest("No se pudo eliminar la interrupción.");
    }

    [HttpPost("prensado/interrupcion")]
    public async Task<ActionResult<PrensadoInterrupcion>> RegistrarInterrupcionPrensado([FromBody] RegistrarInterrupcionRequest request)
    {
        var result = await _produccionService.RegistrarInterrupcionPrensadoAsync(request.EntidadId, request.CausaId, request.Descripcion);
        return Ok(result);
    }

    [HttpPost("prensado/interrupcion/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionPrensado(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionPrensadoAsync(id);
        return result ? Ok() : BadRequest();
    }

    [HttpPost("prensado/interrupcion/activa/{id}/finalizar")]
    public async Task<IActionResult> FinalizarInterrupcionPrensadoActiva(Guid id)
    {
        var result = await _produccionService.FinalizarInterrupcionPrensadoActivaAsync(id);
        return result ? Ok() : BadRequest("No se encontró interrupción activa para este prensado");
    }

    // ── Dashboards y Estado ────────────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("disponibilidad/bobinas")]
    public async Task<ActionResult<IEnumerable<Bobina>>> GetBobinasDisponibles()
        => Ok(await _produccionService.GetBobinasDisponiblesParaPrensadoAsync());

    [HttpGet("maquinas/extrusoras")]
    public async Task<ActionResult<IEnumerable<Extrusora>>> GetEstadoExtrusoras()
        => Ok(await _produccionService.GetEstadoExtrusorasAsync());

    [HttpGet("maquinas/prensas")]
    public async Task<ActionResult<IEnumerable<Prensa>>> GetEstadoPrensas()
        => Ok(await _produccionService.GetEstadoPrensasAsync());

    // ── Gestión de Bobinas ─────────────────────────────────────────────────

    [HttpPost("bobina/{id}/pausar")]
    public async Task<IActionResult> PausarBobina(Guid id)
    {
        var result = await _produccionService.PausarBobinaAsync(id);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo pausar la bobina.");
    }

    [HttpPost("bobina/{id}/rechazar")]
    public async Task<IActionResult> RechazarBobina(Guid id, [FromBody] RechazarBobinaRequest request)
    {
        var result = await _produccionService.RechazarBobinaAsync(id, request.Motivo, request.Observaciones);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo rechazar la bobina.");
    }

    [HttpPost("bobina/{id}/validar")]
    public async Task<IActionResult> ValidarBobina(Guid id)
    {
        var result = await _produccionService.ValidarBobinaAsync(id);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo validar la bobina.");
    }

    [HttpPost("bobina/{id}/transferir")]
    public async Task<IActionResult> TransferirBobina(Guid id, [FromBody] Guid extrusionDestinoId)
    {
        var result = await _produccionService.TransferirBobinaAsync(id, extrusionDestinoId);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo transferir la bobina.");
    }

    [HttpPost("extrusion/bobinas/llenado-interrupcion")]
    public async Task<IActionResult> LlenadoBobinaInterrupcion()
    {
        var asignadas = await _produccionService.LlenadoBobinaInterrupcionAsync();
        return Ok(new { asignadas = asignadas });
    }

    // ── CRUD de Bobinas para Módulo Operación / Bobinas ─────────────────────

    [HttpGet("bobinas/todas")]
    public async Task<IActionResult> GetTodasBobinas()
    {
        var bobinas = await _context.Bobinas
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Extrusora)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Turno)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Operario)
            .Include(b => b.Producto)
            .Include(b => b.Operario)
            .Include(b => b.SiloVirgen)
            .Include(b => b.SiloMolido)
            .OrderByDescending(b => b.HoraInicio)
            .ToListAsync();

        return Ok(bobinas);
    }

    [HttpGet("bobina/{id}")]
    public async Task<IActionResult> GetBobinaDetalle(Guid id)
    {
        var bobina = await _context.Bobinas
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Extrusora)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Turno)
            .Include(b => b.Extrusion)
                .ThenInclude(e => e.Operario)
            .Include(b => b.Producto)
            .Include(b => b.Operario)
            .Include(b => b.SiloVirgen)
            .Include(b => b.SiloMolido)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (bobina == null) return NotFound(new { message = "Bobina no encontrada" });
        return Ok(bobina);
    }

    [HttpPut("bobina/{id}")]
    public async Task<IActionResult> ActualizarBobina(Guid id, [FromBody] ActualizarBobinaDto dto)
    {
        var bobina = await _context.Bobinas
            .Include(b => b.Extrusion).ThenInclude(e => e.Extrusora)
            .Include(b => b.Extrusion).ThenInclude(e => e.Turno)
            .Include(b => b.Extrusion).ThenInclude(e => e.Operario)
            .Include(b => b.Producto)
            .Include(b => b.Operario)
            .Include(b => b.SiloVirgen)
            .Include(b => b.SiloMolido)
            .FirstOrDefaultAsync(b => b.Id == id);
        if (bobina == null) return NotFound(new { message = "Bobina no encontrada" });

        if (!string.IsNullOrEmpty(dto.NoSerie)) bobina.NoSerie = dto.NoSerie;
        if (!string.IsNullOrEmpty(dto.BobinaOrigen)) bobina.BobinaOrigen = dto.BobinaOrigen;
        if (dto.Kg.HasValue) bobina.Kg = dto.Kg.Value;
        if (dto.MermaKg.HasValue) bobina.MermaKg = dto.MermaKg.Value;
        if (dto.Espesor.HasValue) bobina.Espesor = dto.Espesor.Value;
        if (dto.DesviacionEstandar.HasValue) bobina.DesviacionEstandar = dto.DesviacionEstandar.Value;
        if (dto.HoraInicio.HasValue) bobina.HoraInicio = dto.HoraInicio.Value;
        if (dto.HoraSalida.HasValue) bobina.HoraSalida = dto.HoraSalida.Value;
        if (dto.Estado.HasValue)
        {
            bobina.Estado = dto.Estado.Value;
            if (dto.Estado.Value == EstadoBobina.EnReposo && !bobina.IniciaReposo.HasValue)
            {
                bobina.IniciaReposo = DateTime.UtcNow;
            }
        }
        if (dto.MotivoMolino.HasValue) bobina.MotivoMolino = dto.MotivoMolino.Value;
        if (dto.Observaciones != null) bobina.Observaciones = dto.Observaciones;
        if (dto.BobinaNo.HasValue) bobina.BobinaNo = dto.BobinaNo.Value;
        if (dto.Carreras.HasValue) bobina.Carreras = dto.Carreras.Value;
        if (dto.LoteVirgen != null) bobina.LoteVirgen = dto.LoteVirgen;
        if (dto.IniciaReposo.HasValue) bobina.IniciaReposo = dto.IniciaReposo.Value;

        await _context.SaveChangesAsync(default);
        return Ok(bobina);
    }

    [HttpDelete("bobina/{id}")]
    public async Task<IActionResult> EliminarBobina(Guid id)
    {
        var bobina = await _context.Bobinas.FirstOrDefaultAsync(b => b.Id == id);
        if (bobina == null) return NotFound(new { message = "Bobina no encontrada" });

        _context.Bobinas.Remove(bobina);
        await _context.SaveChangesAsync(default);
        return Ok(new { success = true });
    }

    [HttpPost("bobinas/seeder-test")]
    public async Task<IActionResult> SeedBobinasTest()
    {
        var count = await _context.Bobinas.CountAsync();
        if (count >= 2) return Ok(new { message = $"Ya existen {count} bobinas en la base de datos.", seeded = false });

        var extrusora = await _context.Extrusoras.FirstOrDefaultAsync() ?? new Extrusora { Codigo = "EXT-01", Nombre = "Extrusora 1", Estado = EstadoExtrusora.EnProceso };
        if (extrusora.Id == Guid.Empty) { _context.Extrusoras.Add(extrusora); await _context.SaveChangesAsync(default); }

        var operario = await _context.Operarios.FirstOrDefaultAsync() ?? new Operario { NumeroEmpleado = "EMP-01", NombreCompleto = "ANTONIO GONZALEZ AYALA" };
        if (operario.Id == Guid.Empty) { _context.Operarios.Add(operario); await _context.SaveChangesAsync(default); }

        var turno = await _context.Turnos.FirstOrDefaultAsync() ?? new Turno { Nombre = "1er Turno", HoraInicio = new TimeSpan(6,0,0), HoraFin = new TimeSpan(14,0,0) };
        if (turno.Id == Guid.Empty) { _context.Turnos.Add(turno); await _context.SaveChangesAsync(default); }

        var producto = await _context.Productos.FirstOrDefaultAsync() ?? new Producto { Codigo = "PROD-8063C2", Nombre = "8063C2", TipoMaterial = TipoMaterial.Virgen };
        if (producto.Id == Guid.Empty) { _context.Productos.Add(producto); await _context.SaveChangesAsync(default); }

        var extrusion = await _context.Extrusiones.FirstOrDefaultAsync() ?? new Extrusion { ExtrusoraId = extrusora.Id, OperarioId = operario.Id, TurnoId = turno.Id, ProductoId = producto.Id, FechaInicio = DateTime.UtcNow.AddHours(-10), Estado = EstadoExtrusion.EnProceso };
        if (extrusion.Id == Guid.Empty) { _context.Extrusiones.Add(extrusion); await _context.SaveChangesAsync(default); }

        var b1 = new Bobina
        {
            ExtrusionId = extrusion.Id,
            BobinaNo = 26,
            NoSerie = "B-010626-01-026A",
            Codigo = "B-010626-01-026A",
            BobinaOrigen = "A",
            Kg = 520.00m,
            MermaKg = 0.00m,
            Espesor = 12.50m,
            DesviacionEstandar = 0.190m,
            HoraInicio = DateTime.UtcNow.AddHours(-8),
            HoraSalida = DateTime.UtcNow.AddHours(-6),
            Estado = EstadoBobina.Consumida,
            ColorEstacion = ColorEstacion.SinAsignar,
            ProductoId = producto.Id,
            OperarioId = operario.Id,
            LoteVirgen = "202603233240 LE",
            Observaciones = "Bobina producida correctamente"
        };

        var b2 = new Bobina
        {
            ExtrusionId = extrusion.Id,
            BobinaNo = 27,
            NoSerie = "B-010626-01-027A",
            Codigo = "B-010626-01-027A",
            BobinaOrigen = "B",
            Kg = 510.50m,
            MermaKg = 15.00m,
            Espesor = 12.80m,
            DesviacionEstandar = 0.200m,
            HoraInicio = DateTime.UtcNow.AddHours(-6),
            HoraSalida = DateTime.UtcNow.AddHours(-4),
            Estado = EstadoBobina.Molido,
            MotivoMolino = MotivoMolino.LimpiezaContaminacion,
            ColorEstacion = ColorEstacion.Azul,
            ProductoId = producto.Id,
            OperarioId = operario.Id,
            LoteVirgen = "202603233240 LE",
            Observaciones = "Limpieza y cambio de mallas A y C"
        };

        _context.Bobinas.Add(b1);
        _context.Bobinas.Add(b2);
        await _context.SaveChangesAsync(default);

        return Ok(new { message = "Se crearon 2 bobinas de prueba en la base de datos.", seeded = true, b1Id = b1.Id, b2Id = b2.Id });
    }

    // ── Recalibración ──────────────────────────────────────────────────────

    [HttpPost("extrusion/{id}/recalibrar")]
    public async Task<IActionResult> RecalibrarExtrusion(Guid id, [FromBody] RecalibrarExtrusionRequest request)
    {
        var result = await _produccionService.RecalibrarExtrusionAsync(id, request.Calibre, request.Ancho, request.Longitud);
        return result ? Ok(new { success = true }) : BadRequest("No se pudo recalibrar.");
    }

    // ── Resultado y KPIs ───────────────────────────────────────────────────

    [HttpGet("extrusion/{id}/resultado")]
    public async Task<IActionResult> GetExtrusionResultado(Guid id)
    {
        var result = await _produccionService.GetExtrusionResultadoAsync(id);
        if (result == null) return NotFound(new { message = "No se encontró el resultado de la extrusión." });
        return Ok(result);
    }

    [HttpGet("extrusion/{id}/bobinas")]
    public async Task<ActionResult<IEnumerable<Bobina>>> GetBobinasByExtrusion(Guid id)
        => Ok(await _produccionService.GetBobinasByExtrusionAsync(id));

    // ── Turno Activo ───────────────────────────────────────────────────────

    [HttpGet("turnos/activo")]
    public async Task<IActionResult> GetTurnoActivo()
    {
        var turno = await _produccionService.GetTurnoActivoAsync();
        if (turno == null) return NotFound(new { message = "No se encontró un turno activo." });
        return Ok(turno);
    }

    // ── Historial de Extrusiones ───────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("extrusiones/historial")]
    public async Task<ActionResult<IEnumerable<Extrusion>>> GetHistorialExtrusiones(
        [FromQuery] DateTime? desde, [FromQuery] DateTime? hasta,
        [FromQuery] Guid? extrusoraId, [FromQuery] Guid? productoId)
        => Ok(await _produccionService.GetHistorialExtrusionesAsync(desde, hasta, extrusoraId, productoId));

    [AllowAnonymous]
    [HttpGet("extrusiones")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusiones()
        => Ok(await _produccionService.GetExtrusionesAsync());

    [HttpGet("extrusion/programacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusionesProgramacion()
    {
        var items = await _context.Extrusiones
            .Include(e => e.Turno)
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Where(e => !e.IsDeleted && e.Estado == EstadoExtrusion.Programada)
            .OrderByDescending(e => e.Fecha)
            .Select(e => new
            {
                e.Id,
                FechaExtrusora = e.Fecha,
                Turno = e.Turno.Nombre,
                Producto = e.Producto != null ? e.Producto.Clave : "",
                Operador = e.Operario != null ? e.Operario.NombreCompleto : "",
                Programado = e.MetaKg
            })
            .ToListAsync();

        return Ok(items);
    }

    // ── Turnos Por Semana Prensado ─────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("prensado/turnos-semana")]
    public async Task<IActionResult> GetTurnosSemanaPrensas([FromQuery] DateTime fechaInicio, [FromQuery] DateTime fechaFin)
    {
        var result = await _produccionService.GetTurnosSemanaPrensasAsync(fechaInicio, fechaFin);
        return Ok(result);
    }

    [HttpPost("prensado/turnos-semana/guardar")]
    public async Task<IActionResult> GuardarTurnosSemanaPrensas([FromBody] List<GuardarTurnoPrensaItemRequest> batch)
    {
        try
        {
            var success = await _produccionService.GuardarTurnosSemanaPrensasAsync(batch);
            if (!success) return BadRequest(new { message = "No se pudieron guardar las modificaciones de turnos." });
            return Ok(new { message = "Información actualizada" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"Error al guardar modificaciones: {ex.Message}" });
        }
    }

    [AllowAnonymous]
    [HttpGet("trabajos-asignados")]
    public async Task<IActionResult> GetTrabajosAsignados([FromQuery] Guid? operarioId, [FromQuery] Guid? maquinaId, [FromQuery] string tipoProceso = "extrusion")
    {
        try
        {
            var result = await _produccionService.GetTrabajosAsignadosAsync(operarioId, maquinaId, tipoProceso);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message, detail = ex.InnerException?.Message });
        }
    }

    [AllowAnonymous]
    [HttpPost("iniciar-trabajo-programado/{id}")]
    public async Task<IActionResult> IniciarTrabajoProgramado(Guid id, [FromQuery] string tipoProceso = "extrusion")
    {
        try
        {
            var result = await _produccionService.IniciarTrabajoProgramadoAsync(id, tipoProceso);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(409, new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message, detail = ex.InnerException?.Message });
        }
    }



    [HttpGet("extrusion/operacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusionesOperacion()
    {
        var items = await _context.Extrusiones
            .Include(e => e.Extrusora)
            .Include(e => e.Turno)
            .Include(e => e.Producto)
            .Include(e => e.Operario)
            .Where(e => !e.IsDeleted && e.Estado != EstadoExtrusion.Programada)
            .OrderByDescending(e => e.Fecha)
            .Select(e => new
            {
                e.Id,
                Status = e.Estado.ToString(),
                Extrusora = e.Extrusora.Nombre,
                Turno = e.Turno.Nombre,
                Producto = e.Producto != null ? e.Producto.Clave : "",
                Operador = e.Operario != null ? e.Operario.NombreCompleto : "",
                Producido = e.Producido,
                TiempoInterrupcion = e.TiempoInterrupcionMin,
                EnCurso = e.EnCurso,
                ExtrusionId = e.ExtrusionIdLegacy
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("prensado/programacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensadoProgramacion()
    {
        var items = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Where(p => !p.IsDeleted && ((int)p.Estado == 0 || (int)p.Estado == 5))
            .OrderByDescending(p => p.Fecha)
            .Select(p => new
            {
                p.Id,
                Fecha = p.Fecha,
                Prensa = p.Prensa.Nombre,
                Turno = p.Turno.Nombre,
                Producto = p.Producto != null ? p.Producto.Clave : "",
                Operador = p.Operario != null ? p.Operario.NombreCompleto : "",
                Programado = p.Programado
            })
            .ToListAsync();

        return Ok(items);
    }

    [AllowAnonymous]
    [HttpGet("prensado/operacion")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensadoOperacion()
    {
        var items = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Where(p => !p.IsDeleted && (int)p.Estado != 0 && (int)p.Estado != 5)
            .OrderByDescending(p => p.Fecha)
            .Select(p => new
            {
                p.Id,
                Status = p.Estado.ToString(),
                Prensa = p.Prensa.Nombre,
                Turno = p.Turno.Nombre,
                Producto = p.Producto != null ? p.Producto.Clave : "",
                Operador = p.Operario != null ? p.Operario.NombreCompleto : "",
                Producido = p.Producido,
                TiempoInterrupcion = p.TiempoInterrupcionMin,
                EnCurso = p.EnCurso
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("prensado/{id}")]
    public async Task<ActionResult<object>> GetPrensadoDetail(Guid id)
    {
        var item = await _context.Prensados
            .Include(p => p.Prensa)
            .Include(p => p.Turno)
            .Include(p => p.Operario)
            .Include(p => p.Producto)
            .Include(p => p.Troquel)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (item == null) return NotFound(new { message = "Orden de prensado no encontrada." });
        return Ok(new
        {
            item.Id,
            IdLegacy = item.PrensadoIdLegacy,
            Fecha = item.Fecha,
            Prensa = item.Prensa.Nombre,
            PrensaId = item.PrensaId,
            Turno = item.Turno.Nombre,
            TurnoId = item.TurnoId,
            Producto = item.Producto.Clave,
            ProductoId = item.ProductoId,
            Operador = item.Operario.NombreCompleto,
            OperadorId = item.OperarioId,
            Estado = (int)item.Estado,
            Status = item.Estado.ToString(),
            LevasUnidadMedida = item.LevasUnidadMedida,
            LevasKgEntrada = item.LevasKgEntrada,
            LevasKgSalida = item.LevasKgSalida,
            LevasGradosEntrada = item.LevasGradosEntrada,
            LevasGradosSalida = item.LevasGradosSalida,
            RodillosUnidadMedida = item.RodillosUnidadMedida,
            RodillosKgEntrada = item.RodillosKgEntrada,
            RodillosKgSalida = item.RodillosKgSalida,
            RodillosGradosEntrada = item.RodillosGradosEntrada,
            RodillosGradosSalida = item.RodillosGradosSalida,
            TroquelId = item.TroquelId,
            TroquelNombre = item.Troquel != null ? item.Troquel.Nombre : "",
            IniciaProceso = item.HoraIniciaProceso,
            FinProceso = item.HoraFinProceso,
            ProductoDescripcion = item.Producto.Nombre,
            Calibre = item.Calibre,
            Ancho = item.Ancho,
            Longitud = item.Longitud,
            VirgenKg = item.KgVirgen,
            MolidoKg = item.KgMolido,
            Meta = item.MetaPallets,
            LoteSilo = item.LoteSilo,
            MermaKg = item.BobinaMermaKg,
            MotivoAnticipado = item.MotivoAnticipado
        });
    }

    [HttpPut("prensado/{id}")]
    public async Task<IActionResult> UpdatePrensado(Guid id, [FromBody] UpdatePrensadoRequest request)
    {
        var entity = await _context.Prensados.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de prensado no encontrada." });

        entity.Fecha = request.Fecha.Date;
        entity.Estado = (EstadoPrensado)request.Estado;
        entity.OperarioId = request.OperarioId;
        entity.TroquelId = request.TroquelId;
        entity.LevasUnidadMedida = request.LevasUnidadMedida ?? "Kg";
        entity.RodillosUnidadMedida = request.RodillosUnidadMedida ?? "Kg";
        entity.LevasKgEntrada = request.LevasKgEntrada;
        entity.LevasKgSalida = request.LevasKgSalida;
        entity.LevasGradosEntrada = request.LevasGradosEntrada;
        entity.LevasGradosSalida = request.LevasGradosSalida;
        entity.RodillosKgEntrada = request.RodillosKgEntrada;
        entity.RodillosKgSalida = request.RodillosKgSalida;
        entity.RodillosGradosEntrada = request.RodillosGradosEntrada;
        entity.RodillosGradosSalida = request.RodillosGradosSalida;
        if (request.IniciaProceso.HasValue) entity.HoraIniciaProceso = request.IniciaProceso.Value;
        entity.HoraFinProceso = request.FinProceso;
        
        entity.Calibre = request.Calibre;
        entity.Ancho = request.Ancho ?? string.Empty;
        entity.Longitud = request.Longitud;
        entity.KgVirgen = request.VirgenKg;
        entity.KgMolido = request.MolidoKg;
        entity.MetaPallets = request.Meta;
        entity.LoteSilo = request.LoteSilo;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("prensado/{id}")]
    public async Task<IActionResult> DeletePrensado(Guid id)
    {
        var entity = await _context.Prensados.FindAsync(id);
        if (entity == null) return NotFound(new { message = "Orden de prensado no encontrada." });

        entity.IsDeleted = true;
        entity.DeletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [AllowAnonymous]
    [HttpGet("prensados")]
    public async Task<ActionResult<IEnumerable<Prensado>>> GetPrensados()
        => Ok(await _produccionService.GetPrensadosAsync());

    [HttpGet("carreras")]
    public async Task<ActionResult<IEnumerable<object>>> GetCarreras()
    {
        var items = await _context.Carreras
            .Include(c => c.Prensado)
                .ThenInclude(p => p.Prensa)
            .Include(c => c.Prensado)
                .ThenInclude(p => p.Turno)
            .Include(c => c.Prensado)
                .ThenInclude(p => p.Operario)
            .OrderByDescending(c => c.FechaRegistro)
            .Select(c => new
            {
                c.Id,
                c.CarreraNo,
                c.Estado,
                c.FechaRegistro,
                c.FechaValidacion,
                c.CarreraTroquel,
                c.PaletTerminado,
                PrensadoId = c.PrensadoId,
                PrensaNombre = c.Prensado.Prensa.Nombre,
                TurnoNombre = c.Prensado.Turno.Nombre,
                OperarioNombre = c.Prensado.Operario.NombreCompleto
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("carretes")]
    public async Task<ActionResult<IEnumerable<object>>> GetCarretes()
    {
        var items = await _context.Carretes
            .Include(c => c.Carrera)
                .ThenInclude(ca => ca.Prensado)
                    .ThenInclude(p => p.Producto)
            .OrderByDescending(c => c.NoSerie)
            .Select(c => new
            {
                c.Id,
                c.NoSerie,
                c.NoLinea,
                c.Estado,
                c.Molino,
                c.TerminaPalet,
                c.PaletSerie,
                c.Observaciones,
                CarreraNo = c.Carrera.CarreraNo,
                ProductoNombre = c.Carrera.Prensado.Producto.Nombre
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("palets")]
    public async Task<ActionResult<IEnumerable<object>>> GetPalets()
    {
        var items = await _context.Palets
            .Include(p => p.Producto)
            .Include(p => p.Operario)
            .Include(p => p.Prensa)
            .OrderByDescending(p => p.NoSerie)
            .Select(p => new
            {
                p.Id,
                p.NoSerie,
                p.Tipo,
                p.Estatus,
                p.Capacidad,
                p.TotalCarretes,
                p.HoraInicioEnsamble,
                p.HoraFinEnsamble,
                ProductoNombre = p.Producto != null ? p.Producto.Nombre : "---",
                OperarioNombre = p.Operario != null ? p.Operario.NombreCompleto : "---",
                PrensaNombre = p.Prensa != null ? p.Prensa.Nombre : "---"
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("interrupciones-prensado")]
    public async Task<ActionResult<IEnumerable<object>>> GetInterrupcionesPrensado()
    {
        var items = await _context.PrensadoInterrupciones
            .Include(i => i.Prensado)
                .ThenInclude(p => p.Prensa)
            .Include(i => i.Causa)
            .OrderByDescending(i => i.HoraInicio)
            .Select(i => new
            {
                i.Id,
                i.PrensadoId,
                i.HoraInicio,
                i.HoraFin,
                i.Concluida,
                i.Descripcion,
                DuracionMinutos = i.HoraFin.HasValue ? (double?)(i.HoraFin.Value - i.HoraInicio).TotalMinutes : null,
                PrensaNombre = i.Prensado.Prensa.Nombre,
                CausaNombre = i.Causa != null ? i.Causa.Descripcion : "Otras causas"
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("prensado/{id}/carreras-por-bobina")]
    public async Task<ActionResult<IEnumerable<object>>> GetCarrerasPorBobina(Guid id)
    {
        var carreras = await _context.Carreras
            .Include(c => c.Carretes)
            .Where(c => c.PrensadoId == id)
            .ToListAsync();

        var bobinaIds = carreras.Select(c => c.InicioPrensadoBobinaId).Distinct().ToList();
        var bobinas = await _context.Bobinas
            .Where(b => bobinaIds.Contains(b.Id))
            .ToDictionaryAsync(b => b.Id);

        var result = carreras
            .GroupBy(c => c.InicioPrensadoBobinaId)
            .Select(g =>
            {
                bobinas.TryGetValue(g.Key, out var bobina);
                var primeraCarrera = g.OrderBy(c => c.FechaRegistro).First();
                double? reposoHr = bobina?.IniciaReposo.HasValue == true
                    ? Math.Round((primeraCarrera.FechaRegistro - bobina.IniciaReposo!.Value).TotalHours, 2)
                    : null;

                return new
                {
                    BobinaId = g.Key,
                    Bobina = bobina?.NoSerie ?? "—",
                    ReposoHr = reposoHr,
                    Carreras = g.Count(),
                    EnProceso = g.Count(c => c.Estado == EstadoCarrera.EnProceso),
                    Terminadas = g.Count(c => c.Estado == EstadoCarrera.Terminada),
                    Validadas = g.Count(c => c.Estado == EstadoCarrera.Validada),
                    Carretes = g.Sum(c => c.Carretes.Count)
                };
            })
            .OrderByDescending(x => x.Carreras)
            .ToList();

        return Ok(result);
    }

    // Checklist de calidad por carrete, una fila por carrera con el estado (✓/X) de cada una
    // de las 6 líneas — equivalente al cuerpo del reporte RptPrensado del legado (pb_prensado_body).
    [HttpGet("prensado/{id}/detalle-calidad-carretes")]
    public async Task<ActionResult<IEnumerable<object>>> GetDetalleCalidadCarretes(Guid id)
    {
        var carreras = await _context.Carreras
            .Include(c => c.Carretes)
            .Where(c => c.PrensadoId == id)
            .OrderBy(c => c.CarreraNo)
            .ToListAsync();

        var bobinaIds = carreras.Select(c => c.InicioPrensadoBobinaId).Distinct().ToList();
        var bobinas = await _context.Bobinas
            .Where(b => bobinaIds.Contains(b.Id))
            .ToDictionaryAsync(b => b.Id);

        var result = carreras.Select(c =>
        {
            bobinas.TryGetValue(c.InicioPrensadoBobinaId, out var bobina);

            var lineas = new string?[6];
            foreach (var carrete in c.Carretes)
            {
                if (carrete.NoLinea is >= 1 and <= 6)
                    lineas[carrete.NoLinea - 1] = carrete.Estado == EstadoCarrete.Molino ? "X" : "✓";
            }

            return new
            {
                CarreraId = c.Id,
                CarreraNo = c.CarreraNo,
                Bobina = bobina?.NoSerie ?? "—",
                Linea1 = lineas[0],
                Linea2 = lineas[1],
                Linea3 = lineas[2],
                Linea4 = lineas[3],
                Linea5 = lineas[4],
                Linea6 = lineas[5],
                PaletSerie = c.Carretes.OrderByDescending(x => x.NoLinea).FirstOrDefault()?.PaletSerie,
                CarretesAMolino = c.Carretes.Count(x => x.Estado == EstadoCarrete.Molino)
            };
        }).ToList();

        return Ok(result);
    }

    [HttpGet("carrera/{id}")]
    public async Task<ActionResult<object>> GetCarrera(Guid id)
    {
        var c = await _context.Carreras
            .Include(x => x.Prensado).ThenInclude(p => p.Prensa)
            .Include(x => x.Prensado).ThenInclude(p => p.Turno)
            .Include(x => x.Prensado).ThenInclude(p => p.Operario)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (c is null) return NotFound(new { message = "Carrera no encontrada." });

        return Ok(new
        {
            c.Id,
            c.CarreraNo,
            c.Estado,
            c.FechaRegistro,
            c.FechaValidacion,
            c.CarreraTroquel,
            c.PaletTerminado,
            PrensadoId = c.PrensadoId,
            PrensaNombre = c.Prensado.Prensa.Nombre,
            TurnoNombre = c.Prensado.Turno.Nombre,
            OperarioNombre = c.Prensado.Operario.NombreCompleto
        });
    }

    [HttpPut("carrera/{id}")]
    public async Task<IActionResult> UpdateCarrera(Guid id, [FromBody] CarreraUpdateDto dto)
    {
        var entity = await _context.Carreras.FindAsync(id);
        if (entity is null) return NotFound(new { message = "Carrera no encontrada." });

        entity.CarreraNo = dto.CarreraNo;
        entity.Estado = (EstadoCarrera)dto.Estado;
        entity.CarreraTroquel = dto.CarreraTroquel;
        entity.PaletTerminado = dto.PaletTerminado;
        if (dto.Estado == (int)EstadoCarrera.Validada && entity.FechaValidacion is null)
            entity.FechaValidacion = DateTime.UtcNow;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("carrera/{id}")]
    public async Task<IActionResult> DeleteCarrera(Guid id)
    {
        var item = await _context.Carreras.FindAsync(id);
        if (item != null)
        {
            _context.Carreras.Remove(item);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }

    [HttpGet("carrete/{id}")]
    public async Task<ActionResult<object>> GetCarrete(Guid id)
    {
        var c = await _context.Carretes
            .Include(x => x.Carrera).ThenInclude(ca => ca.Prensado).ThenInclude(p => p.Producto)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (c is null) return NotFound(new { message = "Carrete no encontrado." });

        return Ok(new
        {
            c.Id,
            c.NoSerie,
            c.NoLinea,
            c.Estado,
            c.Molino,
            c.TerminaPalet,
            c.PaletSerie,
            c.Observaciones,
            CarreraId = c.CarreraId,
            CarreraNo = c.Carrera.CarreraNo,
            ProductoNombre = c.Carrera.Prensado.Producto.Nombre
        });
    }

    [HttpPut("carrete/{id}")]
    public async Task<IActionResult> UpdateCarrete(Guid id, [FromBody] CarreteUpdateDto dto)
    {
        var entity = await _context.Carretes.FindAsync(id);
        if (entity is null) return NotFound(new { message = "Carrete no encontrado." });

        entity.NoLinea = dto.NoLinea;
        entity.Estado = (EstadoCarrete)dto.Estado;
        entity.Molino = (MolinoCarrete)dto.Molino;
        entity.TerminaPalet = dto.TerminaPalet;
        entity.PaletSerie = dto.PaletSerie;
        entity.Observaciones = dto.Observaciones;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("carrete/{id}")]
    public async Task<IActionResult> DeleteCarrete(Guid id)
    {
        var item = await _context.Carretes.FindAsync(id);
        if (item != null)
        {
            _context.Carretes.Remove(item);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }

    [HttpGet("palet/{id}")]
    public async Task<ActionResult<object>> GetPalet(Guid id)
    {
        var p = await _context.Palets
            .Include(x => x.Producto)
            .Include(x => x.Operario)
            .Include(x => x.Prensa)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (p is null) return NotFound(new { message = "Palet no encontrado." });

        return Ok(new
        {
            p.Id,
            p.NoSerie,
            p.Tipo,
            p.Estatus,
            p.Capacidad,
            p.TotalCarretes,
            p.HoraInicioEnsamble,
            p.HoraFinEnsamble,
            ProductoId = p.ProductoId,
            ProductoNombre = p.Producto != null ? p.Producto.Nombre : "---",
            OperarioId = p.OperarioId,
            OperarioNombre = p.Operario != null ? p.Operario.NombreCompleto : "---",
            PrensaId = p.PrensaId,
            PrensaNombre = p.Prensa != null ? p.Prensa.Nombre : "---"
        });
    }

    [HttpPut("palet/{id}")]
    public async Task<IActionResult> UpdatePalet(Guid id, [FromBody] PaletUpdateDto dto)
    {
        var entity = await _context.Palets.FindAsync(id);
        if (entity is null) return NotFound(new { message = "Palet no encontrado." });

        entity.Tipo = (TipoPalet)dto.Tipo;
        entity.Estatus = (EstatusPalet)dto.Estatus;
        entity.Capacidad = dto.Capacidad;
        entity.TotalCarretes = dto.TotalCarretes;
        entity.ProductoId = dto.ProductoId;
        entity.OperarioId = dto.OperarioId;
        entity.PrensaId = dto.PrensaId;
        if (dto.Estatus == (int)EstatusPalet.Terminado && entity.HoraFinEnsamble is null)
            entity.HoraFinEnsamble = DateTime.UtcNow;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("palet/{id}")]
    public async Task<IActionResult> DeletePalet(Guid id)
    {
        var item = await _context.Palets.FindAsync(id);
        if (item != null)
        {
            _context.Palets.Remove(item);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }

    [HttpGet("prensado/interrupcion/{id}")]
    public async Task<ActionResult<object>> GetInterrupcionPrensado(Guid id)
    {
        var i = await _context.PrensadoInterrupciones
            .Include(x => x.Prensado).ThenInclude(p => p.Prensa)
            .Include(x => x.Causa)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (i is null) return NotFound(new { message = "Interrupción no encontrada." });

        return Ok(new
        {
            i.Id,
            i.PrensadoId,
            i.CausaId,
            i.HoraInicio,
            i.HoraFin,
            i.Concluida,
            i.Descripcion,
            DuracionMinutos = i.HoraFin.HasValue ? (double?)(i.HoraFin.Value - i.HoraInicio).TotalMinutes : null,
            PrensaNombre = i.Prensado.Prensa.Nombre,
            CausaNombre = i.Causa != null ? i.Causa.Descripcion : "Otras causas"
        });
    }

    [HttpPut("prensado/interrupcion/{id}")]
    public async Task<IActionResult> UpdateInterrupcionPrensado(Guid id, [FromBody] InterrupcionPrensadoUpdateDto dto)
    {
        var entity = await _context.PrensadoInterrupciones.FindAsync(id);
        if (entity is null) return NotFound(new { message = "Interrupción no encontrada." });

        entity.CausaId = dto.CausaId;
        entity.HoraInicio = dto.HoraInicio;
        entity.HoraFin = dto.HoraFin;
        entity.Concluida = dto.Concluida;
        entity.Descripcion = dto.Descripcion;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("prensado/interrupcion/{id}")]
    public async Task<IActionResult> DeleteInterrupcionPrensado(Guid id)
    {
        var item = await _context.PrensadoInterrupciones.FindAsync(id);
        if (item != null)
        {
            _context.PrensadoInterrupciones.Remove(item);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }


    [HttpGet("turno-activo")]
    public async Task<IActionResult> GetTurnoActivoAlternativo()
    {
        var turno = await _produccionService.GetTurnoActivoAsync();
        if (turno == null) return NotFound(new { message = "No se encontró un turno activo." });
        return Ok(turno);
    }

    [HttpGet("extrusora-productos")]
    public async Task<ActionResult<IEnumerable<ExtrusoraProducto>>> GetExtrusoraProductos()
        => Ok(await _produccionService.GetExtrusoraProductosAsync());

    [AllowAnonymous]
    [HttpGet("extrusion/turnos-semana")]
    public async Task<ActionResult<TurnosSemanaResponseDto>> GetTurnosSemana([FromQuery] string fechaInicio, [FromQuery] string fechaFin)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(fechaInicio) || string.IsNullOrWhiteSpace(fechaFin))
                return BadRequest(new { message = "Se requieren las fechas de inicio y fin." });

            if (!DateTime.TryParse(fechaInicio, System.Globalization.CultureInfo.InvariantCulture,
                    System.Globalization.DateTimeStyles.None, out var start) ||
                !DateTime.TryParse(fechaFin, System.Globalization.CultureInfo.InvariantCulture,
                    System.Globalization.DateTimeStyles.None, out var end))
            {
                return BadRequest(new { message = "Formato de fecha inválido. Use yyyy-MM-dd." });
            }
            start = start.Date; end = end.Date;
            
            var dates = new List<DateTime>();
            for (var dt = start; dt <= end; dt = dt.AddDays(1))
            {
                dates.Add(dt);
            }

            var defaultTenantId = new Guid("00000000-0000-0000-0000-000000000001");
            var extrusoras = await _context.Extrusoras.Where(e => !e.IsDeleted).ToListAsync();
            if (!extrusoras.Any())
            {
                for (int i = 1; i <= 3; i++)
                {
                    var ext = new Extrusora
                    {
                        Id = Guid.NewGuid(),
                        Codigo = $"EXT-0{i}",
                        Nombre = $"Extrusora Principal 0{i}",
                        IsActive = true,
                        TenantId = defaultTenantId
                    };
                    _context.Extrusoras.Add(ext);
                    extrusoras.Add(ext);
                }
                await _context.SaveChangesAsync(default);
            }

            var turnos = await _context.Turnos.Where(t => !t.IsDeleted).ToListAsync();
            if (!turnos.Any())
            {
                var t1 = new Turno { Id = Guid.NewGuid(), Nombre = "1er Turno", HoraInicio = new TimeSpan(6, 0, 0), HoraFin = new TimeSpan(14, 0, 0), TenantId = defaultTenantId, Clave = "T1" };
                var t2 = new Turno { Id = Guid.NewGuid(), Nombre = "2do Turno", HoraInicio = new TimeSpan(14, 0, 0), HoraFin = new TimeSpan(22, 0, 0), TenantId = defaultTenantId, Clave = "T2" };
                var t3 = new Turno { Id = Guid.NewGuid(), Nombre = "3er Turno", HoraInicio = new TimeSpan(22, 0, 0), HoraFin = new TimeSpan(6, 0, 0), TenantId = defaultTenantId, Clave = "T3" };
                _context.Turnos.AddRange(t1, t2, t3);
                await _context.SaveChangesAsync(default);
                turnos.AddRange(new[] { t1, t2, t3 });
            }

            var operarios = await _context.Operarios.Where(o => !o.IsDeleted).ToListAsync();
            if (!operarios.Any())
            {
                var defaultOp = new Operario
                {
                    Id = Guid.NewGuid(),
                    NumeroEmpleado = "0001",
                    Nombre = "Operador General",
                    Activo = true,
                    TenantId = defaultTenantId
                };
                _context.Operarios.Add(defaultOp);
                await _context.SaveChangesAsync(default);
                operarios.Add(defaultOp);
            }

            var existingExtrusiones = await _context.Extrusiones
                .Include(e => e.Extrusora)
                .Include(e => e.Turno)
                .Include(e => e.Producto)
                .Include(e => e.Operario)
                .Where(e => e.Fecha >= start && e.Fecha <= end)
                .ToListAsync();

            long maxLegacyId = await _context.Extrusiones.MaxAsync(e => (long?)e.ExtrusionIdLegacy) ?? 50000;
            bool anyNew = false;
            foreach (var ext in extrusoras)
            {
                foreach (var trn in turnos)
                {
                    var defaultOpId = await _context.ExtrusoraOperarios
                        .Where(eo => eo.ExtrusoraId == ext.Id && eo.TurnoId == trn.Id)
                        .Select(eo => eo.OperarioId)
                        .FirstOrDefaultAsync();

                    if (defaultOpId == Guid.Empty)
                    {
                        defaultOpId = operarios.First().Id;
                    }

                    foreach (var date in dates)
                    {
                        var exists = existingExtrusiones.Any(e => e.ExtrusoraId == ext.Id && e.TurnoId == trn.Id && e.Fecha.Date == date.Date);
                        if (!exists)
                        {
                            maxLegacyId++;
                            var extShort = ext.Nombre?.Replace(" ", "") ?? "EXT";
                            extShort = extShort.Length == 0 ? "EXT" : extShort.Substring(0, Math.Min(5, extShort.Length));
                            var trnShort = trn.Nombre?.Replace(" ", "") ?? "T";
                            trnShort = trnShort.Length == 0 ? "T" : trnShort.Substring(0, Math.Min(4, trnShort.Length));

                            var newExt = new Extrusion
                            {
                                Id = Guid.NewGuid(),
                                ExtrusionIdLegacy = maxLegacyId,
                                Codigo = $"EXT-{date:yyyyMMdd}-{trnShort}-{extShort}-{Guid.NewGuid().ToString().Substring(0, 4)}",
                                Fecha = date.Date,
                                FechaInicio = date.Date.Add(trn.HoraInicio),
                                FechaFin = date.Date.Add(trn.HoraFin < trn.HoraInicio ? trn.HoraFin.Add(TimeSpan.FromDays(1)) : trn.HoraFin),
                                Estado = EstadoExtrusion.Programada,
                                Programado = 0,
                                Producido = 0,
                                ExtrusoraId = ext.Id,
                                MaquinaId = ext.Id,
                                TurnoId = trn.Id,
                                OperarioId = defaultOpId,
                                TenantId = defaultTenantId
                            };
                            _context.Extrusiones.Add(newExt);
                            anyNew = true;
                        }
                    }
                }
            }

            if (anyNew)
            {
                await _context.SaveChangesAsync(default);
            }

            var allExtrusiones = await _context.Extrusiones
                .Include(e => e.Extrusora)
                .Include(e => e.Turno)
                .Include(e => e.Producto)
                .Include(e => e.Operario)
                .Where(e => e.Fecha >= start && e.Fecha <= end)
                .ToListAsync();

            var resumen = allExtrusiones
                .Where(e => e.ProductoId != null && e.Producto != null && e.Extrusora != null)
                .GroupBy(e => new { e.ProductoId, ProductoNombre = e.Producto!.Nombre, e.ExtrusoraId, ExtrusoraNombre = e.Extrusora!.Nombre })
                .Select(g => new ResumenItemDto
                {
                    ProductoId = g.Key.ProductoId,
                    Producto = g.Key.ProductoNombre,
                    ExtrusoraId = g.Key.ExtrusoraId,
                    Extrusora = g.Key.ExtrusoraNombre,
                    Programado = g.Sum(e => e.Programado),
                    Fabricado = g.Sum(e => e.Producido)
                })
                .ToList();

            var daysOfWeekSpanish = new Dictionary<DayOfWeek, string>
            {
                { DayOfWeek.Monday, "Lunes" },
                { DayOfWeek.Tuesday, "Martes" },
                { DayOfWeek.Wednesday, "Miércoles" },
                { DayOfWeek.Thursday, "Jueves" },
                { DayOfWeek.Friday, "Viernes" },
                { DayOfWeek.Saturday, "Sábado" },
                { DayOfWeek.Sunday, "Domingo" }
            };

            var extrusorasListDto = new List<ExtrusoraItemDto>();
            foreach (var ext in extrusoras)
            {
                var turnosListDto = new List<ShiftItemDto>();
                foreach (var trn in turnos)
                {
                    var diasListDto = new List<DayItemDto>();
                    foreach (var date in dates)
                    {
                        var extRecord = allExtrusiones.FirstOrDefault(e => e.ExtrusoraId == ext.Id && e.TurnoId == trn.Id && e.Fecha.Date == date.Date);
                        if (extRecord != null)
                        {
                            var horaStr = extRecord.Turno != null 
                                ? extRecord.Turno.HoraInicio.ToString(@"hh\:mm")
                                : trn.HoraInicio.ToString(@"hh\:mm");

                            diasListDto.Add(new DayItemDto
                            {
                                ExtrusionId = extRecord.Id,
                                ExtrusionIdLegacy = extRecord.Id,
                                Estado = extRecord.Estado.ToString(),
                                Fecha = extRecord.Fecha,
                                Hora = horaStr,
                                Dia = daysOfWeekSpanish.GetValueOrDefault(extRecord.Fecha.DayOfWeek, extRecord.Fecha.ToString("dddd")),
                                ProductoId = extRecord.ProductoId,
                                ProductoNombre = extRecord.Producto?.Nombre ?? extRecord.ProductoNombre,
                                Plan = extRecord.Programado,
                                Producido = extRecord.Producido,
                                OperarioId = extRecord.OperarioId,
                                OperarioNombre = extRecord.Operario?.Nombre ?? extRecord.Operario?.NombreCompleto
                            });
                        }
                    }

                    turnosListDto.Add(new ShiftItemDto
                    {
                        TurnoId = trn.Id,
                        TurnoNombre = trn.Nombre,
                        Dias = diasListDto
                    });
                }

                extrusorasListDto.Add(new ExtrusoraItemDto
                {
                    ExtrusoraId = ext.Id,
                    Nombre = ext.Nombre,
                    Turnos = turnosListDto
                });
            }

            var response = new TurnosSemanaResponseDto
            {
                Resumen = resumen,
                Extrusoras = extrusorasListDto
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Error en turnos semana extrusoras: {ex.Message}" });
        }
    }

    [HttpPost("extrusion/turnos-semana/guardar")]
    public async Task<IActionResult> GuardarTurnosSemana([FromBody] List<GuardarTurnosSemanaRequest> batch)
    {
        if (batch == null || !batch.Any()) return BadRequest("El lote está vacío.");

        foreach (var item in batch)
        {
            var entity = await _context.Extrusiones.FindAsync(item.ExtrusionId);
            if (entity != null)
            {
                if (entity.Estado == EstadoExtrusion.Programada)
                {
                    entity.ProductoId = item.ProductoId;
                    if (item.OperarioId != null)
                    {
                        entity.OperarioId = item.OperarioId.Value;
                    }
                    entity.Programado = item.Plan;

                    if (item.ProductoId != null)
                    {
                        var extProd = await _context.ExtrusoraProductos
                            .FirstOrDefaultAsync(ep => ep.ExtrusoraId == entity.ExtrusoraId && ep.ProductoId == item.ProductoId);
                        
                        if (extProd != null)
                        {
                            entity.Calibre = extProd.DefaultCalibre;
                            entity.Ancho = extProd.DefaultAncho;
                            entity.Longitud = extProd.DefaultLongitud;
                            entity.MetaKg = item.Plan;
                            entity.VirgenKg = extProd.DefaultVirgenKg;
                            entity.MolidoKg = extProd.DefaultMolidoKg;
                            entity.RevHusilloVirgen = extProd.DefaultRevHusilloVirgen;
                            entity.RevHusilloMolido = extProd.DefaultRevHusilloMolido;
                        }
                    }
                }
            }
        }

        await _context.SaveChangesAsync(default);
        return Ok(new { success = true });
    }
}

// ── DTOs ──────────────────────────────────────────────────────────────────
public record IniciarExtrusionRequest(
    Guid ExtrusoraId, 
    Guid OperarioId, 
    Guid TurnoId, 
    Guid ProductoId, 
    Guid SiloVirgenId, 
    decimal VirgenKg, 
    Guid? SiloMolidoId, 
    decimal MolidoKg, 
    decimal MetaKg, 
    decimal RevHusilloVirgen, 
    decimal RevHusilloMolido, 
    string? LotePaqueteAditivos, 
    string? Observaciones
);

public record GuardarBobinaRequest(
    Guid ExtrusionId, 
    int BobinaNo, 
    string Origen, 
    decimal Peso, 
    decimal Calibre, 
    decimal Desviacion, 
    ColorEstacion Color, 
    decimal MermaKg, 
    MotivoMolino Motivo, 
    string? Observaciones
);
public record IniciarPrensadoRequest(Guid PrensaId, Guid OperarioId, Guid TurnoId, Guid ProductoId, Guid TroquelId);
public record FinalizarExtrusionRequest(string? Motivo);
public record CrearPaletRequest(Guid ProductoId, Guid OperarioId, Guid PrensaId);
public record RegistrarInterrupcionRequest(Guid EntidadId, Guid CausaId, string? Descripcion);
public record RegistrarConsumoRequest(Guid? SiloVirgenId, decimal? VirgenKg, Guid? SiloMolidoId, decimal? MolidoKg);
public record RechazarBobinaRequest(MotivoMolino Motivo, string? Observaciones);
public record RecalibrarExtrusionRequest(decimal? Calibre, decimal? Ancho, decimal? Longitud);

public record RegistrarInterrupcionManualRequest(
    Guid ExtrusionId,
    Guid CausaId,
    string? Descripcion,
    DateTime HoraInicio,
    DateTime? HoraFin,
    bool Concluida
);

public record ActualizarInterrupcionManualRequest(
    Guid CausaId,
    string? Descripcion,
    DateTime HoraInicio,
    DateTime? HoraFin,
    bool Concluida
);

public class TurnosSemanaResponseDto
{
    public IEnumerable<ResumenItemDto> Resumen { get; set; } = new List<ResumenItemDto>();
    public IEnumerable<ExtrusoraItemDto> Extrusoras { get; set; } = new List<ExtrusoraItemDto>();
}

public class ResumenItemDto
{
    public Guid? ProductoId { get; set; }
    public string Producto { get; set; } = null!;
    public Guid? ExtrusoraId { get; set; }
    public string Extrusora { get; set; } = null!;
    public decimal Programado { get; set; }
    public decimal Fabricado { get; set; }
    public decimal Diferencia => Programado - Fabricado;
}

public class ExtrusoraItemDto
{
    public Guid ExtrusoraId { get; set; }
    public string Nombre { get; set; } = null!;
    public IEnumerable<ShiftItemDto> Turnos { get; set; } = new List<ShiftItemDto>();
}

public class ShiftItemDto
{
    public Guid TurnoId { get; set; }
    public string TurnoNombre { get; set; } = null!;
    public IEnumerable<DayItemDto> Dias { get; set; } = new List<DayItemDto>();
}

public class DayItemDto
{
    public Guid ExtrusionId { get; set; }
    public Guid ExtrusionIdLegacy { get; set; }
    public string Estado { get; set; } = null!;
    public DateTime Fecha { get; set; }
    public string Hora { get; set; } = null!;
    public string Dia { get; set; } = null!;
    public Guid? ProductoId { get; set; }
    public string? ProductoNombre { get; set; }
    public decimal Plan { get; set; }
    public decimal Producido { get; set; }
    public Guid? OperarioId { get; set; }
    public string? OperarioNombre { get; set; }
}

public class GuardarTurnosSemanaRequest
{
    public Guid ExtrusionId { get; set; }
    public Guid? ProductoId { get; set; }
    public Guid? OperarioId { get; set; }
    public decimal Plan { get; set; }
}

public record CreateExtrusionRequest(
    DateTime Fecha,
    Guid ExtrusoraId,
    Guid TurnoId,
    Guid ProductoId,
    Guid OperarioId,
    decimal MetaKg,
    decimal VirgenKg,
    decimal MolidoKg,
    decimal Calibre,
    decimal Ancho,
    decimal Longitud,
    string? LoteSilo,
    string? LotePaqueteAditivos,
    int Estado,
    DateTime? ProcessStart,
    DateTime? ProcessEnd,
    string? Observaciones,
    string? MotivoAnticipado,
    Guid? SiloVirgenId,
    Guid? SiloMolidoId
);

public record UpdateExtrusionRequest(
    DateTime Fecha,
    Guid ExtrusoraId,
    Guid TurnoId,
    Guid? ProductoId,
    Guid OperarioId,
    decimal MetaKg,
    decimal VirgenKg,
    decimal MolidoKg,
    decimal Calibre,
    decimal Ancho,
    decimal Longitud,
    string? LoteSilo,
    string? LotePaqueteAditivos,
    int Estado,
    DateTime? ProcessStart,
    DateTime? ProcessEnd,
    string? Observaciones,
    string? MotivoAnticipado,
    Guid? SiloVirgenId,
    Guid? SiloMolidoId
);

public record UpdatePrensadoRequest(
    DateTime Fecha,
    int Estado,
    Guid OperarioId,
    Guid? TroquelId,
    string? LevasUnidadMedida,
    string? RodillosUnidadMedida,
    decimal LevasKgEntrada,
    decimal LevasKgSalida,
    decimal LevasGradosEntrada,
    decimal LevasGradosSalida,
    decimal RodillosKgEntrada,
    decimal RodillosKgSalida,
    decimal RodillosGradosEntrada,
    decimal RodillosGradosSalida,
    DateTime? IniciaProceso,
    DateTime? FinProceso,
    decimal Calibre,
    string? Ancho,
    decimal Longitud,
    decimal VirgenKg,
    decimal MolidoKg,
    int Meta,
    string? LoteSilo
);

public record ConcluirPrensadoRequest(
    string? LevasUnidadMedida,
    string? RodillosUnidadMedida,
    decimal LevasKgEntrada,
    decimal LevasKgSalida,
    decimal LevasGradosEntrada,
    decimal LevasGradosSalida,
    decimal RodillosKgEntrada,
    decimal RodillosKgSalida,
    decimal RodillosGradosEntrada,
    decimal RodillosGradosSalida,
    DateTime? FinProceso
);

public class ActualizarBobinaDto
{
    public string? NoSerie { get; set; }
    public string? BobinaOrigen { get; set; }
    public decimal? Kg { get; set; }
    public decimal? MermaKg { get; set; }
    public decimal? Espesor { get; set; }
    public decimal? DesviacionEstandar { get; set; }
    public DateTime? HoraInicio { get; set; }
    public DateTime? HoraSalida { get; set; }
    public EstadoBobina? Estado { get; set; }
    public MotivoMolino? MotivoMolino { get; set; }
    public string? Observaciones { get; set; }
    public int? BobinaNo { get; set; }
    public int? Carreras { get; set; }
    public string? LoteVirgen { get; set; }
    public DateTime? IniciaReposo { get; set; }
}


public record CarreraUpdateDto(int CarreraNo, int Estado, string? CarreraTroquel, bool PaletTerminado);
public record CarreteUpdateDto(int NoLinea, int Estado, int Molino, bool TerminaPalet, string? PaletSerie, string? Observaciones);
public record PaletUpdateDto(int Tipo, int Estatus, int Capacidad, int TotalCarretes, Guid? ProductoId, Guid? OperarioId, Guid? PrensaId);
public record InterrupcionPrensadoUpdateDto(Guid? CausaId, DateTime HoraInicio, DateTime? HoraFin, bool Concluida, string? Descripcion);
public record OperarioCreateDto(string? Nombre, string? NombreCompleto, string? NumeroEmpleado, bool? Activo, bool? IsActive);

public class ProductoCreateDto
{
    public string? Clave { get; set; }
    public string? Codigo { get; set; }
    public string? Nombre { get; set; }
    public string? Descripcion { get; set; }
    public decimal? PrecioUnitario { get; set; }
    public string? TipoMaterial { get; set; }
    public Guid? CategoriaId { get; set; }
    public string? ProductoBase { get; set; }
    public string? ProductoSAE { get; set; }
    public bool? IsActive { get; set; }
}

public record ExtrusionConsumoDto(Guid? SiloVirgenId, decimal? VirgenKg, Guid? SiloMolidoId, decimal? MolidoKg);
public record ExtrusoraMezcladoraDto(Guid? Id, Guid ExtrusoraId, string Nombre, string? Codigo, decimal VirgenMin, decimal VirgenMax, decimal MolidoMin, decimal MolidoMax, decimal KgVirgen, decimal KgMolido);
