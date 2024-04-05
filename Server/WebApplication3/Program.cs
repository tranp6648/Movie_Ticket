using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<AccountService, AccountServiceImpl>();
builder.Services.AddScoped<ActorService, ActorServiceImpl>();   
builder.Services.AddScoped<BlogService, BlogServiceImpl>();
builder.Services.AddScoped<CartSetService, CartSetServiceImpl>();
builder.Services.AddScoped<CategoryBlogService,CategoryBlogServiceImpl>();
builder.Services.AddScoped<CategoryMovieService, CategoryMovieServiceImpl>();
builder.Services.AddScoped<CheckOutService, CheckOutServiceImpl>();
builder.Services.AddScoped<CinemaService, CinemaServiceImpl>();
builder.Services.AddScoped<DetailMovieService, DetailMovieServiceImpl>();
builder.Services.AddScoped<EventService,EventServiceImpl>();
builder.Services.AddScoped<GenreServicecs,GenreServiceImpl>();
builder.Services.AddScoped<MovieService,MovieServiceImpl>();
builder.Services.AddScoped<OrderService,OrderServiceImpl>();
builder.Services.AddScoped<SeatService, SeatServiceImpl>();
builder.Services.AddScoped<ShowTimeService,ShowTimeServiceImpl>();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("BrandCS")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("ReactPolicy");
app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "application/octet-stream"
});
app.UseAuthorization();

app.MapControllers();

app.Run();
