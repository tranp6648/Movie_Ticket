using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class City
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
