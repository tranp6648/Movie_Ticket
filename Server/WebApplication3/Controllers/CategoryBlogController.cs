using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryBlogController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly CategoryBlogService categoryBlogService;
        public CategoryBlogController(DatabaseContext dbContext, CategoryBlogService categoryBlogService)
        {
            _dbContext = dbContext;
            this.categoryBlogService = categoryBlogService;
        }
        [HttpPost("Delete/{id}")]
        public IActionResult DeleteCategoryBlog(int id)
        {

            try
            {
                return Ok(new
                {
                    result = categoryBlogService.DeleteCategoryBlog(id)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("UpdateCategoryBlog/{id}")]
        public IActionResult UpdateCategoryBlog(int id, [FromBody] AddCategoryBlog addCategoryBlog)
        {
            try
            {

                if (_dbContext.CategoryBlogs.Any(a => a.Name == addCategoryBlog.Name && a.Id != id))
                {
                    return BadRequest(new { message = "Category Blog name already exists" });
                }
                return Ok(new
                {
                    result = categoryBlogService.UpdateCategory(id, addCategoryBlog)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ShowCategoryBlog")]
        public IActionResult ShowCategoryBlog()
        {
            try
            {

                return Ok(categoryBlogService.ShowCategoryBlog());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("Add")]
        public IActionResult AddCategoryBlog(AddCategoryBlog categoryBlog)
        {
            try
            {

                if (_dbContext.CategoryBlogs.Any(a => a.Name == categoryBlog.Name))
                {
                    return BadRequest(new { message = "Category Blog already Exists" });
                }


                return Ok(new
                {
                    result = categoryBlogService.AddCategory(categoryBlog)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
