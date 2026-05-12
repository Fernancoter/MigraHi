using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Produccion;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using BC = BCrypt.Net.BCrypt;

namespace HiCone.Infrastructure.Identity;

public class IdentityService : IInfrastructureIdentityService
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<IdentityService> _logger;

    public IdentityService(IApplicationDbContext context, ILogger<IdentityService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(bool Success, string[] Errors)> CreateUserAsync(string email, string password, string firstName, string lastName)
    {
        if (await IsEmailUniqueAsync(email) == false)
        {
            return (false, new[] { "El correo electrónico ya está registrado." });
        }

        var user = new User
        {
            Email = email,
            PasswordHash = BC.HashPassword(password),
            FirstName = firstName,
            LastName = lastName,
            IsActive = true,
            MustChangePassword = false
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(default);

        return (true, Array.Empty<string>());
    }

    public async Task<(bool Success, string[] Errors, User? User)> AuthenticateAsync(string identifier, string password)
    {
        var user = await _context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Username == identifier || u.Email == identifier);

        if (user == null)
        {
            return (false, new[] { "Credenciales inválidas." }, null);
        }

        if (user.IsLockedOut && user.LockoutEnd > DateTime.UtcNow)
        {
            return (false, new[] { $"Cuenta bloqueada hasta {user.LockoutEnd}." }, null);
        }

        if (!BC.Verify(password, user.PasswordHash))
        {
            user.AccessFailedCount++;
            if (user.AccessFailedCount >= 5)
            {
                user.IsLockedOut = true;
                user.LockoutEnd = DateTime.UtcNow.AddMinutes(30);
            }
            await _context.SaveChangesAsync(default);
            return (false, new[] { "Credenciales inválidas." }, null);
        }

        // Reset security state on success
        user.AccessFailedCount = 0;
        user.IsLockedOut = false;
        user.LockoutEnd = null;
        user.LastLoginAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(default);

        return (true, Array.Empty<string>(), user);
    }

    public async Task<(bool Success, string[] Errors)> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return (false, new[] { "Usuario no encontrado." });

        if (!BC.Verify(currentPassword, user.PasswordHash))
        {
            return (false, new[] { "La contraseña actual es incorrecta." });
        }

        user.PasswordHash = BC.HashPassword(newPassword);
        user.MustChangePassword = false;
        user.PasswordExpiresAt = DateTime.UtcNow.AddMonths(3);

        await _context.SaveChangesAsync(default);
        return (true, Array.Empty<string>());
    }

    public async Task<bool> IsEmailUniqueAsync(string email)
    {
        return !await _context.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<User?> GetUserByIdAsync(Guid userId)
    {
        return await _context.Users.FindAsync(userId);
    }

    // ── Operadores ─────────────────────────────────────────────────────────

    public async Task<bool> DeshabilitarOperadorAsync(Guid operadorId)
    {
        var operador = await _context.Operadores
            .Include(o => o.User)
            .FirstOrDefaultAsync(o => o.Id == operadorId);

        if (operador == null)
        {
            _logger.LogWarning("Intento de deshabilitar operador no existente: {OperadorId}", operadorId);
            return false;
        }

        try
        {
            if (operador.User != null)
            {
                // Mapeo de &User.RepositoryDisable(&Errors)
                operador.User.IsRepositoryEnabled = false;
                operador.User.IsActive = false;
            }

            operador.Activo = false;
            await _context.SaveChangesAsync(default);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al deshabilitar el operador {OperadorId}", operadorId);
            return false;
        }
    }

    public async Task<bool> HabilitarOperadorAsync(Guid operadorId)
    {
        var operador = await _context.Operadores
            .Include(o => o.User)
            .FirstOrDefaultAsync(o => o.Id == operadorId);

        if (operador == null)
        {
            _logger.LogWarning("Intento de habilitar operador no existente: {OperadorId}", operadorId);
            return false;
        }

        try
        {
            if (operador.User != null)
            {
                // Mapeo de &User.RepositoryEnable(&Errors)
                operador.User.IsRepositoryEnabled = true;
                operador.User.IsActive = true;
            }

            operador.Activo = true;
            await _context.SaveChangesAsync(default);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al habilitar el operador {OperadorId}", operadorId);
            return false;
        }
    }
}
