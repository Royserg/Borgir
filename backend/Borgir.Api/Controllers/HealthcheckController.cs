using Microsoft.AspNetCore.Mvc;

namespace Borgir.Api.Controllers;

[ApiController]
[Route("hp")]
public class HealthcheckController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok();
    }
}