using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using WebApplication3.Services;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
    
        private readonly DatabaseContext _dbContext;
        private readonly EventService eventService;
        public EventController(DatabaseContext dbContext,EventService eventService)
        {
            _dbContext = dbContext;
            this.eventService=eventService;
        }
       
        [HttpGet("event/{id}")]
        public IActionResult DetailEvent(int id)
        {
            try
            {
              
                return Ok(eventService.DetailEvent(id));
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
               
                return Ok(new
                {
                    result=eventService.Delete(id)
                });
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
       
        [HttpPost("update/{id}")]
        public IActionResult UpdateEvent(int id, [FromBody] UpdateEvent @event)
        {
            try
            {
              
                if(_dbContext.Events.Any(a=>a.Title== @event.Title && a.Id != id))
                {
                    return BadRequest(new { message = "Tittle already exists" });
                }
                

                return Ok(new
                {
                    result=eventService.UpdateEvent(id,@event)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("Show")]
        public IActionResult getEvent()
        {
            try
            {
               
                return Ok(eventService.getEvent());
            }catch(Exception ex)
            {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
        [HttpPost("Add")]
        public IActionResult AddEvent([FromBody] Event addevent){
            try
            {
               
                if(_dbContext.Events.Any(a=>a.Title == addevent.Title))
                {
                    return BadRequest(new { message = "Event already exists" });
                }
                
                return Ok(new
                {
                    result=eventService.AddEvent(addevent)
                });
            }
            catch(Exception ex) {
                return BadRequest($"Error adding actor: {ex.Message}");
            }
        }
    }
}
