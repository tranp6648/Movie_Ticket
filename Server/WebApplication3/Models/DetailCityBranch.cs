using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class DetailCityBranch
{
    public int IdCinema { get; set; }

    public int IdBranch { get; set; }

    public int Id { get; set; }

    public virtual CinemaBranch IdBranchNavigation { get; set; } = null!;

    public virtual Cinema IdCinemaNavigation { get; set; } = null!;
}
