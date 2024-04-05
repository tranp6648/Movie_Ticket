using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface SeatService
    {
        public bool SaveSeat(List<AddAuditorium> addAuditoriums, int idCinema);
        public dynamic getAuditorium();
    }
}
