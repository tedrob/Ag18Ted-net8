using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }
    public static async Task SeedPlayers(DataContext context)
    {
        if (await context.Players.AnyAsync()) return;

        var playerData = await File.ReadAllTextAsync("Data/PlayerSeedData.json");

        var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

        var players = JsonSerializer.Deserialize<List<AppPlayer>>(playerData, options);

        if (players == null) return;

        foreach (var player in players)
        {
            context.Players.Add(player);
        }

        await context.SaveChangesAsync();
    }
    public static async Task SeedLotteries(DataContext context)
    {
        if (await context.Lotteries.AnyAsync()) return;

        var lotteryData = await File.ReadAllTextAsync("Data/LotterySeedData.json");

        var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

        var lotteries = JsonSerializer.Deserialize<List<AppLottery>>(lotteryData, options);

        if (lotteries == null) return;

        foreach (var lottery in lotteries)
        {
            context.Lotteries.Add(lottery);
        }

        await context.SaveChangesAsync();
    }
}