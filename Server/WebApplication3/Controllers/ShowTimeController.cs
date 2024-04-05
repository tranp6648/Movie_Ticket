using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowTimeController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly ShowTimeService _showTimeService;
        public ShowTimeController(DatabaseContext dbContext, ShowTimeService showTimeService)
        {
            _dbContext = dbContext;
            _showTimeService = showTimeService;
        }
        [HttpPost("delete/{id}")]
        public IActionResult DeleteShowTime(int id)
        {
            return Ok(new
            {
                result = _showTimeService.DeleteShowTime(id)
            });
        }
        [HttpPost("Update/{id}")]
        public IActionResult Update(int id, [FromBody] UpdateShowtime genre)
        {
            try
            {
                //var existingGenre = _dbContext.Showtimes.Find(id);
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(genre.Time, "SE Asia Standard Time");
                DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(genre.Endtime, "SE Asia Standard Time");
                string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
                // Format the DateTime as a string in Vietnamese datetime format
                string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                if (_dbContext.Showtimes.Any(a => a.Time == vietnamTime))
                {
                    return BadRequest(new { message = "Failed update time" });
                }
                //existingGenre.Time = vietnamTime;

                //existingGenre.Endtime = Endtime;
                //_dbContext.SaveChanges();
                return Ok(new
                {
                    result=_showTimeService.Update(id,genre)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("GetInfo/{Datetime}/{ID}")]
        public IActionResult getDate(DateTime datetime, int id)
        {
            try
            {
               

                return Ok(_showTimeService.GetInfo(datetime,id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("Gettime/{id}")]
        public IActionResult getshowtime(int id)
        {
            try
            {
                
                return Ok(_showTimeService.getshowtime(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("ShowShowtime/{id}")]

        public IActionResult  getShow(int id)
        {
            try
            {
               
                return Ok(_showTimeService.getShow(id));
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
                //DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addshowtime.Time, "SE Asia Standard Time");

                //// Format the DateTime as a string in Vietnamese datetime format
                //string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                //DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addshowtime.Endtime, "SE Asia Standard Time");
                //string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
                //if (addshowtime == null)
                //{
                //    return BadRequest("Invalid movie data");
                //}
                if (_dbContext.Showtimes.Any(a => a.Time <= addshowtime.Time && a.Endtime >= addshowtime.Endtime && a.IdAuditoriums == addshowtime.IdAuditoriums))
                {
                    return BadRequest(new { message = "Show time is already exists" });

                }


                //var showtimeAdd = new Showtime
                //{
                //    Time = vietnamTime,
                //    Endtime = Endtime,
                //    IdAuditoriums = addshowtime.IdAuditoriums,
                //    IdMovie = addshowtime.IdMovie,

                //};
                //_dbContext.Showtimes.Add(showtimeAdd);
                //_dbContext.SaveChanges();
                return Ok(new
                {
                    result=_showTimeService.AddShowtime(addshowtime)
                });

            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpGet("getAudi")]
        public IActionResult getAudi()
        {
            try
            {
                
                return Ok(_showTimeService.getAudi());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getBrance/{id}")]
        public IActionResult getCinema(int id)
        {
            try
            {
               
                return Ok(_showTimeService.getBrance(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getcity/{id}")]
        public IActionResult getCityBrance(int id)
        {
            try
            {
               
                return Ok(_showTimeService.getCityBrance(id));

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("getMovie")]
        public IActionResult getMovie()
        {
            try
            {
                return Ok(_showTimeService.getMovie());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
