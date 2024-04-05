using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailMovieController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly DetailMovieService detailMovieService;
        public DetailMovieController(DatabaseContext dbContext,DetailMovieService detailMovieService)
        {
            _dbContext = dbContext;
            this.detailMovieService=detailMovieService;
        }
        [HttpGet("ShowMostMovie")]
        public IActionResult ShowMostMovie()
        {
            try
            {
                
                return Ok(detailMovieService.ShowMostMovie());
            }catch(Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("ShowDetail/{ID}")]
        public IActionResult GetDetail(int ID)
        {
            try
            {
                return Ok(detailMovieService.ShowDetail(ID));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
