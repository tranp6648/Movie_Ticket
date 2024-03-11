using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Account
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public DateOnly? Birthday { get; set; }

    public string? FullName { get; set; }

    public int Accounttype { get; set; }

    public string? ZipCode { get; set; }

    public string? Address { get; set; }

    public int? IdCity { get; set; }

    public string? OrderNote { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual City? IdCityNavigation { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<SeatAccount> SeatAccounts { get; set; } = new List<SeatAccount>();

    public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();
}
