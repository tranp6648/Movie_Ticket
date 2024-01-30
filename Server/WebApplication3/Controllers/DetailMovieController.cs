using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailMovieController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public DetailMovieController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("ShowDetail/{ID}")]
        public async Task<ActionResult<IEnumerable<Actor>>> GetDetail(int ID)
        {
            try
            {
                var movies = await _dbContext.Movies.Where(m=>m.Id==ID)
                    .Include(i=>i.DetailActorMovies)
                    .ThenInclude(o=>o.IdActorNavigation)
      .Include(m => m.DetailCategoryMovies)
          .ThenInclude(d => d.IdCategoryNavigation)
      .Select(m => new
      {
          // Specify the properties you want to include in the projection
          id = m.Id,
          Title = m.Title,
          ReleaseDate = m.ReleaseDate,
          duration = m.Duration,
          director = m.Director,
          description = m.Description,
          idgenre = m.IdGenreNavigation.Id,
          GenreName = m.IdGenreNavigation.Name,
          DetailActor=m.DetailActorMovies.Select(p=>new
          {
              Id=p.Id,
              IdActorMovie = new
              {
                  Name=p.IdActorNavigation.Name,
                  Image=p.IdActorNavigation.Image,
              },
              Role=p.Role
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
      .ToListAsync();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
