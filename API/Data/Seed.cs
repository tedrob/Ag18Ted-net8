using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        var roles = new List<AppRole>
        {
            new() {Name = "Member"},
            new() {Name = "Admin"},
            new() {Name = "Moderator"},
            new() {Name = "Helper"},
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        foreach (var user in users)
        {
            user.UserName = user.UserName!.ToLower();
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }
        
        var admin = new AppUser
        {
            UserName = "admin",
            KnownAs = "Admin",
            Gender = "",
            City = "",
            Country = "",
        };

        var helper = new AppUser
        {
            UserName = "helper",
            KnownAs = "Helper",
            Gender = "",
            City = "",
            Country = "",
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, ["Admin", "Moderator"]);
        await userManager.CreateAsync(helper, "Pa$$w0rdH");
        await userManager.AddToRolesAsync(helper, ["Helper", "Moderator"]);
        


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