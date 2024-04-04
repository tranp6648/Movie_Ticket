using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface BlogService
    {
        public dynamic Showcate();
        public dynamic DetailBlog(int id);
        public dynamic ShowBlog();
        public dynamic ShowCategoryBlog();
        public bool AddBlog(AddBlog blog);
        public bool UpdateBlog(int id,UpdateBlog blog);
        public bool DeleteBlog(int id); 
    }
}
