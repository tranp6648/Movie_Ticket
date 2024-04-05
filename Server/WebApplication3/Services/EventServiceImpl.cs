using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class EventServiceImpl : EventService
    {
        private DatabaseContext dbContext;
        private IWebHostEnvironment env;
        public EventServiceImpl(DatabaseContext dbContext, IWebHostEnvironment env)
        {
            this.dbContext = dbContext;
            this.env = env;
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
        public dynamic DetailEvent(int id)
        {
           return dbContext.Events.Where(d => d.Id == id).ToList();
        }

        public dynamic getEvent()
        {
            return dbContext.Events.ToList();
        }
        private void DeletePictureFromFolder(int movieID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"Event_{movieID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        public bool Delete(int id)
        {
            try
            {
                var Event = dbContext.Events.Find(id);
                dbContext.Events.Remove(Event);
               dbContext.SaveChanges();
                DeletePictureFromFolder(id, env.WebRootPath);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateEvent(int id, UpdateEvent updateEvent)
        {
            try
            {
                if (updateEvent == null)
                {
                    return false;
                }
                var existEvent = dbContext.Events.Find(id);
                if (existEvent == null)
                {
                    return false;
                }
                existEvent.Title = updateEvent.Title;
                existEvent.StartDate = updateEvent.StartDate;
                existEvent.EndDate = updateEvent.EndDate;
                return dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool AddEvent(Event addevent)
        {
            try
            {
                if(addevent== null)
                {
                    return false;
                }
                var EventEnity = new Event
                {
                    Title = addevent.Title,
                    BannerUrl = $"Event_{addevent.Title}_picture.png",
                    Description = addevent.Description,
                    StartDate = addevent.StartDate,
                    EndDate = addevent.EndDate,

                };
                dbContext.Events.Add(EventEnity);
               dbContext.SaveChanges();
                string picture = SavePictureToFolder(addevent.BannerUrl, env.WebRootPath, EventEnity.Id);
                if (picture== null)
                {
                    return false;
                }
                EventEnity.BannerUrl = picture;
                return dbContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
