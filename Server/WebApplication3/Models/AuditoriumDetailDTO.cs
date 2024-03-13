namespace WebApplication3.Models
{
    

    public class AuditoriumDetailDTO
    {
        public int AuditoriumId { get; set; }
        public List<SeatDTO> Seats { get; set; }
        public int VipSeatsCount { get; set; }
        public int NormalSeatsCount { get; set; }
        public string NameAuditorium { get; set; }

        public string AdminName { get; set; }
    }

    
}
