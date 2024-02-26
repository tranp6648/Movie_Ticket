namespace WebApplication3.Models
{
    public class AddBlog
    {
        public string Title { get; set; } = null!;

        public string ContentBlog { get; set; } = null!;

       

        public int IdCategory { get; set; }

        public int IdAccount { get; set; }
        public string ImageUrl { get; set; } = null!;
    }
}
