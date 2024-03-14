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

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckOutController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public CheckOutController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("getAccount/{id}")]
        public async Task<ActionResult<IEnumerable<Account>>> getAccount(int id)
        {
            try
            {
                var account = _dbContext.Accounts.Where(d => d.Id == id).Select(m => new
                {
                    FullName = m.FullName,
                    Zipcode = m.ZipCode,
                    Phone = m.Phone,
                    Email = m.Email,
                    IDcity = m.IdCity,
                    streetAddress = m.Address
                }).FirstOrDefault();
                return Ok(account);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("ShowSeat/{id}/{IDAccount}/{idshowtime}")]
        public async Task<ActionResult<IEnumerable<DetailAccountSeat>>> ShowSeat(int id, int IDAccount, int idshowtime)
        {
            try
            {
                var card = await _dbContext.DetailAccountSeats.Where(d => d.IdSeatNavigation.IdAuditoriums == id && d.IdAccountSeatNavigation.IdAccount == IDAccount && d.IdShowtime == idshowtime && d.Status == 1).Select(m => new
                {
                    id = m.IdSeatNavigation.Id,
                    Name = m.IdSeatNavigation.SeatName,
                }).ToListAsync();
                return Ok(card);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("/ApplyVoucher")]
        public async Task<ActionResult<IEnumerable<Voucher>>> getVoucher()
        {
            try
            {
                DateOnly currentDate = DateOnly.FromDateTime(DateTime.Now);
                var vouchers = await _dbContext.Vouchers
           .Where(d => d.ExpireDate >= currentDate && d.Quatity > 0).Select(d => new
           {
               id = d.Id,
               code = d.Code,
               Minprice = d.MinPrice,
               DiscountPercent = d.DiscountPercent,
           })
           .ToListAsync();
                return Ok(vouchers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpGet("showInFoCard/{id}/{IDAccount}/{idshowtime}")]
        public async Task<ActionResult<IEnumerable<DetailAccountSeat>>> ShowInfoCard(int id, int IDAccount, int idshowtime)
        {
            try
            {
                var Card = await _dbContext.DetailAccountSeats.Where(d => d.IdSeatNavigation.IdAuditoriums == id && d.IdAccountSeatNavigation.IdAccount == IDAccount && d.IdShowtime == idshowtime && d.Status == 1).Select(d => new
                {
                    Movie = d.IdShowtimeNavigation.IdMovieNavigation.Title,
                    Date = d.IdShowtimeNavigation.Time,
                    Room = d.IdSeatNavigation.IdAuditoriumsNavigation.Name,
                    Address = d.IdSeatNavigation.IdAuditoriumsNavigation.IdCinemaNavigation.Location + ' ' + d.IdSeatNavigation.IdAuditoriumsNavigation.IdCinemaNavigation.District

                }).FirstOrDefaultAsync();
                return Ok(Card);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }
        [HttpGet("GetVoucherAccount")]
        public async Task<ActionResult<IEnumerable<UserVoucher>>> ShowUserVoucher()
        {
            try
            {
                var DetailVoucher = await _dbContext.UserVouchers.Select(m => new
                {
                    IDAccount = m.IdAccount,
                    IDvoucher = m.IdVoucher,
                }).ToListAsync();
                return Ok(DetailVoucher);
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
                var exist = _dbContext.Accounts.Find(id);




                exist.Address = addCheckout.Address;
                exist.ZipCode = addCheckout.ZipCode;
                exist.IdCity = addCheckout.IdCity;
                exist.OrderNote = addCheckout.OrderNote;
                exist.Phone = addCheckout.Phone;
                exist.Email = addCheckout.Email;
                exist.FullName = addCheckout.FullName;
                var random = new Random();
                var orderTime = new Models.Order
                {
                    OrderCode = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4)
                                          .Select(s => s[random.Next(s.Length)]).ToArray()),
                    TotalPrice = addCheckout.TotalPrice,
                    IdAccount = addCheckout.IdAccount,
                    Payment = 1,
                    OrderDate = DateTime.Now,
                };
                _dbContext.Orders.Add(orderTime);
                _dbContext.SaveChanges();
                var idorder = orderTime.Id;
                foreach (int seatid in addCheckout.IdSeat)
                {
                    var detailorder = new DetailOrder
                    {
                        Idorder = idorder,
                        Idseat = seatid,
                        Idshowtime = idtime,
                    };
                    _dbContext.DetailOrders.Add(detailorder);
                }
                _dbContext.SaveChanges();

                foreach (var seatAccount in addCheckout.IdSeat)
                {
                    var seats = _dbContext.DetailAccountSeats.Where(b => b.IdSeat == seatAccount && b.Status == 1).ToList();
                    foreach (var seat in seats)
                    {
                        seat.Status = 2;
                    }
                }
                if (addCheckout.IdVoucher != null || addCheckout.IdVoucher.Count != 0)
                {
                    foreach (int idvoucher in addCheckout.IdVoucher)
                    {
                        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher == idvoucher))
                        {
                            var voucher = new UserVoucher()
                            {
                                IdAccount = addCheckout.IdAccount,
                                IdVoucher = idvoucher,
                                IdOrder = idorder,
                            };
                            _dbContext.UserVouchers.Add(voucher);
                        }

                    }
                    foreach (int idvoucher in addCheckout.IdVoucher)
                    {
                        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher != idvoucher) || _dbContext.UserVouchers.Any(m => m.IdAccount != addCheckout.IdAccount && m.IdVoucher != idvoucher))
                        {
                            var voucher = _dbContext.Vouchers.Find(idvoucher);
                            if (voucher.Quatity > 0)
                            {
                                voucher.Quatity -= 1;
                                // Update the voucher in the database
                                _dbContext.SaveChanges();
                            }
                        }

                    }
                }

                _dbContext.SaveChanges();
                SendEmail(addCheckout.Email, "Movie Ticket Shop", $"Thank you for booking our tickets");
                return Ok("Add successfully");
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
                var exist = _dbContext.Accounts.Find(id);




                exist.Address = addCheckout.Address;
                exist.ZipCode = addCheckout.ZipCode;
                exist.IdCity = addCheckout.IdCity;
                exist.OrderNote = addCheckout.OrderNote;
                exist.Phone = addCheckout.Phone;
                exist.Email = addCheckout.Email;
                exist.FullName = addCheckout.FullName;
                var random = new Random();
                var orderTime = new Models.Order
                {
                    OrderCode = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4)
                                          .Select(s => s[random.Next(s.Length)]).ToArray()),
                    TotalPrice = addCheckout.TotalPrice,
                    IdAccount = addCheckout.IdAccount,
                    Payment = 0,
                    OrderDate = DateTime.Now,
                };
                _dbContext.Orders.Add(orderTime);
                _dbContext.SaveChanges();
                var idorder = orderTime.Id;
                foreach (int seatid in addCheckout.IdSeat)
                {
                    var detailorder = new DetailOrder
                    {
                        Idorder = idorder,
                        Idseat = seatid,
                        Idshowtime = idtime,
                    };
                    _dbContext.DetailOrders.Add(detailorder);
                }
                _dbContext.SaveChanges();

                foreach (var seatAccount in addCheckout.IdSeat)
                {
                    var seats = _dbContext.DetailAccountSeats.Where(b => b.IdSeat == seatAccount && b.Status == 1).ToList();
                    foreach (var seat in seats)
                    {
                        seat.Status = 2;
                    }
                }
                if (addCheckout.IdVoucher != null || addCheckout.IdVoucher.Count != 0)
                {
                    foreach (int idvoucher in addCheckout.IdVoucher)
                    {
                        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher == idvoucher))
                        {
                            var voucher = new UserVoucher()
                            {
                                IdAccount = addCheckout.IdAccount,
                                IdVoucher = idvoucher,
                                IdOrder = idorder,
                            };
                            _dbContext.UserVouchers.Add(voucher);
                        }

                    }
                    foreach (int idvoucher in addCheckout.IdVoucher)
                    {
                        if (_dbContext.UserVouchers.Any(m => m.IdAccount == addCheckout.IdAccount && m.IdVoucher != idvoucher) || _dbContext.UserVouchers.Any(m => m.IdAccount != addCheckout.IdAccount && m.IdVoucher != idvoucher))
                        {
                            var voucher = _dbContext.Vouchers.Find(idvoucher);
                            if (voucher.Quatity > 0)
                            {
                                voucher.Quatity -= 1;
                                // Update the voucher in the database
                                _dbContext.SaveChanges();
                            }
                        }

                    }
                }
                _dbContext.SaveChanges();
             

                foreach (int seatid in addCheckout.IdSeat)
                {
                    string Movies = _dbContext.DetailOrders.Where(d => d.Idshowtime == idtime).Select(a => a.IdshowtimeNavigation.IdMovieNavigation.Title).FirstOrDefault();
                    List<string> seats = _dbContext.SeatMovies.Where(d => d.Id == seatid).Select(a => a.SeatName).ToList();
                    

                }
                SendEmail(addCheckout.Email, "Movie Ticket Shop", "Thank you for booking your ticket");
                return Ok("Add successfully");
            }

            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
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
        [HttpGet("city")]
        public async Task<ActionResult<IEnumerable<City>>> ShowCity()
        {
            try
            {
                var city = _dbContext.Cities.Select(m => new
                {
                    ID = m.Id,
                    Name = m.Name,
                });
                return Ok(city);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
