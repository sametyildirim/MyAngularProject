using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace MyAngularProject.Controllers;
[ApiController]
[Route("[controller]")]
public class MessageController : ControllerBase
{

    private readonly ILogger<MessageController> _logger;
    private IHubContext<NotifyHub> _hubContext;

    public MessageController(ILogger<MessageController> logger, IHubContext<NotifyHub> hubContext)
    {
        _logger = logger;
        _hubContext = hubContext;
    }

    [HttpPost]
    public string Post([FromBody] Message msg)
    {
        string retMessage = string.Empty;
        try
        {
            _hubContext.Clients.All.SendAsync(msg.Type, msg.Payload);
            retMessage = "Success";
        }
        catch (Exception e)
        {
            retMessage = e.ToString();
        }
        return retMessage;
    }
}
