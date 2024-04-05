using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class DetailMovieServiceImpl : DetailMovieService
    {
        private readonly DatabaseContext _databaseContext;
        public DetailMovieServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public dynamic ShowDetail(int id)
        {
            return _databaseContext.Movies.Where(m => m.Id == id).Select(m => new
            {
              
                id = m.Id,
                Title = m.Title,
                ReleaseDate = m.ReleaseDate,
                duration = m.Duration,
                director = m.Director,
                description = m.Description,
                idgenre = m.IdGenreNavigation.Id,
                GenreName = m.IdGenreNavigation.Name,
                DetailActor = m.DetailActorMovies.Select(p => new
                {
                    Id = p.Id,
                    IdActorMovie = new
                    {
                        Name = p.IdActorNavigation.Name,
                        Image = p.IdActorNavigation.Image,
                    },
                    Role = p.Role
                }),
                DetailCategoryMovies = m.DetailCategoryMovies.Select(d => new
                {

                    Id = d.Id,

                    IdCategoryNavigation = new
                    {
                        Name = d.IdCategoryNavigation.Name,


                    },
                    Picture = d.Picture,
                    Trailer = d.Trailer
                }),


            })
      .ToList();
        }

        public dynamic ShowMostMovie()
        {
            return _databaseContext.Movies.Select(m => new
            {
                id = m.Id,
                NameGenre = m.IdGenreNavigation.Name,
                duration = m.Duration,
                Name = m.Title,
                DetailMovie = m.DetailCategoryMovies.Select(p => new
                {
                    Picture = p.Picture,
                })
            }).Take(4).ToList();
        }
    }
}
