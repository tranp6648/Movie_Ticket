using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;
using WebApplication3.Services;
namespace WebApplication3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly DatabaseContext _dbContext;
        private readonly AccountService accountService;
        public AccountController(DatabaseContext dbContext,AccountService accountService)
        {
            _dbContext = dbContext;
            this.accountService = accountService;
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("updateAccount/{id}")]
        public IActionResult UpdateAccount(int id, [FromBody] UpdateAccount account)
        {
            try
            {
                if (account == null)
                {
                    return BadRequest("Invalid data");
                }

              
                if (_dbContext.Accounts.Any(g => g.Username == account.Username))
                {
                    return BadRequest(new { message = "Username already exists" });
                }
                return Ok(new
                {
                    result = accountService.UpdateAccount(id, account)
                });
             
            }
            catch (Exception ex)
            {
                // Handle exceptions and return a 500 Internal Server Error
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("getAccount/{id}")]
        public IActionResult getAccount(int id)
        {
            try
            {
                return Ok(accountService.GetAccount(id));
            }
            catch
            {
                return BadRequest();
            }
            

        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(accountService.Account()); 
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(500, "Internal server error");
            }
        }
        public static string HashPasswordMD5(string password)
        {
            using (var md5 = MD5.Create())
            {
                byte[] hashedBytes = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("Forgot/{forgot}")]
        public async Task<ActionResult<int>> Forgot(string forgot)
        {
            try
            {
                return Ok(new { results=accountService.ForgotPassword(forgot) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("Login")]
        public async Task<ActionResult<int>> Login([FromBody] LoginAccount account)
        {
            try
            {
                if (account == null || string.IsNullOrEmpty(account.PasswordLogin))
                {
                    return BadRequest("Invalid login data");
                }


                var result = accountService.Login(account);
                return Ok(new { Id = result.Id, AccountType = result.Accounttype,username=result.Username,Status=result.Status });

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("Information/{id}")]
        public IActionResult ShowAccount(int id)
        {
            try
            {          
                return Ok(accountService.ShowAccount(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("ChangePassUser/{id}/{Password}")]
        public IActionResult ChangePassUser(int id,string Password)
        {
            try
            {

                return Ok(accountService.ChangePassUser(id, Password));
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("ChangePassword/{id}/{Password}")]
        public IActionResult UpdatePassword(int id,string Password, [FromBody] UpdateInformation updateInformation)
        {
            try
            {
               return Ok(accountService.UpdatePassword(id,Password,updateInformation));
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("Add")]
        public async Task<ActionResult<Account>> AddBillDetail([FromBody] Account billDetail)
        {

            try
            {
                return Ok(new
                {
                    result = accountService.Add(billDetail)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        private void SendEmail(string to, string subject, string body)
        {
            using (var client = new SmtpClient("smtp.gmail.com"))
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
            var billDetail = await _dbContext.Accounts.FindAsync(id);
            if (billDetail == null)
            {
                return NotFound();
            }
            try
            {
                _dbContext.Accounts.Remove(billDetail);
                await _dbContext.SaveChangesAsync();
                return billDetail;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("GetAccountAdmin")]
        public IActionResult GetAccountAdmin()
        {
            try
            {
                return Ok(accountService.getAccountAdmin());
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("AddAdmin")]
        public async Task<ActionResult<Account>> AddAdmin([FromBody] Account admin, [FromQuery] int IdCinema)
        {
            // Validation checks
            if (admin == null)
            {
                return BadRequest("Invalid data");
            }
            
           
            Account newAdmin = new Account
            {
                Username = admin.Username,
                Email = admin.Email,
                Password = HashPasswordMD5(admin.Password), 
                Phone = admin.Phone,
                FullName = admin.FullName, 
                Birthday = admin.Birthday, 
                Accounttype = admin.Accounttype, 
                Status=false
            };

            _dbContext.Accounts.Add(newAdmin);
            await _dbContext.SaveChangesAsync();

            var cinema = _dbContext.Cinemas.FirstOrDefault(c => c.Id == IdCinema);
            if (cinema == null) {
                return BadRequest("null data");
            }
            cinema.Idaccount = newAdmin.Id;
            await _dbContext.SaveChangesAsync();
            SendEmail(admin.Email, "Account Information", $"Username:{admin.Username}\n Password:{admin.Password}");

            return CreatedAtAction(nameof(GetAll), new { id = newAdmin.Id }, newAdmin);
        }
    }
    }
