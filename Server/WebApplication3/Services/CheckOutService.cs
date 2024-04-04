namespace WebApplication3.Services
{
    public interface CheckOutService
    {
        public dynamic ShowUserVoucher();
        public dynamic ShowInfoCard(int id, int IDAccount, int idshowtime);
        public dynamic getVoucher();
    }
}
