using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [HttpGet("SeatMovie/{id}")]
        public async Task<ActionResult<IEnumerable<DetailOrder>>> SeatMovie(int id)
        {
            try
            {
                var Card = await _dbContext.DetailOrders.Where(d => d.Idorder == id).Select(d => new
                {
                   SeatName=d.IdseatNavigation.SeatName,
                   NameSeatCategory=d.IdseatNavigation.IdCategorySeatNavigation.Name,
                   Price=d.IdseatNavigation.IdCategorySeatNavigation.Price

                }).ToListAsync();
                return Ok(Card);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal server error");
            }
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
        [HttpGet("Myorder/{id}")]
        public async Task<ActionResult<IEnumerable<DetailOrder>>> Myorder(int id)
        {
            try
            {
                var orders = await _dbContext.DetailOrders
                    .Include(d => d.IdshowtimeNavigation)
                        .ThenInclude(st => st.IdMovieNavigation)
                            .ThenInclude(m => m.DetailCategoryMovies)
                    .Include(d => d.IdseatNavigation)
                        .ThenInclude(s => s.IdCategorySeatNavigation)
                    .Where(d => d.IdorderNavigation.IdAccount == id)
                    .Select(m => new 
                    {
                        Title = m.IdshowtimeNavigation.IdMovieNavigation.Title,
                        TotalPrice = m.IdseatNavigation.IdCategorySeatNavigation.Price,
                        SeatName = m.IdseatNavigation.SeatName,
                        Picture = m.IdshowtimeNavigation.IdMovieNavigation.DetailCategoryMovies.FirstOrDefault().Picture,
                        Time=m.IdshowtimeNavigation.Time,
                        CategoryName=m.IdseatNavigation.IdCategorySeatNavigation.Name
                    })
                    .ToListAsync();

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("ViewCard/{id}")]
        public async Task<ActionResult<IEnumerable<DetailOrder>>> ViewCard(int id)
        {
            try
            {
                var Card=await _dbContext.DetailOrders.Where(d=>d.Idorder==id).Select(d=>new
                {
                    Movie=d.IdshowtimeNavigation.IdMovieNavigation.Title,
                 Total=d.IdorderNavigation.TotalPrice,
                }).FirstOrDefaultAsync();
                return Ok(Card);
            }catch (Exception ex)
            {

                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ViewAccount/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> ViewAccount(int id)
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
        public async Task<ActionResult<IEnumerable<Order>>> ShowOrder()
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
