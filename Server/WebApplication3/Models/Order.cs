using System;
using System.Collections.Generic;

namespace WebApplication3.Models;

public partial class Order
{
    public int Id { get; set; }

    public string OrderCode { get; set; } = null!;

    public double TotalPrice { get; set; }

    public int IdAccount { get; set; }

    public int Payment { get; set; }

    public DateTime OrderDate { get; set; }

    public virtual ICollection<DetailOrder> DetailOrders { get; set; } = new List<DetailOrder>();

    public virtual Account IdAccountNavigation { get; set; } = null!;

    public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();
}
