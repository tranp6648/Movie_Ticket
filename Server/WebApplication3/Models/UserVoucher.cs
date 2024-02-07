using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class UserVoucher
{
    public int Id { get; set; }

    public int IdAccount { get; set; }

    public int IdVoucher { get; set; }

    public int? IdOrder { get; set; }

    public virtual Account IdAccountNavigation { get; set; } = null!;

    public virtual Order? IdOrderNavigation { get; set; }

    public virtual Voucher IdVoucherNavigation { get; set; } = null!;
}
