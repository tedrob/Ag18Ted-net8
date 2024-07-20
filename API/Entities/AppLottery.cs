using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Lotteries")]
public class AppLottery
{
    public int Id { get; set; }
    public required string LotteryName { get; set; }
    public required string State { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public List<MatchingNumber> C{ get; set; } = [];
}
