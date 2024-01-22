using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryMovieController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public CategoryMovieController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("getCategoryMovie")]
        public async Task<ActionResult<IEnumerable<CategoryMovie>>> GetCategoryMovies()
        {
            try
            {
                var categoryMovies = await _dbContext.CategoryMovies
             .Select(x => new CategoryMovie { Id = x.Id, Name = x.Name })
             .ToListAsync();

                return Ok(categoryMovies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("DeleteCategory/{id}")]
        public async Task<ActionResult<IEnumerable<CategoryMovie>>>DeleteCategory(int id)
        {
            var category = await _dbContext.CategoryMovies.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            try
            {
                _dbContext.CategoryMovies.Remove(category);
                await _dbContext.SaveChangesAsync();
                var allcategory = await _dbContext.CategoryMovies.ToListAsync();
                return Ok(allcategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("updateCategory/{id}")]
        public async Task<ActionResult<IEnumerable<CategoryMovie>>> UpdateCategory(int id,[FromBody]  CategoryMovie updateCategory)
        {
            try
            {
                if (updateCategory == null)
                {
                    return BadRequest("Invalid data");
                }
                var existCategory = await _dbContext.CategoryMovies.FindAsync(id);
                if (existCategory == null)
                {
                    return NotFound("Genre not found");
                }
                if (_dbContext.CategoryMovies.Any(a => a.Name == updateCategory.Name))
                {
                    return BadRequest(new { message = "Category Movie name already exists" });
                }
                existCategory.Name = updateCategory.Name;
                await _dbContext.SaveChangesAsync();
                var allCategory = await _dbContext.CategoryMovies.ToListAsync();
                return Ok(allCategory);
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("Add")]
        public async Task<ActionResult<IEnumerable<CategoryMovie>>> AddCategoryMovie([FromBody] CategoryMovie addCategory)
        {
            try
            {
                if (addCategory == null)
                {
                    return BadRequest("Invalid data");
                }
                if (_dbContext.CategoryMovies.Any(a => a.Name == addCategory.Name))
                {
                    return BadRequest(new { message = "Category Movie already Exists" });
                }
                var CategoryEntity = new CategoryMovie
                {
                    Name = addCategory.Name
                };
                _dbContext.CategoryMovies.Add(CategoryEntity);
                await _dbContext.SaveChangesAsync();
                var allCategorymovies = await _dbContext.CategoryMovies.ToListAsync();
                return Ok(allCategorymovies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        

    }
}
