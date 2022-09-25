using Borgir.Application.Services.Restaurant;
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
    public async Task<ActionResult<RestaurantsResult>> ListAsync([FromQuery(Name = "search")] string? search)
    {
        var restaurantsResult = await _restaurantService.ListAsync(search);
        return Ok(restaurantsResult);
    }
}