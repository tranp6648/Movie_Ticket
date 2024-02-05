namespace WebApplication3.Models
{
    public class AddCheckout
    {
        public string? ZipCode { get; set; }

        public string? Address { get; set; }

        public int? IdCity { get; set; }

        public string? OrderNote { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;

        public string Phone { get; set; } = null!;
        public double TotalPrice { get; set; }

        public int IdAccount { get; set; }
        public List<int> IdSeat { get; set; }
        public List<int> IdVoucher { get; set; }
    }
}
