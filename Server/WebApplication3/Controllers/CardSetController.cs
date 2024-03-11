using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardSetController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public CardSetController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("Addstatus/{id}/{idAccount}/{idshowtime}")]
        public IActionResult AddStatus(int id, int idAccount, int idshowtime)
        {
            try
            {
                // Check if the account already exists in SeatAccounts
                SeatAccount existingSeatAccount = _dbContext.SeatAccounts
                    .FirstOrDefault(sa => sa.IdAccount == idAccount);

                int idseat;

                if (existingSeatAccount != null)
                {
                    idseat = existingSeatAccount.Id;
                }
                else
                {
                    // Insert a new SeatAccount
                    SeatAccount newSeatAccount = new SeatAccount
                    {
                        IdAccount = idAccount,

                        // Add other properties as needed
                    };

                    _dbContext.SeatAccounts.Add(newSeatAccount);
                    _dbContext.SaveChanges();
                    idseat = newSeatAccount.Id;
                }

                // Fetch all seats in the specified auditorium
                List<int> allSeatIds = _dbContext.SeatMovies
                    .Where(d => d.IdAuditoriums == id)
                    .Select(s => s.Id)
                    .ToList();

                foreach (int seatId in allSeatIds)
                {
                    // Check if the record already exists in DetailAccountSeats
                    bool recordExists = _dbContext.DetailAccountSeats
                        .Any(das => das.IdSeat == seatId && das.IdAccountSeat == idseat && das.IdShowtime == idshowtime);

                    if (!recordExists)
                    {
                        // Insert DetailAccountSeat only if it doesn't exist
                        DetailAccountSeat detailAccountSeat = new DetailAccountSeat
                        {
                            IdSeat = seatId,
                            IdAccountSeat = idseat,
                            Status = 0,
                            IdShowtime = idshowtime,
                        };
                        _dbContext.DetailAccountSeats.Add(detailAccountSeat);
                    }

                }

                _dbContext.SaveChanges();

                return Ok("Save changed");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("updateSeat/{id}")]
        public IActionResult Update(int id)
        {
            try
            {
                var seat = _dbContext.DetailAccountSeats.Find(id);
                if (seat != null)
                {
                    seat.Status = (seat.Status == 0) ? 1 : 0;
                    _dbContext.SaveChanges();
                    return Ok("seat status updated successfully");
                }
                else
                {

                    return NotFound($"Seat {id} not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("ShowInfoCard/{id}/{idCinema}/{idShowtime}")]
        public async Task<ActionResult<IEnumerable<DetailAccountSeat>>> ShowInfoCard(int id, int idCinema, int idShowtime)
        {
            try
            {
                var name = await _dbContext.DetailAccountSeats.Where(d => d.IdAccountSeatNavigation.IdAccount == id && d.Status == 1 && d.IdSeatNavigation.IdAuditoriums == idCinema && d.IdShowtime == idShowtime).Select(m => new
                {
                    id = m.IdSeat,
                    Name = m.IdSeatNavigation.SeatName,
                    idtime = m.IdSeatNavigation.Id,
                    Price = m.IdSeatNavigation.IdCategorySeatNavigation.Price,
                }).ToListAsync();
                return Ok(name);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("ShowCard/{id}/{IDAccount}/{idshowtime}")]
        public async Task<ActionResult<IEnumerable<DetailAccountSeat>>> ShowCard(int id, int IDAccount, int idshowtime)
        {
            try
            {
                var seat = await _dbContext.DetailAccountSeats.Where(d => d.IdSeatNavigation.IdAuditoriums == id && d.IdAccountSeatNavigation.IdAccount == IDAccount && d.IdShowtime == idshowtime).Select(m => new
                {

                    id = m.Id,
                    seatName = m.IdSeatNavigation.SeatName,
                    categoryseat = m.IdSeatNavigation.IdCategorySeatNavigation.Price,
                    NameCategory = m.IdSeatNavigation.IdCategorySeatNavigation.Name,
                    status = m.Status

                }).ToListAsync();
                return Ok(seat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
