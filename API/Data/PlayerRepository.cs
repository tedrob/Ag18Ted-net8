using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PlayerRepository(DataContext context, IMapper mapper) : IPlayerRepository
{
    public async Task<IEnumerable<PlayerDto>> GetPlayersAsync()
    {
        return await context.Players
            .ProjectTo<PlayerDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }
    public async Task<PlayerDto?> GetPlayerAsync(string playername)
    {
        return await context.Players
            .Where(x => x.PlayerName == playername)
            .ProjectTo<PlayerDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<AppPlayer?> GetPlayerByIdAsync(int id)
    {
        return await context.Players.FindAsync(id);
    }

    public async Task<AppPlayer?> GetPlayerByPlayernameAsync(string playername)
    {
        return await context.Players
            .SingleOrDefaultAsync(x => x.PlayerName == playername);
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