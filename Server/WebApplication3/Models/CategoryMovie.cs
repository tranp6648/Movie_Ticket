using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class CategoryMovie
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<DetailCategoryMovie> DetailCategoryMovies { get; set; } = new List<DetailCategoryMovie>();
}
