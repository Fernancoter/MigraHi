using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;

namespace HiCone.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(IApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                    .ThenInclude(r => r.RolePermissions)
                        .ThenInclude(rp => rp.Permission)
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
            return new AuthResponseDto { Success = false, Error = "Usuario o contraseña incorrectos." };

        if (user.IsBlocked)
            return new AuthResponseDto { Success = false, Error = "Cuenta bloqueada. Contacte al administrador." };

        if (!user.IsActive)
            return new AuthResponseDto { Success = false, Error = "Cuenta inactiva." };

        // Verify Password (BCrypt)
        // For development seeding, we might have plain text or a specific hash. 
        // In real use, we always use BCrypt.
        bool isPasswordValid = false;
        try {
            isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        } catch {
            // Fallback for initial seeding if not hashed with BCrypt
            isPasswordValid = user.PasswordHash == request.Password; 
        }

        if (!isPasswordValid)
        {
            user.AccessFailedCount++;
            if (user.AccessFailedCount >= 5) user.IsBlocked = true;
            await _context.SaveChangesAsync(default);
            return new AuthResponseDto { Success = false, Error = "Usuario o contraseña incorrectos." };
        }

        // Reset failed attempts
        user.AccessFailedCount = 0;
        user.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(default);

        // Generate Token
        var token = GenerateJwtToken(user);
        var refreshToken = Guid.NewGuid().ToString(); // Simple implementation for now

        return new AuthResponseDto
        {
            Success = true,
            Token = token,
            RefreshToken = refreshToken,
            User = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FullName = $"{user.FirstName} {user.LastName}",
                CompanyId = user.CompanyId,
                OperadorId = user.OperadorId,
                MustChangePassword = user.MustChangePassword,
                Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList(),
                Permissions = user.UserRoles
                    .SelectMany(ur => ur.Role.RolePermissions)
                    .Select(rp => rp.Permission.Code)
                    .Distinct()
                    .ToList()
            }
        };
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(string token, string refreshToken)
    {
        // Placeholder for refresh token logic
        return new AuthResponseDto { Success = false, Error = "Not implemented" };
    }

    public async Task<bool> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return false;

        if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
            return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        user.MustChangePassword = false;
        user.PasswordUpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(default);
        return true;
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("FirstName", user.FirstName),
            new Claim("LastName", user.LastName),
            new Claim("CompanyId", user.CompanyId?.ToString() ?? "0"),
            new Claim("OperadorId", user.OperadorId?.ToString() ?? "0")
        };

        // Add Roles and Permissions as Claims
        foreach (var userRole in user.UserRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, userRole.Role.Name));
            foreach (var rolePermission in userRole.Role.RolePermissions)
            {
                claims.Add(new Claim("Permission", rolePermission.Permission.Code));
            }
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "HiCone_Super_Secret_Key_For_JWT_Auth_2026"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddDays(1);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"] ?? "HiConeERP",
            _configuration["Jwt:Audience"] ?? "HiConeERP",
            claims,
            expires: expires,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
