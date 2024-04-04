using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
       
        private readonly DatabaseContext _dbContext;
        private ActorService actorService;

        public ActorController(DatabaseContext dbContext,ActorService actorService)
        {
            _dbContext = dbContext;
          
            this.actorService=actorService;
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

                return Ok(new
                {
                    result = actorService.DeleteActor(id)
                });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine($"Error deleting actor: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        } 
       
        [HttpGet("GetMovie")]
        public IActionResult GetMovie()
        {
            try
            {
           

                return Ok(actorService.GetMovie());
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

                return Ok(new
                {
                    result = actorService.UpdateActor(updateactor, id)
                }); ;
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
           
        }
        [HttpGet("DetailActorMovie/{id}")]
        public IActionResult ShowActor(int id)
        {
            try
            {
                

                return Ok(actorService.DetailActorMovie(id));
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("ShowMovie/{id}")]
        public IActionResult ShowMovie(int id)
        {
            try
            {
               
                return Ok(actorService.ShowMovie(id));
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("DetailActor/{id}")]
        public IActionResult DetailActor(int id)
        {
            try
            {
               
                return Ok(actorService.DetailActor(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ShowActor")]
        public IActionResult GetActor()
        {
            try
            {
               
                return Ok(actorService.ShowActor());
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
               
                if(_dbContext.DetailActorMovies.Any(a => a.IdActor == addactorMovie.IdActor && a.IdMovie ==addactorMovie.IdMovie))
                {
                    return BadRequest(new { message = "This actor added in this movie" });
                }
                
                return Ok(new
                {
                    result=actorService.AddMovie(addactorMovie)
                });
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
              

                if (_dbContext.Actors.Any(a => a.Name == addActor.Name))
                {
                    return BadRequest(new { message = "Name Actor already exists" });
                }

                return Ok(new
                {
                    result = actorService.AddActor(addActor)
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
    }
}
