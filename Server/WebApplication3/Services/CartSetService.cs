namespace WebApplication3.Services
{
    public interface CartSetService
    {
        public dynamic ShowCard(int id, int IDAccount, int idshowtime);
        public dynamic ShowInfoCard(int id, int idCinema, int idShowtime);
        public bool Update(int id);
        public bool Addstatus(int id, int idAccount, int idshowtime);
    }
}
