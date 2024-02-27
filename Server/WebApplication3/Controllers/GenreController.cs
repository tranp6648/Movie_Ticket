using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;


namespace WebApplication3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenreController : Controller
    {
        private readonly DatabaseContext _dbContext;
        public GenreController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("DeleteGender/{id}")]
        public async Task<ActionResult<IEnumerable<Genre>>>DeleteGender(int id)
        {
            var gender=await _dbContext.Genres.FindAsync(id);
            if(gender == null)
            {
                return NotFound();
            }
            if (_dbContext.Movies.Any(a => a.IdGenre == id))
            {
                return BadRequest(new { message = "Can not Delete" });
            }
            try
            {
                _dbContext.Genres.Remove(gender);
                await _dbContext.SaveChangesAsync();
                var allGenres = await _dbContext.Genres.ToListAsync();
                return Ok(allGenres);
            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("updateGender/{id}")]
        public async Task<ActionResult<IEnumerable<Genre>>>UpdateGenre(int id, [FromBody] Genre genre)
        {
            try
            {
                if (genre == null)
                {
                    return BadRequest("Invalid data");
                }
                var existingGenre=await _dbContext.Genres.FindAsync(id);
                if (existingGenre == null)
                {
                    return NotFound("Genre not found");
                }
                if (_dbContext.Genres.Any(g => g.Name == genre.Name ))
                {
                    return BadRequest(new { message = "Genre name already exists" });
                }
                existingGenre.Name=genre.Name;
                await _dbContext.SaveChangesAsync();
                var allGenres = await _dbContext.Genres.ToListAsync();
                return Ok(allGenres);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("getGenerate")]
        public async Task<ActionResult<IEnumerable<Genre>>> GetGenres()
        {
            try
            {
               var genres=await _dbContext.Genres.ToListAsync();
                var genreNames=genres.Select(x=>new Genre { Id = x.Id,Name=x.Name }).ToList();

                return Ok(genreNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Genre>>> AddGenre([FromBody] Genre genreToAdd)
        {
            try
            {
                if (genreToAdd == null)
                {
                    return BadRequest("Invalid data");
                }
                if(_dbContext.Genres.Any(a=>a.Name==genreToAdd.Name)) {
                    return BadRequest(new { message = "Genre already exists" });
                }

                var genereEntity = new Genre
                {
                    Name = genreToAdd.Name,
                };
                _dbContext.Genres.Add(genereEntity);
                await _dbContext.SaveChangesAsync();
                var allGenres = await _dbContext.Genres.ToListAsync();
                return Ok(allGenres);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
