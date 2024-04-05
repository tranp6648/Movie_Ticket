using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface OrderService
    {
        public dynamic Voucherprice(int id);
        public dynamic GetCoutorder(int datetime);
        public dynamic SeatMovie(int id);
        public dynamic Myorder(int id);
        public bool SendContact(SendContact sendContact);
        public dynamic ViewAccount(int id);
        public dynamic ShowOrder(int id);
        public bool AddOrder(Addorder addorder);
    }
}
