using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private IWebHostEnvironment _webHostEnvironment;
        private readonly MovieService movieService;
        private readonly DatabaseContext _dbContext;
        public MovieController(DatabaseContext dbContext, IWebHostEnvironment _hostEnvironment,MovieService movieService)
        {
            _dbContext = dbContext;
            this.movieService = movieService;
            _webHostEnvironment = _hostEnvironment;
        }
     
        [HttpPost("update/{id}")]
        public IActionResult UpdateMovie(int id, [FromBody] updateMovie addMovie)
        {
            
            if (_dbContext.Movies.Any(a => a.Title == addMovie.Title && a.Id != id))
            {
                return BadRequest(new { message = "Tittle already exists" });
            }

            try
            {
                
                return Ok(new
                {
                    result=movieService.UpdateMovie(id,addMovie)
                });
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Internal server error");
            }



        }
        [HttpPost("delete/{id}")]
        public IActionResult DeleteMovie(int id)
        {
            
            try
            {
                
                return Ok(new
                {
                    result=movieService.DeleteMovie(id)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }
       
        [HttpPost("add")]
        public IActionResult AddMovie([FromBody] AddMovie addMovie)
        {
            if (_dbContext.Movies.Any(a => a.Title == addMovie.Title))
            {
                return BadRequest(new { message = "Tittle already exists" });
            }

         

            try
            {
                
                return Ok(new
                {
                    result=movieService.AddMovie(addMovie)
                });
            }
            catch (DbUpdateException ex)
            {
                // Log the exception or handle it appropriately
                return BadRequest($"Error adding movie: {ex.Message}");
            }
        }
        
       
        [HttpGet("Orderdesc")]
        public IActionResult OrderDesc()
        {
            try
            {

                return Ok(movieService.Orderdesc());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("CountShowtime")]
        public IActionResult CountShowtime()
        {
            try
            {
               
                return Ok(movieService.CountShowtime());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("CountOrder")]
        public IActionResult CountOrder()
        {
            try
            {
                return Ok(new
                {
                    result=movieService.CountOrder()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("CountGenre")]
        public IActionResult CountGenre()
        {
            try
            {
                
                return Ok(movieService.CountGenre());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("CountEvent")]
        public IActionResult CountEvent()
        {
            try
            {
               
                return Ok(movieService.CountEvent());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("countUser")]
        public IActionResult CountAccount()
        {
            try
            {
               
                return Ok(movieService.CountAccount());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("CountActor")]
        public IActionResult CountActor()
        {
            try
            {
               
                return Ok(movieService.CountActor()
                    );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("CountCategoryMovie")]
        public IActionResult CountCategoryMovie()
        {
            try
            {
               
                return Ok(movieService.CountCategoryMovie());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("CountMovie")]
        public IActionResult CountMovie()
        {
            try
            {
               
                return Ok(movieService.CountMovie());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("UserVoucher")]
        public async Task<ActionResult<IEnumerable<Voucher>>> ShowVoucher()
        {
            try
            {
                
                return Ok(movieService.UserVoucher());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("ShowMovie")]
        public async Task<ActionResult<IEnumerable<Movie>>> ShowMovie()
        {
            try
            {
                
                return Ok(movieService.ShowMovie());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getMovie")]
        public async Task<ActionResult<IEnumerable<Movie>>> getMovie()
        {
            try
            {
               
                return Ok(movieService.getMovie());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getCategory")]
        public IActionResult getCategory()
        {
            try
            {
               

                return Ok(movieService.getCategory());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("GetGender")]
        public IActionResult Getgenre()
        {
            try
            {
                return Ok(movieService.GetGender());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}