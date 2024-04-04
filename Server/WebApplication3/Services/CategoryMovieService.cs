using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface CategoryMovieService
    {
        public dynamic GetCategoryMovie();
        public bool DeleteCategoryMovie(int id);
        public bool AddCategoryMovie(AddCategoryMovie movie);
        public bool UpdateCategory(int id,CategoryMovie movie);
    }
}
