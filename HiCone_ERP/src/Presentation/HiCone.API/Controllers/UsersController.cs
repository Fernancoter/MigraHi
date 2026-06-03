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
        if (user == null) return NotFound(new { message = "Usuario no encontrado." });
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

    /// <summary>Cambia la contraseña de un usuario manualmente (Admin).</summary>
    [HttpPut("{id:guid}/change-password")]
    public async Task<IActionResult> ChangePassword(Guid id, [FromBody] ChangePasswordDto dto)
    {
        if (string.IsNullOrEmpty(dto.NewPassword) || dto.NewPassword.Length < 6)
            return BadRequest(new { message = "La contraseña debe tener al menos 6 caracteres." });

        try
        {
            var result = await _identityService.ChangePasswordAsync(id, dto.NewPassword);
            if (!result) return NotFound(new { message = "Usuario no encontrado." });
            return Ok(new { message = "Contraseña actualizada correctamente." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    public class ChangePasswordDto
    {
        public string NewPassword { get; set; } = null!;
    }

    // ── Excel (Paso 2: pendiente de configurar) ──────────────────────────────

    /// <summary>
    /// STUB: Exporta la lista de usuarios a Excel.
    /// TODO (Paso 2): Implementar generación real del archivo .xlsx.
    /// </summary>
    [HttpGet("export")]
    public async Task<IActionResult> ExportToExcel()
    {
        var bytes = await _identityService.ExportUsersToExcelAsync();
        if (bytes.Length == 0)
            return BadRequest(new { message = "Exportación de Excel en configuración (Paso 2)." });

        return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "usuarios.xlsx");
    }

    /// <summary>
    /// STUB: Importa usuarios desde un archivo Excel.
    /// TODO (Paso 2): Implementar el parsing real del .xlsx y la carga masiva.
    /// </summary>
    [HttpPost("import")]
    public async Task<IActionResult> ImportFromExcel(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "Archivo no proporcionado." });

        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);
        var result = await _identityService.ImportUsersFromExcelAsync(ms.ToArray());
        return Ok(result);
    }
}
