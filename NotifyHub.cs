using Microsoft.AspNetCore.SignalR;

public class NotifyHub : Hub
{
    public Task SendMessage(string user, string message)
    {
        return Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}