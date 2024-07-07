namespace API.DTOs;

public class PlayerDto
{
    public int Id { get; set; }
    public string? Playername { get; set; } 
    public string? Description { get; set; }
    public DateTime Created { get; set; }
}