using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Seat
{
    public int Id { get; set; }

    public int IdCategorySeat { get; set; }

    public virtual CategorySeat IdCategorySeatNavigation { get; set; } = null!;
}
