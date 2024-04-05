using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayPal.Api;
using System.Linq;
using System.Net.Mail;
using WebApplication3.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckOutController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly CheckOutService checkOutService;
        public CheckOutController(DatabaseContext dbContext,CheckOutService checkOutService)
        {
            _dbContext = dbContext;
           this.checkOutService=checkOutService;
        }
        [HttpGet("getAccount/{id}")]
        public IActionResult getAccount(int id)
        {
            try
            {
                
                return Ok(checkOutService.getAccount(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("ShowSeat/{id}/{IDAccount}/{idshowtime}")]
        public IActionResult ShowSeat(int id, int IDAccount, int idshowtime)
        {
            try
            {
               
                return Ok(checkOutService.ShowSeat(id,IDAccount,idshowtime));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("/ApplyVoucher")]
        public IActionResult getVoucher()
        {
            try
            {
             
                return Ok(new
                {
                    result=checkOutService.getVoucher()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("showInFoCard/{id}/{IDAccount}/{idshowtime}")]
        public IActionResult ShowInfoCard(int id, int IDAccount, int idshowtime)
        {
            try
            {
                
                return Ok(checkOutService.ShowInfoCard(id,IDAccount,idshowtime));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }
        [HttpGet("GetVoucherAccount")]
        public IActionResult  ShowUserVoucher()
        {
            try
            {
                return Ok(checkOutService.ShowUserVoucher());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPost("PaymentByPaypal/{id}/{idtime}")]
        public IActionResult PaymentByPaypal(int id, int idtime, [FromBody] AddCheckout addCheckout)
        {
            try
            {
                //var exist = _dbContext.Accounts.Find(id);




                //exist.Address = addCheckout.Address;
                //exist.ZipCode = addCheckout.ZipCode;
                //exist.IdCity = addCheckout.IdCity;
                //exist.OrderNote = addCheckout.OrderNote;
                //exist.Phone = addCheckout.Phone;
                //exist.Email = addCheckout.Email;
                //exist.FullName = addCheckout.FullName;
                //var random = new Random();
                //var orderTime = new Models.Order
                //{
                //    OrderCode = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4)
                //                          .Select(s => s[random.Next(s.Length)]).ToArray()),
                //    TotalPrice = addCheckout.TotalPrice,
                //    IdAccount = addCheckout.IdAccount,
                //    Payment = 1,
                //    OrderDate = DateTime.Now,
                //};
                //_dbContext.Orders.Add(orderTime);
                //_dbContext.SaveChanges();
                //var idorder = orderTime.Id;
                //foreach (int seatid in addCheckout.IdSeat)
                //{
                //    var detailorder = new DetailOrder
                //    {
                //        Idorder = idorder,
                //        Idseat = seatid,
                //        Idshowtime = idtime,
                //    };
                //    _dbContext.DetailOrders.Add(detailorder);
                //}
                //_dbContext.SaveChanges();

                //foreach (var seatAccount in addCheckout.IdSeat)
                //{
                //    var seats = _dbContext.DetailAccountSeats.Where(b => b.IdSeat == seatAccount && b.Status == 1).ToList();
                //    foreach (var seat in seats)
                //    {
                //        seat.Status = 2;
                //    }
                //}
                //if (addCheckout.IdVoucher != null || addCheckout.IdVoucher.Count != 0)
                //{
                //    foreach (int idvoucher in addCheckout.IdVoucher)
                //    {
                //        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher == idvoucher))
                //        {
                //            var voucher = new UserVoucher()
                //            {
                //                IdAccount = addCheckout.IdAccount,
                //                IdVoucher = idvoucher,
                //                IdOrder = idorder,
                //            };
                //            _dbContext.UserVouchers.Add(voucher);
                //        }

                //    }
                //    foreach (int idvoucher in addCheckout.IdVoucher)
                //    {
                //        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher != idvoucher) || _dbContext.UserVouchers.Any(m => m.IdAccount != addCheckout.IdAccount && m.IdVoucher != idvoucher))
                //        {
                //            var voucher = _dbContext.Vouchers.Find(idvoucher);
                //            if (voucher.Quatity > 0)
                //            {
                //                voucher.Quatity -= 1;
                //                // Update the voucher in the database
                //                _dbContext.SaveChanges();
                //            }
                //        }

                //    }
                //}

                //_dbContext.SaveChanges();
                //SendEmail(addCheckout.Email, "Movie Ticket Shop", $"Thank you for booking our tickets");
                return Ok(new
                {
                    result=checkOutService.PaymentByPaypal(id,idtime,addCheckout)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPost("addOrder/{id}/{idtime}")]
        public IActionResult Addorder(int id, int idtime, [FromBody] AddCheckout addCheckout)
        {
            try
            {
                //var exist = _dbContext.Accounts.Find(id);




                //exist.Address = addCheckout.Address;
                //exist.ZipCode = addCheckout.ZipCode;
                //exist.IdCity = addCheckout.IdCity;
                //exist.OrderNote = addCheckout.OrderNote;
                //exist.Phone = addCheckout.Phone;
                //exist.Email = addCheckout.Email;
                //exist.FullName = addCheckout.FullName;
                //var random = new Random();
                //var orderTime = new Models.Order
                //{
                //    OrderCode = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4)
                //                          .Select(s => s[random.Next(s.Length)]).ToArray()),
                //    TotalPrice = addCheckout.TotalPrice,
                //    IdAccount = addCheckout.IdAccount,
                //    Payment = 0,
                //    OrderDate = DateTime.Now,
                //};
                //_dbContext.Orders.Add(orderTime);
                //_dbContext.SaveChanges();
                //var idorder = orderTime.Id;
                //foreach (int seatid in addCheckout.IdSeat)
                //{
                //    var detailorder = new DetailOrder
                //    {
                //        Idorder = idorder,
                //        Idseat = seatid,
                //        Idshowtime = idtime,
                //    };
                //    _dbContext.DetailOrders.Add(detailorder);
                //}
                //_dbContext.SaveChanges();

                //foreach (var seatAccount in addCheckout.IdSeat)
                //{
                //    var seats = _dbContext.DetailAccountSeats.Where(b => b.IdSeat == seatAccount && b.Status == 1).ToList();
                //    foreach (var seat in seats)
                //    {
                //        seat.Status = 2;
                //    }
                //}
                //if (addCheckout.IdVoucher != null || addCheckout.IdVoucher.Count != 0)
                //{
                //    foreach (int idvoucher in addCheckout.IdVoucher)
                //    {
                //        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher == idvoucher))
                //        {
                //            var voucher = new UserVoucher()
                //            {
                //                IdAccount = addCheckout.IdAccount,
                //                IdVoucher = idvoucher,
                //                IdOrder = idorder,
                //            };
                //            _dbContext.UserVouchers.Add(voucher);
                //        }

                //    }
                //    foreach (int idvoucher in addCheckout.IdVoucher)
                //    {
                //        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher != idvoucher) || _dbContext.UserVouchers.Any(m => m.IdAccount != addCheckout.IdAccount && m.IdVoucher != idvoucher))
                //        {
                //            var voucher = _dbContext.Vouchers.Find(idvoucher);
                //            if (voucher.Quatity > 0)
                //            {
                //                voucher.Quatity -= 1;
                //                // Update the voucher in the database
                //                _dbContext.SaveChanges();
                //            }
                //        }

                //    }
                //}
                //_dbContext.SaveChanges();
             

                //foreach (int seatid in addCheckout.IdSeat)
                //{
                //    string Movies = _dbContext.DetailOrders.Where(d => d.Idshowtime == idtime).Select(a => a.IdshowtimeNavigation.IdMovieNavigation.Title).FirstOrDefault();
                //    List<string> seats = _dbContext.SeatMovies.Where(d => d.Id == seatid).Select(a => a.SeatName).ToList();
                    

                //}
                //SendEmail(addCheckout.Email, "Movie Ticket Shop", "Thank you for booking your ticket");
                return Ok(new
                {
                    result=checkOutService.Addorder(id,idtime,addCheckout)
                });
            }

            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
       
        [HttpGet("city")]
        public async Task<ActionResult<IEnumerable<City>>> ShowCity()
        {
            try
            {
              
                return Ok(new
                {
                    result=checkOutService.ShowCity()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
