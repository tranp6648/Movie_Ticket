namespace WebApplication3.Models
{
    public class UpdateAccount
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public DateOnly Birthday { get; set; }

        public string FullName { get; set; } = null!;

    }
}
