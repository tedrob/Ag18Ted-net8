using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IPlayerRepository
{
    void Update(AppPlayer player);
    Task<bool> SaveAllAsync();
    Task<AppPlayer?> GetPlayerByIdAsync(int id);
    Task<AppPlayer?> GetPlayerByPlayernameAsync(string playername);
    Task<IEnumerable<PlayerDto>> GetPlayersAsync();
    Task<PlayerDto?> GetPlayerAsync(string playername);

}