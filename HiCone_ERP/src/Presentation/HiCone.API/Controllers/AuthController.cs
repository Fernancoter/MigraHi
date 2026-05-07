using HiCone.Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        var result = await _authService.LoginAsync(request);
        if (!result.Success)
            return Unauthorized(result);

        return Ok(result);
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        // Get current user id from claims (later)
        // For now, testing with Guid from request
        var success = await _authService.ChangePasswordAsync(request.UserId, request.CurrentPassword, request.NewPassword);
        if (!success) return BadRequest("Error al cambiar contraseña.");

        return Ok("Contraseña actualizada con éxito.");
    }
}

public class ChangePasswordRequest
{
    public Guid UserId { get; set; }
    public string CurrentPassword { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}
