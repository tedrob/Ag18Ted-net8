using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class PlayersController(IPlayerRepository playerRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayers()
    {
        var players = await playerRepository.GetPlayersAsync();

        return Ok(players);
    }

    [HttpGet("{playername}")] // /api/players/3
    public async Task<ActionResult<PlayerDto>> GetPlayers(string playername)
    {
        var player = await playerRepository.GetPlayerAsync(playername);

        if (player == null) return NotFound();

        return player;
    }
}