using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiCone.Domain.Entities.Identity;
using HiCone.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

namespace HiCone.Application.Services.Identity
{
    // ─── DTOs ────────────────────────────────────────────────────────────────

    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsLockedOut { get; set; }
        public bool MustChangePassword { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public int? OperadorId { get; set; }
        public string? Gender { get; set; }
        public string? AuthenticationType { get; set; }
        public int? CompanyId { get; set; }
        public string? Namespace { get; set; }
        public string? ExternalId { get; set; }
        public DateTime? Birthday { get; set; }
        public DateTime? ActivationDate { get; set; }
        public bool ReceivesInformation { get; set; }
        public bool CannotChangePassword { get; set; }
        public bool PasswordNeverExpires { get; set; }
        public string? SecurityPolicyId { get; set; }
        public bool IsRepositoryEnabled { get; set; }
        public string? AvatarUrl { get; set; }
        public List<string> Roles { get; set; } = new();
        public List<string> RoleIds { get; set; } = new();
    }

    public class CreateUserDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public int? OperadorId { get; set; }
        public string? Gender { get; set; }
        public string? AuthenticationType { get; set; }
        public int? CompanyId { get; set; }
        public string? Namespace { get; set; }
        public string? ExternalId { get; set; }
        public DateTime? Birthday { get; set; }
        public DateTime? ActivationDate { get; set; }
        public bool ReceivesInformation { get; set; } = true;
        public bool CannotChangePassword { get; set; } = false;
        public bool PasswordNeverExpires { get; set; } = false;
        public string? SecurityPolicyId { get; set; }
        public bool IsRepositoryEnabled { get; set; } = true;
        public string? AvatarUrl { get; set; }
        public List<Guid> RoleIds { get; set; } = new();
    }

    public class UpdateUserDto
    {
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsLockedOut { get; set; }
        public bool MustChangePassword { get; set; }
        public int? OperadorId { get; set; }
        public string? Gender { get; set; }
        public string? AuthenticationType { get; set; }
        public int? CompanyId { get; set; }
        public string? Namespace { get; set; }
        public string? ExternalId { get; set; }
        public DateTime? Birthday { get; set; }
        public DateTime? ActivationDate { get; set; }
        public bool ReceivesInformation { get; set; }
        public bool CannotChangePassword { get; set; }
        public bool PasswordNeverExpires { get; set; }
        public string? SecurityPolicyId { get; set; }
        public bool IsRepositoryEnabled { get; set; }
        public string? AvatarUrl { get; set; }
        public List<Guid> RoleIds { get; set; } = new();
    }

    public class RoleDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public bool IsSystem { get; set; }
        public List<PermissionDto> Permissions { get; set; } = new();
    }

    public class CreateRoleDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public List<Guid> PermissionIds { get; set; } = new();
    }

    public class UpdateRoleDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public List<Guid> PermissionIds { get; set; } = new();
    }

    public class PermissionDto
    {
        public Guid Id { get; set; }
        public string Module { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string? Description { get; set; }
    }

    // Excel import/export DTOs — pendiente de configurar (Paso 2)
    public class UserImportRowDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Gender { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Roles { get; set; }          // roles separados por coma
    }

    public class ImportResultDto
    {
        public int Created { get; set; }
        public int Updated { get; set; }
        public int Errors { get; set; }
        public List<string> ErrorMessages { get; set; } = new();
    }

    // ─── Interface ───────────────────────────────────────────────────────────

    public interface IIdentityService
    {
        // Users
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<UserDto?> GetUserByIdAsync(Guid id);
        Task<UserDto> CreateUserAsync(CreateUserDto dto);
        Task<UserDto?> UpdateUserAsync(Guid id, UpdateUserDto dto);
        Task<bool> DeleteUserAsync(Guid id);
        Task<bool> ChangePasswordAsync(Guid id, string newPassword);

        // Roles
        Task<IEnumerable<RoleDto>> GetRolesAsync();
        Task<RoleDto?> GetRoleByIdAsync(Guid id);
        Task<RoleDto> CreateRoleAsync(CreateRoleDto dto);
        Task<RoleDto?> UpdateRoleAsync(Guid id, UpdateRoleDto dto);
        Task<bool> DeleteRoleAsync(Guid id);

        // Permissions
        Task<IEnumerable<PermissionDto>> GetPermissionsAsync();

        // Excel — scaffolding preparado, pendiente configurar (Paso 2)
        Task<byte[]> ExportUsersToExcelAsync();
        Task<ImportResultDto> ImportUsersFromExcelAsync(byte[] fileBytes);
    }

    // ─── Implementation ──────────────────────────────────────────────────────

    public class IdentityService : IIdentityService
    {
        private readonly IApplicationDbContext _context;

        public IdentityService(IApplicationDbContext context)
        {
            _context = context;
        }

        // ── Users ────────────────────────────────────────────────────────────

        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            return await _context.Users
                .Where(u => !u.IsDeleted)
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    PhoneNumber = u.PhoneNumber,
                    IsActive = u.IsActive,
                    IsLockedOut = u.IsLockedOut,
                    MustChangePassword = u.MustChangePassword,
                    LastLoginAt = u.LastLoginAt,
                    OperadorId = u.OperadorId,
                    Gender = u.Gender,
                    AuthenticationType = u.AuthenticationType,
                    CompanyId = u.CompanyId,
                    Namespace = u.Namespace,
                    ExternalId = u.ExternalId,
                    Birthday = u.Birthday,
                    ActivationDate = u.ActivationDate,
                    ReceivesInformation = u.ReceivesInformation,
                    CannotChangePassword = u.CannotChangePassword,
                    PasswordNeverExpires = u.PasswordNeverExpires,
                    SecurityPolicyId = u.SecurityPolicyId,
                    IsRepositoryEnabled = u.IsRepositoryEnabled,
                    AvatarUrl = u.AvatarUrl,
                    Roles = u.UserRoles.Select(ur => ur.Role.Name).ToList(),
                    RoleIds = u.UserRoles.Select(ur => ur.RoleId.ToString()).ToList()
                })
                .ToListAsync();
        }

        public async Task<UserDto?> GetUserByIdAsync(Guid id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id && !u.IsDeleted)
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync();

            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                IsActive = user.IsActive,
                IsLockedOut = user.IsLockedOut,
                MustChangePassword = user.MustChangePassword,
                LastLoginAt = user.LastLoginAt,
                OperadorId = user.OperadorId,
                Gender = user.Gender,
                AuthenticationType = user.AuthenticationType,
                CompanyId = user.CompanyId,
                Namespace = user.Namespace,
                ExternalId = user.ExternalId,
                Birthday = user.Birthday,
                ActivationDate = user.ActivationDate,
                ReceivesInformation = user.ReceivesInformation,
                CannotChangePassword = user.CannotChangePassword,
                PasswordNeverExpires = user.PasswordNeverExpires,
                SecurityPolicyId = user.SecurityPolicyId,
                IsRepositoryEnabled = user.IsRepositoryEnabled,
                AvatarUrl = user.AvatarUrl,
                Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList(),
                RoleIds = user.UserRoles.Select(ur => ur.RoleId.ToString()).ToList()
            };
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BC.HashPassword(dto.Password),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                OperadorId = dto.OperadorId,
                Gender = dto.Gender,
                AuthenticationType = dto.AuthenticationType ?? "Local",
                CompanyId = dto.CompanyId,
                Namespace = dto.Namespace,
                ExternalId = dto.ExternalId,
                Birthday = dto.Birthday,
                ActivationDate = dto.ActivationDate,
                ReceivesInformation = dto.ReceivesInformation,
                CannotChangePassword = dto.CannotChangePassword,
                PasswordNeverExpires = dto.PasswordNeverExpires,
                SecurityPolicyId = dto.SecurityPolicyId,
                IsRepositoryEnabled = dto.IsRepositoryEnabled,
                AvatarUrl = dto.AvatarUrl,
                IsActive = true,
                MustChangePassword = true,
                EmailConfirmed = false,
                IsDeleted = false
            };

            _context.Users.Add(user);

            foreach (var roleId in dto.RoleIds)
            {
                _context.UserRoles.Add(new UserRole
                {
                    UserId = user.Id,
                    RoleId = roleId,
                    AssignedAt = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync(default);
            return (await GetUserByIdAsync(user.Id))!;
        }

        public async Task<UserDto?> UpdateUserAsync(Guid id, UpdateUserDto dto)
        {
            var user = await _context.Users
                .Where(u => u.Id == id && !u.IsDeleted)
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync();

            if (user == null) return null;

            user.Email = dto.Email;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNumber = dto.PhoneNumber;
            user.IsActive = dto.IsActive;
            user.IsLockedOut = dto.IsLockedOut;
            user.MustChangePassword = dto.MustChangePassword;
            user.OperadorId = dto.OperadorId;
            user.Gender = dto.Gender;
            user.AuthenticationType = dto.AuthenticationType;
            user.CompanyId = dto.CompanyId;
            user.Namespace = dto.Namespace;
            user.ExternalId = dto.ExternalId;
            user.Birthday = dto.Birthday;
            user.ActivationDate = dto.ActivationDate;
            user.ReceivesInformation = dto.ReceivesInformation;
            user.CannotChangePassword = dto.CannotChangePassword;
            user.PasswordNeverExpires = dto.PasswordNeverExpires;
            user.SecurityPolicyId = dto.SecurityPolicyId;
            user.IsRepositoryEnabled = dto.IsRepositoryEnabled;
            if (dto.AvatarUrl != null)
                user.AvatarUrl = dto.AvatarUrl;

            var existingRoleIds = user.UserRoles.Select(ur => ur.RoleId).ToList();
            var toRemove = user.UserRoles.Where(ur => !dto.RoleIds.Contains(ur.RoleId)).ToList();
            foreach (var ur in toRemove)
                _context.UserRoles.Remove(ur);

            foreach (var roleId in dto.RoleIds.Where(rid => !existingRoleIds.Contains(rid)))
                _context.UserRoles.Add(new UserRole { UserId = id, RoleId = roleId, AssignedAt = DateTime.UtcNow });

            await _context.SaveChangesAsync(default);
            return await GetUserByIdAsync(id);
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null || user.IsDeleted) return false;

            user.IsDeleted = true;
            user.IsActive = false;
            await _context.SaveChangesAsync(default);
            return true;
        }

        public async Task<bool> ChangePasswordAsync(Guid id, string newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
            if (user == null) return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.MustChangePassword = true;

            await _context.SaveChangesAsync(default);
            return true;
        }

        // ── Roles ────────────────────────────────────────────────────────────

        public async Task<IEnumerable<RoleDto>> GetRolesAsync()
        {
            return await _context.Roles
                .Include(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission)
                .Select(r => new RoleDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    IsSystem = r.IsSystem,
                    Permissions = r.RolePermissions.Select(rp => new PermissionDto
                    {
                        Id = rp.Permission.Id,
                        Module = rp.Permission.Module,
                        Name = rp.Permission.Name,
                        Code = rp.Permission.Code,
                        Description = rp.Permission.Description
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<RoleDto?> GetRoleByIdAsync(Guid id)
        {
            var role = await _context.Roles
                .Include(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (role == null) return null;

            return new RoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description,
                IsSystem = role.IsSystem,
                Permissions = role.RolePermissions.Select(rp => new PermissionDto
                {
                    Id = rp.Permission.Id,
                    Module = rp.Permission.Module,
                    Name = rp.Permission.Name,
                    Code = rp.Permission.Code,
                    Description = rp.Permission.Description
                }).ToList()
            };
        }

        public async Task<RoleDto> CreateRoleAsync(CreateRoleDto dto)
        {
            var role = new Role
            {
                Name = dto.Name,
                Description = dto.Description,
                IsSystem = false
            };

            _context.Roles.Add(role);

            foreach (var permId in dto.PermissionIds)
                _context.RolePermissions.Add(new RolePermission { RoleId = role.Id, PermissionId = permId });

            await _context.SaveChangesAsync(default);
            return (await GetRoleByIdAsync(role.Id))!;
        }

        public async Task<RoleDto?> UpdateRoleAsync(Guid id, UpdateRoleDto dto)
        {
            var role = await _context.Roles
                .Include(r => r.RolePermissions)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (role == null || role.IsSystem) return null;

            role.Name = dto.Name;
            role.Description = dto.Description;

            var existingPermIds = role.RolePermissions.Select(rp => rp.PermissionId).ToList();
            var toRemove = role.RolePermissions.Where(rp => !dto.PermissionIds.Contains(rp.PermissionId)).ToList();
            foreach (var rp in toRemove) _context.RolePermissions.Remove(rp);
            foreach (var permId in dto.PermissionIds.Where(pid => !existingPermIds.Contains(pid)))
                _context.RolePermissions.Add(new RolePermission { RoleId = id, PermissionId = permId });

            await _context.SaveChangesAsync(default);
            return await GetRoleByIdAsync(id);
        }

        public async Task<bool> DeleteRoleAsync(Guid id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null || role.IsSystem) return false;

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync(default);
            return true;
        }

        // ── Permissions ──────────────────────────────────────────────────────

        public async Task<IEnumerable<PermissionDto>> GetPermissionsAsync()
        {
            return await _context.Permissions
                .Select(p => new PermissionDto
                {
                    Id = p.Id,
                    Module = p.Module,
                    Name = p.Name,
                    Code = p.Code,
                    Description = p.Description
                })
                .ToListAsync();
        }

        // ── Excel — scaffolding (Paso 2: pendiente de configurar) ─────────────

        /// <summary>
        /// STUB: Exportar usuarios a Excel.
        /// TODO (Paso 2): Integrar librería ClosedXML o EPPlus para generar el .xlsx.
        /// </summary>
        public Task<byte[]> ExportUsersToExcelAsync()
        {
            // Placeholder — devuelve array vacío hasta que se configure en Paso 2
            return Task.FromResult(Array.Empty<byte>());
        }

        /// <summary>
        /// STUB: Importar usuarios desde Excel.
        /// TODO (Paso 2): Parsear el archivo .xlsx, mapear columnas y persistir registros.
        /// </summary>
        public Task<ImportResultDto> ImportUsersFromExcelAsync(byte[] fileBytes)
        {
            // Placeholder — responde con 0 operaciones hasta que se configure en Paso 2
            return Task.FromResult(new ImportResultDto
            {
                Created = 0,
                Updated = 0,
                Errors = 0,
                ErrorMessages = new List<string> { "Funcionalidad de importación en configuración (Paso 2)." }
            });
        }
    }
}
