using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class PlayersController(IUnitOfWork unitOfWork) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayers()
    {
        var players = await unitOfWork.PlayerRepository.GetPlayersAsync();

        return Ok(players);
    }

    [HttpGet("{playername}")] // /api/players/3
    public async Task<ActionResult<PlayerDto>> GetPlayers(string playername)
    {
        var player = await unitOfWork.PlayerRepository.GetPlayerAsync(playername);

        if (player == null) return NotFound();

        return player;
    }
}