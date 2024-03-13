using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebApplication3.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Actor> Actors { get; set; }

    public virtual DbSet<Auditorium> Auditoriums { get; set; }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<CategoryBlog> CategoryBlogs { get; set; }

    public virtual DbSet<CategoryMovie> CategoryMovies { get; set; }

    public virtual DbSet<CategorySeat> CategorySeats { get; set; }

    public virtual DbSet<Cinema> Cinemas { get; set; }

    public virtual DbSet<CinemaBranch> CinemaBranches { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<DetailAccountSeat> DetailAccountSeats { get; set; }

    public virtual DbSet<DetailActorMovie> DetailActorMovies { get; set; }

    public virtual DbSet<DetailCategoryMovie> DetailCategoryMovies { get; set; }

    public virtual DbSet<DetailCityBranch> DetailCityBranches { get; set; }

    public virtual DbSet<DetailOrder> DetailOrders { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<Genre> Genres { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<SeatAccount> SeatAccounts { get; set; }

    public virtual DbSet<SeatMovie> SeatMovies { get; set; }

    public virtual DbSet<Showtime> Showtimes { get; set; }

    public virtual DbSet<UserVoucher> UserVouchers { get; set; }

    public virtual DbSet<Voucher> Vouchers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlServer("Server=KYOS22;Database=Movie2902;user id=sa;password=123456;trusted_connection=true;encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.ToTable("Account");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FullName).HasMaxLength(250);
            entity.Property(e => e.IdCity).HasColumnName("id_city");
            entity.Property(e => e.OrderNote)
                .HasMaxLength(255)
                .HasDefaultValueSql("(NULL)")
                .HasComment("");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCityNavigation).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.IdCity)
                .HasConstraintName("FK_Account_city");
        });

        modelBuilder.Entity<Actor>(entity =>
        {
            entity.ToTable("Actor");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Bio)
                .HasColumnType("text")
                .HasColumnName("bio");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nationality)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nationality");
        });

        modelBuilder.Entity<Auditorium>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdCinema).HasColumnName("ID_cinema");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCinemaNavigation).WithMany(p => p.Auditoria)
                .HasForeignKey(d => d.IdCinema)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Auditoriums_Cinemas");
        });

        modelBuilder.Entity<Blog>(entity =>
        {
            entity.ToTable("Blog");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ContentBlog)
                .HasColumnType("text")
                .HasColumnName("Content_Blog");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.IdAccount).HasColumnName("id_Account");
            entity.Property(e => e.IdCategory).HasColumnName("id_Category");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.HasOne(d => d.IdAccountNavigation).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.IdAccount)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Blog_Account");

            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.IdCategory)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Blog_Category_Blog");
        });

        modelBuilder.Entity<CategoryBlog>(entity =>
        {
            entity.ToTable("Category_Blog");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<CategoryMovie>(entity =>
        {
            entity.ToTable("Category_Movie");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CategorySeat>(entity =>
        {
            entity.ToTable("Category_Seat");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Cinema>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.District).HasMaxLength(100);
            entity.Property(e => e.Idaccount).HasColumnName("IDAccount");
            entity.Property(e => e.Location)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("location");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CinemaBranch>(entity =>
        {
            entity.ToTable("Cinema_Branches");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("city");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.ToTable("city");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Type)
                .HasMaxLength(150)
                .HasColumnName("type");
        });

        modelBuilder.Entity<DetailAccountSeat>(entity =>
        {
            entity.ToTable("Detail_Account_Seat");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdAccountSeat).HasColumnName("id_Account_Seat");
            entity.Property(e => e.IdSeat).HasColumnName("id_Seat");
            entity.Property(e => e.IdShowtime).HasColumnName("ID_Showtime");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.IdAccountSeatNavigation).WithMany(p => p.DetailAccountSeats)
                .HasForeignKey(d => d.IdAccountSeat)
                .HasConstraintName("FK_Detail_Account_Seat_detail_Seat_Account");

            entity.HasOne(d => d.IdSeatNavigation).WithMany(p => p.DetailAccountSeats)
                .HasForeignKey(d => d.IdSeat)
                .HasConstraintName("FK_Detail_Account_Seat_SeatMovie");

            entity.HasOne(d => d.IdShowtimeNavigation).WithMany(p => p.DetailAccountSeats)
                .HasForeignKey(d => d.IdShowtime)
                .HasConstraintName("FK_Detail_Account_Seat_Showtimes");
        });

        modelBuilder.Entity<DetailActorMovie>(entity =>
        {
            entity.ToTable("Detail_Actor_Movie");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdActor).HasColumnName("ID_Actor");
            entity.Property(e => e.IdMovie).HasColumnName("ID_Movie");
            entity.Property(e => e.Role)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.IdActorNavigation).WithMany(p => p.DetailActorMovies)
                .HasForeignKey(d => d.IdActor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Detail_Actor_Movie_Actor");

            entity.HasOne(d => d.IdMovieNavigation).WithMany(p => p.DetailActorMovies)
                .HasForeignKey(d => d.IdMovie)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Detail_Actor_Movie_Movies");
        });

        modelBuilder.Entity<DetailCategoryMovie>(entity =>
        {
            entity.ToTable("Detail_category_movie");

            entity.HasIndex(e => e.IdMovie, "IX_Detail_category_movie");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdCategory).HasColumnName("ID_Category");
            entity.Property(e => e.IdMovie).HasColumnName("ID_movie");
            entity.Property(e => e.Picture)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Trailer)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("trailer");

            entity.HasOne(d => d.IdCategoryNavigation).WithMany(p => p.DetailCategoryMovies)
                .HasForeignKey(d => d.IdCategory)
                .HasConstraintName("FK_Detail_category_movie_Category_Movie");

            entity.HasOne(d => d.IdMovieNavigation).WithMany(p => p.DetailCategoryMovies)
                .HasForeignKey(d => d.IdMovie)
                .HasConstraintName("FK_Detail_category_movie_Movies");
        });

        modelBuilder.Entity<DetailCityBranch>(entity =>
        {
            entity.ToTable("Detail_City_Branch");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdBranch).HasColumnName("id_Branch");
            entity.Property(e => e.IdCinema).HasColumnName("id_Cinema");

            entity.HasOne(d => d.IdBranchNavigation).WithMany(p => p.DetailCityBranches)
                .HasForeignKey(d => d.IdBranch)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Detail_City_Branch_Cinema_Branches");

            entity.HasOne(d => d.IdCinemaNavigation).WithMany(p => p.DetailCityBranches)
                .HasForeignKey(d => d.IdCinema)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Detail_City_Branch_Cinemas");
        });

        modelBuilder.Entity<DetailOrder>(entity =>
        {
            entity.ToTable("DetailOrder");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Idorder).HasColumnName("IDorder");
            entity.Property(e => e.Idseat).HasColumnName("IDSeat");
            entity.Property(e => e.Idshowtime).HasColumnName("IDshowtime");

            entity.HasOne(d => d.IdorderNavigation).WithMany(p => p.DetailOrders)
                .HasForeignKey(d => d.Idorder)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DetailOrder_Order");

            entity.HasOne(d => d.IdseatNavigation).WithMany(p => p.DetailOrders)
                .HasForeignKey(d => d.Idseat)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DetailOrder_SeatMovie");

            entity.HasOne(d => d.IdshowtimeNavigation).WithMany(p => p.DetailOrders)
                .HasForeignKey(d => d.Idshowtime)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DetailOrder_Showtimes");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.ToTable("Event");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.BannerUrl)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Genre>(entity =>
        {
            entity.ToTable("Genre");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Director)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.IdGenre).HasColumnName("id_genre");
            entity.Property(e => e.Title).HasMaxLength(100);

            entity.HasOne(d => d.IdGenreNavigation).WithMany(p => p.Movies)
                .HasForeignKey(d => d.IdGenre)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Movies_Genre");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Order");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdAccount).HasColumnName("ID_Account");
            entity.Property(e => e.OrderCode)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("order_code");
            entity.Property(e => e.OrderDate).HasColumnType("datetime");

            entity.HasOne(d => d.IdAccountNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.IdAccount)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_Account");
        });

        modelBuilder.Entity<SeatAccount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_detail_seat_Auditoriums_1");

            entity.ToTable("Seat_Account");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdAccount).HasColumnName("ID_Account");

            entity.HasOne(d => d.IdAccountNavigation).WithMany(p => p.SeatAccounts)
                .HasForeignKey(d => d.IdAccount)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_detail_seat_Auditoriums_Account1");
        });

        modelBuilder.Entity<SeatMovie>(entity =>
        {
            entity.ToTable("SeatMovie");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdAuditoriums).HasColumnName("id_Auditoriums");
            entity.Property(e => e.IdCategorySeat).HasColumnName("id_category_seat");
            entity.Property(e => e.SeatName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("seat_name");

            entity.HasOne(d => d.IdAuditoriumsNavigation).WithMany(p => p.SeatMovies)
                .HasForeignKey(d => d.IdAuditoriums)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SeatMovie_Auditoriums");

            entity.HasOne(d => d.IdCategorySeatNavigation).WithMany(p => p.SeatMovies)
                .HasForeignKey(d => d.IdCategorySeat)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SeatMovie_Category_Seat");
        });

        modelBuilder.Entity<Showtime>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Endtime).HasColumnType("datetime");
            entity.Property(e => e.IdAuditoriums).HasColumnName("id_Auditoriums");
            entity.Property(e => e.IdMovie).HasColumnName("ID_Movie");
            entity.Property(e => e.Time).HasColumnType("datetime");

            entity.HasOne(d => d.IdAuditoriumsNavigation).WithMany(p => p.Showtimes)
                .HasForeignKey(d => d.IdAuditoriums)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Showtimes_Auditoriums");

            entity.HasOne(d => d.IdMovieNavigation).WithMany(p => p.Showtimes)
                .HasForeignKey(d => d.IdMovie)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Showtimes_Movies");
        });

        modelBuilder.Entity<UserVoucher>(entity =>
        {
            entity.ToTable("UserVoucher");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdAccount).HasColumnName("idAccount");
            entity.Property(e => e.IdOrder).HasColumnName("idOrder");
            entity.Property(e => e.IdVoucher).HasColumnName("ID_Voucher");

            entity.HasOne(d => d.IdAccountNavigation).WithMany(p => p.UserVouchers)
                .HasForeignKey(d => d.IdAccount)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserVoucher_Account");

            entity.HasOne(d => d.IdOrderNavigation).WithMany(p => p.UserVouchers)
                .HasForeignKey(d => d.IdOrder)
                .HasConstraintName("FK_UserVoucher_Order");

            entity.HasOne(d => d.IdVoucherNavigation).WithMany(p => p.UserVouchers)
                .HasForeignKey(d => d.IdVoucher)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserVoucher_Vouchers");
        });

        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("code");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
