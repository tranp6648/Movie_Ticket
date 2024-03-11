using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Cinema
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Location { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string District { get; set; } = null!;

    public int? Idaccount { get; set; }

    public virtual ICollection<Auditorium> Auditoria { get; set; } = new List<Auditorium>();

    public virtual ICollection<DetailCityBranch> DetailCityBranches { get; set; } = new List<DetailCityBranch>();
}
