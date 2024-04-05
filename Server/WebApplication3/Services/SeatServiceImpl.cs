using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class SeatServiceImpl : SeatService
    {
        private DatabaseContext databaseContext;
        public SeatServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public dynamic getAuditorium()
        {
           return databaseContext.Auditoriums.Select(m => new
           {
               id = m.Id,
               Name = m.Name,
               IdCinema = m.IdCinema

           }).ToList();
        }

        public bool SaveSeat(List<AddAuditorium> addAuditoriums, int idCinema)
        {
            try
            {
                var cinemaExists = databaseContext.Cinemas.Any(c => c.Id == idCinema);
                if(!cinemaExists)
                {
                    return false;
                }
                if (addAuditoriums == null || addAuditoriums.Any(a => string.IsNullOrWhiteSpace(a.Name)))
                {
                    return false;
                }
                foreach (var addAuditorium in addAuditoriums)
                {
                    var auditoriumEntity = new Auditorium
                    {
                        Name = addAuditorium.Name,
                        IdCinema = idCinema,
                    };

                    databaseContext.Auditoriums.Add(auditoriumEntity);
                     databaseContext.SaveChangesAsync();
                    foreach (var seat in addAuditorium.Seats)
                    {

                        var seatMovie = new SeatMovie
                        {
                            SeatName = seat.SeatName,
                            IdCategorySeat = seat.Type == "1" ? 1 : 2,
                            IdAuditoriums = auditoriumEntity.Id
                        };
                        databaseContext.SeatMovies.Add(seatMovie);
                    }


                }
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
