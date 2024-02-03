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
    }
}
