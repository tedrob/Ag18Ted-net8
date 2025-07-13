using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Players")]
public class AppPlayer
{
    public int Id { get; set; }
    public required string PlayerName { get; set; } 
    public required string Description { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
}
