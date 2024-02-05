using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Auditorium
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int IdCinema { get; set; }

    public virtual Cinema IdCinemaNavigation { get; set; } = null!;

    public virtual ICollection<SeatMovie> SeatMovies { get; set; } = new List<SeatMovie>();

    public virtual ICollection<Showtime> Showtimes { get; set; } = new List<Showtime>();
}
