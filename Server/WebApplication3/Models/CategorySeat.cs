using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class CategorySeat
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public double Price { get; set; }

    public virtual ICollection<SeatMovie> SeatMovies { get; set; } = new List<SeatMovie>();
}
