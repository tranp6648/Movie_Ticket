using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;


namespace WebApplication3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenreController : Controller
    {
        private readonly DatabaseContext _dbContext;
        private readonly GenreServicecs genreServicecs;
        public GenreController(DatabaseContext dbContext,GenreServicecs genreServicecs)
        {
            _dbContext = dbContext;
            this.genreServicecs = genreServicecs;
        }
        [HttpPost("DeleteGender/{id}")]
        public IActionResult DeleteGender(int id)
        {
            
            if (_dbContext.Movies.Any(a => a.IdGenre == id))
            {
                return BadRequest(new { message = "Can not Delete" });
            }
            try
            {
                return Ok(new
                {
                    result = genreServicecs.DeleteGende(id)
                });
            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("updateGender/{id}")]
        public IActionResult UpdateGenre(int id, [FromBody] Genre genre)
        {
            try
            {
                
                if (_dbContext.Genres.Any(g => g.Name == genre.Name ))
                {
                    return BadRequest(new { message = "Genre name already exists" });
                }
                
                return Ok(new
                {
                    result=genreServicecs.UpdateGenre(id,genre)
                });
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("getGenerate")]
        public IActionResult GetGenres()
        {
            try
            {
              
                return Ok(genreServicecs.getGenerate());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult AddGenre([FromBody] Genre genreToAdd)
        {
            try
            {
              
                if(_dbContext.Genres.Any(a=>a.Name==genreToAdd.Name)) {
                    return BadRequest(new { message = "Genre already exists" });
                }
               
                return Ok(new
                {
                    result=genreServicecs.AddGenre(genreToAdd)
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
