using System.Runtime.InteropServices;

namespace Borgir.Application.Services.Restaurant;

public interface IRestaurantService
{
    Task<RestaurantsResult> ListAsync([Optional] string search);
    Task<RestaurantResult> GetAsync(Guid id);
}