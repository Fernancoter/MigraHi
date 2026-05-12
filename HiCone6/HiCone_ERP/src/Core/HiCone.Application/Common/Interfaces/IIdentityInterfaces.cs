using HiCone.Domain.Entities.Identity;

namespace HiCone.Application.Common.Interfaces;

public interface IInfrastructureIdentityService
{
    Task<(bool Success, string[] Errors)> CreateUserAsync(string email, string password, string firstName, string lastName);
    Task<(bool Success, string[] Errors, User? User)> AuthenticateAsync(string email, string password);
    Task<(bool Success, string[] Errors)> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword);
    Task<bool> IsEmailUniqueAsync(string email);
    Task<User?> GetUserByIdAsync(Guid userId);
    
    // Operadores
    Task<bool> DeshabilitarOperadorAsync(Guid operadorId);
    Task<bool> HabilitarOperadorAsync(Guid operadorId);
}

public interface ITokenService
{
    string GenerateAccessToken(User user, IEnumerable<string> roles, IEnumerable<string> permissions);
    string GenerateRefreshToken();
    Task SaveRefreshTokenAsync(Guid userId, string token, string deviceInfo);
    Task<RefreshToken?> GetRefreshTokenAsync(string token);
    Task RevokeRefreshTokenAsync(string token);
}
