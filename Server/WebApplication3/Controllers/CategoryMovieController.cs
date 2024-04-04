using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryMovieController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly CategoryMovieService _categoryMovieService;
        public CategoryMovieController(DatabaseContext dbContext, CategoryMovieService categoryMovieService)
        {
            _dbContext = dbContext;
            _categoryMovieService = categoryMovieService;
        }
        [HttpGet("getCategoryMovie")]
        public IActionResult GetCategoryMovies()
        {
            try
            {
                return Ok(_categoryMovieService.GetCategoryMovie());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("DeleteCategory/{id}")]
        public IActionResult DeleteCategory(int id)
        {

            try
            {

                return Ok(new
                {
                    result = _categoryMovieService.DeleteCategoryMovie(id)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("updateCategory/{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] CategoryMovie updateCategory)
        {
            try
            {

                if (_dbContext.CategoryMovies.Any(a => a.Name == updateCategory.Name && a.Id != id))
                {
                    return BadRequest(new { message = "Category Movie name already exists" });
                }
                return Ok(new
                {
                    result = _categoryMovieService.UpdateCategory(id, updateCategory)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("Add")]
        public IActionResult AddCategoryMovie([FromBody] AddCategoryMovie addCategory)
        {
            try
            {

                if (_dbContext.CategoryMovies.Any(a => a.Name == addCategory.Name))
                {
                    return BadRequest(new { message = "Category Movie already Exists" });
                }


                return Ok(new
                {
                    result = _categoryMovieService.AddCategoryMovie(addCategory)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }


    }
}
