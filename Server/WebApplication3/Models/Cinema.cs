using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Cinema
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Location { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string District { get; set; } = null!;

    public virtual ICollection<Showtime> Showtimes { get; set; } = new List<Showtime>();
}
