using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
         private IWebHostEnvironment _webHostEnvironment;
        private readonly DatabaseContext _dbContext;
        public BlogController(DatabaseContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _dbContext = dbContext;
            _webHostEnvironment = webHostEnvironment;
        }
        private string SavePictureToFolder(string pictureBase64, string webRootBath, int id)
        {
            // Check for Data URL prefix and remove it
            if (pictureBase64.StartsWith("data:image"))
            {
                pictureBase64 = pictureBase64.Split(',')[1];
            }

            // Ensure correct padding
            pictureBase64 = pictureBase64.PadRight((pictureBase64.Length + 3) & ~3, '=');

            try
            {
                byte[] pictureBytes = Convert.FromBase64String(pictureBase64);
                string folderPath = Path.Combine(webRootBath, "image");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string filename = $"Blog_{id}_picture.png";
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine("image", filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
            }
        }
         private void DeletePictureFromFolder(int movieID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"Blog_{movieID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        [HttpGet("Showcate")]
        public async Task<ActionResult<IEnumerable<CategoryBlog>>> Showcate()
        {
            try
            {
                var CategoryBlog = await _dbContext.CategoryBlogs.Select(x => new
                {
                    ID=x.Id,
                    Name=x.Name,
                }).ToListAsync();
                return Ok(CategoryBlog);
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("DetailBlog/{id}")]
        public async Task<ActionResult<IEnumerable<Blog>>> DetailBlog(int id)
        {
            try
            {
                var Blog = await _dbContext.Blogs.Where(d => d.Id == id).Select(d => new
                {
                    id=d.Title,
                    name=d.ContentBlog,
                    ImageUrl=d.ImageUrl,
                }).ToListAsync();
                return Ok(Blog);
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("ShowBlog")]
        public async Task<ActionResult<IEnumerable<Blog>>> ShowBlog()
        {
            try
            {
                var Blog = await _dbContext.Blogs.Select(x => new
                {
                    ID=x.Id,
                    Title=x.Title,
                    Content_Blog=x.ContentBlog,
                    CreatedAt = x.CreatedAt,
                    idCategory=x.IdCategory,
                    Category=x.IdCategoryNavigation.Name,
                    Image=x.ImageUrl,
                    idAccount=x.IdAccount,
                    Account=x.IdAccountNavigation.Username
                }).ToListAsync();
                return Ok(Blog);
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
                var Blog =  _dbContext.Blogs.Find(id);
                if (Blog == null)
                {
                    return NotFound();
                }
              
                    _dbContext.Blogs.Remove(Blog);
                     _dbContext.SaveChanges();
                DeletePictureFromFolder(id, _webHostEnvironment.WebRootPath);
                
                    return Ok("Delete Sucessfully");
                
                
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
                if (updateBlog == null)
                {
                    return BadRequest("Invalid data");
                }
                var existBlog = _dbContext.Blogs.Find(id);
                if (existBlog == null)
                {
                    return NotFound("Blog not found");
                }
                if(_dbContext.Blogs.Any(a=>a.Title == updateBlog.Title && a.Id != id))
                {
                    return BadRequest(new { message = "Title already exists" });
                }
                existBlog.Title = updateBlog.Title;
       
                existBlog.IdCategory=updateBlog.IdCategory;
                _dbContext.SaveChanges();
                return Ok("Update successfully");
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
                if (addBlog == null)
                {
                    return BadRequest("Invalid Blog data");
                }
                if (_dbContext.Blogs.Any(a => a.Title == addBlog.Title))
                {
                    return BadRequest(new { message = "Blog already exists" });
                }
                var BlogEntity = new Blog
                {
                    Title = addBlog.Title,
                    ContentBlog=addBlog.ContentBlog,
                    CreatedAt=DateTime.Now,
                    IdCategory=addBlog.IdCategory,
                    IdAccount=addBlog.IdAccount,
                    ImageUrl= $"Blog_{addBlog.Title}_picture.png"
                };
                _dbContext.Blogs.Add(BlogEntity);
                _dbContext.SaveChanges();
                string picture = SavePictureToFolder(addBlog.ImageUrl, _webHostEnvironment.WebRootPath, BlogEntity.Id);
                if (picture == null)
                {
                    return BadRequest("Error saving Event image");
                }
                BlogEntity.ImageUrl= picture;
                _dbContext.SaveChanges();
                return Ok("Blog added successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpGet("ShowCategory")]
        public async Task<ActionResult<IEnumerable<CategoryBlog>>> ShowCategory()
        {
            try
            {
                var categoryMovies = await _dbContext.CategoryBlogs
             .Select(x => new  { Id = x.Id, Name = x.Name })
             .ToListAsync();

                return Ok(categoryMovies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
