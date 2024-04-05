using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface EventService
    {
        public dynamic DetailEvent(int id);
        public dynamic getEvent();
        public bool Delete(int id);
        public bool UpdateEvent(int id,UpdateEvent updateEvent);
        public bool AddEvent(Event addevent);
    }
}
