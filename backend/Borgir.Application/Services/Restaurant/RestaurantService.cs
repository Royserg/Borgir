using Borgir.Application.Interfaces.Persistance;

namespace Borgir.Application.Services.Restaurant;

public class RestaurantService : IRestaurantService
{

    private readonly IRestaurantRepository _restaurantRepository;

    public RestaurantService(IRestaurantRepository restaurantRepository)
    {
        _restaurantRepository = restaurantRepository;
    }

    public async Task<RestaurantsResult> ListAsync()
    {
        var restaurants = await _restaurantRepository.ListAsync();
        return new RestaurantsResult(restaurants);
    }
}