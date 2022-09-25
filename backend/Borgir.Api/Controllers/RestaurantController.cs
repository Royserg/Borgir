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
    public async Task<ActionResult<RestaurantsResult>> List([FromQuery(Name = "search")] string? search)
    {
        var restaurantsResult = await _restaurantService.ListAsync(search);
        return Ok(restaurantsResult);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RestaurantResult>> GetById(Guid id)
    {
        var restaurantResult = await _restaurantService.GetAsync(id);
        if (restaurantResult.data == null)
        {
            return NotFound();
        }

        return Ok(restaurantResult);
    }
}