namespace WebApplication3.Models
{
    public class AddMovie
    {
    

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateOnly ReleaseDate { get; set; }

        public int Duration { get; set; }

        public int IdGenre { get; set; }
    }
}
