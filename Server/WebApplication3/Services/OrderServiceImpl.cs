using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using WebApplication3.Models;
using PayPal.Api;

namespace WebApplication3.Services
{
    public class OrderServiceImpl : OrderService
    {
        private DatabaseContext _databaseContext;
        public OrderServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public dynamic GetCoutorder(int datetime)
        {
            return _databaseContext.Orders.Where(p => p.OrderDate.Month == datetime)
            .GroupBy(o => o.OrderDate.Date)

            .Select(g => new { OrderDate = g.Key, OrderCount = g.Count() })
            .OrderBy(x => x.OrderDate)
            .ToList();
        }

        public dynamic Myorder(int id)
        {
            return _databaseContext.DetailOrders.Where(d => d.IdorderNavigation.IdAccount == id)
                    .Select(m => new
                    {
                        Title = m.IdshowtimeNavigation.IdMovieNavigation.Title,
                        TotalPrice = m.IdseatNavigation.IdCategorySeatNavigation.Price,
                        SeatName = m.IdseatNavigation.SeatName,
                        Picture = m.IdshowtimeNavigation.IdMovieNavigation.DetailCategoryMovies.FirstOrDefault().Picture,
                        Time = m.IdshowtimeNavigation.Time,
                        CategoryName = m.IdseatNavigation.IdCategorySeatNavigation.Name
                    })
                    .ToList();
        }

        public dynamic SeatMovie(int id)
        {
            return _databaseContext.DetailOrders.Where(d => d.Idorder == id).Select(d => new
            {
                SeatName = d.IdseatNavigation.SeatName,
                NameSeatCategory = d.IdseatNavigation.IdCategorySeatNavigation.Name,
                Price = d.IdseatNavigation.IdCategorySeatNavigation.Price

            }).ToList();
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
        public bool SendContact(SendContact sendContact)
        {
            try
            {

                SendEmail(sendContact.Email, "Contact Information", $"Name:{sendContact.Name}\n Email:{sendContact.Email}\n Phone:{sendContact.Phone}\n Subject:{sendContact.subject}\n Comment:{sendContact.Comment}");
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Voucherprice(int id)
        {
            return _databaseContext.Vouchers.Where(d => d.UserVouchers.Any(uv => uv.IdOrder == id)).Sum(d => d.DiscountPercent);
        }

        public dynamic ViewAccount(int id)
        {
            return _databaseContext.Orders.Where(d => d.Id == id).Select(d => new
            {
                FullName = d.IdAccountNavigation.FullName,
                Birthday = d.IdAccountNavigation.Birthday,
                Phone = d.IdAccountNavigation.Phone,
                Address = d.IdAccountNavigation.Address,
                city = d.IdAccountNavigation.IdCityNavigation.Name,
                Zipcode = d.IdAccountNavigation.ZipCode

            }).FirstOrDefault();
        }

        public dynamic ShowOrder(int id)
        {
            return _databaseContext.DetailOrders.Where(d => d.IdseatNavigation.IdAuditoriumsNavigation.IdCinemaNavigation.Idaccount == id).Select(m => new
            {
                id = m.IdorderNavigation.Id,
                orderCode = m.IdorderNavigation.OrderCode,
                User = m.IdorderNavigation.IdAccountNavigation.Username,
                Payment = m.IdorderNavigation.Payment,
                Dateorder = m.IdorderNavigation.OrderDate,
                Movie = m.IdshowtimeNavigation.IdMovieNavigation.Title,
            }).ToList();
        }

        public bool AddOrder(Addorder addorder)
        {
            try
            {
                var random = new Random();
                var orderTime = new Models.Order
                {
                    OrderCode = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4)
                                          .Select(s => s[random.Next(s.Length)]).ToArray()),
                    TotalPrice = addorder.TotalPrice,
                    IdAccount = addorder.IdAccount,
                };
                _databaseContext.Orders.Add(orderTime);
                _databaseContext.SaveChanges();
                var idorder = orderTime.Id;
                foreach (int seatid in addorder.IdSeat)
                {
                    var detailorder = new DetailOrder
                    {
                        Idorder = idorder,
                        Idseat = seatid,
                    };
                    _databaseContext.DetailOrders.Add(detailorder);
                }
                _databaseContext.SaveChanges();

                foreach (var seatAccount in addorder.IdSeat)
                {
                    var seats = _databaseContext.DetailAccountSeats.Where(b => b.IdSeat == seatAccount && b.Status == 1).ToList();
                    foreach (var seat in seats)
                    {
                        seat.Status = 2;
                    }
                }
                return _databaseContext.SaveChanges() > 0;

            }
            catch
            {
                return false;
            }
        }
    }
}
