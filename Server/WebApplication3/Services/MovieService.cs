using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface MovieService
    {
        public bool UpdateMovie(int id, updateMovie addMovie);
        public bool DeleteMovie(int id);
        public bool AddMovie(AddMovie addMovie);
        public dynamic Orderdesc();
        public dynamic CountShowtime();
        public dynamic CountOrder();
        public dynamic CountGenre();
        public dynamic CountEvent();
        public dynamic CountAccount();
        public dynamic CountActor();
        public dynamic CountCategoryMovie();
        public dynamic CountMovie();
        public dynamic UserVoucher();
        public dynamic ShowMovie();
        public dynamic getMovie();
        public dynamic getCategory();
        public dynamic GetGender();
    }
}
