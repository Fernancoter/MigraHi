using HiCone.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var connString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True";
        var services = new ServiceCollection();
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connString));
        var serviceProvider = services.BuildServiceProvider();
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        Console.WriteLine("--- Applications Link Count ---");
        try {
            // Using raw SQL because the debug app might not have the mapping right
            var apps = await context.Database.SqlQueryRaw<string>("SELECT Name FROM security_applications").ToListAsync();
            foreach (var appName in apps)
            {
                var appId = await context.Database.SqlQueryRaw<Guid>($"SELECT Id FROM security_applications WHERE Name = '{appName}'").FirstAsync();
                var count = await context.Database.SqlQueryRaw<int>($"SELECT COUNT(*) FROM security_application_permissions WHERE security_application_id = '{appId}'").FirstAsync();
                Console.WriteLine($"- {appName}: {count} links");
            }
        } catch (Exception ex) { Console.WriteLine($"Error: {ex.Message}"); }
    }
}
