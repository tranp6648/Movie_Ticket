using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private IWebHostEnvironment _webHostEnvironment;
        private readonly DatabaseContext _dbContext;
        public EventController(DatabaseContext dbContext, IWebHostEnvironment webHostEnvironment)
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

                string filename = $"Event_{id}_picture.png";
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
        [HttpGet("event/{id}")]
        public async Task<ActionResult<IEnumerable<Event>>> DetailEvent(int id)
        {
            try
            {
                var Event = await _dbContext.Events.Where(d=>d.Id==id).ToListAsync();
                return Ok(Event);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try {
                var Event = _dbContext.Events.Find(id);
                _dbContext.Events.Remove(Event);
                _dbContext.SaveChanges();
                DeletePictureFromFolder(id, _webHostEnvironment.WebRootPath);
                return Ok("Event successfully");
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        private void DeletePictureFromFolder(int movieID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"Event_{movieID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        [HttpPost("update/{id}")]
        public IActionResult UpdateEvent(int id, [FromBody] UpdateEvent @event)
        {
            try
            {
                if (@event == null)
                {
                    return BadRequest("Invalid event data");
                }
                if(_dbContext.Events.Any(a=>a.Title== @event.Title && a.Id != id))
                {
                    return BadRequest(new { message = "Tittle already exists" });
                }
                var existEvent = _dbContext.Events.Find(id);

                if (existEvent == null)
                {
                    return NotFound("Event not found");
                }

                existEvent.Title = @event.Title;
                existEvent.StartDate = @event.StartDate;
                existEvent.EndDate = @event.EndDate;
                

                _dbContext.SaveChanges();
                return Ok("Event updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("Show")]
        public async Task<ActionResult<IEnumerable<Event>>> getEvent()
        {
            try
            {
                var Event = await _dbContext.Events.ToListAsync();
                return Ok(Event);
            }catch(Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpPost("Add")]
        public IActionResult AddEvent([FromBody] Event addevent){
            try
            {
                if(addevent == null)
                {
                    return BadRequest("Invalid Event data");
                }
                if(_dbContext.Events.Any(a=>a.Title == addevent.Title))
                {
                    return BadRequest(new { message = "Event already exists" });
                }
                var EventEnity = new Event
                {
                    Title = addevent.Title,
                    BannerUrl = $"Event_{addevent.Title}_picture.png",
                    Description = addevent.Description,
                    StartDate = addevent.StartDate,
                    EndDate = addevent.EndDate,

                };
                _dbContext.Events.Add(EventEnity);
                _dbContext.SaveChanges();
                string picture = SavePictureToFolder(addevent.BannerUrl, _webHostEnvironment.WebRootPath, EventEnity.Id);
                if (picture == null)
                {
                    return BadRequest("Error saving Event image");
                }
                EventEnity.BannerUrl = picture;
                _dbContext.SaveChanges();
                return Ok("Event added successfully");
            }
            catch(Exception ex) {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
    }
}
