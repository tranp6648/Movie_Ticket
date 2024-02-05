using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class SeatMovie
{
    public int Id { get; set; }

    public string SeatName { get; set; } = null!;

    public int IdCategorySeat { get; set; }

    public int IdAuditoriums { get; set; }

    public virtual ICollection<DetailAccountSeat> DetailAccountSeats { get; set; } = new List<DetailAccountSeat>();

    public virtual ICollection<DetailOrder> DetailOrders { get; set; } = new List<DetailOrder>();

    public virtual Auditorium IdAuditoriumsNavigation { get; set; } = null!;

    public virtual CategorySeat IdCategorySeatNavigation { get; set; } = null!;
}
