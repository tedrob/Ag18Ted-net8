using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PlayerRepository(DataContext context, IMapper mapper) : IPlayerRepository
{
    public async Task<AppPlayer?> GetPlayerByIdAsync(int id)
    {
        return await context.Players.FindAsync(id);
    }

    public async Task<AppPlayer?> GetPlayerByPlayernameAsync(string playername)
    {
        return await context.Players.SingleOrDefaultAsync(x => x.PlayerName == playername);
    }

    public async Task<IEnumerable<AppPlayer>> GetPlayersAsync()
    {
        return await context.Players.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppPlayer player)
    {
        context.Entry(player).State = EntityState.Modified;
    }
}