using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using WebApplication3.Models;
using PayPal.Api;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public OrderController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
       
        [HttpGet("Voucherprice/{id}")]
        public async Task<ActionResult<IEnumerable<UserVoucher>>> Voucherprice(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.Where(d => d.UserVouchers.Any(uv => uv.IdOrder == id)).SumAsync(d => d.DiscountPercent);
                return Ok(voucher);
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("GetCoutorder/{datetime}")]
        public async Task<ActionResult<IEnumerable<Models.Order>>> GetCoutorder(int datetime )
        {
            try
            {
                var orderCountByDate = await _dbContext.Orders.Where(p=>p.OrderDate.Month==datetime)
            .GroupBy(o => o.OrderDate.Date)
            
            .Select(g => new { OrderDate = g.Key, OrderCount = g.Count() })
            .OrderBy(x => x.OrderDate)
            .ToListAsync();
                return Ok(orderCountByDate);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("Myorder/{id}")]
      
        [HttpPost("SendContact")]
        public IActionResult SendContact([FromBody] SendContact sendContact)
        {
            try
            {
                SendEmail(sendContact.Email, "Contact Information", $"Name:{sendContact.Name}\n Email:{sendContact.Email}\n Phone:{sendContact.Phone}\n Subject:{sendContact.subject}\n Comment:{sendContact.Comment}");
                return Ok("Send Successfully");
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        private void SendEmail(string to, string subject, string body)
        {
            using (var client = new SmtpClient("smtp.gmail.com"))
            {
                client.Port = 587;
                client.Credentials = new NetworkCredential("tranp6648@gmail.com", "czvy qzyc vpes whkj");
                client.EnableSsl = true;
                var message = new MailMessage
                {
                    From = new MailAddress("tranp6648@gmail.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false
                };
                message.To.Add(to);
                client.Send(message);

            }
        }
       
        [HttpGet("ViewAccount/{id}")]
        public async Task<ActionResult<IEnumerable<Models.Order>>> ViewAccount(int id)
        {
            try
            {
                var account = await _dbContext.Orders.Where(d => d.Id == id).Select(d => new
                {
                    FullName = d.IdAccountNavigation.FullName,
                    Birthday = d.IdAccountNavigation.Birthday,
                    Phone = d.IdAccountNavigation.Phone,
                    Address = d.IdAccountNavigation.Address,
                    city = d.IdAccountNavigation.IdCityNavigation.Name,
                    Zipcode = d.IdAccountNavigation.ZipCode
                   
                }).FirstOrDefaultAsync();
                return Ok(account);
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("View")]
        public async Task<ActionResult<IEnumerable<Models.Order>>> ShowOrder()
        {
            try
            {
                var order = await _dbContext.Orders.Select(m => new
                {
                    id=m.Id,
                    orderCode = m.OrderCode,
                    User = m.IdAccountNavigation.Username,
                    Payment = m.Payment,
                    Dateorder=m.OrderDate
                }).ToListAsync();
                return Ok(order);
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("Add")]
        public IActionResult AddOrder(int id,[FromBody] Addorder order)
        {
            var random=new Random();
            var orderTime = new Models.Order
            {
                OrderCode = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4)
                                      .Select(s => s[random.Next(s.Length)]).ToArray()),
                TotalPrice=order.TotalPrice,
                IdAccount=order.IdAccount,
            };
            _dbContext.Orders.Add(orderTime);
            _dbContext.SaveChanges();
            var idorder = orderTime.Id;
            foreach(int seatid in order.IdSeat)
            {
                var detailorder = new DetailOrder
                {
                    Idorder = idorder,
                    Idseat = seatid,
                };
                _dbContext.DetailOrders.Add(detailorder);
            }
            _dbContext.SaveChanges();

            foreach (var seatAccount in order.IdSeat)
            {
                var seats = _dbContext.DetailAccountSeats.Where(b => b.IdSeat == seatAccount && b.Status == 1).ToList();
                foreach (var seat in seats)
                {
                    seat.Status = 2;
                }
            }

            _dbContext.SaveChanges();
            return Ok("Add order successfully");
        }
    }
}
