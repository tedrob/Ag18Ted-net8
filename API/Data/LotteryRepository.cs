using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class LotteryRepository(DataContext context) : ILotteryRepository
{
    public async Task<IEnumerable<AppLottery>> GetLotteryAsync()
    {
        return await context.Lotteries.ToListAsync();
    }

    public async Task<AppLottery?> GetLotteryByIdAsync(int id)
    {
        return await context.Lotteries.FindAsync(id);
    }

    public async Task<AppLottery?> GetLotteryByLotterynameAsync(string lotteryname)
    {
        return await context.Lotteries.SingleOrDefaultAsync(x => x.LotteryName == lotteryname);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppLottery lottery)
    {
        context.Entry(lottery).State = EntityState.Modified;
    }
}