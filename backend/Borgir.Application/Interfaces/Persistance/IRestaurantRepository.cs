using System.Runtime.InteropServices;
using Borgir.Domain.Entities;

namespace Borgir.Application.Interfaces.Persistance;

public interface IRestaurantRepository
{
    Task<List<Restaurant>> ListAsync([Optional] string search);
}