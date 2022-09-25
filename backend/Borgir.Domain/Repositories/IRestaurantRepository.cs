using Borgir.Domain.Entities;

namespace Borgir.Domain.Repositories;


public interface IRestaurantRepository
{
    Task<List<Restaurant>> ListAsync();
}
