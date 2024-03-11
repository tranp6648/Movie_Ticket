using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public SeatController(DatabaseContext databaseContext)
        {
            _dbContext = databaseContext;
        }
        [HttpPost]
        [Route("saveSeats/{idCinema}")]
        public async Task<IActionResult> SaveSeat([FromBody] List<AddAuditorium> addAuditoriums,int idCinema)
        {
            var cinemaExists = _dbContext.Cinemas.Any(c =>  c.Id == idCinema);
            if(!cinemaExists)
            {
                return BadRequest("invalid");
            }

            if (addAuditoriums == null || addAuditoriums.Any(a => string.IsNullOrWhiteSpace(a.Name)))
            {
                return BadRequest("Invalid auditorium data.");
            }
           
            
            try
            {
                foreach (var addAuditorium in addAuditoriums)
                {
                    var auditoriumEntity = new Auditorium
                    {
                        Name = addAuditorium.Name,
                        IdCinema = idCinema,
                    };

                    _dbContext.Auditoriums.Add(auditoriumEntity);
                    await _dbContext.SaveChangesAsync();
                    foreach (var seat in addAuditorium.Seats)
                    {
                        
                        var seatMovie = new SeatMovie
                        {
                            SeatName = seat.SeatName,
                            IdCategorySeat = seat.Type == "1" ? 1 : 2,
                            IdAuditoriums = auditoriumEntity.Id
                        };
                        _dbContext.SeatMovies.Add(seatMovie);
                    }
                   

                }
                await _dbContext.SaveChangesAsync();
                return Ok(new { message = "Auditoriums and seats have been added successfully." });
            
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the auditoriums.");
            }
        }
        [HttpGet("getAuditorium/{id}")]
        public async Task<ActionResult<IEnumerable<Auditorium>>> getIdAuditorium(int id)
        {
            try
            {
                var auditorium = await _dbContext.Auditoriums.Where(p=> p.IdCinema == id).Select(m => new
                {
                    id = m.Id,
                    Name = m.Name,
                    
                }).ToListAsync();
                return Ok(auditorium);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("getSeatsByAuditoriumId/{id}")]
        public async Task<ActionResult> GetAuditoriumWithSeats(int id)
        {
            try
            {
              
                var auditoriums = await _dbContext.Auditoriums
                                                  .Where(a => a.IdCinema == id)
                                                  .ToListAsync();

                // For each auditorium, fetch the seats and construct the result2
                var auditoriumsWithSeats = new List<object>();

                foreach (var auditorium in auditoriums)
                {
                    var seats = await _dbContext.SeatMovies
                                                .Where(sm => sm.IdAuditoriums == auditorium.Id)
                                                .ToListAsync();

                    auditoriumsWithSeats.Add(new
                    {
                        AuditoriumDetails = auditorium,
                        Seats = seats
                    });
                }

                return Ok(auditoriumsWithSeats);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }



    }
}
