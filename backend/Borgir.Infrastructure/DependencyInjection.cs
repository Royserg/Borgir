using Borgir.Application.Interfaces.Persistance;
using Borgir.Infrastructure.EF.Contexts;
using Borgir.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Borgir.Infrastructure;
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IRestaurantRepository, RestaurantRepository>();
        services.AddScoped<DatabaseContextInitializer>();

        return services;
    }
}