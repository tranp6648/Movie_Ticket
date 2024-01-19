﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;
namespace WebApplication3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly DatabaseContext _dbContext;
        public AccountController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAll()
        {
            try
            {
                var billDetails = await _dbContext.Accounts.ToListAsync();

               

                return new JsonResult(billDetails);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "Internal server error");
            }
        }
        public static string HashPasswordMD5(string password)
        {
            using(var md5 = MD5.Create())
            {
                byte[]hashedBytes=md5.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-","").ToLower();
            }
        }
        [HttpPost("Login")]
       public async Task<ActionResult<int>> Login([FromBody] LoginAccount account)
{
    try
    {
        if (account == null || string.IsNullOrEmpty(account.PasswordLogin))
        {
            return BadRequest("Invalid login data");
        }

        string enteredPasswordHash = HashPasswordMD5(account.PasswordLogin);

        // Check if it's an email or username
        var existingAccount = await _dbContext.Accounts
            .Where(a => (a.Email == account.AccountLogin|| a.Username == account.AccountLogin) && a.Password == enteredPasswordHash)
            .FirstOrDefaultAsync();

        if (existingAccount == null)
        {
            return NotFound("Account not found");
        }

                return Ok(new { Id = existingAccount.Id, AccountType = existingAccount.Accounttype });
            }
    catch (Exception ex)
    {
        return StatusCode(500, "Internal server error");
    }
}


        [HttpPost("Add")]
        public async Task<ActionResult<Account>> AddBillDetail([FromBody] Account billDetail)
        {

            try
            {
                if (billDetail == null)
                {
                    return BadRequest("Invalid data");
                }
                if (_dbContext.Accounts.Any(a => a.Username == billDetail.Username))
                {
                    return BadRequest(new { message = "Username already exists" });
                }
                if (_dbContext.Accounts.Any(a => a.Email == billDetail.Email))
                {
                    return BadRequest(new { message = "Email already exists" });
                }
                if (_dbContext.Accounts.Any(a => a.FullName == billDetail.FullName))
                {
                    return BadRequest(new { message = "Fullname already exists" });
                }
                if (_dbContext.Accounts.Any(a => a.Phone == billDetail.Phone))
                {
                    return BadRequest(new { message = "Phone already exists" });
                }

                // Additional properties
                if (string.IsNullOrEmpty(billDetail.Email) ||
                    string.IsNullOrEmpty(billDetail.Username) ||
                    string.IsNullOrEmpty(billDetail.Password) )
                {
                    return BadRequest("Customer information is required");
                }

                billDetail.Password =HashPasswordMD5(billDetail.Password);
                _dbContext.Accounts.Add(billDetail);
                await _dbContext.SaveChangesAsync();
                SendEmail(billDetail.Email, "Account Information", $"Username:{billDetail.Username}\n Password:{billDetail.Username}");
                return CreatedAtAction(nameof(GetAll), new { id = billDetail.Id }, billDetail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        private void SendEmail(string to,string subject,string body)
        {
            using(var client=new SmtpClient("smtp.gmail.com"))
            {
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
        [HttpPost("{id}")]
        public async Task<ActionResult<Account>> DeleteBillDetail(int id)
        {
            var billDetail=await _dbContext.Accounts.FindAsync(id);
            if(billDetail== null)
            {
                return NotFound();
            }
            try
            {
                _dbContext.Accounts.Remove(billDetail);
                await _dbContext.SaveChangesAsync();
                return billDetail;
            }catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
