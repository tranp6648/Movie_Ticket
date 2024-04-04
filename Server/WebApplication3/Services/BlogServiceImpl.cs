using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class BlogServiceImpl : BlogService
    {
        private readonly DatabaseContext databaseContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        public BlogServiceImpl(DatabaseContext databaseContext, IWebHostEnvironment webHostEnvironment)
        {
            this.databaseContext = databaseContext;
            this.webHostEnvironment = webHostEnvironment;
        }

        public dynamic DetailBlog(int id)
        {
           return databaseContext.Blogs.Where(d => d.Id == id).Select(d => new
           {
               id = d.Title,
               name = d.ContentBlog,
               ImageUrl = d.ImageUrl,
           }).ToList();
        }

        public dynamic ShowBlog()
        {
            return databaseContext.Blogs.Select(x => new
            {
                ID = x.Id,
                Title = x.Title,
                Content_Blog = x.ContentBlog,
                CreatedAt = x.CreatedAt,
                idCategory = x.IdCategory,
                Category = x.IdCategoryNavigation.Name,
                Image = x.ImageUrl,
                idAccount = x.IdAccount,
                Account = x.IdAccountNavigation.Username
            }).ToList();
        }

        public dynamic Showcate()
        {
            return databaseContext.CategoryBlogs.Select(x => new
            {
                ID = x.Id,
                Name = x.Name,
            }).ToList();
        }
        private string SavePictureToFolder(string pictureBase64, string webRootBath, int id)
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

                string filename = $"Blog_{id}_picture.png";
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine("image", filename);
            }
            catch (FormatException ex)
            {
              
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  
            }
        }
        public dynamic ShowCategoryBlog()
        {
            return databaseContext.CategoryBlogs.Select(x => new
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }

        public bool AddBlog(AddBlog blog)
        {
            try
            {
                if(blog== null)
                {
                    return false;
                }
                var BlogEntity = new Blog
                {
                    Title = blog.Title,
                    ContentBlog = blog.ContentBlog,
                    CreatedAt = DateTime.Now,
                    IdCategory = blog.IdCategory,
                    IdAccount = blog.IdAccount,
                    ImageUrl = $"Blog_{blog.Title}_picture.png"
                };
                databaseContext.Blogs.Add(BlogEntity);
                databaseContext.SaveChanges();
                string picture = SavePictureToFolder(blog.ImageUrl, webHostEnvironment.WebRootPath, BlogEntity.Id);
                if (picture == null)
                {
                    return false;
                }
                BlogEntity.ImageUrl= picture;
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateBlog(int id, UpdateBlog blog)
        {
            try
            {
                if (blog == null)
                {
                    return false;
                }
                var existBlog=databaseContext.Blogs.Find(id);
                if (existBlog == null)
                {
                    return false;
                }
                existBlog.Title = blog.Title;
                existBlog.IdCategory=blog.IdCategory;
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
        private void DeletePictureFromFolder(int movieID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"Blog_{movieID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        public bool DeleteBlog(int id)
        {
            try
            {
                var Blog = databaseContext.Blogs.Find(id);
                if (Blog == null)
                {
                    return false;
                }
                databaseContext.Blogs.Remove(Blog);
                databaseContext.SaveChanges();
                DeletePictureFromFolder(id, webHostEnvironment.WebRootPath);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
