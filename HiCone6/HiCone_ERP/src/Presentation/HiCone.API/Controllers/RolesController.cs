using HiCone.Application.Services.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RolesController : ControllerBase
{
    private readonly IIdentityService _identityService;

    public RolesController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    /// <summary>Obtiene los roles del sistema de forma paginada.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null)
    {
        var result = await _identityService.GetRolesAsync(page, pageSize, searchTerm);
        return Ok(result);
    }

    /// <summary>Obtiene un rol por ID.</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var role = await _identityService.GetRoleByIdAsync(id);
        if (role == null) return NotFound(new { message = "Rol no encontrado." });
        return Ok(role);
    }

    /// <summary>Crea un nuevo rol.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateRoleDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            var role = await _identityService.CreateRoleAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = role.Id }, role);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Actualiza un rol existente. No se pueden modificar roles del sistema.</summary>
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateRoleDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var role = await _identityService.UpdateRoleAsync(id, dto);
        if (role == null) return NotFound(new { message = "Rol no encontrado o es un rol de sistema." });
        return Ok(role);
    }

    /// <summary>Elimina un rol. No se pueden eliminar roles del sistema.</summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _identityService.DeleteRoleAsync(id);
        if (!result) return NotFound(new { message = "Rol no encontrado o es un rol del sistema y no puede eliminarse." });
        return NoContent();
    }

    /// <summary>Obtiene los permisos disponibles de forma paginada, con filtros opcionales.</summary>
    [HttpGet("permissions")]
    public async Task<IActionResult> GetPermissions(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] string? module = null)
    {
        var permissions = await _identityService.GetPermissionsAsync(page, pageSize, searchTerm, module);
        return Ok(permissions);
    }
}
