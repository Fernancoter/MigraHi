using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HiCone.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IIdentityService _identityService;
    private readonly ITokenService _tokenService;

    public AuthController(IIdentityService identityService, ITokenService tokenService)
    {
        _identityService = identityService;
        _tokenService = tokenService;
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

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenRequest request)
    {
        await _tokenService.RevokeRefreshTokenAsync(request.RefreshToken);
        return NoContent();
    }
}

public record LoginRequest(string Email, string Password, string? DeviceInfo);
public record RefreshTokenRequest(string RefreshToken);

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
