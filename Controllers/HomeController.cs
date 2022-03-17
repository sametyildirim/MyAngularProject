using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Text;

namespace MyAngularProject.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{

    private readonly ILogger<HomeController> _logger;
    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var myUser = this.User;
        return Ok(new HomeResponse { Message="Welcome "+ myUser.Identity.Name });

    }
}
 public class HomeResponse
    {
        public string Message { get; set; }
    }
    
