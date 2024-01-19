using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailSeatAuditorium
{
    public int IdAuditoriums { get; set; }

    public int IdSeat { get; set; }

    public int Status { get; set; }

    public string SeatName { get; set; } = null!;
}
