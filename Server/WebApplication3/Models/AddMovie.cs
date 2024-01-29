namespace WebApplication3.Models
{
    public class AddMovie
    {
    

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateOnly ReleaseDate { get; set; }

        public int Duration { get; set; }

        public int IdGenre { get; set; }
        public int idcategory { get; set; }
        public string Picture { get; set; }
        public string Trailer { get; set; }
        public string Director { get; set; } = null!;
    }
}
