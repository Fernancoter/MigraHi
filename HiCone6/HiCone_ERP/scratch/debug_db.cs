using HiCone.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

var builder = new ConfigurationBuilder()
    .AddJsonFile("src/Presentation/HiCone.API/appsettings.json");
var configuration = builder.Build();

var services = new ServiceCollection();
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

var serviceProvider = services.BuildServiceProvider();
using var scope = serviceProvider.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

Console.WriteLine("--- Unique Modules in Permissions table ---");
var modules = await context.Permissions.Select(p => p.Module).Distinct().ToListAsync();
foreach (var m in modules)
{
    var count = await context.Permissions.CountAsync(p => p.Module == m);
    Console.WriteLine($"- {m} ({count} permissions)");
}

Console.WriteLine("\n--- Applications in SecurityApplications table ---");
var apps = await context.SecurityApplications.ToListAsync();
foreach (var a in apps)
{
    var count = await context.SecurityApplicationPermissions.CountAsync(ap => ap.SecurityApplicationId == a.Id);
    Console.WriteLine($"- {a.Name} ({count} linked permissions)");
}
