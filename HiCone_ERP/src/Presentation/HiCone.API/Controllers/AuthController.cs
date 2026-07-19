using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HiCone.Application.Services.Identity;
using System.Linq;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IInfrastructureIdentityService _identityService;
    private readonly IIdentityService _applicationIdentityService;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly IApplicationDbContext _context;

    public AuthController(
        IInfrastructureIdentityService identityService,
        IIdentityService applicationIdentityService,
        ITokenService tokenService,
        IEmailService emailService,
        IApplicationDbContext context)
    {
        _identityService = identityService;
        _applicationIdentityService = applicationIdentityService;
        _tokenService = tokenService;
        _emailService = emailService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var (success, errors, user) = await _identityService.AuthenticateAsync(request.Email, request.Password);

        if (!success || user == null)
        {
            return Unauthorized(new { Errors = errors });
        }

        if (user.MustChangePassword)
        {
            return Ok(new { MustChangePassword = true, UserId = user.Id });
        }

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var permissions = user.UserRoles.SelectMany(ur => ur.Role.RolePermissions).Select(rp => rp.Permission.Code).Distinct().ToList();

        var accessToken = _tokenService.GenerateAccessToken(user, roles, permissions);
        var refreshToken = _tokenService.GenerateRefreshToken();

        await _tokenService.SaveRefreshTokenAsync(user.Id, refreshToken, request.DeviceInfo ?? "Unknown Device");

        return Ok(new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            User = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                CompanyId = user.TenantId,
                OperadorId = user.OperadorId
            }
        });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var storedToken = await _tokenService.GetRefreshTokenAsync(request.RefreshToken);

        if (storedToken == null)
        {
            return Unauthorized(new { Error = "Invalid refresh token." });
        }

        var user = await _identityService.GetUserByIdAsync(storedToken.UserId);
        if (user == null) return Unauthorized();

        // In a real scenario, we'd fetch roles/permissions again
        var roles = new List<string>(); // Fetch from DB
        var permissions = new List<string>(); // Fetch from DB

        var newAccessToken = _tokenService.GenerateAccessToken(user, roles, permissions);
        
        return Ok(new { AccessToken = newAccessToken });
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var (success, errors) = await _identityService.ChangePasswordAsync(request.UserId, request.CurrentPassword, request.NewPassword);

        if (!success)
        {
            return BadRequest(new { Errors = errors });
        }

        return Ok(new { Message = "Contraseña cambiada con éxito." });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenRequest request)
    {
        await _tokenService.RevokeRefreshTokenAsync(request.RefreshToken);
        return NoContent();
    }



    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
        {
            return BadRequest(new { Error = "Debe ingresar su correo electrónico." });
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
        {
            return BadRequest(new { Error = "El correo electrónico no está registrado." });
        }

        var chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$";
        var random = new Random();
        var tempPassword = new string(Enumerable.Repeat(chars, 8).Select(s => s[random.Next(s.Length)]).ToArray());

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword);
        user.MustChangePassword = true;
        await _context.SaveChangesAsync(default);

        var emailBody = $@"
            <h3>Recuperación de Contraseña</h3>
            <p>Hola {user.FirstName},</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en HiCone ERP.</p>
            <p>Tu contraseña temporal es: <strong>{tempPassword}</strong></p>
            <p>Deberás cambiar esta contraseña la próxima vez que inicies sesión en el sistema.</p>
            <p>Saludos,<br/>Soporte HiCone ERP</p>";

        try
        {
            await _emailService.SendEmailAsync(user.Email, "Restablecer contraseña - HiCone ERP", emailBody);
            return Ok(new { Message = "Correo de recuperación enviado con éxito." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Error al enviar el correo electrónico: " + ex.Message });
        }
    }
}

public record LoginRequest(string Email, string Password, string? DeviceInfo);
public record RefreshTokenRequest(string RefreshToken);
public record ForgotPasswordRequest(string Email);
public record ChangePasswordRequest(Guid UserId, string CurrentPassword, string NewPassword);

public class LoginResponse
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public UserDto User { get; set; } = null!;
}

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public Guid CompanyId { get; set; }
    public Guid? OperadorId { get; set; }
}
