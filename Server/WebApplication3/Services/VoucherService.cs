using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface VoucherService
    {
        public bool AddVoucher(AddVoucher addVoucher);
        public bool DeleteVoucher(int id);
        public bool UpdateVoucher(int id, AddVoucher updateVoucher);
        public dynamic ShowVoucher();
    }
}
