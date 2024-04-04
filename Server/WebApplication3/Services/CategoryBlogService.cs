using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface CategoryBlogService
    {
        public dynamic ShowCategoryBlog();
        public bool AddCategory(AddCategoryBlog addCategoryBlog);
        public bool UpdateCategory(int id,AddCategoryBlog categoryBlog);
        public bool DeleteCategoryBlog(int id);
    }
}
