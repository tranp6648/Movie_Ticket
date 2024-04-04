using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardSetController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly CartSetService _cartSetService;
        public CardSetController(DatabaseContext dbContext,CartSetService cartSetService)
        {
            _dbContext = dbContext;
            _cartSetService = cartSetService;
        }
        [HttpPost("Addstatus/{id}/{idAccount}/{idshowtime}")]
        public IActionResult AddStatus(int id, int idAccount, int idshowtime)
        {
            try
            {
                // Check if the account already exists in SeatAccounts
                

                return Ok(new
                {
                    result=_cartSetService.Addstatus(id,idAccount,idshowtime)
                });
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
             return Ok(new
             {
                 result= _cartSetService.Update(id)
             });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("ShowInfoCard/{id}/{idCinema}/{idShowtime}")]
        public IActionResult ShowInfoCard(int id, int idCinema, int idShowtime)
        {
            try
            {
                
                return Ok(_cartSetService.ShowInfoCard(id,idCinema,idShowtime));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("ShowCard/{id}/{IDAccount}/{idshowtime}")]
        public IActionResult ShowCard(int id, int IDAccount, int idshowtime)
        {
            try
            {
              
                return Ok(_cartSetService.ShowCard(id,IDAccount,idshowtime));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
