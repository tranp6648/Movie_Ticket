using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class CategoryBlog
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();
}
