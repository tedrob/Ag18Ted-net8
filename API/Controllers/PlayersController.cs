using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PlayersController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppPlayer>>> GetPlayers()
    {
        var players = await context.Players.ToListAsync();

        return players;
    }

    [HttpGet("{id:int}")] // /api/users/3
    public async Task<ActionResult<AppPlayer>> GetPlayers(int id)
    {
        var player = await context.Players.FindAsync(id);

        if (player == null) return NotFound();

        return player;
    }
}