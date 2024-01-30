namespace WebApplication3.Models
{
    public class AddActor
    {
        public string Name { get; set; } = null!;

        public string Nationality { get; set; } = null!;

        public string Image { get; set; } 

        public DateOnly Birthday { get; set; }

        public string Bio { get; set; } 
    }
}
