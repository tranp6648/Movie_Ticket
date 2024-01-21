using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public MovieController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("add")]
        public IActionResult AddMovie([FromBody] AddMovie addMovie)
        {
            if (addMovie == null)
            {
                return BadRequest("Invalid movie data");
            }

            // You can add additional validation logic here before adding the movie.

            // Assuming you have a method or a library to map properties from AddMovie to Movie
            Movie movieToAdd = MapAddMovieToMovie(addMovie);

            try
            {
                _dbContext.Movies.Add(movieToAdd);
                _dbContext.SaveChanges();

                // You might want to return the added movie or a success message.
                return Ok("Movie added successfully");
            }
            catch (DbUpdateException ex)
            {
                // Log the exception or handle it appropriately
                return BadRequest($"Error adding movie: {ex.Message}");
            }
        }

        // Example method for mapping properties from AddMovie to Movie
        private Movie MapAddMovieToMovie(AddMovie addMovie)
        {
            return new Movie
            {
                
                Title = addMovie.Title,
                Description = addMovie.Description,
                ReleaseDate = addMovie.ReleaseDate,
                Duration = addMovie.Duration,
                IdGenre = addMovie.IdGenre
                // Map other properties as needed
            };
        }

        [HttpGet("GetGender")]
        public async Task<ActionResult<IEnumerable<Genre>>> Getgenre()
        {
            try
            {
                var genres = await _dbContext.Genres.ToListAsync();
                var genreNames = genres.Select(x => new Genre { Id = x.Id, Name = x.Name }).ToList();

                return Ok(genreNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
