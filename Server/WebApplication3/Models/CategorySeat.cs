﻿using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class CategorySeat
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();
}
