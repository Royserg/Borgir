namespace Borgir.Infrastructure.EF.Contexts;

using Borgir.Domain.Entities;
using Borgir.Infrastructure.EF.Models;
using Microsoft.EntityFrameworkCore;

public class DatabaseContext : DbContext
{
    public DbSet<RestaurantModel> Restaurants { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
}