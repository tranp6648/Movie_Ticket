using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Showtime
{
    public int Id { get; set; }

    public DateTime Starttime { get; set; }

    public DateTime Endtime { get; set; }

    public int IdAuditoriums { get; set; }

    public int IdCinema { get; set; }

    public virtual Auditorium IdAuditoriumsNavigation { get; set; } = null!;

    public virtual Cinema IdCinemaNavigation { get; set; } = null!;
}
