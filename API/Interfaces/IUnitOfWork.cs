namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository {get;}
    IMessageRepository MessageRepository {get;}
    ILikesRepository LikesRepository {get;}
    IPlayerRepository PlayerRepository {get;}
    ILotteryRepository LotteryRepository {get;}
    Task<bool> Complete();
    bool HasChanges();
}