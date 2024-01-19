using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Account
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public DateOnly Birthday { get; set; }

    public string FullName { get; set; } = null!;

    public int Accounttype { get; set; }
}
