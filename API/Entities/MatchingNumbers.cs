using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;
[Table("MatchingNumbers")]
public class MatchingNumber
{
    public int Id { get; set; }
    public string? Numbers { get; set; }

    // Navigation properties
    public int AppLotteryId   { get; set; }
    public AppLottery AppLottery { get; set; } = null!;
    
    
}