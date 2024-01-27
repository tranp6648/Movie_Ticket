﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public CinemaController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("Delete/{id}")]
        public IActionResult DeleteCinema(int id)
        {
            var DetailCinemal = _dbContext.DetailCityBranches.FirstOrDefault(cm => cm.IdCinema == id);
            var Cinema= _dbContext.Cinemas.Find(id);
            if (Cinema == null)
            {
                return NotFound("Cinema not found");
            }
            try
            {
                if (DetailCinemal != null)
                {
                    _dbContext.DetailCityBranches.Remove(DetailCinemal);
                }
                _dbContext.Cinemas.Remove(Cinema);
                _dbContext.SaveChanges();
                return Ok("Cinema deleted successfully");
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPost("update/{id}")]
        public IActionResult UpdateCinema(int id, [FromBody] updateCinema addCinema)
        {
            if (addCinema == null)
            {
                return BadRequest("Invalid Cinema data");
            }
            if (_dbContext.Cinemas.Any(a => a.Name == addCinema.Name && a.Id !=id))
            {
                return BadRequest(new { message = "Name Cinema already exists" });
            }
            var existCinema = _dbContext.Cinemas.Find(id);
            if (existCinema == null)
            {
                return NotFound("Cinema not found");
            }
            existCinema.Name=addCinema.Name;
            existCinema.Location=addCinema.Location;
            existCinema.Phone=addCinema.Phone;
            try
            {
                _dbContext.SaveChangesAsync();
                return Ok("Cinema Update successfully");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Internal server error");
            }
            
        }
        [HttpGet("getCinema")]
        public async Task<ActionResult<IEnumerable<Cinema>>> getCinema()
        {
            try
            {
                var cinema = await _dbContext.Cinemas.Include(m => m.DetailCityBranches).ThenInclude(d => d.IdBranchNavigation).Select(m =>new
                {
                    ID=m.Id,
                    Location=m.Location, 
                    Name=m.Name,
                    Phone=m.Phone,
                    District=m.District,
                    DetailCityBranch = m.DetailCityBranches.Select(d => new
                    {
                        Id = d.Id,
                        IdBranchNavigation = new
                        {
                            City=d.IdBranchNavigation.City
                        }
                    })
                }).ToListAsync();
                return Ok(cinema);
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("AddCinema")]
        public IActionResult AddCinema([FromBody] AddCinema cinema)
        {
            if (cinema == null)
            {
                return BadRequest("Invalid movie data");
            }
            if (_dbContext.Cinemas.Any(a => a.Name == cinema.Name))
            {
                return BadRequest(new { message = "Name Cinema already exists" });
            }
            Cinema cinema1 = MaptoCinema(cinema);
            try
            {
                _dbContext.Cinemas.Add(cinema1);
                _dbContext.SaveChanges();
                int cinemaID = cinema1.Id;
                DetailCityBranch detailCityBranch = new DetailCityBranch
                {
                    IdBranch=cinema.IdBranch,
                    IdCinema=cinemaID
                };
                _dbContext.DetailCityBranches.Add(detailCityBranch);
                _dbContext.SaveChanges();
                 return Ok("Movie added successfully");

            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ cụ thể nếu cần thiết
                return StatusCode(500, "Internal server error");
            }
        }
        private Cinema MaptoCinema(AddCinema addMovie)
        {
            return new Cinema
            {

                Name = addMovie.Name,
                Location = addMovie.Location,
                Phone = addMovie.Phone,
                District = addMovie.District,
               
                // Map other properties as needed
            };
        }
        [HttpGet("getBranches")]
        public async Task<ActionResult<IEnumerable<CinemaBranch>>> getBranchers()
        {
            try
            {
                var Branches = await _dbContext.CinemaBranches.ToListAsync();
                var BrandNames = Branches.Select(x => new CinemaBranch { Id = x.Id, City = x.City }).ToList();

                return Ok(BrandNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
