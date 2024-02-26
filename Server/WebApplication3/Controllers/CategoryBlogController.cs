﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryBlogController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public CategoryBlogController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("Delete/{id}")]
        public async Task<ActionResult<IEnumerable<CategoryBlog>>> DeleteCategoryBlog(int id)
        {
            var CategoryBlog = await _dbContext.CategoryBlogs.FindAsync(id);
            if(CategoryBlog == null)
            {
                return NotFound();
            }
            try
            {
                _dbContext.CategoryBlogs.Remove(CategoryBlog);
                await _dbContext.SaveChangesAsync();
                var allcategoryBlog = await _dbContext.CategoryBlogs.ToListAsync();
                return Ok(allcategoryBlog);
            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("UpdateCategoryBlog/{id}")]
        public IActionResult UpdateCategoryBlog(int id, [FromBody] AddCategoryBlog addCategoryBlog)
        {
            try
            {
                if(addCategoryBlog == null)
                {
                    return BadRequest("Invalid data");
                }
                var existcategoryBlog = _dbContext.CategoryBlogs.Find(id);
                if(existcategoryBlog == null)
                {
                    return NotFound("CategoryBlog not found");
                }
                if(_dbContext.CategoryBlogs.Any(a=>a.Name==addCategoryBlog.Name && a.Id != id))
                {
                    return BadRequest(new { message = "Category Blog name already exists" });
                }
                existcategoryBlog.Name=addCategoryBlog.Name;
                _dbContext.SaveChanges();
                return Ok("Update successfully");
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ShowCategoryBlog")]
        public async Task<ActionResult<IEnumerable<CategoryBlog>>> ShowCategoryBlog()
        {
            try
            {
                var categoryBlog=await _dbContext.CategoryBlogs.Select(d => new
                {
                    Id=d.Id,
                    Name=d.Name,
                }).ToListAsync();
                return Ok(categoryBlog);
            }catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("Add")]
        public async Task<ActionResult<IEnumerable<CategoryBlog>>> AddCategoryBlog(AddCategoryBlog categoryBlog)
        {
            try
            {
                if(categoryBlog == null)
                {
                    return BadRequest("Invalid data");
                }
                if(_dbContext.CategoryBlogs.Any(a=>a.Name==categoryBlog.Name )) {
                    return BadRequest(new { message = "Category Blog already Exists" });
                }
                var categoryBlogEntity = new CategoryBlog
                {
                    Name= categoryBlog.Name,
                };
                _dbContext.CategoryBlogs.Add(categoryBlogEntity);
                await _dbContext.SaveChangesAsync();
                var allCategoryBlog = await _dbContext.CategoryBlogs.ToListAsync();
                return Ok(allCategoryBlog);  
            }catch(Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
