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

    public async Task<List<Restaurant>> ListAsync()
    {
        var restaurants = await _restaurants.ToListAsync();

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
}