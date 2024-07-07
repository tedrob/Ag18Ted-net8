using API.Entities;

namespace API.Interfaces;

public interface ILotteryRepository
{
    void Update(AppLottery user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppLottery>> GetLotteryAsync();
    Task<AppLottery?> GetLotteryByIdAsync(int id);
    Task<AppLottery?> GetLotteryByLotterynameAsync(string lotteryname);

}