using Borgir.Application.Services.Restaurant;
using Microsoft.Extensions.DependencyInjection;

namespace Borgir.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IRestaurantService, RestaurantService>();
        return services;
    }
}