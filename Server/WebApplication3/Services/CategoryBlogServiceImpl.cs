using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class CategoryBlogServiceImpl : CategoryBlogService
    {
        private DatabaseContext _dbContext;
        public CategoryBlogServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool AddCategory(AddCategoryBlog addCategoryBlog)
        {
            try
            {
                if(addCategoryBlog == null)
                {
                    return false;
                }
                var categoryBlogEntity = new CategoryBlog
                {
                    Name = addCategoryBlog.Name,
                };
                _dbContext.CategoryBlogs.Add(categoryBlogEntity);
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteCategoryBlog(int id)
        {
            var CategoryBlog = _dbContext.CategoryBlogs.Find(id);
            if(CategoryBlog == null)
            {
                return false;
            }
            try
            {
                _dbContext.CategoryBlogs.Remove(CategoryBlog);
                return _dbContext.SaveChanges()>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic ShowCategoryBlog()
        {
           return _dbContext.CategoryBlogs.Select(d => new
           {
               Id = d.Id,
               Name = d.Name,
           }).ToList();
        }

        public bool UpdateCategory(int id, AddCategoryBlog categoryBlog)
        {
            try
            {
            if(categoryBlog == null)
                {
                    return false;
                }
                var existcategoryBlog = _dbContext.CategoryBlogs.Find(id);
                if(existcategoryBlog == null)
                {
                    return false;
                }
                existcategoryBlog.Name = categoryBlog.Name;
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
