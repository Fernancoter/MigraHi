using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Entities.Common;
using HiCone.Domain.Enums;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HiCone.API.Controllers;

/// <summary>
/// CRUD para los catálogos base del módulo de Producción:
/// Categorías, Turnos, Extrusoras, Prensas, Silos.
/// Todos los endpoints requieren JWT autenticado.
/// </summary>
[ApiController]
[Route("api/v1/produccion/catalogos")]
[Authorize]
public class CatalogosController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public CatalogosController(IApplicationDbContext context)
    {
        _context = context;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CATEGORÍAS
    // ─────────────────────────────────────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("categorias")]
    public async Task<ActionResult<IEnumerable<object>>> GetCategorias([FromQuery] string? search = null)
    {
        var query = _context.ProductoCategorias.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(c => c.Nombre.Contains(search));

        var items = await query
            .OrderBy(c => c.Nombre)
            .Select(c => new { c.Id, c.Nombre })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("categorias/{id}")]
    public async Task<ActionResult<ProductoCategoria>> GetCategoria(Guid id)
    {
        var item = await _context.ProductoCategorias.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("categorias")]
    public async Task<ActionResult<Guid>> CreateCategoria([FromBody] ProductoCategoria entity)
    {
        entity.Id = Guid.NewGuid();
        _context.ProductoCategorias.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetCategoria), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("categorias/{id}")]
    public async Task<IActionResult> UpdateCategoria(Guid id, [FromBody] ProductoCategoria entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.ProductoCategorias.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("categorias/{id}")]
    public async Task<IActionResult> DeleteCategoria(Guid id)
    {
        var item = await _context.ProductoCategorias.FindAsync(id);
        if (item is null) return NotFound();
        _context.ProductoCategorias.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CLAVES (opciones UNO / DOS / TRES ordenadas)
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("claves")]
    public async Task<ActionResult<IEnumerable<object>>> GetClaves()
    {
        var items = await _context.CatalogoClaves
            .OrderBy(c => c.Orden)
            .Select(c => new { c.Id, c.Valor })
            .ToListAsync();
        return Ok(items);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TURNOS
    // ─────────────────────────────────────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("turnos")]
    public async Task<ActionResult<IEnumerable<object>>> GetTurnos()
    {
        var items = await _context.Turnos
            .OrderBy(t => t.HoraInicio)
            .Select(t => new { t.Id, t.Nombre, t.Clave, HoraInicio = t.HoraInicio.ToString(@"hh\:mm"), HoraFin = t.HoraFin.ToString(@"hh\:mm") })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("turnos/{id}")]
    public async Task<ActionResult<Turno>> GetTurno(Guid id)
    {
        var item = await _context.Turnos.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("turnos")]
    public async Task<ActionResult<Guid>> CreateTurno([FromBody] TurnoDto dto)
    {
        var entity = new Turno
        {
            Id = Guid.NewGuid(),
            Nombre = dto.Nombre,
            Clave = dto.Clave,
            HoraInicio = TimeSpan.Parse(dto.HoraInicio),
            HoraFin = TimeSpan.Parse(dto.HoraFin),
            TenantId = dto.TenantId
        };
        _context.Turnos.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetTurno), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("turnos/{id}")]
    public async Task<IActionResult> UpdateTurno(Guid id, [FromBody] TurnoDto dto)
    {
        var entity = await _context.Turnos.FindAsync(id);
        if (entity is null) return NotFound();
        entity.Nombre = dto.Nombre;
        entity.Clave = dto.Clave;
        entity.HoraInicio = TimeSpan.Parse(dto.HoraInicio);
        entity.HoraFin = TimeSpan.Parse(dto.HoraFin);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("turnos/{id}")]
    public async Task<IActionResult> DeleteTurno(Guid id)
    {
        var item = await _context.Turnos.FindAsync(id);
        if (item is null) return NotFound();
        _context.Turnos.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EXTRUSORAS
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("extrusoras")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusoras([FromQuery] string? search = null)
    {
        var query = _context.Extrusoras.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(e => e.Nombre.Contains(search));

        var items = await query
            .OrderBy(e => e.Nombre)
            .Select(e => new { e.Id, e.Nombre, e.NumeroExtrusora, e.Imagen })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("extrusoras/{id}")]
    public async Task<ActionResult<object>> GetExtrusora(Guid id)
    {
        var item = await _context.Extrusoras
            .Include(e => e.ExtrusoraOperarios)
                .ThenInclude(eo => eo.Turno)
            .Include(e => e.ExtrusoraOperarios)
                .ThenInclude(eo => eo.Operario)
            .FirstOrDefaultAsync(e => e.Id == id);
        if (item is null) return NotFound();
        return Ok(new
        {
            item.Id, item.Nombre, item.NumeroExtrusora, item.Imagen,
            Operarios = item.ExtrusoraOperarios.Select(eo => new
            {
                eo.Id, TurnoId = eo.TurnoId, Turno = eo.Turno?.Nombre,
                OperarioId = eo.OperarioId, Operario = eo.Operario?.Nombre
            })
        });
    }

    [HttpPost("extrusoras")]
    public async Task<ActionResult<Guid>> CreateExtrusora([FromBody] ExtrusoraDto dto)
    {
        var entity = new Extrusora
        {
            Id = Guid.NewGuid(),
            Nombre = dto.Nombre,
            NumeroExtrusora = dto.NumeroExtrusora,
            Imagen = dto.Imagen,
            TenantId = dto.TenantId
        };
        _context.Extrusoras.Add(entity);

        var username = User.Identity?.Name ?? "Sistema";
        _context.AuditLogs.Add(new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityName = "Extrusora",
            EntityId = entity.Id.ToString(),
            Action = "INSERT",
            Username = username,
            ChangesJson = JsonSerializer.Serialize(new[] {
                new { Property = "Nombre", Old = (string?)null, New = entity.Nombre },
                new { Property = "NumeroExtrusora", Old = (string?)null, New = entity.NumeroExtrusora },
                new { Property = "Imagen", Old = (string?)null, New = entity.Imagen }
            }),
            Timestamp = DateTime.UtcNow,
            TenantId = entity.TenantId
        });

        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetExtrusora), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("extrusoras/{id}")]
    public async Task<IActionResult> UpdateExtrusora(Guid id, [FromBody] ExtrusoraDto dto)
    {
        var entity = await _context.Extrusoras.FindAsync(id);
        if (entity is null) return NotFound();

        var oldNombre = entity.Nombre;
        var oldNumeroExtrusora = entity.NumeroExtrusora;
        var oldImagen = entity.Imagen;

        entity.Nombre = dto.Nombre;
        entity.NumeroExtrusora = dto.NumeroExtrusora;
        entity.Imagen = dto.Imagen;

        var username = User.Identity?.Name ?? "Sistema";
        _context.AuditLogs.Add(new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityName = "Extrusora",
            EntityId = entity.Id.ToString(),
            Action = "UPDATE",
            Username = username,
            ChangesJson = JsonSerializer.Serialize(new[] {
                new { Property = "Nombre", Old = oldNombre, New = entity.Nombre },
                new { Property = "NumeroExtrusora", Old = oldNumeroExtrusora, New = entity.NumeroExtrusora },
                new { Property = "Imagen", Old = oldImagen, New = entity.Imagen }
            }),
            Timestamp = DateTime.UtcNow,
            TenantId = entity.TenantId
        });

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("extrusoras/{id}")]
    public async Task<IActionResult> DeleteExtrusora(Guid id)
    {
        var item = await _context.Extrusoras.FindAsync(id);
        if (item is null) return NotFound();
        _context.Extrusoras.Remove(item);

        var username = User.Identity?.Name ?? "Sistema";
        _context.AuditLogs.Add(new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityName = "Extrusora",
            EntityId = item.Id.ToString(),
            Action = "DELETE",
            Username = username,
            ChangesJson = JsonSerializer.Serialize(new[] {
                new { Property = "Nombre", Old = item.Nombre, New = (string?)null }
            }),
            Timestamp = DateTime.UtcNow,
            TenantId = item.TenantId
        });

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // OPERARIOS
    // ─────────────────────────────────────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("operarios")]
    public async Task<ActionResult<IEnumerable<Operario>>> GetOperariosCatalog([FromQuery] string? search = null)
    {
        var query = _context.Operarios.Where(o => !o.IsDeleted).AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(o => o.NombreCompleto.Contains(search) || o.NumeroEmpleado.Contains(search));

        var items = await query.OrderBy(o => o.NombreCompleto).ToListAsync();
        return Ok(items);
    }

    [HttpPost("operarios")]
    public async Task<ActionResult<Operario>> CreateOperarioCatalog([FromBody] OperarioCreateCatalogDto dto)
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
    public async Task<IActionResult> UpdateOperarioCatalog(Guid id, [FromBody] OperarioCreateCatalogDto dto)
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
    public async Task<IActionResult> DeleteOperarioCatalog(Guid id)
    {
        var item = await _context.Operarios.FindAsync(id);
        if (item == null) return NotFound();

        item.IsDeleted = true;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpGet("extrusoras/{extrusoraId}/operarios")]
    public async Task<ActionResult<IEnumerable<object>>> GetExtrusoraOperarios(Guid extrusoraId)
    {
        var turnos = await _context.Turnos.OrderBy(t => t.HoraInicio).ToListAsync();
        var operarios = await _context.ExtrusoraOperarios
            .Where(eo => eo.ExtrusoraId == extrusoraId)
            .Include(eo => eo.Turno)
            .Include(eo => eo.Operario)
            .ToListAsync();

        var result = turnos.Select(t =>
        {
            var eo = operarios.FirstOrDefault(o => o.TurnoId == t.Id);
            return new
            {
                Id = eo?.Id,
                TurnoId = t.Id,
                Turno = t.Nombre,
                OperarioId = eo?.OperarioId,
                Operario = eo?.Operario?.Nombre
            };
        });
        return Ok(result);
    }

    [HttpPut("extrusoras/{extrusoraId}/operarios/{turnoId}")]
    public async Task<IActionResult> UpsertExtrusoraOperario(Guid extrusoraId, Guid turnoId, [FromBody] ExtrusoraOperarioDto dto)
    {
        Guid targetOperarioId = dto.OperarioId ?? Guid.Empty;
        if (targetOperarioId == Guid.Empty || !await _context.Operadores.AnyAsync(o => o.Id == targetOperarioId))
        {
            var defaultOp = await _context.Operadores.FirstOrDefaultAsync(o => o.Activo);
            if (defaultOp == null)
            {
                defaultOp = new Operador { Id = Guid.NewGuid(), Nombre = "Operador General", Activo = true, TenantId = dto.TenantId };
                _context.Operadores.Add(defaultOp);
                await _context.SaveChangesAsync(default);
            }
            targetOperarioId = defaultOp.Id;
        }

        var existing = await _context.ExtrusoraOperarios
            .FirstOrDefaultAsync(eo => eo.ExtrusoraId == extrusoraId && eo.TurnoId == turnoId);

        if (existing is null)
        {
            _context.ExtrusoraOperarios.Add(new ExtrusoraOperario
            {
                Id = Guid.NewGuid(),
                ExtrusoraId = extrusoraId,
                TurnoId = turnoId,
                OperarioId = targetOperarioId,
                TenantId = dto.TenantId
            });
        }
        else
        {
            existing.OperarioId = targetOperarioId;
        }
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpPut("extrusoras/{extrusoraId}/operarios/batch")]
    public async Task<IActionResult> SaveExtrusoraOperariosBatch(Guid extrusoraId, [FromBody] List<ExtrusoraOperarioBatchItemDto> items)
    {
        var extrusora = await _context.Extrusoras.FindAsync(extrusoraId);
        if (extrusora is null) return NotFound();

        var existing = await _context.ExtrusoraOperarios
            .Where(eo => eo.ExtrusoraId == extrusoraId)
            .Include(eo => eo.Turno)
            .Include(eo => eo.Operario)
            .ToListAsync();

        var oldConfig = string.Join(", ", existing.Select(eo => $"{eo.Turno?.Nombre}: {eo.Operario?.NombreCompleto}"));

        _context.ExtrusoraOperarios.RemoveRange(existing);

        var newItems = new List<ExtrusoraOperario>();
        foreach (var item in items)
        {
            if (item.TurnoId.HasValue)
            {
                var newEo = new ExtrusoraOperario
                {
                    Id = Guid.NewGuid(),
                    ExtrusoraId = extrusoraId,
                    TurnoId = item.TurnoId.Value,
                    OperarioId = item.OperarioId ?? Guid.Empty,
                    TenantId = item.TenantId ?? Guid.Empty
                };
                _context.ExtrusoraOperarios.Add(newEo);
                newItems.Add(newEo);
            }
        }

        var turnoIds = newItems.Select(x => x.TurnoId).Distinct().ToList();
        var operarioIds = newItems.Select(x => x.OperarioId).Distinct().ToList();
        var turnosMap = await _context.Turnos.Where(t => turnoIds.Contains(t.Id)).ToDictionaryAsync(t => t.Id, t => t.Nombre);
        var operariosMap = await _context.Operarios.Where(o => operarioIds.Contains(o.Id)).ToDictionaryAsync(o => o.Id, o => o.NombreCompleto);

        var newConfig = string.Join(", ", newItems.Select(eo => {
            var tName = turnosMap.TryGetValue(eo.TurnoId ?? Guid.Empty, out var tn) ? tn : "Desconocido";
            var oName = operariosMap.TryGetValue(eo.OperarioId, out var on) ? on : "Sin asignar";
            return $"{tName}: {oName}";
        }));

        var username = User.Identity?.Name ?? "Sistema";
        _context.AuditLogs.Add(new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityName = "Extrusora",
            EntityId = extrusoraId.ToString(),
            Action = "UPDATE_SHIFTS",
            Username = username,
            ChangesJson = JsonSerializer.Serialize(new[] {
                new { Property = "TurnosOperadores", Old = oldConfig, New = newConfig }
            }),
            Timestamp = DateTime.UtcNow,
            TenantId = extrusora.TenantId
        });

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRENSAS
    // ─────────────────────────────────────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("prensas")]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensas([FromQuery] string? search = null)
    {
        var query = _context.Prensas.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Nombre.Contains(search) || (p.Marca != null && p.Marca.Contains(search)));

        var items = await query
            .OrderBy(p => p.Nombre)
            .Select(p => new { p.Id, p.NumeroPrensa, p.Nombre, p.Imagen, p.Marca, p.Modelo })
            .ToListAsync();
        return Ok(items);
    }

    [AllowAnonymous]
    [HttpGet("prensas/{id}")]
    public async Task<ActionResult<Prensa>> GetPrensa(Guid id)
    {
        var item = await _context.Prensas.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [AllowAnonymous]
    [HttpPost("prensas")]
    public async Task<ActionResult<Guid>> CreatePrensa([FromBody] PrensaDto dto)
    {
        var entity = new Prensa
        {
            Id = Guid.NewGuid(),
            Codigo = string.IsNullOrEmpty(dto.Nombre) ? $"PRE-{Guid.NewGuid().ToString()[..4]}" : dto.Nombre,
            NumeroPrensa = dto.NumeroPrensa ?? "",
            Nombre = dto.Nombre ?? "Prensa",
            Imagen = dto.Imagen,
            Marca = dto.Marca,
            Modelo = dto.Modelo,
            TenantId = dto.TenantId == Guid.Empty ? new Guid("00000000-0000-0000-0000-000000000001") : dto.TenantId
        };
        _context.Prensas.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetPrensa), new { id = entity.Id }, entity.Id);
    }

    [AllowAnonymous]
    [HttpPut("prensas/{id}")]
    public async Task<IActionResult> UpdatePrensa(Guid id, [FromBody] PrensaDto dto)
    {
        var entity = await _context.Prensas.FindAsync(id);
        if (entity is null)
        {
            entity = new Prensa
            {
                Id = id,
                Codigo = dto.Nombre ?? "PRE-N",
                NumeroPrensa = dto.NumeroPrensa ?? "",
                Nombre = dto.Nombre ?? "Prensa",
                Imagen = dto.Imagen,
                Marca = dto.Marca,
                Modelo = dto.Modelo,
                TenantId = dto.TenantId == Guid.Empty ? new Guid("00000000-0000-0000-0000-000000000001") : dto.TenantId
            };
            _context.Prensas.Add(entity);
        }
        else
        {
            entity.NumeroPrensa = dto.NumeroPrensa;
            entity.Nombre = dto.Nombre;
            entity.Imagen = dto.Imagen;
            entity.Marca = dto.Marca;
            entity.Modelo = dto.Modelo;
        }
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [AllowAnonymous]
    [HttpDelete("prensas/{id}")]
    public async Task<IActionResult> DeletePrensa(Guid id)
    {
        var item = await _context.Prensas.FindAsync(id);
        if (item is null) return NoContent();
        _context.Prensas.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SILOS DE PRODUCCIÓN
    // ─────────────────────────────────────────────────────────────────────────

    [AllowAnonymous]
    [HttpGet("silos")]
    public async Task<ActionResult<IEnumerable<object>>> GetSilos([FromQuery] bool? activo = null)
    {
        var query = _context.SilosProduccion.Where(s => !s.IsArchived);
        if (activo.HasValue)
            query = query.Where(s => s.SiloActivo == activo.Value);

        var items = await query
            .OrderBy(s => s.Nombre)
            .Select(s => new
            {
                s.Id, s.Nombre, s.CapacidadKg, s.MinimoKg, s.MaximoKg,
                s.EstadoMaterial, s.TipoMaterial, s.SiloActivo
            })
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("silos/{id}")]
    public async Task<ActionResult<SiloProduccion>> GetSilo(Guid id)
    {
        var item = await _context.SilosProduccion.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("silos")]
    public async Task<ActionResult<Guid>> CreateSilo([FromBody] SiloProduccion entity)
    {
        entity.Id = Guid.NewGuid();
        _context.SilosProduccion.Add(entity);
        await _context.SaveChangesAsync(default);
        return CreatedAtAction(nameof(GetSilo), new { id = entity.Id }, entity.Id);
    }

    [HttpPut("silos/{id}")]
    public async Task<IActionResult> UpdateSilo(Guid id, [FromBody] SiloProduccion entity)
    {
        if (id != entity.Id) return BadRequest();
        _context.SilosProduccion.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("silos/{id}")]
    public async Task<IActionResult> DeleteSilo(Guid id)
    {
        var item = await _context.SilosProduccion.FindAsync(id);
        if (item is null) return NotFound();
        _context.SilosProduccion.Remove(item);
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpPut("silos/{id}/archivar")]
    public async Task<IActionResult> ArchivarSilo(Guid id)
    {
        var item = await _context.SilosProduccion.FindAsync(id);
        if (item is null) return NotFound();
        item.IsArchived = true;
        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CATÁLOGOS MATERIALES
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("material-estados")]
    public async Task<ActionResult<IEnumerable<object>>> GetEstadoMateriales()
    {
        var items = await _context.CatEstadosMaterial
            .OrderBy(c => c.Nombre)
            .Select(c => new { c.Id, c.Nombre })
            .ToListAsync();

        if (!items.Any())
        {
            items = new()
            {
                new { Id = Guid.NewGuid(), Nombre = "Virgen" },
                new { Id = Guid.NewGuid(), Nombre = "Molido" },
                new { Id = Guid.NewGuid(), Nombre = "Mezcla" },
                new { Id = Guid.NewGuid(), Nombre = "Reproceso" },
                new { Id = Guid.NewGuid(), Nombre = "Pellet" }
            };
        }
        return Ok(items);
    }

    [HttpGet("material-tipos")]
    public async Task<ActionResult<IEnumerable<object>>> GetTipoMateriales()
    {
        var items = await _context.CatTiposMaterial
            .OrderBy(c => c.Nombre)
            .Select(c => new { c.Id, c.Nombre })
            .ToListAsync();

        if (!items.Any())
        {
            items = new()
            {
                new { Id = Guid.NewGuid(), Nombre = "Polietileno (PE)" },
                new { Id = Guid.NewGuid(), Nombre = "Polipropileno (PP)" },
                new { Id = Guid.NewGuid(), Nombre = "HDPE" },
                new { Id = Guid.NewGuid(), Nombre = "LDPE" },
                new { Id = Guid.NewGuid(), Nombre = "Virgen" },
                new { Id = Guid.NewGuid(), Nombre = "Molido" }
            };
        }
        return Ok(items);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TROQUELES
    // ─────────────────────────────────────────────────────────────────────────

    private static string GetEstadoTroquelNombre(EstadoTroquel estado) => estado switch
    {
        EstadoTroquel.EnUso => "En Prensa",
        EstadoTroquel.Mantenimiento => "Mantenimiento",
        EstadoTroquel.FueraDeServicio => "Fuera de Servicio",
        _ => "Registrado"
    };

    /// <summary>
    /// Los catálogos de Prensa y Producto tienen columnas en su entidad C# que aún no existen
    /// en sus tablas reales (deuda técnica preexistente y ajena al módulo de Troqueles). Para no
    /// tocar esas tablas aquí, nunca se materializa la entidad completa: solo se proyectan las
    /// columnas que sí existen (igual que ya hace GetPrensas/GetPrensaProductos en este archivo).
    /// </summary>
    private async Task<Dictionary<Guid, string>> GetPrensaNombresAsync(IEnumerable<Guid> ids)
    {
        var idList = ids.Distinct().ToList();
        if (idList.Count == 0) return new Dictionary<Guid, string>();
        return await _context.Prensas
            .Where(p => idList.Contains(p.Id))
            .Select(p => new { p.Id, p.Nombre })
            .ToDictionaryAsync(x => x.Id, x => x.Nombre);
    }

    private record ProductoDisplayInfo(Guid Id, string Nombre, string Clave, string? Descripcion);

    private async Task<Dictionary<Guid, ProductoDisplayInfo>> GetProductosDisplayAsync(IEnumerable<Guid> ids)
    {
        var idList = ids.Distinct().ToList();
        if (idList.Count == 0) return new Dictionary<Guid, ProductoDisplayInfo>();
        var list = await _context.Productos
            .Where(p => idList.Contains(p.Id))
            .Select(p => new ProductoDisplayInfo(p.Id, p.Nombre, p.Clave, p.Descripcion))
            .ToListAsync();
        return list.ToDictionary(x => x.Id);
    }

    [HttpGet("troqueles")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<object>>> GetTroqueles([FromQuery] string? search = null)
    {
        var query = _context.Troqueles.Include(t => t.PrensaTroqueles).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(t => t.Nombre.Contains(search) || t.Codigo.Contains(search));

        var list = await query.ToListAsync();

        var prensaIds = list.SelectMany(t => t.PrensaTroqueles.Where(pt => pt.Activo).Select(pt => pt.PrensaId));
        var prensaNombres = await GetPrensaNombresAsync(prensaIds);

        // Numeración secuencial estable basada en el orden real de alta en BD (no aleatoria/hardcodeada).
        var secuenciales = list
            .OrderBy(t => t.CreatedAt)
            .Select((t, idx) => (t.Id, Sec: idx + 1))
            .ToDictionary(x => x.Id, x => x.Sec);

        var items = list
            .OrderBy(t => t.Nombre)
            .Select(t => {
                var activa = t.PrensaTroqueles.FirstOrDefault(pt => pt.Activo);
                var enPrensa = activa != null && prensaNombres.TryGetValue(activa.PrensaId, out var nombrePrensa) ? nombrePrensa : "";
                return new {
                    t.Id,
                    SecuencialId = secuenciales[t.Id],
                    t.Codigo,
                    t.Nombre,
                    Estado = (int)t.Estado,
                    EstadoNombre = GetEstadoTroquelNombre(t.Estado),
                    EnPrensa = enPrensa,
                    t.IsActive,
                    t.Observaciones,
                    t.CiclosAcumulados,
                    t.CiclosVideoMantenimiento,
                    t.FechaUltimoMantenimiento
                };
            });

        return Ok(items);
    }

    [HttpGet("troqueles/{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<object>> GetTroquel(Guid id)
    {
        var t = await _context.Troqueles
            .Include(x => x.PrensaTroqueles)
            .Include(x => x.TroquelProductos)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (t is null) return NotFound(new { message = "Troquel no encontrado." });

        var secuencialId = await _context.Troqueles.CountAsync(x => x.CreatedAt <= t.CreatedAt);

        var prensaIds = t.PrensaTroqueles.Where(pt => pt.Activo).Select(pt => pt.PrensaId);
        var prensaNombres = await GetPrensaNombresAsync(prensaIds);

        var productoIds = t.TroquelProductos.Select(tp => tp.ProductoId);
        var productos = await GetProductosDisplayAsync(productoIds);

        var activa = t.PrensaTroqueles.FirstOrDefault(pt => pt.Activo);
        var enPrensa = activa != null && prensaNombres.TryGetValue(activa.PrensaId, out var nombrePrensaActiva) ? nombrePrensaActiva : "";

        var item = new {
            t.Id,
            SecuencialId = secuencialId,
            t.Codigo,
            t.Nombre,
            Estado = (int)t.Estado,
            EstadoNombre = GetEstadoTroquelNombre(t.Estado),
            EnPrensa = enPrensa,
            t.IsActive,
            t.Observaciones,
            productos = t.TroquelProductos.Select(tp => {
                productos.TryGetValue(tp.ProductoId, out var p);
                return new {
                    id = tp.Id,
                    productoId = tp.ProductoId,
                    productoNombre = p?.Nombre ?? "",
                    productoClave = p?.Clave ?? "",
                    productoDescripcion = p?.Descripcion,
                    nombre = p?.Nombre ?? ""
                };
            }),
            prensaTroqueles = t.PrensaTroqueles
                .Where(pt => pt.Activo)
                .Select(pt => new {
                    pt.Id,
                    troquelId = pt.TroquelId,
                    prensaId = pt.PrensaId,
                    prensa = prensaNombres.GetValueOrDefault(pt.PrensaId, ""),
                    fechaAsignacion = pt.FechaAsignacion,
                    observaciones = pt.Observaciones
                })
        };

        return Ok(item);
    }

    [HttpPost("troqueles")]
    [AllowAnonymous]
    public async Task<ActionResult<Guid>> CreateTroquel([FromBody] TroquelDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nombre))
            return BadRequest(new { message = "El nombre del troquel es requerido." });

        var entity = new Troquel
        {
            Id = Guid.NewGuid(),
            Codigo = string.IsNullOrWhiteSpace(dto.Codigo) ? $"TRQ-{dto.Nombre}" : dto.Codigo,
            Nombre = dto.Nombre,
            Estado = (EstadoTroquel)dto.Estado,
            Observaciones = dto.Observaciones,
            IsActive = true,
            TenantId = dto.TenantId != Guid.Empty ? dto.TenantId : Guid.Parse("00000000-0000-0000-0000-000000000001")
        };
        _context.Troqueles.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("troqueles/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> UpdateTroquel(Guid id, [FromBody] TroquelDto dto)
    {
        var entity = await _context.Troqueles.FindAsync(id);
        if (entity is null) return NotFound(new { message = "Troquel no encontrado." });

        entity.Codigo = string.IsNullOrWhiteSpace(dto.Codigo) ? entity.Codigo : dto.Codigo;
        entity.Nombre = dto.Nombre;
        entity.Estado = (EstadoTroquel)dto.Estado;
        entity.Observaciones = dto.Observaciones;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("troqueles/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> DeleteTroquel(Guid id)
    {
        var item = await _context.Troqueles.FindAsync(id);
        if (item != null)
        {
            _context.Troqueles.Remove(item);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }

    // ── Asignación / desasignación de Prensa ↔ Troquel ─────────────────────────

    [HttpPost("troqueles/{id}/prensa-troqueles")]
    [AllowAnonymous]
    public async Task<ActionResult<object>> AsignarPrensaTroquel(Guid id, [FromBody] AsignarPrensaTroquelDto dto)
    {
        var troquel = await _context.Troqueles.FirstOrDefaultAsync(x => x.Id == id);
        if (troquel is null) return NotFound(new { message = "Troquel no encontrado." });

        var prensa = await _context.Prensas
            .Where(p => p.Id == dto.PrensaId)
            .Select(p => new { p.Id, p.Nombre })
            .FirstOrDefaultAsync();
        if (prensa is null) return NotFound(new { message = "Prensa no encontrada." });

        var yaAsignado = await _context.PrensaTroqueles
            .AnyAsync(pt => pt.TroquelId == id && pt.PrensaId == dto.PrensaId && pt.Activo);
        if (yaAsignado)
            return BadRequest(new { message = "Este troquel ya está asignado a esa prensa." });

        var now = DateTime.UtcNow;

        // Una prensa solo puede tener un troquel montado a la vez: se desasigna el anterior.
        var asignacionPrevia = await _context.PrensaTroqueles
            .FirstOrDefaultAsync(pt => pt.PrensaId == dto.PrensaId && pt.Activo);
        if (asignacionPrevia != null)
        {
            asignacionPrevia.Activo = false;
            asignacionPrevia.FechaDesasignacion = now;

            var troquelPrevio = await _context.Troqueles.FirstOrDefaultAsync(x => x.Id == asignacionPrevia.TroquelId);
            if (troquelPrevio != null && troquelPrevio.Estado == EstadoTroquel.EnUso)
                troquelPrevio.Estado = EstadoTroquel.Disponible;
        }

        // Un troquel solo puede estar montado en una prensa a la vez: se libera de la anterior si aplica.
        var otraAsignacionDelTroquel = await _context.PrensaTroqueles
            .FirstOrDefaultAsync(pt => pt.TroquelId == id && pt.Activo);
        if (otraAsignacionDelTroquel != null)
        {
            otraAsignacionDelTroquel.Activo = false;
            otraAsignacionDelTroquel.FechaDesasignacion = now;
        }

        var entity = new PrensaTroquel
        {
            Id = Guid.NewGuid(),
            PrensaId = dto.PrensaId,
            TroquelId = id,
            Activo = true,
            FechaAsignacion = now,
            Observaciones = dto.Observaciones,
            TenantId = troquel.TenantId
        };
        _context.PrensaTroqueles.Add(entity);

        troquel.Estado = EstadoTroquel.EnUso;

        await _context.SaveChangesAsync(default);

        return Ok(new {
            entity.Id,
            troquelId = id,
            prensaId = dto.PrensaId,
            prensa = prensa.Nombre,
            fechaAsignacion = entity.FechaAsignacion
        });
    }

    [HttpDelete("troqueles/{id}/prensa-troqueles/{prensaTroquelId}")]
    [AllowAnonymous]
    public async Task<IActionResult> DesasignarPrensaTroquel(Guid id, Guid prensaTroquelId)
    {
        var entity = await _context.PrensaTroqueles
            .FirstOrDefaultAsync(pt => pt.Id == prensaTroquelId && pt.TroquelId == id);
        if (entity is null) return NotFound(new { message = "Relación Prensa-Troquel no encontrada." });

        entity.Activo = false;
        entity.FechaDesasignacion = DateTime.UtcNow;

        var quedanActivas = await _context.PrensaTroqueles.AnyAsync(pt => pt.TroquelId == id && pt.Activo && pt.Id != prensaTroquelId);
        if (!quedanActivas)
        {
            var troquel = await _context.Troqueles.FirstOrDefaultAsync(x => x.Id == id);
            if (troquel != null && troquel.Estado == EstadoTroquel.EnUso)
                troquel.Estado = EstadoTroquel.Disponible;
        }

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    // ── Compatibilidad Troquel ↔ Producto ───────────────────────────────────────

    [HttpPost("troqueles/{id}/productos")]
    [AllowAnonymous]
    public async Task<ActionResult<object>> AddTroquelProducto(Guid id, [FromBody] TroquelProductoDto dto)
    {
        var troquel = await _context.Troqueles.FirstOrDefaultAsync(x => x.Id == id);
        if (troquel is null) return NotFound(new { message = "Troquel no encontrado." });

        var producto = await _context.Productos
            .Where(p => p.Id == dto.ProductoId)
            .Select(p => new { p.Id, p.Nombre, p.Clave, p.Descripcion })
            .FirstOrDefaultAsync();
        if (producto is null) return NotFound(new { message = "Producto no encontrado." });

        var yaExiste = await _context.TroquelProductos.AnyAsync(tp => tp.TroquelId == id && tp.ProductoId == dto.ProductoId);
        if (yaExiste)
            return BadRequest(new { message = "Este producto ya está registrado como compatible con el troquel." });

        var entity = new TroquelProducto
        {
            Id = Guid.NewGuid(),
            TroquelId = id,
            ProductoId = dto.ProductoId,
            TenantId = troquel.TenantId
        };
        _context.TroquelProductos.Add(entity);
        await _context.SaveChangesAsync(default);

        return Ok(new {
            id = entity.Id,
            productoId = producto.Id,
            productoNombre = producto.Nombre,
            productoClave = producto.Clave,
            productoDescripcion = producto.Descripcion,
            nombre = producto.Nombre
        });
    }

    [HttpDelete("troqueles/{id}/productos/{troquelProductoId}")]
    [AllowAnonymous]
    public async Task<IActionResult> RemoveTroquelProducto(Guid id, Guid troquelProductoId)
    {
        var entity = await _context.TroquelProductos
            .FirstOrDefaultAsync(tp => tp.Id == troquelProductoId && tp.TroquelId == id);
        if (entity != null)
        {
            _context.TroquelProductos.Remove(entity);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }
    // ─────────────────────────────────────────────────────────────────────────
    // PRENSA PRODUCTO
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("prensa-productos")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<object>>> GetPrensaProductos([FromQuery] string? search = null)
    {
        var query = _context.PrensaProductos
            .Include(pp => pp.Prensa)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(pp => pp.Prensa.Nombre.Contains(search) || pp.Item.Contains(search) || pp.Carrete.Contains(search));

        var items = await query
            .OrderBy(pp => pp.Prensa.Nombre).ThenBy(pp => pp.Item)
            .Select(pp => new
            {
                pp.Id,
                PrensaId = pp.PrensaId,
                Prensa = pp.Prensa.Nombre,
                pp.Item,
                pp.Carrete
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("prensa-productos/{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<object>> GetPrensaProducto(Guid id)
    {
        var pp = await _context.PrensaProductos
            .Include(x => x.Prensa)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (pp is null) return NotFound(new { message = "Relación Prensa-Producto no encontrada." });

        return Ok(new
        {
            pp.Id,
            PrensaId = pp.PrensaId,
            Prensa = pp.Prensa.Nombre,
            pp.Item,
            pp.Carrete
        });
    }

    [HttpPost("prensa-productos")]
    [AllowAnonymous]
    public async Task<ActionResult<Guid>> CreatePrensaProducto([FromBody] PrensaProductoDto dto)
    {
        var entity = new PrensaProducto
        {
            Id = Guid.NewGuid(),
            PrensaId = dto.PrensaId,
            Item = dto.Item,
            Carrete = dto.Carrete,
            TenantId = dto.TenantId != Guid.Empty ? dto.TenantId : Guid.Parse("00000000-0000-0000-0000-000000000001")
        };
        _context.PrensaProductos.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("prensa-productos/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> UpdatePrensaProducto(Guid id, [FromBody] PrensaProductoDto dto)
    {
        var entity = await _context.PrensaProductos.FindAsync(id);
        if (entity is null) return NotFound(new { message = "Relación Prensa-Producto no encontrada." });

        entity.PrensaId = dto.PrensaId;
        entity.Item = dto.Item;
        entity.Carrete = dto.Carrete;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("prensa-productos/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> DeletePrensaProducto(Guid id)
    {
        var item = await _context.PrensaProductos.FindAsync(id);
        if (item != null)
        {
            _context.PrensaProductos.Remove(item);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRODUCTO TERMINADO
    // ─────────────────────────────────────────────────────────────────────────

    [HttpGet("producto-terminados")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<object>>> GetProductoTerminados([FromQuery] string? search = null)
    {
        var query = _context.ProductosTerminados.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(pt =>
                (pt.Producto != null && pt.Producto.Contains(search)) ||
                (pt.CodigoSap != null && pt.CodigoSap.Contains(search)));

        var items = await query
            .OrderBy(pt => pt.Producto)
            .Select(pt => new
            {
                pt.Id,
                pt.Producto,
                pt.TerminadoPalets,
                pt.CarreteMiliar,
                pt.PaletMiliar,
                pt.TerminadoPeso,
                pt.PesoCarrete,
                pt.PesoPalet,
                pt.ConEtiqueta,
                pt.Etiquetable,
                pt.CodigoSap,
                pt.Mrd
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("producto-terminados/{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<object>> GetProductoTerminado(Guid id)
    {
        var pt = await _context.ProductosTerminados.FirstOrDefaultAsync(x => x.Id == id);

        if (pt is null) return NotFound(new { message = "Producto terminado no encontrado." });

        return Ok(new
        {
            pt.Id,
            pt.Producto,
            pt.TerminadoPalets,
            pt.CarreteMiliar,
            pt.PaletMiliar,
            pt.TerminadoPeso,
            pt.PesoCarrete,
            pt.PesoPalet,
            pt.ConEtiqueta,
            pt.Etiquetable,
            pt.CodigoSap,
            pt.Mrd
        });
    }

    [HttpPost("producto-terminados")]
    [AllowAnonymous]
    public async Task<ActionResult<Guid>> CreateProductoTerminado([FromBody] ProductoTerminadoDto dto)
    {
        var entity = new ProductoTerminado
        {
            Id = Guid.NewGuid(),
            Producto = dto.Producto,
            TerminadoPalets = dto.TerminadoPalets,
            CarreteMiliar = dto.CarreteMiliar,
            PaletMiliar = dto.PaletMiliar,
            TerminadoPeso = dto.TerminadoPeso,
            PesoCarrete = dto.PesoCarrete,
            PesoPalet = dto.PesoPalet,
            ConEtiqueta = dto.ConEtiqueta,
            Etiquetable = dto.Etiquetable,
            CodigoSap = dto.CodigoSap,
            Mrd = dto.Mrd,
            TenantId = dto.TenantId != Guid.Empty ? dto.TenantId : Guid.Parse("00000000-0000-0000-0000-000000000001")
        };
        _context.ProductosTerminados.Add(entity);
        await _context.SaveChangesAsync(default);
        return Ok(entity.Id);
    }

    [HttpPut("producto-terminados/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> UpdateProductoTerminado(Guid id, [FromBody] ProductoTerminadoDto dto)
    {
        var entity = await _context.ProductosTerminados.FindAsync(id);
        if (entity is null) return NotFound(new { message = "Producto terminado no encontrado." });

        entity.Producto = dto.Producto;
        entity.TerminadoPalets = dto.TerminadoPalets;
        entity.CarreteMiliar = dto.CarreteMiliar;
        entity.PaletMiliar = dto.PaletMiliar;
        entity.TerminadoPeso = dto.TerminadoPeso;
        entity.PesoCarrete = dto.PesoCarrete;
        entity.PesoPalet = dto.PesoPalet;
        entity.ConEtiqueta = dto.ConEtiqueta;
        entity.Etiquetable = dto.Etiquetable;
        entity.CodigoSap = dto.CodigoSap;
        entity.Mrd = dto.Mrd;

        await _context.SaveChangesAsync(default);
        return NoContent();
    }

    [HttpDelete("producto-terminados/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> DeleteProductoTerminado(Guid id)
    {
        var item = await _context.ProductosTerminados.FindAsync(id);
        if (item != null)
        {
            _context.ProductosTerminados.Remove(item);
            await _context.SaveChangesAsync(default);
        }
        return NoContent();
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// DTOs
// ─────────────────────────────────────────────────────────────────────────────
public record TurnoDto(string Nombre, string? Clave, string HoraInicio, string HoraFin, Guid TenantId);
public record ExtrusoraDto(string Nombre, string NumeroExtrusora, string? Imagen, Guid TenantId);
public record ExtrusoraOperarioDto(Guid? OperarioId, Guid TenantId);
public record ExtrusoraOperarioBatchItemDto(Guid? TurnoId, Guid? OperarioId, Guid? TenantId);
public record OperarioCreateCatalogDto(string? Nombre, string? NombreCompleto, string? NumeroEmpleado, bool? Activo, bool? IsActive);
public record PrensaDto(string? NumeroPrensa, string Nombre, string? Imagen, string? Marca, string? Modelo, Guid TenantId);
public record TroquelDto(string Codigo, string Nombre, string? Observaciones, int Estado, Guid TenantId);
public record AsignarPrensaTroquelDto(Guid PrensaId, string? Observaciones);
public record TroquelProductoDto(Guid ProductoId);



public record PrensaProductoDto(
    Guid PrensaId,
    string Item,
    string Carrete,
    Guid TenantId
);
public record ProductoTerminadoDto(
    string? Producto,
    int TerminadoPalets,
    int CarreteMiliar,
    int PaletMiliar,
    decimal TerminadoPeso,
    decimal PesoCarrete,
    decimal PesoPalet,
    bool ConEtiqueta,
    bool Etiquetable,
    string? CodigoSap,
    int Mrd,
    Guid TenantId
);
