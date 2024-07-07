using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PlayersController(IPlayerRepository playerRepository) : BaseApiController
{
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppPlayer>>> GetPlayers()
    {
        var players = await playerRepository.GetPlayersAsync();

        return Ok(players);
    }

    [HttpGet("{playername}")] // /api/users/3
    public async Task<ActionResult<AppPlayer>> GetPlayers(string playername)
    {
        var player = await playerRepository.GetPlayerByPlayernameAsync(playername);

        if (player == null) return NotFound();

        return player;
    }
}