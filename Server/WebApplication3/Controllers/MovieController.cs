using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private IWebHostEnvironment _webHostEnvironment;
        private readonly DatabaseContext _dbContext;
        public MovieController(DatabaseContext dbContext, IWebHostEnvironment _hostEnvironment)
        {
            _dbContext = dbContext;
            _webHostEnvironment = _hostEnvironment;
        }
        private string SavePictureToFolder(string pictureBase64, int movieid, string webRootBath)
        {
            // Check for Data URL prefix and remove it
            if (pictureBase64.StartsWith("data:image"))
            {
                pictureBase64 = pictureBase64.Split(',')[1];
            }

            // Ensure correct padding
            pictureBase64 = pictureBase64.PadRight((pictureBase64.Length + 3) & ~3, '=');

            try
            {
                byte[] pictureBytes = Convert.FromBase64String(pictureBase64);
                string folderPath = Path.Combine(webRootBath, "image");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string filename = $"movie_{movieid}_picture.png";
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine("image", filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
            }
        }
        [HttpPost("update/{id}")]
        public IActionResult UpdateMovie(int id, [FromBody] updateMovie addMovie)
        {
            if (addMovie == null)
            {
                return BadRequest("Invalid movie data");
            }
            if (_dbContext.Movies.Any(a => a.Title == addMovie.Title))
            {
                return BadRequest(new { message = "Tittle already exists" });
            }
            var existMovie = _dbContext.Movies.Find(id);
            if (existMovie == null)
            {
                return NotFound("Movie not found");
            }

            existMovie.Title = addMovie.Title;
            existMovie.Description = addMovie.Description;
            existMovie.ReleaseDate = addMovie.ReleaseDate;
            existMovie.Duration = addMovie.Duration;
            existMovie.IdGenre = addMovie.IdGenre;
            existMovie.Director = addMovie.Director;
           
            try
            {
                _dbContext.SaveChanges();
                return Ok("Movie Update successfully");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Internal server error");
            }



        }
        [HttpPost("delete/{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var showtime = _dbContext.Showtimes.FirstOrDefault(cm => cm.IdMovie == id);
            var categoryMovie = _dbContext.DetailCategoryMovies.FirstOrDefault(cm => cm.IdMovie == id);
            var detailActor = _dbContext.DetailActorMovies.FirstOrDefault(cm => cm.IdMovie == id);
            var Movie = _dbContext.Movies.Find(id);
            if (Movie == null)
            {
                return NotFound("Movie not found");
            }
            try
            {
                if (categoryMovie != null)
                {
                    _dbContext.DetailCategoryMovies.Remove(categoryMovie);
                }
                if(detailActor != null)
                {
                    return BadRequest(new { message = "Movie Delete Failed" });
                }
                if(showtime != null)
                {
                    return BadRequest(new { message = "Movie Delete Failed" });
                }
                _dbContext.Movies.Remove(Movie);
                _dbContext.SaveChanges();
                DeletePictureFromFolder(id, _webHostEnvironment.WebRootPath);
                DeleteMovie(id, _webHostEnvironment.WebRootPath);
                return Ok("Movie deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }
        private void DeleteMovie(int movieID,string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "videos", $"movie_{movieID}_picture.mp4");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        private void DeletePictureFromFolder(int movieID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"movie_{movieID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        [HttpPost("add")]
        public IActionResult AddMovie([FromBody] AddMovie addMovie)
        {
            if (addMovie == null)
            {
                return BadRequest("Invalid movie data");
            }
            if (_dbContext.Movies.Any(a => a.Title == addMovie.Title))
            {
                return BadRequest(new { message = "Tittle already exists" });
            }

            // You can add additional validation logic here before adding the movie.

            // Assuming you have a method or a library to map properties from AddMovie to Movie
            Movie movieToAdd = MapAddMovieToMovie(addMovie);

            try
            {
                _dbContext.Movies.Add(movieToAdd);
                _dbContext.SaveChanges();
                int movieId = movieToAdd.Id;
                string imagePath = SavePictureToFolder(addMovie.Picture, movieId, _webHostEnvironment.WebRootPath);
                string trailerPath = SaveVideoToFolder(addMovie.Trailer, movieId, _webHostEnvironment.WebRootPath);
                DetailCategoryMovie detailCategoryMovie = new DetailCategoryMovie
                {
                    IdMovie = movieId,
                    IdCategory = addMovie.idcategory,
                    Picture = imagePath,
                    Trailer = trailerPath,

                };
                _dbContext.DetailCategoryMovies.Add(detailCategoryMovie);
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
        private string SaveVideoToFolder(string base64String, int movieId, string webrootpath)
        {
            if (base64String.StartsWith("data:video"))
            {
                base64String = base64String.Split(',')[1];
            }

            // Ensure correct padding
            base64String = base64String.PadRight((base64String.Length + 3) & ~3, '=');

            try
            {
                byte[] pictureBytes = Convert.FromBase64String(base64String);
                string folderPath = Path.Combine(webrootpath, "videos");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string filename = $"movie_{movieId}_picture.mp4";
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine("videos", filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
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
                IdGenre = addMovie.IdGenre,
                Director=addMovie.Director
                // Map other properties as needed
            };
        }
        [HttpGet("getMovie")]
        public async Task<ActionResult<IEnumerable<Movie>>> getMovie()
        {
            try
            {
                var movies = await _dbContext.Movies
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
          description=m.Description,
          idgenre = m.IdGenreNavigation.Id,
          GenreName = m.IdGenreNavigation.Name,
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
        [HttpGet("getCategory")]
        public async Task<ActionResult<IEnumerable<CategoryMovie>>> getCategory()
        {
            try
            {
                var categoryMovies = await _dbContext.CategoryMovies
             .Select(x => new CategoryMovie { Id = x.Id, Name = x.Name })
             .ToListAsync();

                return Ok(categoryMovies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
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
