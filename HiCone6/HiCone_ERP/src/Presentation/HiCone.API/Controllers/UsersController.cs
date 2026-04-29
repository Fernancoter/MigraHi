using HiCone.Application.Services.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IIdentityService _identityService;

    public UsersController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    /// <summary>Obtiene todos los usuarios activos del sistema.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _identityService.GetUsersAsync();
        return Ok(users);
    }

    /// <summary>Obtiene un usuario por ID.</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var user = await _identityService.GetUserByIdAsync(id);
        if (user == null) return NotFound(new { message = "Usuario no encontrado." });
        return Ok(user);
    }

    /// <summary>Crea un nuevo usuario en el sistema.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            var user = await _identityService.CreateUserAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>Actualiza los datos de un usuario existente.</summary>
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var user = await _identityService.UpdateUserAsync(id, dto);
        if (user == null) return NotFound(new { message = "Usuario no encontrado o es de sistema." });
        return Ok(user);
    }

    /// <summary>Elimina (soft delete) un usuario del sistema.</summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _identityService.DeleteUserAsync(id);
        if (!result) return NotFound(new { message = "Usuario no encontrado." });
        return NoContent();
    }
}
