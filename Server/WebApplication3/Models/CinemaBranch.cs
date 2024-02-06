using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class CinemaBranch
{
    public int Id { get; set; }

    public string City { get; set; } = null!;

    public virtual ICollection<DetailCityBranch> DetailCityBranches { get; set; } = new List<DetailCityBranch>();
}
