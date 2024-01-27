using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class District
{
    public string Id { get; set; } = null!;

    public string NameDistrict { get; set; } = null!;

    public int Idcity { get; set; }

    public virtual CinemaBranch IdcityNavigation { get; set; } = null!;
}
