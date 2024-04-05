using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly CinemaService _cinemaService;
        public CinemaController(DatabaseContext dbContext,CinemaService cinemaService)
        {
            _dbContext = dbContext;
            _cinemaService= cinemaService;
        }
        [HttpPost("Delete/{id}")]
        public IActionResult DeleteCinema(int id)
        {
            try
            {
                
                return Ok(new
                {
                    result=_cinemaService.Delete(id)
                });
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPost("update/{id}")]
        public IActionResult UpdateCinema(int id, [FromBody] updateCinema addCinema)
        {
            
            if (_dbContext.Cinemas.Any(a => a.Name == addCinema.Name && a.Id !=id))
            {
                return BadRequest(new { message = "Name Cinema already exists" });
            }
            
            try
            {
                return Ok(new
                {
                    result = _cinemaService.UpdateCinema(id, addCinema)
                });
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Internal server error");
            }
            
        }
        [HttpGet("getCinema")]
        public IActionResult getCinema()
        {
            try
            {
               
                return Ok(_cinemaService.getCinema());
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("AddCinema")]
        public IActionResult AddCinema([FromBody] AddCinema cinema)
        {
          
            if (_dbContext.Cinemas.Any(a => a.Name == cinema.Name))
            {
                return BadRequest(new { message = "Name Cinema already exists" });
            }
      
            try
            {
                
                 return Ok(new
                 {
                     result=_cinemaService.AddCinema(cinema)
                 });

            }
            catch (Exception ex)
            {
              
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("getBranches")]
        public IActionResult getBranchers()
        {
            try
            {
              
                return Ok(_cinemaService.getBranches());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
