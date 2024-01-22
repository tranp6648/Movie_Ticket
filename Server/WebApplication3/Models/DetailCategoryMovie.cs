using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailCategoryMovie
{
    public int? IdMovie { get; set; }

    public int? IdCategory { get; set; }

    public string? Picture { get; set; }

    public string? Trailer { get; set; }

    public int Id { get; set; }

    public virtual CategoryMovie? IdCategoryNavigation { get; set; }

    public virtual Movie? IdMovieNavigation { get; set; }
}
