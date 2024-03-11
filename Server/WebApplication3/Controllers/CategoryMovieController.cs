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
        public IActionResult DeleteCategory(int id)
        {
            var category =  _dbContext.CategoryMovies.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            try
            {
                _dbContext.CategoryMovies.Remove(category);
                _dbContext.SaveChanges();
               
                return Ok("Delete Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("updateCategory/{id}")]
        public IActionResult UpdateCategory(int id,[FromBody]  CategoryMovie updateCategory)
        {
            try
            {
                if (updateCategory == null)
                {
                    return BadRequest("Invalid data");
                }
                var existCategory =  _dbContext.CategoryMovies.Find(id);
                if (existCategory == null)
                {
                    return NotFound("Genre not found");
                }
                if (_dbContext.CategoryMovies.Any(a => a.Name == updateCategory.Name && a.Id!=id))
                {
                    return BadRequest(new { message = "Category Movie name already exists" });
                }
                existCategory.Name = updateCategory.Name;
                 _dbContext.SaveChangesAsync();
              
                return Ok("Update successfully");
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("Add")]
        public IActionResult AddCategoryMovie([FromBody] AddCategoryMovie addCategory)
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
               _dbContext.SaveChanges();
                
                return Ok("Add Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        

    }
}
