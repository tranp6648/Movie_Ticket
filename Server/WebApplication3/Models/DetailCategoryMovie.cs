using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailCategoryMovie
{
    public int IdMovie { get; set; }

    public int IdCategory { get; set; }

    public string Picture { get; set; } = null!;

    public string Trailer { get; set; } = null!;

    public virtual CategoryMovie IdCategoryNavigation { get; set; } = null!;

    public virtual Movie IdMovieNavigation { get; set; } = null!;
}
