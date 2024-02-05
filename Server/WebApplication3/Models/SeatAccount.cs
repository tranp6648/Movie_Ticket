using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class SeatAccount
{
    public int Id { get; set; }

    public int IdAccount { get; set; }

    public virtual ICollection<DetailAccountSeat> DetailAccountSeats { get; set; } = new List<DetailAccountSeat>();

    public virtual Account IdAccountNavigation { get; set; } = null!;
}
