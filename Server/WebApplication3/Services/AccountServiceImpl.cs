using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayPal;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class AccountServiceImpl : AccountService
    {
        private DatabaseContext DatabaseContext;
        public AccountServiceImpl(DatabaseContext DatabaseContext)
        {
            this.DatabaseContext = DatabaseContext;
        }
        public static string HashPassword(string password)
        {
            using (var md5 = MD5.Create())
            {
                byte[]hashedBytes=md5.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
                }
        public dynamic Account()
        {
            return DatabaseContext.Accounts.ToList();
        }
        private void SendEmail(string to, string subject, string body)
        {
            using(var client=new SmtpClient("smtp.gmail.com")) {
                client.Port = 587;
                client.Credentials = new NetworkCredential("tranp6648@gmail.com", "czvy qzyc vpes whkj");
                client.EnableSsl = true;
                var message = new MailMessage
                {
                    From = new MailAddress("tranp6648@gmail.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false
                };
                message.To.Add(to);
                client.Send(message);
            }
        }
        public bool ForgotPassword(string forget)
        {
            try
            {
                var existAccount = DatabaseContext.Accounts.Where(a => a.Email == forget || a.Username == forget).FirstOrDefault();
                if (existAccount == null)
                {
                    return false;
                }
                if (existAccount != null)
                {
                    existAccount.Password = HashPassword(existAccount.Username);
                    SendEmail(existAccount.Email, "Reset Information", $"Username:{existAccount.Username}\n Password:{existAccount.Username}");
           
                    
                }
                return DatabaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetAccount(int id)
        {
            return DatabaseContext.Accounts.Where(a => a.Id == id).Select(a => new
            {
                username = a.Username,
                fullName = a.FullName,
                email = a.Email,
                phone = a.Phone,
                birthday = a.Birthday,
            }).FirstOrDefault();
        }

        public bool UpdateAccount(int id,Models.UpdateAccount account)
        {
            try
            {
               var existAccount=DatabaseContext.Accounts.Find(id);
                if (existAccount == null)
                {
                    return false;
                }
                existAccount.Username = account.Username;
                existAccount.FullName = account.FullName;
                existAccount.Email = account.Email;
                existAccount.Phone = account.Phone;
                existAccount.Birthday = account.Birthday;
                return DatabaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public Models.Account Login(LoginAccount loginAccount)
        {
            string enteredPasswordHash = HashPassword(loginAccount.PasswordLogin);
            var existingAccount =DatabaseContext.Accounts
                  .Where(a => (a.Email == loginAccount.AccountLogin || a.Username == loginAccount.AccountLogin) && a.Password == enteredPasswordHash)
                  .FirstOrDefault();
            if (existingAccount != null)
            {
                return existingAccount;
            }
            return null;
        }

        public dynamic ShowAccount(int id)
        {
            return DatabaseContext.Accounts.Where(d => d.Id == id).Select(m => new
            {
                Username = m.Username,
                Email = m.Email,
                Birthday = m.Birthday,
                FullName = m.FullName,
                Address = m.Address,
                Phone = m.Phone
            }).ToList();
        }

        public bool ChangePassUser(int id, string password)
        {
            try
            {
                var AccountExist = DatabaseContext.Accounts.Find(id);
                 if (AccountExist.Password == HashPassword(password))
                {
                    return false;
                }
                AccountExist.Password = HashPassword(password);
                AccountExist.Status = true;
                return DatabaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdatePassword(int id, string password, UpdateInformation updateInformation)
        {
            try
            {
                var AccountExist=DatabaseContext.Accounts.Find(id);
                if(AccountExist.Password==HashPassword(password))
                {
                    return false;
                }
                AccountExist.Password=HashPassword(password);
                AccountExist.Phone = updateInformation.Phone;
                AccountExist.Birthday = updateInformation.Birthday;
                AccountExist.FullName = updateInformation.FullName;
                AccountExist.Status = true;
                return DatabaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Add(Models.Account billDetail)
        {
            try
            {
                if(DatabaseContext.Accounts.Any(a=>a.Username == billDetail.Username))
                {
                    return false;
                }
                if (DatabaseContext.Accounts.Any(a => a.Email == billDetail.Email))
                {
                    return false;
                }
                if (string.IsNullOrEmpty(billDetail.Email) ||
                      string.IsNullOrEmpty(billDetail.Username) ||
                      string.IsNullOrEmpty(billDetail.Password))
                {
                    return false;
                }
                billDetail.Password = HashPassword(billDetail.Password);

                billDetail.Status = false;
                DatabaseContext.Accounts.Add(billDetail);
                return DatabaseContext.SaveChanges() > 0;

            }
            catch
            {
                return false;
            }
        }

        public dynamic getAccountAdmin()
        {
            return   DatabaseContext.Accounts.Where(d => DatabaseContext.Cinemas.Any(a => a.Idaccount == d.Id)).Select(d => new
            {
                id = d.Id,
                Email = d.Email,
                Username = d.Username,
                Phone = d.Phone,
                BirthDay = d.Birthday,
                FullName = d.FullName,
                Accountype = d.Accounttype,
                Address = d.Address,
                Cinema = DatabaseContext.Cinemas.Where(a => a.Idaccount == d.Id).Select(a => new {
                    Name = a.Name,
                }).FirstOrDefault()
            }).ToList();
        }
    }
}
