using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public VoucherController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("Add")]
        public IActionResult AddVoucher([FromBody] AddVoucher addVoucher)
        {
            try
            {
                Random random = new Random();
                const string chars= "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                string vouchercode=new string(Enumerable.Repeat(chars, 8).Select(s => s[random.Next(chars.Length)]).ToArray());
                var VoucherAdd = new Voucher
                {
                    Code = vouchercode,
                    DiscountPercent = addVoucher.DiscountPercent,
                    ExpireDate = addVoucher.ExpireDate,
                    MinPrice = addVoucher.MinPrice,
                    Quatity = addVoucher.Quatity,
                    StartDate = addVoucher.StartDate,
                };
                _dbContext.Vouchers.Add(VoucherAdd);
                _dbContext.SaveChanges();
                return Ok("Add Voucher successfully");
            }catch(Exception ex)
            {
                return BadRequest($"Error adding Voucher: {ex.Message}");
            }
        }
        [HttpPost("delete/{id}")]
        public IActionResult DeleteVoucher(int id)
        {
            try
            {
                var voucher = _dbContext.Vouchers.Find(id);
                _dbContext.Vouchers.Remove(voucher);
                _dbContext.SaveChanges();
                return Ok("Remove Voucher successfully");
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPost("update/{id}")]
        public IActionResult updateVoucher(int id, [FromBody] AddVoucher updateVoucher)
        {
            try
            {
                var voucher=_dbContext.Vouchers.Find(id);
                if(_dbContext.Vouchers.Any(d=>d.StartDate==updateVoucher.StartDate && d.DiscountPercent==updateVoucher.DiscountPercent && d.ExpireDate==updateVoucher.ExpireDate && d.MinPrice==updateVoucher.MinPrice && d.Quatity == updateVoucher.Quatity))
                {
                    return BadRequest(new { message = "Voucher Code is exists" });
                }
                voucher.StartDate=updateVoucher.StartDate;
                voucher.ExpireDate=updateVoucher.ExpireDate;
                voucher.Quatity=updateVoucher.Quatity;
                voucher.MinPrice=updateVoucher.MinPrice;
                voucher.ExpireDate= updateVoucher.ExpireDate;
                _dbContext.SaveChanges();
                return Ok("Update successfully");
            }catch( Exception ex )
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("ShowVoucher")]
        public async Task<ActionResult<IEnumerable<Voucher>>> ShowVoucher()
        {
            try
            {
                var voucher = _dbContext.Vouchers.Select(m => new
                {
                    ID = m.Id,
                    voucherCode=m.Code,
                    DiscountPercent = m.DiscountPercent,
                    ExpireDate = m.ExpireDate,
                    MinPrice = m.MinPrice,
                    Quatity = m.Quatity,
                    startDate = m.StartDate,
                });
                return Ok(voucher);
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
