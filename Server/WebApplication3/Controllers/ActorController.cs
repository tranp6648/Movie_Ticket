using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private IWebHostEnvironment _webHostEnvironment;
        private readonly DatabaseContext _dbContext;

        public ActorController(DatabaseContext dbContext, IWebHostEnvironment _hostEnvironment)
        {
            _dbContext = dbContext;
            _webHostEnvironment = _hostEnvironment;
        }
        private void DeletePictureFromFolder(int ID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"Actor_{ID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        [HttpPost("delete/{id}")]
        public IActionResult DeleteActor(int id)
        {
            try
            {
                if (_dbContext.DetailActorMovies.Any(x => x.IdActor == id))
                {
                    return BadRequest(new { message = "Actor Delete Failed. Actor is associated with movies." });
                }

                var actor = _dbContext.Actors.Find(id);

                if (actor == null)
                {
                    return NotFound("Actor not found");
                }

                _dbContext.Actors.Remove(actor);
                _dbContext.SaveChanges();
                DeletePictureFromFolder(id, _webHostEnvironment.WebRootPath);

                return Ok("Actor deleted successfully");
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error deleting actor: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
        private string SavePictureToFolder(string pictureBase64, string webRootBath, int id)
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

                string filename = $"Actor_{id}_picture.png";
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
       
        [HttpGet("GetMovie")]
        public async Task<ActionResult<IEnumerable<Actor>>> GetMovie()
        {
            try
            {
                var actor = await _dbContext.Movies.ToListAsync();
                var genreNames = actor.Select(x => new Genre { Id = x.Id, Name = x.Title }).ToList();

                return Ok(genreNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("update/{id}")]
        public IActionResult UpdateActor(int id, [FromBody] updateActor updateactor)
        {
            try
            {
                if (updateactor == null)
                {
                    return BadRequest("Invalid actor data");
                }
                if (_dbContext.Actors.Any(x => x.Name == updateactor.Name && x.Id != id))
                {

                    return BadRequest(new { message = "Actor already exists" });
                }
                var existActor = _dbContext.Actors.Find(id);
                if (existActor == null)
                {
                    return NotFound("Actor not found");
                }
                existActor.Name = updateactor.Name;
                existActor.Nationality = updateactor.Nationality;
                existActor.Birthday = updateactor.Birthday;
                _dbContext.SaveChanges();
                return Ok("Actor Update successfully");
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
           
        }
        [HttpGet("DetailActorMovie/{id}")]
        public async Task<ActionResult<IEnumerable<Actor>>> ShowActor(int id)
        {
            try
            {
                var actors = await _dbContext.Actors
                    .Include(m => m.DetailActorMovies)
                    .ThenInclude(d => d.IdActorNavigation)
                    .Where(a => a.DetailActorMovies.Any(d => d.IdMovieNavigation.Id == id))
                    .Select(m => new 
                    {
                        Name = m.Name,
                        Image = m.Image,
                        DetailActor=m.DetailActorMovies.Select(d => new
                        {
                            Role = d.Role,
                        }),
                    })
                    .ToListAsync();

                return Ok(actors);
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("ShowMovie/{id}")]
        public async Task<ActionResult<IEnumerable<Movie>>> ShowMovie(int id)
        {
            try
            {
                var actor = await _dbContext.Movies.Include(m => m.DetailCategoryMovies).ThenInclude(d => d.IdCategoryNavigation).Include(m => m.DetailActorMovies).ThenInclude(d => d.IdActorNavigation).Where(a => a.DetailActorMovies.Any(d => d.IdActor == id)).Select(m => new
                {
                    ID=m.Id,
                    Title = m.Title,
                    duration = m.Duration,
                    GenreName = m.IdGenreNavigation.Name,
                    DetailCategoryMovies = m.DetailCategoryMovies.Select(d => new
                    {
                        Picture = d.Picture,
                    }),
                }).ToArrayAsync();
                return Ok(actor);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("DetailActor/{id}")]
        public async Task<ActionResult<IEnumerable<Actor>>> DetailActor(int id)
        {
            try
            {
                var actor = await _dbContext.Actors.Where(m=>m.Id==id).Include(m => m.DetailActorMovies).ThenInclude(d => d.IdMovieNavigation).Select(m => new
                {
                    id = m.Id,
                    name = m.Name,
                    image = m.Image,
                    Nationally = m.Nationality,
                    Birthday = m.Birthday,
                    bio = m.Bio,
                    DetailActorMovie = m.DetailActorMovies.Select(d => new
                    {
                        Id = d.Id,
                        IDMovieNavigation = new
                        {
                            Name = d.IdMovieNavigation.Title,
                            GenreName=d.IdMovieNavigation.IdGenreNavigation.Name,
                            duration=d.IdMovieNavigation.Duration,
                            DetailMovieCategory = d.IdMovieNavigation.DetailCategoryMovies.Select(p => new
                            {
                                picture=p.Picture,
                            })
                        }
                    })
                }).ToListAsync();
                return Ok(actor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ShowActor")]
        public async Task<ActionResult<IEnumerable<Actor>>> GetActor()
        {
            try
            {
                var actor = await _dbContext.Actors.Include(m => m.DetailActorMovies).ThenInclude(d => d.IdMovieNavigation).Select(m => new
                {
                    id=m.Id,
                    name=m.Name,
                    image=m.Image,
                    Nationally=m.Nationality,
                    Birthday=m.Birthday,
                    bio=m.Bio,
                    DetailActorMovie = m.DetailActorMovies.Select(d => new
                    {
                        Id = d.Id,
                        IDMovieNavigation=new
                        {
                            Name=d.IdMovieNavigation.Title
                        }
                    })
                }).ToListAsync();
                return Ok(actor);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody]AddActorMovie addactorMovie)
        {
            try
            {
                if (addactorMovie == null)
                {
                    return BadRequest("Invalid Actor data");

                }
                if(_dbContext.DetailActorMovies.Any(a => a.IdActor == addactorMovie.IdActor && a.IdMovie ==addactorMovie.IdMovie))
                {
                    return BadRequest(new { message = "This actor added in this movie" });
                }
                var ActorDetailMovie = new DetailActorMovie
                {
                    IdActor = addactorMovie.IdActor,
                    IdMovie = addactorMovie.IdMovie,
                    Role = addactorMovie.Role
                };
                _dbContext.DetailActorMovies.Add(ActorDetailMovie);
                _dbContext.SaveChanges();
                return Ok("Actor added in Movie successfully");
            }
            catch(Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");

            }
        }
        [HttpPost("Add")]
        public IActionResult AddActor([FromBody] AddActor addActor)
        {
            try
            {
                if (addActor == null)
                {
                    return BadRequest("Invalid Actor data");
                }

                if (_dbContext.Actors.Any(a => a.Name == addActor.Name))
                {
                    return BadRequest(new { message = "Name Actor already exists" });
                }
              
                var ActorEntity = new Actor
                {
                    Name = addActor.Name,
                    Image= $"Actor_{addActor.Name}_picture.png",
                    Nationality = addActor.Nationality,
                    Birthday = addActor.Birthday,
                    Bio = addActor.Bio,
                };
                
                // Save the image after creating ActorEntity


                _dbContext.Actors.Add(ActorEntity);
                 _dbContext.SaveChanges();
                string picture = SavePictureToFolder(addActor.Image,  _webHostEnvironment.WebRootPath, ActorEntity.Id);
                if (picture == null)
                {
                    return BadRequest("Error saving actor image");
                }

                // Update the Image property with the saved image path
                ActorEntity.Image = picture;
                _dbContext.SaveChanges();
                return Ok("Actor added successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
    }
}
