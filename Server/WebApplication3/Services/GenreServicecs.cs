using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface GenreServicecs
    {
        public bool DeleteGende(int id);
        public bool UpdateGenre(int id,Genre genre);
        public dynamic getGenerate();
        public bool AddGenre(Genre genreToAdd);
    }
}
