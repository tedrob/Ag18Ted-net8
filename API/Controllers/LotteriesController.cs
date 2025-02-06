using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class LotteriesController(IUnitOfWork unitOfWork) : BaseApiController
{    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LotteryDto>>> GetLotteriesAsync()
    {
        var lotteries = await unitOfWork.LotteryRepository.GetLotteriesAsync();

        return Ok(lotteries);
    }

    [HttpGet("{lotteryname}")] // /api/lotteries/3
    public async Task<ActionResult<LotteryDto>> Getlotteries(string lotteryname)
    {
        var lottery = await unitOfWork.LotteryRepository.GetLotteryAsync(lotteryname);

        if (lottery == null) return NotFound();

        return lottery;
    }    
}