using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface CinemaService
    {
        public dynamic getCinema();
        public bool UpdateCinema(int id,updateCinema updateCinema);
        public bool AddCinema(AddCinema addCinema);
        public bool Delete(int id);
        public dynamic getBranches();
    }
}
