using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        private readonly BlogService blogService;
        public BlogController(DatabaseContext dbContext,BlogService blogService)
        {
            _dbContext = dbContext;
            this.blogService= blogService;  
        }
      
       
        [HttpGet("Showcate")]
        public IActionResult Showcate()
        {
            try
            {
               
                return Ok(blogService.Showcate());
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("DetailBlog/{id}")]
        public IActionResult DetailBlog(int id)
        {
            try
            {
               
                return Ok(blogService.DetailBlog(id));
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ShowBlog")]
        public IActionResult ShowBlog()
        {
            try
            {
                
                return Ok(blogService.ShowBlog());
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    

        [HttpPost("Delete/{id}")]
        public IActionResult DeleteBlog(int id)
        {
            try
            {
                    return Ok(new
                    {
                        result=blogService.DeleteBlog(id)
                    });
            }
            catch(Exception ex)
            {
                return BadRequest($"Error Delete actor: {ex.Message}");
            }
        }
        [HttpPost("UpdateBlog/{id}")]
        public IActionResult UpdateBlog(int id, [FromBody] UpdateBlog updateBlog)
        {
            try
            {
               
                if(_dbContext.Blogs.Any(a=>a.Title == updateBlog.Title && a.Id != id))
                {
                    return BadRequest(new { message = "Title already exists" });
                }
              
                return Ok(new
                {
                    result=blogService.UpdateBlog(id, updateBlog)
                });
            }
            catch(Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpPost("AddBlog")]
        public IActionResult AddBlog(AddBlog addBlog)
        {
            try
            {
               
                if (_dbContext.Blogs.Any(a => a.Title == addBlog.Title))
                {
                    return BadRequest(new { message = "Blog already exists" });
                }
               
                return Ok(new
                {
                    result=blogService.AddBlog(addBlog)
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpGet("ShowCategory")]
        public IActionResult ShowCategory()
        {
            try
            {
                return Ok(blogService.ShowCategoryBlog());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
