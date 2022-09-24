using Borgir.Application.Services.Restaurant;
using Borgir.Infrastructure.EF.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace Borgir.Api.Controllers;

[ApiController]
[Route("restaurants")]
public class RestaurantController : ControllerBase
{
    private readonly IRestaurantService _restaurantService;

    public RestaurantController(IRestaurantService restaurantService)
    {
        _restaurantService = restaurantService;
    }

    [HttpGet]
    public async Task<ActionResult<RestaurantsResult>> GetAsync()
    {
        var restaurantsResult = await _restaurantService.ListAsync();
        return Ok(restaurantsResult);
    }
}