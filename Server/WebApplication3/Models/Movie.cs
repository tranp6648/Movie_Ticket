using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Movie
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly ReleaseDate { get; set; }

    public int Duration { get; set; }

    public int IdGenre { get; set; }

    public virtual Genre IdNavigation { get; set; } = null!;
}
