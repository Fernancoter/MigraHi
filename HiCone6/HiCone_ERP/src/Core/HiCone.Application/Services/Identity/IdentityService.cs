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
        public List<string> Roles { get; set; } = new();
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

    // ─── Interface ───────────────────────────────────────────────────────────

    public interface IIdentityService
    {
        // Users
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<UserDto?> GetUserByIdAsync(Guid id);
        Task<UserDto> CreateUserAsync(CreateUserDto dto);
        Task<UserDto?> UpdateUserAsync(Guid id, UpdateUserDto dto);
        Task<bool> DeleteUserAsync(Guid id);

        // Roles
        Task<IEnumerable<RoleDto>> GetRolesAsync();
        Task<RoleDto?> GetRoleByIdAsync(Guid id);
        Task<RoleDto> CreateRoleAsync(CreateRoleDto dto);
        Task<RoleDto?> UpdateRoleAsync(Guid id, UpdateRoleDto dto);
        Task<bool> DeleteRoleAsync(Guid id);

        // Permissions
        Task<IEnumerable<PermissionDto>> GetPermissionsAsync();
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
                    Roles = u.UserRoles.Select(ur => ur.Role.Name).ToList()
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
                Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList()
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
                IsActive = true,
                MustChangePassword = true,
                EmailConfirmed = false,
                IsDeleted = false
            };

            _context.Users.Add(user);

            // Assign roles
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

            // Sync roles
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

            // Soft delete to preserve historical integrity
            user.IsDeleted = true;
            user.IsActive = false;
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

            // Sync permissions
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
    }
}
