using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface ActorService
    {
        public bool DeleteActor(int id);
        public dynamic GetMovie();
        public bool UpdateActor(updateActor updateActor, int id);
        public dynamic DetailActorMovie(int id);
        public dynamic ShowMovie(int id);
        public dynamic DetailActor(int id);
        public dynamic ShowActor();
        public bool AddMovie(AddActorMovie addActorMovie);
        public bool AddActor(AddActor addActor);
    }
}
