using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using PayPal.Api;
using System.Linq;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class MovieServiceImpl : MovieService
    {
        private readonly DatabaseContext _dbContext;
        private readonly IWebHostEnvironment _environment;
        public MovieServiceImpl(DatabaseContext dbContext, IWebHostEnvironment environment)
        {
            _dbContext = dbContext;
            _environment = environment;
        }
        private void DeletePictureFromFolder(int movieID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"movie_{movieID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        private void DeleteMovie(int movieID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "videos", $"movie_{movieID}_picture.mp4");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        public bool DeleteMovie(int id)
        {
            try
            {
                var showtime = _dbContext.Showtimes.FirstOrDefault(cm => cm.IdMovie == id);
                var categoryMovie = _dbContext.DetailCategoryMovies.FirstOrDefault(cm => cm.IdMovie == id);
                var detailActor = _dbContext.DetailActorMovies.FirstOrDefault(cm => cm.IdMovie == id);
                var Movie = _dbContext.Movies.Find(id);
                if (Movie == null)
                {
                    return false;
                }
                if (categoryMovie != null)
                {
                    _dbContext.DetailCategoryMovies.Remove(categoryMovie);
                }
                if (detailActor != null)
                {
                    return false;
                }
                if (showtime != null)
                {
                    return false;
                }
                _dbContext.Movies.Remove(Movie);
                _dbContext.SaveChanges();
                DeletePictureFromFolder(id, _environment.WebRootPath);
                DeleteMovie(id, _environment.WebRootPath);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateMovie(int id, updateMovie addMovie)
        {
            try
            {
                if(addMovie==null)
                {
                    return false;
                }
                var existMovie = _dbContext.Movies.Find(id);
                if(existMovie==null) {
                    return false;
                }
                existMovie.Title = addMovie.Title;
                existMovie.ReleaseDate = addMovie.ReleaseDate;
                existMovie.Duration = addMovie.Duration;
                existMovie.IdGenre = addMovie.IdGenre;
                existMovie.Director = addMovie.Director;
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
        private Movie MapAddMovieToMovie(AddMovie addMovie)
        {
            return new Movie
            {

                Title = addMovie.Title,
                Description = addMovie.Description,
                ReleaseDate = addMovie.ReleaseDate,
                Duration = addMovie.Duration,
                IdGenre = addMovie.IdGenre,
                Director = addMovie.Director
                // Map other properties as needed
            };
        }
        private string SavePictureToFolder(string pictureBase64, int movieid, string webRootBath)
        {
            // Check for Data URL prefix and remove it
            if (pictureBase64.StartsWith("data:image"))
            {
                pictureBase64 = pictureBase64.Split(',')[1];
            }

            // Ensure correct padding
            pictureBase64 = pictureBase64.PadRight((pictureBase64.Length + 3) & ~3, '=');

            try
            {
                byte[] pictureBytes = Convert.FromBase64String(pictureBase64);
                string folderPath = Path.Combine(webRootBath, "image");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string filename = $"movie_{movieid}_picture.png";
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine("image", filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
            }
        }
        private string SaveVideoToFolder(string base64String, int movieId, string webrootpath)
        {
            if (base64String.StartsWith("data:video"))
            {
                base64String = base64String.Split(',')[1];
            }

            // Ensure correct padding
            base64String = base64String.PadRight((base64String.Length + 3) & ~3, '=');

            try
            {
                byte[] pictureBytes = Convert.FromBase64String(base64String);
                string folderPath = Path.Combine(webrootpath, "videos");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string filename = $"movie_{movieId}_picture.mp4";
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine("videos", filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
            }
        }
        public bool AddMovie(AddMovie addMovie)
        {
            try
            {
                if (addMovie == null)
                {
                    return false;
                }
                Movie movieToAdd = MapAddMovieToMovie(addMovie);
                _dbContext.Movies.Add(movieToAdd);
                _dbContext.SaveChanges();
                int movieId = movieToAdd.Id;
                string imagePath = SavePictureToFolder(addMovie.Picture, movieId, _environment.WebRootPath);
                string trailerPath = SaveVideoToFolder(addMovie.Trailer, movieId, _environment.WebRootPath);
                DetailCategoryMovie detailCategoryMovie = new DetailCategoryMovie
                {
                    IdMovie = movieId,
                    IdCategory = addMovie.idcategory,
                    Picture = imagePath,
                    Trailer = trailerPath,

                };
                _dbContext.DetailCategoryMovies.Add(detailCategoryMovie);
              return  _dbContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Orderdesc()
        {
            return _dbContext.Accounts.Where(a => a.Accounttype == 1).OrderByDescending(a => a.Orders.Count)
                      .Take(3)
                      .Select(d => new
                      {
                          Username = d.Username,
                          Ordercount = d.Orders.Count,
                          FullName = d.FullName
                      }).ToList();
        }

        public dynamic CountShowtime()
        {
            return _dbContext.Showtimes.Where(d => d.Time >= DateTime.Now).Count();
        }

        public dynamic CountOrder()
        {
            return _dbContext.Orders.Count();
        }

        public dynamic CountGenre()
        {
            return _dbContext.Genres.Count();
        }

        public dynamic CountEvent()
        {
            return _dbContext.Events.Count();
        }

        public dynamic CountAccount()
        {
            return _dbContext.Accounts.Where(d => d.Accounttype == 1).Count();
        }

        public dynamic CountActor()
        {
            return _dbContext.Actors.Count();
        }

        public dynamic CountCategoryMovie()
        {
            return _dbContext.CategoryMovies.Count();
        }

        public dynamic CountMovie()
        {
            return _dbContext.Movies.Count();
        }

        public dynamic UserVoucher()
        {
           return _dbContext.Vouchers.Where(d => d.Quatity > 0 && DateTime.Now.Day <= d.ExpireDate.Day && DateTime.Now.Month <= d.ExpireDate.Month && DateTime.Now.Year <= d.ExpireDate.Year && DateTime.Now.Day >= d.StartDate.Day && DateTime.Now.Month >= d.StartDate.Month && DateTime.Now.Year >= d.StartDate.Year).Select(d => new
           {
               VoucherCode = d.Code,
               DiscountPercent = d.DiscountPercent,
               ExpireDate = d.ExpireDate,
               Minprice = d.MinPrice,
               Quality = d.Quatity,
               startDate = d.StartDate,
           }).ToList();
        }

        public dynamic ShowMovie()
        {
            return _dbContext.Movies.Where(d => d.Showtimes.Any(e => DateTime.Now < e.Time)).Select(m => new
            {
               
                id = m.Id,
                Title = m.Title,
                ReleaseDate = m.ReleaseDate,
                duration = m.Duration,
                director = m.Director,
                description = m.Description,
                idgenre = m.IdGenreNavigation.Id,
                GenreName = m.IdGenreNavigation.Name,
                DetailCategoryMovies = m.DetailCategoryMovies.Select(d => new
                {

                    Id = d.Id,

                    IdCategoryNavigation = new
                    {
                        Name = d.IdCategoryNavigation.Name,


                    },
                    Picture = d.Picture,
                    Trailer = d.Trailer
                }),


            })
      .ToList();
        }

        public dynamic getMovie()
        {
            return _dbContext.Movies.Select(m => new
            {
                // Specify the properties you want to include in the projection
                id = m.Id,
                Title = m.Title,
                ReleaseDate = m.ReleaseDate,
                duration = m.Duration,
                director = m.Director,
                description = m.Description,
                idgenre = m.IdGenreNavigation.Id,
                GenreName = m.IdGenreNavigation.Name,
                DetailCategoryMovies = m.DetailCategoryMovies.Select(d => new
                {

                    Id = d.Id,

                    IdCategoryNavigation = new
                    {
                        Name = d.IdCategoryNavigation.Name,


                    },
                    Picture = d.Picture,
                    Trailer = d.Trailer
                }),


            })
      .ToList();
        }

        public dynamic getCategory()
        {
            return _dbContext.CategoryMovies.Select(x => new
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }

        public dynamic GetGender()
        {
            var genres =  _dbContext.Genres.ToList();
            return genres.Select(x => new Genre { Id = x.Id, Name = x.Name }).ToList();
        }
    }
}
