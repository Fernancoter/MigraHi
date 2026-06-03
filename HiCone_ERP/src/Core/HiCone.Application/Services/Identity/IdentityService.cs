using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiCone.Domain.Entities.Identity;
using HiCone.Domain.Entities.Produccion;
using HiCone.Domain.Enums;
using HiCone.Application.Common.Interfaces;
using HiCone.Application.Common.Models;
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
        public Guid? OperadorId { get; set; }
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
        public Guid? OperadorId { get; set; }
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
        public Guid? OperadorId { get; set; }
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
        public List<RolePermissionInputDto> Permissions { get; set; } = new();
    }

    public class RolePermissionInputDto
    {
        public Guid PermissionId { get; set; }
        public int AccessType { get; set; }
    }

    public class UpdateRoleDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public List<RolePermissionInputDto> Permissions { get; set; } = new();
    }

    public class PermissionDto
    {
        public Guid Id { get; set; }
        public string Module { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string? Description { get; set; }
        public List<string> Applications { get; set; } = new();
        public int AccessType { get; set; } = 0; // 0=Allow, 1=Deny, 2=Restricted
    }

    public class ApplicationDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
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

    public class CreateOperadorDto
    {
        public string Nombre { get; set; } = null!;
        public string? Codigo { get; set; }
        public Guid? UserGUID { get; set; }
    }

    public class ImportResultDto
    {
        public int Created { get; set; }
        public int Updated { get; set; }
        public int Errors { get; set; }
        public List<string> ErrorMessages { get; set; } = new();
    }

    public class OperadorDto
    {
        public Guid Id { get; set; }
        public string OperadorNombre { get; set; } = null!;
        public Guid OperadorUserGUID { get; set; }
        public bool Activo { get; set; }
        public string? Username { get; set; }
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
        Task<PaginatedResult<RoleDto>> GetRolesAsync(int page = 1, int pageSize = 20, string? searchTerm = null);
        Task<RoleDto?> GetRoleByIdAsync(Guid id);
        Task<RoleDto> CreateRoleAsync(CreateRoleDto dto);
        Task<RoleDto?> UpdateRoleAsync(Guid id, UpdateRoleDto dto);
        Task<bool> DeleteRoleAsync(Guid id);
        
        // Operadores
        Task<bool> DeshabilitarOperadorAsync(Guid operadorId);
        Task<bool> HabilitarOperadorAsync(Guid operadorId);
        Task<IEnumerable<OperadorDto>> GetOperadoresAsync();
        Task<OperadorDto> CreateOperadorAsync(CreateOperadorDto dto);

        // Permissions
        Task<PaginatedResult<PermissionDto>> GetPermissionsAsync(int page = 1, int pageSize = 20, string? searchTerm = null, string? module = null);

        // Applications
        Task<IEnumerable<ApplicationDto>> GetApplicationsAsync();

        // Excel — scaffolding preparado, pendiente configurar (Paso 2)
        Task<byte[]> ExportUsersToExcelAsync();
        Task<ImportResultDto> ImportUsersFromExcelAsync(byte[] fileBytes);
    }

    // ─── Implementation ──────────────────────────────────────────────────────

    public class IdentityService : IIdentityService
    {
        private readonly IApplicationDbContext _context;
        private readonly IInfrastructureIdentityService _infrastructureIdentityService;

        public IdentityService(IApplicationDbContext context, IInfrastructureIdentityService infrastructureIdentityService)
        {
            _context = context;
            _infrastructureIdentityService = infrastructureIdentityService;
        }

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
                    OperadorId = u.OperadorId ?? _context.Operadores
                        .Where(o => o.UserGUID == u.Id)
                        .Select(o => (Guid?)o.Id)
                        .FirstOrDefault(),
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

            // Sync Operador record if role is assigned
            var operadorRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Operador");
            if (operadorRole != null && dto.RoleIds.Contains(operadorRole.Id))
            {
                var exists = await _context.Operadores.AnyAsync(o => o.UserGUID == user.Id);
                if (!exists)
                {
                    var operador = new Operador
                    {
                        Nombre = $"{user.FirstName} {user.LastName}",
                        UserGUID = user.Id,
                        Activo = true,
                        TenantId = new Guid("00000000-0000-0000-0000-000000000001") // Default Tenant
                    };
                    _context.Operadores.Add(operador);
                    await _context.SaveChangesAsync(default);
                    user.OperadorId = operador.Id;
                }
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
            user.AvatarUrl = dto.AvatarUrl;

            // Update Roles
            var existingRoles = await _context.UserRoles.Where(ur => ur.UserId == id).ToListAsync();
            _context.UserRoles.RemoveRange(existingRoles);

            foreach (var roleId in dto.RoleIds)
            {
                _context.UserRoles.Add(new UserRole
                {
                    UserId = id,
                    RoleId = roleId,
                    AssignedAt = DateTime.UtcNow
                });
            }

            // Sync Operador record if role is assigned
            var operadorRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Operador");
            if (operadorRole != null && dto.RoleIds.Contains(operadorRole.Id))
            {
                var operador = await _context.Operadores.FirstOrDefaultAsync(o => o.UserGUID == id);
                if (operador == null)
                {
                    operador = new Operador
                    {
                        Nombre = $"{user.FirstName} {user.LastName}",
                        UserGUID = id,
                        Activo = true,
                        TenantId = new Guid("00000000-0000-0000-0000-000000000001")
                    };
                    _context.Operadores.Add(operador);
                    await _context.SaveChangesAsync(default);
                }
                user.OperadorId = operador.Id;
            }
            else
            {
                // If role removed, we might want to unlink, but usually we keep it
                // user.OperadorId = null; 
            }

            await _context.SaveChangesAsync(default);
            return await GetUserByIdAsync(id);
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.IsDeleted = true;
            user.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(default);
            return true;
        }

        public async Task<bool> ChangePasswordAsync(Guid id, string newPassword)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.PasswordHash = BC.HashPassword(newPassword);
            await _context.SaveChangesAsync(default);
            return true;
        }

        // ─── Roles ───────────────────────────────────────────────────────────────

        public async Task<PaginatedResult<RoleDto>> GetRolesAsync(int page = 1, int pageSize = 20, string? searchTerm = null)
        {
            var query = _context.Roles.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(r => r.Name.Contains(searchTerm) || (r.Description != null && r.Description.Contains(searchTerm)));
            }

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderBy(r => r.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(r => new RoleDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    IsSystem = r.IsSystem
                })
                .ToListAsync();

            return new PaginatedResult<RoleDto> { Items = items, TotalCount = totalCount };
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
                    Id = rp.PermissionId,
                    Module = rp.Permission.Module,
                    Name = rp.Permission.Name,
                    Code = rp.Permission.Code,
                    Description = rp.Permission.Description,
                    AccessType = (int)rp.AccessType
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
            await _context.SaveChangesAsync(default);

            foreach (var p in dto.Permissions)
            {
                _context.RolePermissions.Add(new RolePermission
                {
                    RoleId = role.Id,
                    PermissionId = p.PermissionId,
                    AccessType = (AccessType)p.AccessType
                });
            }

            await _context.SaveChangesAsync(default);
            return (await GetRoleByIdAsync(role.Id))!;
        }

        public async Task<RoleDto?> UpdateRoleAsync(Guid id, UpdateRoleDto dto)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null) return null;

            role.Name = dto.Name;
            role.Description = dto.Description;

            var existingPermissions = await _context.RolePermissions.Where(rp => rp.RoleId == id).ToListAsync();
            _context.RolePermissions.RemoveRange(existingPermissions);

            foreach (var p in dto.Permissions)
            {
                _context.RolePermissions.Add(new RolePermission
                {
                    RoleId = id,
                    PermissionId = p.PermissionId,
                    AccessType = (AccessType)p.AccessType
                });
            }

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

        // ─── Permissions ─────────────────────────────────────────────────────────

        public async Task<PaginatedResult<PermissionDto>> GetPermissionsAsync(int page = 1, int pageSize = 20, string? searchTerm = null, string? module = null)
        {
            var query = _context.Permissions.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(p => p.Name.Contains(searchTerm) || p.Code.Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(module))
            {
                query = query.Where(p => p.Module == module);
            }

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderBy(p => p.Module).ThenBy(p => p.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PermissionDto
                {
                    Id = p.Id,
                    Module = p.Module,
                    Name = p.Name,
                    Code = p.Code,
                    Description = p.Description
                })
                .ToListAsync();

            return new PaginatedResult<PermissionDto> { Items = items, TotalCount = totalCount };
        }

        public async Task<IEnumerable<ApplicationDto>> GetApplicationsAsync()
        {
            return await _context.SecurityApplications
                .Select(a => new ApplicationDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description
                })
                .ToListAsync();
        }

        public Task<byte[]> ExportUsersToExcelAsync()
        {
            // Placeholder — responde con array vacío hasta que se configure en Paso 2
            return Task.FromResult(Array.Empty<byte>());
        }

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

        // ── Operadores ───────────────────────────────────────────────────────

        public async Task<bool> DeshabilitarOperadorAsync(Guid operadorId)
        {
            return await _infrastructureIdentityService.DeshabilitarOperadorAsync(operadorId);
        }

        public async Task<bool> HabilitarOperadorAsync(Guid operadorId)
        {
            return await _infrastructureIdentityService.HabilitarOperadorAsync(operadorId);
        }

        public async Task<IEnumerable<OperadorDto>> GetOperadoresAsync()
        {
            return await _context.Operadores
                .Include(o => o.User)
                .Select(o => new OperadorDto
                {
                    Id = o.Id,
                    OperadorNombre = o.Nombre,
                    OperadorUserGUID = o.UserGUID ?? Guid.Empty,
                    Activo = o.Activo,
                    Username = o.User != null ? o.User.Username : null
                })
                .ToListAsync();
        }

        public async Task<OperadorDto> CreateOperadorAsync(CreateOperadorDto dto)
        {
            var operador = new Operador
            {
                Nombre = dto.Nombre,
                Codigo = dto.Codigo,
                UserGUID = dto.UserGUID,
                Activo = true,
                TenantId = new Guid("00000000-0000-0000-0000-000000000001") // Ensure TenantId is set
            };

            _context.Operadores.Add(operador);
            await _context.SaveChangesAsync(default);

            return (await GetOperadoresAsync()).First(o => o.Id == operador.Id);
        }
    }
}
