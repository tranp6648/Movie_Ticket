using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailOrder
{
    public int Id { get; set; }

    public int Idorder { get; set; }

    public int Idseat { get; set; }

    public int Idshowtime { get; set; }

    public virtual Order IdorderNavigation { get; set; } = null!;

    public virtual SeatMovie IdseatNavigation { get; set; } = null!;

    public virtual Showtime IdshowtimeNavigation { get; set; } = null!;
}
