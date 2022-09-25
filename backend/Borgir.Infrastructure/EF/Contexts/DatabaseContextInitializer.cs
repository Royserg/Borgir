using Borgir.Infrastructure.EF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Borgir.Infrastructure.EF.Contexts;

public class DatabaseContextInitializer
{
    private readonly ILogger<DatabaseContextInitializer> _logger;
    private readonly DatabaseContext _context;

    public DatabaseContextInitializer(ILogger<DatabaseContextInitializer> logger, DatabaseContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task InitializeAsync()
    {
        try
        {
            if (_context.Database.IsNpgsql())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initializing the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default data
        // Seed, if necessary
        if (!_context.Restaurants.Any())
        {
            _context.Restaurants.AddRange(
                // --- Antalya ---
                new RestaurantModel()
                {
                    Id = Guid.NewGuid(),
                    Name = "Burger Sound",
                    ImageUrl = "https://tse4.mm.bing.net/th?id=OIP.gAvvxFIyAyiALTU5u5oGnQEsDP",
                    City = "Antalya",
                    Country = "Turkey",
                    Street = "Konyaalti",
                    ZipCode = "07375"
                },
                new RestaurantModel()
                {
                    Id = Guid.NewGuid(),
                    Name = "Route Burger House",
                    ImageUrl = "https://tse3.mm.bing.net/th?id=OIP.yOJSHlHVZH7Yze5tOZTkHgAAAA",
                    City = "Antalya",
                    Country = "Turkey",
                    Street = "Şirinyalı Lara Caddesi, 1511. Sk.",
                    ZipCode = "07160"
                },
                new RestaurantModel()
                {
                    Id = Guid.NewGuid(),
                    Name = "Mahalle Burger",
                    ImageUrl = "https://mahalleburger.com.tr/assets/images/image01.jpg?v=e4a4f1cb",
                    City = "Antalya",
                    Country = "Turkey",
                    Street = "Şirinyalı, Lara Cd. No:231",
                    ZipCode = "07160"
                },
                // --- Copenhagen ---
                new RestaurantModel()
                {
                    Id = Guid.NewGuid(),
                    Name = "Gasoline Grill",
                    ImageUrl = "https://media-cdn.tripadvisor.com/media/photo-p/11/a6/20/6b/gasoline-grill.jpg",
                    City = "Copenhagen",
                    Country = "Denmark",
                    Street = "Landgreven 10",
                    ZipCode = "1301 CPH. K"
                },
                new RestaurantModel()
                {
                    Id = Guid.NewGuid(),
                    Name = "Banana Joe",
                    ImageUrl = "https://tse2.mm.bing.net/th?id=OIP.NbGGScRMQsd6YTFP7oQnKwAAAA",
                    City = "Copenhagen",
                    Country = "Denmark",
                    Street = "Elmegade 18",
                    ZipCode = "2200"
                },
                new RestaurantModel()
                {
                    Id = Guid.NewGuid(),
                    Name = "Sporvejen",
                    ImageUrl = "https://media-cdn.tripadvisor.com/media/photo-s/21/99/13/d7/our-flagship.jpg",
                    City = "Copenhagen",
                    Country = "Denmark",
                    Street = "Graabroedretorv 17",
                    ZipCode = "1154"
                }
            );

            await _context.SaveChangesAsync();
        }
    }
}
