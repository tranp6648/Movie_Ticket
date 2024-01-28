using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailActorMovie
{
    public int Id { get; set; }

    public int IdMovie { get; set; }

    public int IdActor { get; set; }

    public string Role { get; set; } = null!;

    public virtual Actor IdActorNavigation { get; set; } = null!;

    public virtual Movie IdMovieNavigation { get; set; } = null!;
}
