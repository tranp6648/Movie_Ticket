using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface ShowTimeService
    {
        public bool DeleteShowTime(int id);
        public bool Update(int id, UpdateShowtime genre);
        public dynamic GetInfo(DateTime datetime, int id);
        public dynamic getshowtime(int id);
        public dynamic getShow(int id);
        public bool AddShowtime(AddShowtime addshowtime);
        public dynamic getAudi();
        public dynamic getBrance(int id);
        public dynamic getCityBrance(int id);
        public dynamic getMovie();
    }
}
