using HiCone.Application.Common.Interfaces;

namespace HiCone.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}


