using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Blog
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string ContentBlog { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public int IdCategory { get; set; }

    public int IdAccount { get; set; }

    public string ImageUrl { get; set; } = null!;

    public virtual Account IdAccountNavigation { get; set; } = null!;

    public virtual CategoryBlog IdCategoryNavigation { get; set; } = null!;
}
