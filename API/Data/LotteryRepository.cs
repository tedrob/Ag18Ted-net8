using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class LotteryRepository(DataContext context, IMapper mapper) : ILotteryRepository
{
     public async Task<IEnumerable<LotteryDto?>> GetLotteriesAsync()
    {
        return await context.Lotteries
            .ProjectTo<LotteryDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }
    public async Task<LotteryDto?> GetLotteryAsync(string lotteryname)
    {
        return await context.Lotteries
        .Where(x => x.LotteryName == lotteryname)
            .ProjectTo<LotteryDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<AppLottery?> GetLotteryByIdAsync(int id)
    {
        return await context.Lotteries.FindAsync(id);
    }

    public async Task<AppLottery?> GetLotteryByLotterynameAsync(string lotteryname)
    {
        return await context.Lotteries
            .SingleOrDefaultAsync(x => x.LotteryName == lotteryname);
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