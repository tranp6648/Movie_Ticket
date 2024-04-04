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

        public dynamic ShowUserVoucher()
        {
            return _dbContext.UserVouchers.Select(m => new
            {
                IDAccount = m.IdAccount,
                IDvoucher = m.IdVoucher,
            }).ToList();
        }
    }
}
