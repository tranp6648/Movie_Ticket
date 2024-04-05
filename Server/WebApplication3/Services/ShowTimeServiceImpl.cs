using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class ShowTimeServiceImpl : ShowTimeService
    {
        private readonly DatabaseContext databaseContext;
        public ShowTimeServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public bool AddShowtime(AddShowtime addshowtime)
        {
            try
            {
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addshowtime.Time, "SE Asia Standard Time");

                // Format the DateTime as a string in Vietnamese datetime format
                string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addshowtime.Endtime, "SE Asia Standard Time");
                string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
                if(addshowtime == null)
                {
                    return false;
                }
                var showtimeAdd = new Showtime
                {
                    Time = vietnamTime,
                    Endtime = Endtime,
                    IdAuditoriums = addshowtime.IdAuditoriums,
                    IdMovie = addshowtime.IdMovie,

                };
                databaseContext.Showtimes.Add(showtimeAdd);
               return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteShowTime(int id)
        {
            try
            {
                var Showtimes123 = databaseContext.Showtimes.Find(id);
                if(Showtimes123 == null)
                {
                    return false;
                }
                databaseContext.Showtimes.Remove(Showtimes123);
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic getAudi()
        {
            return databaseContext.Auditoriums.Select(m => new
            {
                ID = m.Id,
                Name = m.Name,
                ID_Cinema = m.IdCinema
            }).ToList();
        }

        public dynamic getBrance(int id)
        {
            return databaseContext.DetailCityBranches.Where(d => d.IdCinemaNavigation.Idaccount == id).Select(m => new
            {

                ID = m.IdCinemaNavigation.Id,
                Name = m.IdCinemaNavigation.Name,
                District = m.IdCinemaNavigation.District,
                IDcity = m.IdBranchNavigation.Id,
            }).ToList();
        }

        public dynamic getCityBrance(int id)
        {
            return databaseContext.CinemaBranches.Where(d => d.DetailCityBranches.Any(b => b.IdCinemaNavigation.Idaccount == id)).Select(m => new
            {
                ID = m.Id,
                City = m.City
            }).ToList(); ;
        }

        public dynamic GetInfo(DateTime datetime, int id)
        {
            return databaseContext.Showtimes
      .Where(a => a.Time.Year == datetime.Year && a.Time.Month == datetime.Month && a.Time.Day == datetime.Day && a.IdMovie == id && databaseContext.SeatMovies.Any(b => b.IdAuditoriums == a.IdAuditoriums)).Select(m => new
      {
          id = m.IdAuditoriumsNavigation.Id,
          idTime = m.Id,
          Auth = m.IdAuditoriumsNavigation.IdCinemaNavigation.Name,
          Ditrict = m.IdAuditoriumsNavigation.IdCinemaNavigation.District,
          Time = m.Time,
          Cinema = m.IdAuditoriumsNavigation.IdCinemaNavigation.Name
      })
      .ToList();
        }

        public dynamic getMovie()
        {
            return databaseContext.Movies.Select(m => new
            {
                ID = m.Id,
                Name = m.Title,
                duration = m.Duration
            }).ToList();
        }

        public dynamic getShow(int id)
        {
            return databaseContext.Showtimes.Where(a => a.IdAuditoriumsNavigation.IdCinemaNavigation.Idaccount == id).Select(d => new
            {
                ID = d.Id,
                Time = d.Time,
                NameMovie = d.IdMovieNavigation.Title,
                duration = d.IdMovieNavigation.Duration,
                NameAuthor = d.IdAuditoriumsNavigation.Name,
                Cinema = d.IdAuditoriumsNavigation.IdCinemaNavigation.Name,
                District = d.IdAuditoriumsNavigation.IdCinemaNavigation.District
            }).ToList();
        }

        public dynamic getshowtime(int id)
        {
            DateTime currentDate = DateTime.Now;
            DateTime endDate = currentDate.AddDays(10);
            return databaseContext.Showtimes
                    .Where(a => a.Time >= currentDate && a.Endtime <= endDate && a.IdMovieNavigation.Id == id)
                    .Select(m => new
                    {
                        Time = m.Time,
                    }).GroupBy(a => new { a.Time.Year, a.Time.Month, a.Time.Day })
                    .Select(group => group.First())
                    .ToList();
        }

        public bool Update(int id, UpdateShowtime genre)
        {
            try
            {
                var existingGenre = databaseContext.Showtimes.Find(id);
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(genre.Time, "SE Asia Standard Time");
                DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(genre.Endtime, "SE Asia Standard Time");
                string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
                string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
                existingGenre.Time = vietnamTime;

                existingGenre.Endtime = Endtime;
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
