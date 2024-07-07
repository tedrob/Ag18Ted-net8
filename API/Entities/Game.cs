using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Games")]
public class Game
{
    public int Id { get; set; }
    public required string gameName { get; set; }

    // Navigation properties
    public int AppLotteryId { get; set; }
    public AppLottery AppLottery { get; set; } = null!;
}