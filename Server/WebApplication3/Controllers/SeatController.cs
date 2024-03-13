using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;
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
        [HttpGet("getAuditorium")]
        public async Task<ActionResult<IEnumerable<Auditorium>>> getIdAuditorium()
        {
            try
            {
                var auditorium = await _dbContext.Auditoriums.Select(m => new
                {
                    id = m.Id,
                    Name = m.Name,
                    IdCinema = m.IdCinema
                    
                }).ToListAsync();
                return Ok(auditorium);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal server error");
            }
        }
            [HttpGet("getAuditoriumWithSeats/{cinemaId}")]
            public async Task<ActionResult<List<AuditoriumDetailDTO>>> GetAllAuditoriumsWithSeats(int cinemaId)
            {
            var cinema = await _dbContext.Cinemas.Where(p => p.Id == cinemaId).FirstOrDefaultAsync();
            if (cinema == null)
            {
                return NotFound("Cinema not found.");
            }

            var adminName = await _dbContext.Accounts.Where(p=> p.Id == cinema.Idaccount).Select(p=>p.FullName).FirstOrDefaultAsync();


                var auditoriums = await _dbContext.Auditoriums
                                                  .Where(a => a.IdCinema == cinemaId)
                                                  .ToListAsync();
            var nameAuditorium = auditoriums.Select(m => m.Name);

                if (!auditoriums.Any())
                {
                    return NotFound("No auditoriums found for the given cinema.");
                }

                var auditoriumDetailsList = new List<AuditoriumDetailDTO>();

                foreach (var auditorium in auditoriums)
                {
                    var seats = await _dbContext.SeatMovies
                                                .Where(seat => seat.IdAuditoriums == auditorium.Id)
                                                .Select(seat => new SeatDTO
                                                {
                                                    Id = seat.Id,
                                                    Name = seat.SeatName,
                                                    Category = seat.IdCategorySeat == 1 ? "Vip" : "Normal"
                                                }).ToListAsync();

                    var auditoriumDetailDto = new AuditoriumDetailDTO
                    {
                        AuditoriumId = auditorium.Id,
                        Seats = seats,
                        VipSeatsCount = seats.Count(seat => seat.Category == "Vip"),
                        NormalSeatsCount = seats.Count(seat => seat.Category == "Normal"),
                        NameAuditorium = auditorium.Name,
                        AdminName = adminName ?? "Admin not found"
                    };

                    auditoriumDetailsList.Add(auditoriumDetailDto);
                }

                return Ok(auditoriumDetailsList);
            }







    }
}
