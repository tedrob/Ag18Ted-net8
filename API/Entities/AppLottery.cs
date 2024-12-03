using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace API.Entities;

[Table("Lotteries")]
public class AppLottery
{
    public int Id { get; set; }
    public required string Lotteryname { get; set; }
    public required string State { get; set; }    
    public List<MatchingNumber> NumbersPick { get; set; } = [];
    public DateTime Created { get; set; } = DateTime.UtcNow;
}
