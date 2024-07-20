using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class LotteriesController(ILotteryRepository lotteryRepository) : BaseApiController
{    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LotteryDto>>> GetLotteriesAsync()
    {
        var lotteries = await lotteryRepository.GetLotteriesAsync();

        return Ok(lotteries);
    }

    [HttpGet("{lotteryname}")] // /api/lotteries/3
    public async Task<ActionResult<LotteryDto>> Getlotteries(string lotteryname)
    {
        var lottery = await lotteryRepository.GetLotteryAsync(lotteryname);

        if (lottery == null) return NotFound();

        return lottery;
    }    
}