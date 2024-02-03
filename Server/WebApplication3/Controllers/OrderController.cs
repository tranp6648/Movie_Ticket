using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication3.Models;

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
        [HttpPost("Add")]
        public IActionResult AddOrder(int id,[FromBody] Addorder order)
        {
            var random=new Random();
            var orderTime = new Order
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
