using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailSeatAccount
{
    public int Id { get; set; }

    public int Idseat { get; set; }

    public int Idaccount { get; set; }

    public virtual SeatAccount IdaccountNavigation { get; set; } = null!;

    public virtual SeatMovie IdseatNavigation { get; set; } = null!;
}
