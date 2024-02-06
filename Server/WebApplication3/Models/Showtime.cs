using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Showtime
{
    public int Id { get; set; }

    public DateTime Time { get; set; }

    public int IdAuditoriums { get; set; }

    public int IdMovie { get; set; }

    public DateTime Endtime { get; set; }

    public virtual ICollection<DetailAccountSeat> DetailAccountSeats { get; set; } = new List<DetailAccountSeat>();

    public virtual ICollection<DetailOrder> DetailOrders { get; set; } = new List<DetailOrder>();

    public virtual Auditorium IdAuditoriumsNavigation { get; set; } = null!;

    public virtual Movie IdMovieNavigation { get; set; } = null!;
}
