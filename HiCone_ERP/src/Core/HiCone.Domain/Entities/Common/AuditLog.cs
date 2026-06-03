using System;
using HiCone.Domain.Common;

namespace HiCone.Domain.Entities.Common;

public class AuditLog : TenantEntity
{
    public string EntityName { get; set; } = null!;
    public string EntityId { get; set; } = null!;
    public string Action { get; set; } = null!; // INSERT, UPDATE, DELETE, ARCHIVE
    public string? Username { get; set; }
    public string? ChangesJson { get; set; } // [{"Property":"LoteKg","Old":"100","New":"150"}]
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
