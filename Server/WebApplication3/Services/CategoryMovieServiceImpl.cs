using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class CategoryMovieServiceImpl : CategoryMovieService
    {
        private readonly DatabaseContext _dbContext;
        public CategoryMovieServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool AddCategoryMovie(AddCategoryMovie movie)
        {
            try
            {
                if(movie == null)
                {
                    return false;
                }
                var CategoryEntity = new CategoryMovie
                {
                    Name = movie.Name
                };
                _dbContext.CategoryMovies.Add(CategoryEntity);
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteCategoryMovie(int id)
        {
            var category = _dbContext.CategoryMovies.Find(id);
            if(category == null)
            {
                return false;
            }
            try
            {
                _dbContext.CategoryMovies.Remove(category);
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetCategoryMovie()
        {
            return _dbContext.CategoryMovies.Select(x => new
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
        }

        public bool UpdateCategory(int id, CategoryMovie movie)
        {
            try
            {
                if (movie == null)
                {
                    return false;
                }
                var existCategory = _dbContext.CategoryMovies.Find(id);
                if (existCategory == null)
                {
                    return false;
                }
                existCategory.Name = movie.Name;
                return _dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
