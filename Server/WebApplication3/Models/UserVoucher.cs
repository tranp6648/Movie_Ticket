using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class UserVoucher
{
    public int Id { get; set; }

    public int IdAccount { get; set; }

    public int VoucherId { get; set; }

    public virtual Account IdAccountNavigation { get; set; } = null!;

    public virtual Voucher Voucher { get; set; } = null!;
}
