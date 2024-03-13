using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
                var existingGenre = _dbContext.Showtimes.Find(id);
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(genre.Time, "SE Asia Standard Time");
                DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(genre.Endtime, "SE Asia Standard Time");
                string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
                // Format the DateTime as a string in Vietnamese datetime format
                string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                if (_dbContext.Showtimes.Any(a => a.Time == vietnamTime))
                {
                    return BadRequest(new { message = "Failed update time" });
                }
                existingGenre.Time = vietnamTime;

                existingGenre.Endtime = Endtime;
                _dbContext.SaveChanges();
                return Ok("Showtime Update successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("GetInfo/{Datetime}/{ID}")]
        public async Task<ActionResult<IEnumerable<Showtime>>> getDate(DateTime datetime, int id)
        {
            try
            {
                // Assuming a.Time is of type DateTime


                var Info = await _dbContext.Showtimes
     .Where(a => a.Time.Year == datetime.Year && a.Time.Month == datetime.Month && a.Time.Day == datetime.Day && a.IdMovie == id && _dbContext.SeatMovies.Any(b => b.IdAuditoriums == a.IdAuditoriums)).Select(m => new
     {
         id = m.IdAuditoriumsNavigation.Id,
         idTime = m.Id,
         Auth = m.IdAuditoriumsNavigation.IdCinemaNavigation.Name,
         Ditrict = m.IdAuditoriumsNavigation.IdCinemaNavigation.District,
         Time = m.Time,
         Cinema = m.IdAuditoriumsNavigation.IdCinemaNavigation.Name
     })
     .ToListAsync();

                return Ok(Info);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("Gettime/{id}")]
        public async Task<ActionResult<IEnumerable<Showtime>>> getshowtime(int id)
        {
            try
            {
                DateTime currentDate = DateTime.Now;
                DateTime endDate = currentDate.AddDays(10);

                var showtimes = await _dbContext.Showtimes
                    .Where(a => a.Time >= currentDate && a.Endtime <= endDate && a.IdMovieNavigation.Id == id)
                    .Select(m => new
                    {
                        Time = m.Time,
                    }).GroupBy(a => new { a.Time.Year, a.Time.Month, a.Time.Day })
                    .Select(group => group.First())
                    .ToListAsync();
                return Ok(showtimes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("ShowShowtime/{id}")]

        public async Task<ActionResult<IEnumerable<Showtime>>> getShow(int id)
        {
            try
            {
                var show = await _dbContext.Showtimes.Where(a=>a.IdAuditoriumsNavigation.IdCinemaNavigation.Idaccount==id).Select(d => new
                {
                    ID = d.Id,
                    Time = d.Time,
                    NameMovie = d.IdMovieNavigation.Title,
                    duration = d.IdMovieNavigation.Duration,
                    NameAuthor = d.IdAuditoriumsNavigation.Name,
                    Cinema = d.IdAuditoriumsNavigation.IdCinemaNavigation.Name,
                    District = d.IdAuditoriumsNavigation.IdCinemaNavigation.District
                }).ToListAsync();
                return Ok(show);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpPost("add")]
        public IActionResult AddShowtime([FromBody] AddShowtime addshowtime)
        {
            try
            {
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addshowtime.Time, "SE Asia Standard Time");

                // Format the DateTime as a string in Vietnamese datetime format
                string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addshowtime.Endtime, "SE Asia Standard Time");
                string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
                if (addshowtime == null)
                {
                    return BadRequest("Invalid movie data");
                }
                if (_dbContext.Showtimes.Any(a => a.Time <= addshowtime.Time && a.Endtime >= addshowtime.Endtime && a.IdAuditoriums == addshowtime.IdAuditoriums))
                {
                    return BadRequest(new { message = "Show time is already exists" });

                }
           

                var showtimeAdd = new Showtime
                {
                    Time = vietnamTime,
                    Endtime = Endtime,
                    IdAuditoriums = addshowtime.IdAuditoriums,
                    IdMovie = addshowtime.IdMovie,

                };
                _dbContext.Showtimes.Add(showtimeAdd);
                _dbContext.SaveChanges();
                return Ok("Add ShowTime successfully");

            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpGet("getAudi")]
        public async Task<ActionResult<IEnumerable<Auditorium>>> getAudi()
        {
            try
            {
                var Audi = await _dbContext.Auditoriums.Select(m => new
                {
                    ID = m.Id,
                    Name = m.Name,
                    ID_Cinema = m.IdCinema
                }).ToListAsync();
                return Ok(Audi);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getBrance/{id}")]
        public async Task<ActionResult<IEnumerable<Cinema>>> getCinema(int id)
        {
            try
            {
                var cinema = await _dbContext.DetailCityBranches.Where(d=>d.IdCinemaNavigation.Idaccount==id).Select(m => new {

                    ID = m.IdCinemaNavigation.Id,
                    Name = m.IdCinemaNavigation.Name,
                    District = m.IdCinemaNavigation.District,
                    IDcity = m.IdBranchNavigation.Id,
                }).ToListAsync();
                return Ok(cinema);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getcity/{id}")]
        public async Task<ActionResult<IEnumerable<CinemaBranch>>> getCityBrance(int id)
        {
            try
            {
                var CineMaBrancher = await _dbContext.CinemaBranches.Where(d=>d.DetailCityBranches.Any(b=>b.IdCinemaNavigation.Idaccount==id)).Select(m => new
                {
                    ID = m.Id,
                    City = m.City
                }).ToListAsync();
                return Ok(CineMaBrancher);

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
                var Movies = await _dbContext.Movies.Select(m => new
                {
                    ID = m.Id,
                    Name = m.Title,
                    duration = m.Duration
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
