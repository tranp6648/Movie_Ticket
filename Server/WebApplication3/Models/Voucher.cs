using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Voucher
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public int DiscountPercent { get; set; }

    public DateOnly ExpireDate { get; set; }

    public double MinPrice { get; set; }

    public int Quatity { get; set; }

    public DateOnly StartDate { get; set; }

    public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();
}
