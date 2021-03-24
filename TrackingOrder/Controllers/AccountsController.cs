using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingOrder.Data;
using TrackingOrder.Dtos;
using TrackingOrder.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TrackingOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AccountsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<AccountsController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var model = from a in _context.Accounts
                        join r in _context.Roles on a.RoleID equals r.ID
                        select new AccountDto { 
                            ID = a.ID,
                            UserName = a.UserName,
                            Role = r,
                            RoleID = a.RoleID
                        };

            return Ok( await model.ToListAsync());
        }

        // GET api/<AccountsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AccountsController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AccountDto model)
        {
            try
            {
                var account = _mapper.Map<Account>(model);
                var password = model.Password;
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                account.PasswordHash = passwordHash;
                account.PasswordSalt = passwordSalt;

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT api/<AccountsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] AccountDto model)
        {
            try
            {
                var account = _mapper.Map<Account>(model);
                _context.Accounts.Update(account);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<AccountsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var item = await _context.Accounts.FindAsync(id);
            if (item == null) return NotFound();
            try
            {
                _context.Accounts.Remove(item);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<AccountsController>/5
        [HttpPut("change-password/{id}/{userName}")]
        public async Task<ActionResult> ChangePassword(int id, string userName)
        {
            try
            {
                if (userName == string.Empty || userName == null) return NotFound();

                if (await _context.Accounts.FirstOrDefaultAsync(x => x.UserName.ToLower().Equals(userName.ToLower())) != null)
                    return NotFound();

                var account = await _context.Accounts.FindAsync(id);
                if (account == null) return NotFound();
                var password = "123456";
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                account.PasswordHash = passwordHash;
                account.PasswordSalt = passwordSalt;
                _context.Accounts.Update(account);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
