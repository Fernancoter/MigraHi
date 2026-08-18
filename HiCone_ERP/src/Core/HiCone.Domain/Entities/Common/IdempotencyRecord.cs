using System;

namespace HiCone.Domain.Entities.Common;

public class IdempotencyRecord
{
<<<<<<< Updated upstream
    public string Key { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Method { get; set; } = string.Empty;
    public int StatusCode { get; set; }
    public string? ResponseBody { get; set; }
    public string? ResponseContentType { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddHours(48);
=======
    public string Key { get; set; } = null!;
    public string Path { get; set; } = null!;
    public string Method { get; set; } = null!;
    public string? ResponseBody { get; set; }
    public int ResponseStatusCode { get; set; }
    public string? ResponseContentType { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
>>>>>>> Stashed changes
}
