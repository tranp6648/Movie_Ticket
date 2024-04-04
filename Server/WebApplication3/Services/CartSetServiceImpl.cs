using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class CartSetServiceImpl : CartSetService
    {
        private DatabaseContext _dbContext;
        public CartSetServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Addstatus(int id, int idAccount, int idshowtime)
        {
            try
            {
                SeatAccount existingSeatAccount = _dbContext.SeatAccounts
                   .FirstOrDefault(sa => sa.IdAccount == idAccount);

                int idseat;

                if (existingSeatAccount != null)
                {
                    idseat = existingSeatAccount.Id;
                }
                else
                {
                    // Insert a new SeatAccount
                    SeatAccount newSeatAccount = new SeatAccount
                    {
                        IdAccount = idAccount,

                        // Add other properties as needed
                    };

                    _dbContext.SeatAccounts.Add(newSeatAccount);
                    _dbContext.SaveChanges();
                    idseat = newSeatAccount.Id;
                }

                // Fetch all seats in the specified auditorium
                List<int> allSeatIds = _dbContext.SeatMovies
                    .Where(d => d.IdAuditoriums == id)
                    .Select(s => s.Id)
                    .ToList();

                foreach (int seatId in allSeatIds)
                {
                    // Check if the record already exists in DetailAccountSeats
                    bool recordExists = _dbContext.DetailAccountSeats
                        .Any(das => das.IdSeat == seatId && das.IdAccountSeat == idseat && das.IdShowtime == idshowtime);

                    if (!recordExists)
                    {
                        // Insert DetailAccountSeat only if it doesn't exist
                        DetailAccountSeat detailAccountSeat = new DetailAccountSeat
                        {
                            IdSeat = seatId,
                            IdAccountSeat = idseat,
                            Status = 0,
                            IdShowtime = idshowtime,
                        };
                        _dbContext.DetailAccountSeats.Add(detailAccountSeat);
                    }

                }
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowCard(int id, int IDAccount, int idshowtime)
        {
            return _dbContext.DetailAccountSeats.Where(d => d.IdSeatNavigation.IdAuditoriums == id && d.IdAccountSeatNavigation.IdAccount == IDAccount && d.IdShowtime == idshowtime).Select(m => new
            {
                id = m.Id,
                seatName = m.IdSeatNavigation.SeatName,
                categoryseat = m.IdSeatNavigation.IdCategorySeatNavigation.Price,
                NameCategory = m.IdSeatNavigation.IdCategorySeatNavigation.Name,
                status = m.Status
            }).ToList();
        }

        public dynamic ShowInfoCard(int id, int idCinema, int idShowtime)
        {
            return _dbContext.DetailAccountSeats.Where(d => d.IdAccountSeatNavigation.IdAccount == id && d.Status == 1 && d.IdSeatNavigation.IdAuditoriums == idCinema && d.IdShowtime == idShowtime).Select(m => new
            {
                id = m.IdSeat,
                Name = m.IdSeatNavigation.SeatName,
                idtime = m.IdSeatNavigation.Id,
                Price = m.IdSeatNavigation.IdCategorySeatNavigation.Price,
            }).ToList();
        }

        public bool Update(int id)
        {
            try
            {
                var seat = _dbContext.DetailAccountSeats.Find(id);
                if (seat != null)
                {
                    seat.Status = (seat.Status == 0) ? 1 : 0;
                  return  _dbContext.SaveChanges()>0;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }

        }
    }
}
