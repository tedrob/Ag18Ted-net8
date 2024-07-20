namespace API.DTOs;

public class LotteryDto
{
    public int Id { get; set; }
    public string? Lotteryname { get; set; }
    public string? State { get; set; }
    public DateTime Created { get; set; }
}