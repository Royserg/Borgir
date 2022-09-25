using Borgir.Application.Interfaces.Persistance;
using Borgir.Domain.Entities;
using Borgir.Infrastructure.EF.Contexts;
using Borgir.Infrastructure.EF.Models;
using Microsoft.EntityFrameworkCore;

namespace Borgir.Infrastructure.Repositories;

internal sealed class RestaurantRepository : IRestaurantRepository
{
    private readonly DbSet<RestaurantModel> _restaurants;
    private readonly DatabaseContext _dbContext;

    public RestaurantRepository(DatabaseContext dbContext)
    {
        _restaurants = dbContext.Restaurants;
        _dbContext = dbContext;
    }

    public async Task<List<Restaurant>> ListAsync(string? search)
    {
        var restaurants = new List<RestaurantModel>();

        if (!string.IsNullOrEmpty(search))
        {
            var searchLower = search.ToLower();

            restaurants = await _restaurants
                .Where(
                    r => r.City.ToLower().Contains(searchLower)
                    || r.Country.ToLower().Contains(searchLower)
                    || r.Name.ToLower().Contains(searchLower)
                )
                .ToListAsync();
        }
        else
        {
            restaurants = await _restaurants.ToListAsync();
        }

        // Convert Model to Entity
        return restaurants.Select(r => new Restaurant(
            r.Id,
            r.Name,
            r.ImageUrl,
            r.City,
            r.Country,
            r.Street,
            r.ZipCode
        ))
        .ToList();
    }

    public async Task<Restaurant?> GetAsync(Guid id)
    {
        var restaurant = await _restaurants.FirstOrDefaultAsync(r => r.Id == id);

        if (restaurant == null)
        {
            return null;
        }

        // Convert Model to Entity
        return new Restaurant(
            restaurant.Id,
            restaurant.Name,
            restaurant.ImageUrl,
            restaurant.City,
            restaurant.Country,
            restaurant.Street,
            restaurant.ZipCode
        );
    }
}