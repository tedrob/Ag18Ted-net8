using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ILotteryRepository
{
    void Update(AppLottery lottery);
    Task<bool> SaveAllAsync();
    Task<AppLottery?> GetLotteryByIdAsync(int id);
    Task<AppLottery?> GetLotteryByLotterynameAsync(string lotteryname);
    Task<IEnumerable<LotteryDto?>> GetLotteriesAsync();
    Task<LotteryDto?> GetLotteryAsync(string lotteryname);

}