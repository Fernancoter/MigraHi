using System;

namespace HiCone.Domain.Entities.Common;

public class IdempotencyRecord
{
    public string Key { get; set; } = null!;
    public string Path { get; set; } = null!;
    public string Method { get; set; } = null!;
    public string? ResponseBody { get; set; }
    public int ResponseStatusCode { get; set; }
    public string? ResponseContentType { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
}
