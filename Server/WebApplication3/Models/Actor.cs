using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Actor
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Nationality { get; set; }

    public string? Image { get; set; }

    public DateOnly? Birthday { get; set; }

    public string? Bio { get; set; }

    public virtual ICollection<DetailActorMovie> DetailActorMovies { get; set; } = new List<DetailActorMovie>();
}
