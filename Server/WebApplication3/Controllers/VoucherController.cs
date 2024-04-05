using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly VoucherService voucherService;
        public VoucherController(DatabaseContext dbContext,VoucherService voucherService)
        {
            _dbContext = dbContext;
            this.voucherService = voucherService;
        }
        [HttpPost("Add")]
        public IActionResult AddVoucher([FromBody] AddVoucher addVoucher)
        {
            try
            {
               
                return Ok(new
                {
                    result=voucherService.AddVoucher(addVoucher)
                });
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
                
                return Ok(new
                {
                    result=voucherService.DeleteVoucher(id)
                });
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
              
                if(_dbContext.Vouchers.Any(d=>d.StartDate==updateVoucher.StartDate && d.DiscountPercent==updateVoucher.DiscountPercent && d.ExpireDate==updateVoucher.ExpireDate && d.MinPrice==updateVoucher.MinPrice && d.Quatity == updateVoucher.Quatity))
                {
                    return BadRequest(new { message = "Voucher Code is exists" });
                }
               
                
                return Ok(new
                {
                    result=voucherService.UpdateVoucher(id, updateVoucher)
                });
            }catch( Exception ex )
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("ShowVoucher")]
        public IActionResult ShowVoucher()
        {
            try
            {
                
                return Ok(voucherService.ShowVoucher());
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
