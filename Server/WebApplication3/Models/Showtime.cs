using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Showtime
{
    public int Id { get; set; }

    public DateTime Time { get; set; }

    public int IdAuditoriums { get; set; }

    public int IdCinema { get; set; }

    public int IdMovie { get; set; }

    public virtual Auditorium IdAuditoriumsNavigation { get; set; } = null!;

    public virtual Cinema IdCinemaNavigation { get; set; } = null!;

    public virtual Movie IdMovieNavigation { get; set; } = null!;
}
