namespace WebApplication3.Models
{
    public class AddVoucher
    {


     

        public int DiscountPercent { get; set; }

        public DateOnly ExpireDate { get; set; }

        public double MinPrice { get; set; }

        public int Quatity { get; set; }

        public DateOnly StartDate { get; set; }
    }
}
