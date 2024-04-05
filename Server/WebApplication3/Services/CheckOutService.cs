using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface CheckOutService
    {
        public dynamic ShowUserVoucher();
        public dynamic ShowInfoCard(int id, int IDAccount, int idshowtime);
        public dynamic getVoucher();
        public dynamic getAccount(int id);
        public dynamic ShowSeat(int id, int IDAccount, int idshowtime);
        public bool PaymentByPaypal(int id, int idtime, AddCheckout addCheckout);
        public bool Addorder(int id, int idtime, AddCheckout addCheckout);
        public dynamic ShowCity();
    }
}
