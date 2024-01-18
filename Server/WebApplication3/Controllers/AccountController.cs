using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly DatabaseContext _dbContext;
        public AccountController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAll()
        {
            try
            {
                var billDetails = await _dbContext.Accounts.ToListAsync();

               

                return new JsonResult(billDetails);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("Add")]
        public async Task<ActionResult<Account>> AddBillDetail([FromBody] Account billDetail)
        {

            try
            {
                if (billDetail == null)
                {
                    return BadRequest("Invalid data");
                }

                // Additional properties
                if (string.IsNullOrEmpty(billDetail.Email) ||
                    string.IsNullOrEmpty(billDetail.Username) ||
                    string.IsNullOrEmpty(billDetail.Password) )
                {
                    return BadRequest("Customer information is required");
                }

                _dbContext.Accounts.Add(billDetail);
                await _dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAll), new { id = billDetail.Id }, billDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("{id}")]
        public async Task<ActionResult<Account>> DeleteBillDetail(int id)
        {
            var billDetail=await _dbContext.Accounts.FindAsync(id);
            if(billDetail== null)
            {
                return NotFound();
            }
            try
            {
                _dbContext.Accounts.Remove(billDetail);
                await _dbContext.SaveChangesAsync();
                return billDetail;
            }catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
