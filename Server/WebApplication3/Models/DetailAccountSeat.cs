using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailAccountSeat
{
    public int Id { get; set; }

    public int? IdSeat { get; set; }

    public int? IdAccountSeat { get; set; }

    public int? Status { get; set; }

    public int? Idshowtime { get; set; }

    public virtual SeatAccount? IdAccountSeatNavigation { get; set; }

    public virtual SeatMovie? IdSeatNavigation { get; set; }

    public virtual Showtime? IdshowtimeNavigation { get; set; }
}
