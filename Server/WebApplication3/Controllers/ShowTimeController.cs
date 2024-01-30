using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowTimeController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public ShowTimeController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("delete/{id}")]
        public IActionResult DeleteShowTime(int id)
        {
            var Showtimes123 = _dbContext.Showtimes.Find(id);
            if (Showtimes123 == null)
            {
                return NotFound("Show time not found");
            }
            _dbContext.Showtimes.Remove(Showtimes123);
            _dbContext.SaveChanges();
            return Ok("Remove successfully");
        }
        [HttpPost("Update/{id}")]
        public IActionResult Update(int id, [FromBody] UpdateShowtime genre)
        {
            try
            {
                var existingGenre =  _dbContext.Showtimes.Find(id);
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(genre.Time, "SE Asia Standard Time");

                // Format the DateTime as a string in Vietnamese datetime format
                string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                if(_dbContext.Showtimes.Any(a => a.Time == vietnamTime))
                {
                    return BadRequest(new { message = "Failed update time" });
                }
                existingGenre.Time =vietnamTime;
                _dbContext.SaveChanges();
                return Ok("Showtime Update successfully");
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ShowShowtime")]
        public async Task<ActionResult<IEnumerable<Showtime>>> getShow()
        {
            try
            {
                var show = await _dbContext.Showtimes.Select(d => new
                {
                    ID=d.Id,
                    Time=d.Time,
                    NameMovie=d.IdMovieNavigation.Title,
                    NameAuthor=d.IdAuditoriumsNavigation.Name,
                    Cinema=d.IdCinemaNavigation.Name,
                    District=d.IdCinemaNavigation.District
                }).ToListAsync();
                return Ok(show);
            }catch(Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
            [HttpPost("add")]
        public IActionResult AddShowtime([FromBody] AddShowtime addshowtime)
        {
            try
            {
                if (addshowtime == null)
                {
                    return BadRequest("Invalid movie data");
                }
                if(_dbContext.Showtimes.Any(a=>a.Time==addshowtime.Time && a.IdAuditoriums==addshowtime.IdAuditoriums && a.IdMovie==addshowtime.IdMovie)) {
                    return BadRequest(new { message = "This branch does not have this cinema" });
                }
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addshowtime.Time, "SE Asia Standard Time");

                // Format the DateTime as a string in Vietnamese datetime format
                string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                var showtimeAdd = new Showtime
                {
                    Time = vietnamTime,
                    IdAuditoriums = addshowtime.IdAuditoriums,
                    IdMovie = addshowtime.IdMovie,
                    IdCinema=addshowtime.IdCinema
                };
                _dbContext.Showtimes.Add(showtimeAdd);
                _dbContext.SaveChanges();
                return Ok("Add ShowTime successfully");

            }
            catch (Exception ex) {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
                  }
        [HttpGet("getAudi")]
        public async Task<ActionResult<IEnumerable<Auditorium>>> getAudi()
        {
            try
            {
                var Audi=await _dbContext.Auditoriums.Select(m => new
                {
                    ID=m.Id,
                    Name=m.Name,
                    ID_Cinema=m.IdCinema
                }).ToListAsync();
                return Ok(Audi);
            }catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getBrance")]
        public async Task<ActionResult<IEnumerable<Cinema>>> getCinema()
        {
            try
            {
                var cinema =await _dbContext.Cinemas.Include(m => m.DetailCityBranches).ThenInclude(d => d.IdBranchNavigation).Select(m => new {
                
                ID=m.Id, Name=m.Name,
                District=m.District,
                IDcity=m.DetailCityBranches.Select(d=>d.IdBranch)
                }).ToListAsync();
                return Ok(cinema);
            }catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getcity")]
        public async Task<ActionResult<IEnumerable<CinemaBranch>>> getCityBrance()
        {
            try
            {
                var CineMaBrancher=await _dbContext.CinemaBranches.Select(m=>new
                {
                    ID=m.Id,
                    City=m.City
                }).ToListAsync();
                return Ok(CineMaBrancher);

            }catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("getMovie")]
        public async Task<ActionResult<IEnumerable<Movie>>> getMovie()
        {
            try
            {
                var Movies = await _dbContext.Movies.Select(m => new
                {
                    ID = m.Id,
                    Name = m.Title,
                }).ToListAsync();
                return Ok(Movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
