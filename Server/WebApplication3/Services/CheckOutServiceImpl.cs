using System.Net;
using System.Net.Mail;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class CheckOutServiceImpl : CheckOutService
    {
        private readonly DatabaseContext _dbContext;
        public CheckOutServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public dynamic getAccount(int id)
        {
            return _dbContext.Accounts.Where(d => d.Id == id).Select(m => new
            {
                FullName = m.FullName,
                Zipcode = m.ZipCode,
                Phone = m.Phone,
                Email = m.Email,
                IDcity = m.IdCity,
                streetAddress = m.Address
            }).FirstOrDefault();
        }

        public dynamic getVoucher()
        {
            DateOnly currentDate = DateOnly.FromDateTime(DateTime.Now);
            return _dbContext.Vouchers.Where(d=> d.ExpireDate >= currentDate && d.Quatity > 0).Select(d => new
            {
                id = d.Id,
                code = d.Code,
                Minprice = d.MinPrice,
                DiscountPercent = d.DiscountPercent,
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
        public bool PaymentByPaypal(int id, int idtime, AddCheckout addCheckout)
        {
            try
            {
                var exist= _dbContext.Accounts.Find(id);
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
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowInfoCard(int id, int IDAccount, int idshowtime)
        {
            return _dbContext.DetailAccountSeats.Where(d => d.IdSeatNavigation.IdAuditoriums == id && d.IdAccountSeatNavigation.IdAccount == IDAccount && d.IdShowtime == idshowtime && d.Status == 1).Select(d => new
            {
                Movie = d.IdShowtimeNavigation.IdMovieNavigation.Title,
                Date = d.IdShowtimeNavigation.Time,
                Room = d.IdSeatNavigation.IdAuditoriumsNavigation.Name,
                Address = d.IdSeatNavigation.IdAuditoriumsNavigation.IdCinemaNavigation.Location + ' ' + d.IdSeatNavigation.IdAuditoriumsNavigation.IdCinemaNavigation.District
            }).FirstOrDefault();
        }

        public dynamic ShowSeat(int id, int IDAccount, int idshowtime)
        {
            return _dbContext.DetailAccountSeats.Where(d => d.IdSeatNavigation.IdAuditoriums == id && d.IdAccountSeatNavigation.IdAccount == IDAccount && d.IdShowtime == idshowtime && d.Status == 1).Select(m => new
            {
                id = m.IdSeatNavigation.Id,
                Name = m.IdSeatNavigation.SeatName,
            }).ToList();
        }

        public dynamic ShowUserVoucher()
        {
            return _dbContext.UserVouchers.Select(m => new
            {
                IDAccount = m.IdAccount,
                IDvoucher = m.IdVoucher,
            }).ToList();
        }

        public bool Addorder(int id, int idtime, AddCheckout addCheckout)
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
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowCity()
        {
            return _dbContext.Cities.Select(m => new
            {
                ID = m.Id,
                Name = m.Name,
            }).ToList();
        }
    }
}
