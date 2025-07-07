using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

[Authorize]
public class PresenceHub(PresenceTracker tracker) : Hub
{
    public override async Task OnConnectedAsync()
    {
        await tracker.UserConnected(GetUserId(), Context.ConnectionId);
        await Clients.Others.SendAsync("UserOnline", GetUserId());

        var currentUsers = await tracker.GetOnlineUsers();
        await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await tracker.UserDisconnected(GetUserId(), Context.ConnectionId);
        await Clients.Others.SendAsync("UserOffline", GetUserId());

        var currentUsers = await tracker.GetOnlineUsers();
        await Clients.All.SendAsync("GetOnlineUsers", currentUsers);

        await base.OnDisconnectedAsync(exception);
    }

    private string GetUserId()
    {
        return Context.User?.GetUsername() ?? throw new Exception("Cannot get member id");
    }
}