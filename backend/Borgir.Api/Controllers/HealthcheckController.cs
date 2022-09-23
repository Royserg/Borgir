using Microsoft.AspNetCore.Mvc;

namespace Borgir.Api.Controllers;

[ApiController]
[Route("hp")]
public class HealthcheckController : ControllerBase
{
    [HttpGet(Name = "GetHealthcheck")]
    public IActionResult Get()
    {
        return Ok();
    }
}