namespace WebApplication3.Models
{
    public class Addorder
    {
        public double TotalPrice { get; set; }

        public int IdAccount { get; set; }
        public List<int> IdSeat { get; set; }
    }
}
