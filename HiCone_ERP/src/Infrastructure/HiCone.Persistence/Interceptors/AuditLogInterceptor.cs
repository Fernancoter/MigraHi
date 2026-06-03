using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using HiCone.Application.Common.Interfaces;
using HiCone.Domain.Common;
using HiCone.Domain.Entities.Common;
using HiCone.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace HiCone.Persistence.Interceptors;

public class AuditLogInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTimeProvider _dateTimeProvider;

    public AuditLogInterceptor(
        ICurrentUserService currentUserService,
        IDateTimeProvider dateTimeProvider)
    {
        _currentUserService = currentUserService;
        _dateTimeProvider = dateTimeProvider;
    }

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        OnBeforeSaveChanges(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        OnBeforeSaveChanges(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void OnBeforeSaveChanges(DbContext? context)
    {
        if (context == null) return;

        var auditEntries = new List<AuditEntry>();
        foreach (var entry in context.ChangeTracker.Entries())
        {
            if (entry.Entity is not IAuditable || entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)
                continue;

            var auditEntry = new AuditEntry(entry)
            {
                TableName = entry.Entity.GetType().Name,
                UserId = _currentUserService.Email ?? _currentUserService.UserId ?? "Sistema",
                TenantId = _currentUserService.TenantId ?? Guid.Empty,
                Timestamp = _dateTimeProvider.UtcNow
            };

            auditEntries.Add(auditEntry);

            foreach (var property in entry.Properties)
            {
                string propertyName = property.Metadata.Name;
                if (propertyName == "CreatedAt" || propertyName == "CreatedBy" || 
                    propertyName == "UpdatedAt" || propertyName == "UpdatedBy" ||
                    propertyName == "DeletedAt" || propertyName == "IsDeleted")
                {
                    continue;
                }

                if (property.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[propertyName] = property.CurrentValue;
                    continue;
                }

                switch (entry.State)
                {
                    case EntityState.Added:
                        auditEntry.AuditType = "INSERT";
                        auditEntry.NewValues[propertyName] = property.CurrentValue;
                        break;

                    case EntityState.Deleted:
                        auditEntry.AuditType = "DELETE";
                        auditEntry.OldValues[propertyName] = property.OriginalValue;
                        break;

                    case EntityState.Modified:
                        if (property.IsModified)
                        {
                            var isDeletedProp = entry.Properties.FirstOrDefault(p => p.Metadata.Name == "IsDeleted");
                            if (isDeletedProp != null && isDeletedProp.IsModified && isDeletedProp.CurrentValue is bool isDeleted && isDeleted)
                            {
                                auditEntry.AuditType = "ARCHIVE";
                            }
                            else
                            {
                                auditEntry.AuditType = "UPDATE";
                            }
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                        }
                        break;
                }
            }
        }

        foreach (var auditEntry in auditEntries)
        {
            context.Set<AuditLog>().Add(auditEntry.ToAuditLog());
        }
    }
}

public class AuditEntry
{
    public Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry Entry { get; }
    public string TableName { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public Guid TenantId { get; set; }
    public string AuditType { get; set; } = "UPDATE";
    public Dictionary<string, object?> KeyValues { get; } = new();
    public Dictionary<string, object?> OldValues { get; } = new();
    public Dictionary<string, object?> NewValues { get; } = new();
    public DateTime Timestamp { get; set; }

    public AuditEntry(Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry)
    {
        Entry = entry;
    }

    public AuditLog ToAuditLog()
    {
        var key = KeyValues.Count > 0 ? KeyValues.Values.First()?.ToString() ?? "" : "";
        
        var changes = new List<object>();
        foreach (var propName in OldValues.Keys.Concat(NewValues.Keys).Distinct())
        {
            OldValues.TryGetValue(propName, out var oldVal);
            NewValues.TryGetValue(propName, out var newVal);

            if (!Equals(oldVal, newVal))
            {
                changes.Add(new { Property = propName, Old = oldVal, New = newVal });
            }
        }

        return new AuditLog
        {
            TenantId = TenantId,
            EntityName = TableName,
            EntityId = key,
            Action = AuditType,
            Username = UserId,
            ChangesJson = JsonSerializer.Serialize(changes),
            Timestamp = Timestamp,
            CreatedAt = Timestamp,
            CreatedBy = UserId
        };
    }
}
