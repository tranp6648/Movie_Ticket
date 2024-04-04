using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class BlogServiceImpl : BlogService
    {
        private readonly DatabaseContext databaseContext;
        public BlogServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
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

        public dynamic ShowCategoryBlog()
        {
            return databaseContext.CategoryBlogs.Select(x => new
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }
    }
}
