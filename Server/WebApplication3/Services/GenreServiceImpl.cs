using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class GenreServiceImpl : GenreServicecs
    {
        private readonly DatabaseContext _databaseContext;
        public GenreServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public bool AddGenre(Genre genreToAdd)
        {
            try
            {
                if (genreToAdd == null)
                {
                    return false;
                }

                var genereEntity = new Genre
                {
                    Name = genreToAdd.Name,
                };
                _databaseContext.Genres.Add(genereEntity);
                return _databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteGende(int id)
        {
            try
            {
                var gender =_databaseContext.Genres.Find(id);
                if(gender== null)
                {
                    return false;
                }
                _databaseContext.Genres.Remove(gender);
                return _databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic getGenerate()
        {
            var genres = _databaseContext.Genres.ToList();

            return  genres.Select(x => new Genre { Id = x.Id, Name = x.Name }).ToList();
        }

        public bool UpdateGenre(int id, Genre genre)
        {
            try
            {
                if (genre == null)
                {
                    return false;
                }
                var existingGenre =  _databaseContext.Genres.Find(id);
                if (existingGenre == null)
                {
                    return false;
                }
                existingGenre.Name = genre.Name;
                return _databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
