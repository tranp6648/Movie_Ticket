using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class CinemaServiceImpl : CinemaService
    {
        private DatabaseContext _dbContext;
        public CinemaServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        private Cinema MaptoCinema(AddCinema addMovie)
        {
            return new Cinema
            {

                Name = addMovie.Name,
                Location = addMovie.Location,
                Phone = addMovie.Phone,
                District = addMovie.District,

            };
        }
        public bool AddCinema(AddCinema addCinema)
        {
            try
            {
                if (addCinema == null)
                {
                    return false;
                }
                Cinema cinema1 = MaptoCinema(addCinema);
                _dbContext.Cinemas.Add(cinema1);
                _dbContext.SaveChanges();
                int cinemaID = cinema1.Id;
                DetailCityBranch detailCityBranch = new DetailCityBranch
                {
                    IdBranch = addCinema.IdBranch,
                    IdCinema = cinemaID
                };
                _dbContext.DetailCityBranches.Add(detailCityBranch);
                return _dbContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic getCinema()
        {
            return _dbContext.DetailCityBranches.Select(m => new
            {
                ID = m.IdCinemaNavigation.Id,
                Location = m.IdCinemaNavigation.Location,
                Name = m.IdCinemaNavigation.Name,
                Phone = m.IdCinemaNavigation.Phone,
                District = m.IdCinemaNavigation.District,
                City = m.IdBranchNavigation.City,
                IdAccount = m.IdCinemaNavigation.Idaccount


            }).ToList();
        }

        public bool UpdateCinema(int id, updateCinema updateCinema)
        {
            try
            {
                if (updateCinema == null)
                {
                    return false;
                }
                var existCinema = _dbContext.Cinemas.Find(id);
                if (existCinema == null)
                {
                    return false;
                }
                existCinema.Name = updateCinema.Name;
                existCinema.Location = updateCinema.Location;
                existCinema.Phone = updateCinema.Phone;
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                var DetailCinemal = _dbContext.DetailCityBranches.FirstOrDefault(cm => cm.IdCinema == id);
                var Cinema = _dbContext.Cinemas.Find(id);
                if (Cinema == null)
                {
                    return false;
                }
                if (DetailCinemal != null)
                {
                    _dbContext.DetailCityBranches.Remove(DetailCinemal);
                }
                _dbContext.Cinemas.Remove(Cinema);
              return  _dbContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic getBranches()
        {
            var Branches =  _dbContext.CinemaBranches.ToList();
            return Branches.Select(x => new CinemaBranch { Id = x.Id, City = x.City }).ToList();
        }
    }
}
