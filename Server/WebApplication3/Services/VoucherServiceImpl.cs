using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class VoucherServiceImpl : VoucherService
    {
        private readonly DatabaseContext _databaseContext;
        public VoucherServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public bool AddVoucher(AddVoucher addVoucher)
        {
            try
            {
                Random random = new Random();
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                string vouchercode = new string(Enumerable.Repeat(chars, 8).Select(s => s[random.Next(chars.Length)]).ToArray());
                var VoucherAdd = new Voucher
                {
                    Code = vouchercode,
                    DiscountPercent = addVoucher.DiscountPercent,
                    ExpireDate = addVoucher.ExpireDate,
                    MinPrice = addVoucher.MinPrice,
                    Quatity = addVoucher.Quatity,
                    StartDate = addVoucher.StartDate,
                };
                _databaseContext.Vouchers.Add(VoucherAdd);
                return _databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteVoucher(int id)
        {
            try
            {
                var voucher = _databaseContext.Vouchers.Find(id);
                if (voucher == null)
                {
                    return false;
                }
                _databaseContext.Vouchers.Remove(voucher);
               return _databaseContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowVoucher()
        {
           return _databaseContext.Vouchers.Select(m => new
           {
               ID = m.Id,
               voucherCode = m.Code,
               DiscountPercent = m.DiscountPercent,
               ExpireDate = m.ExpireDate,
               MinPrice = m.MinPrice,
               Quatity = m.Quatity,
               startDate = m.StartDate,
           }).ToList();
        }

        public bool UpdateVoucher(int id, AddVoucher updateVoucher)
        {
            try
            {
                var voucher = _databaseContext.Vouchers.Find(id);
                if (voucher == null)
                {
                    return false;
                }
                voucher.StartDate = updateVoucher.StartDate;
                voucher.ExpireDate = updateVoucher.ExpireDate;
                voucher.Quatity = updateVoucher.Quatity;
                voucher.MinPrice = updateVoucher.MinPrice;
                voucher.ExpireDate = updateVoucher.ExpireDate;
                return _databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
          
        }
    }
}
