namespace Borgir.Application.Services.Restaurant;

public interface IRestaurantService
{
    Task<RestaurantsResult> ListAsync();
}