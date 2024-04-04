using Microsoft.AspNetCore.Mvc;
using PayPal;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public interface AccountService
    {
        public bool UpdateAccount(int id ,Models.UpdateAccount account);
        public dynamic GetAccount(int id);
        public dynamic Account();
        public bool ForgotPassword(string forget);
        public Models.Account Login(LoginAccount loginAccount);
        public dynamic ShowAccount(int id);
        public bool ChangePassUser(int id, string password);
        public bool UpdatePassword(int id, string password, UpdateInformation updateInformation);
        public bool Add(Models.Account billDetail);
        public dynamic getAccountAdmin();
    }
}
