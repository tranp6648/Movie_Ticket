using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using WebApplication3.Models;
using PayPal.Api;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly OrderService orderService;
        public OrderController(DatabaseContext dbContext,OrderService orderService)
        {
            _dbContext = dbContext;
            this.orderService=orderService;
        }
       
        [HttpGet("Voucherprice/{id}")]
        public IActionResult  Voucherprice(int id)
        {
            try
            {
              
                return Ok(orderService.Voucherprice(id));
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("GetCoutorder/{datetime}")]
        public IActionResult GetCoutorder(int datetime)
        {
            try
            {
                return Ok(orderService.GetCoutorder(datetime));
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("SeatMovie/{id}")]
        public IActionResult  SeatMovie(int id)
        {
            try
            {
              
                return Ok(orderService.SeatMovie(id));
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("Myorder/{id}")]
        
        public IActionResult Myorder(int id)
        {
            try
            {
               
                return Ok(orderService.Myorder(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("SendContact")]
        public IActionResult SendContact([FromBody] SendContact sendContact)
        {
            try
            {
                
                return Ok(new
                {
                    result=orderService.SendContact(sendContact)
                });
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

       
        [HttpGet("ViewAccount/{id}")]
        public IActionResult ViewAccount(int id)
        {
            try
            {
                
                return Ok(orderService.ViewAccount(id));
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("View/{id}")]
        public IActionResult ShowOrder(int id)
        {
            try
            {
               
                return Ok(orderService.ShowOrder(id));
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("Add")]
        public IActionResult AddOrder([FromBody] Addorder order)
        {
            //var random=new Random();
            //var orderTime = new Models.Order
            //{
            //    OrderCode = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4)
            //                          .Select(s => s[random.Next(s.Length)]).ToArray()),
            //    TotalPrice=order.TotalPrice,
            //    IdAccount=order.IdAccount,
            //};
            //_dbContext.Orders.Add(orderTime);
            //_dbContext.SaveChanges();
            //var idorder = orderTime.Id;
            //foreach(int seatid in order.IdSeat)
            //{
            //    var detailorder = new DetailOrder
            //    {
            //        Idorder = idorder,
            //        Idseat = seatid,
            //    };
            //    _dbContext.DetailOrders.Add(detailorder);
            //}
            //_dbContext.SaveChanges();

            //foreach (var seatAccount in order.IdSeat)
            //{
            //    var seats = _dbContext.DetailAccountSeats.Where(b => b.IdSeat == seatAccount && b.Status == 1).ToList();
            //    foreach (var seat in seats)
            //    {
            //        seat.Status = 2;
            //    }
            //}

            //_dbContext.SaveChanges();
            return Ok(new
            {
                result=orderService.AddOrder(order) 
            });
        }
    }
}
