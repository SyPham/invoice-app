using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TrackingOrder.Data;
using TrackingOrder.Dtos;
using TrackingOrder.Entities;
using TrackingOrder.Heplers;

namespace TrackingOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly AppSettings _appSettings;

        public AuthController(DataContext context, IConfiguration config,
            IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _context = context;
            _config = config;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _context.Accounts.FirstOrDefaultAsync(x=> x.UserName.ToLower().Equals(userForRegisterDto.Username)) != null)
                return BadRequest("Username already exists");

            var account =  new Account
            {
                UserName = userForRegisterDto.Username,
                RoleID = userForRegisterDto.RoleID,
                CreatedTime = DateTime.Now
            };
            var createdUser = await Register(account, userForRegisterDto.Password);
            return NoContent();
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest model)
        {
            var response = await Authenticate(model, ipAddress());

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _context.Accounts.Where(x=> x.UserName.Equals(userForLoginDto.Username)).FirstOrDefaultAsync();
            if (userFromRepo == null)
                return Unauthorized();

            var result = await 
               Login(userForLoginDto.Username, userForLoginDto.Password);
            if (result == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.ID.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = new UserForDetailDto { 
                ID = userFromRepo.ID,
                Username = userFromRepo.UserName
            };

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = RefreshToken(refreshToken, ipAddress());

            if (response == null)
                return Unauthorized(new { message = "Invalid token" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }

        [HttpPost("revoke-token")]
        public IActionResult RevokeToken([FromBody] RevokeTokenRequest model)
        {
            // accept token from request body or cookie
            var token = model.Token ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token is required" });

            var response = RevokeToken(token, ipAddress());

            if (!response)
                return NotFound(new { message = "Token not found" });

            return Ok(new { message = "Token revoked" });
        }


        private AuthenticateResponse RefreshToken(string token, string ipAddress)
        {
            var user = _context.Accounts.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            // return null if no user found with token
            if (user == null) return null;

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            // return null if token is no longer active
            if (!refreshToken.IsActive) return null;

            // replace old refresh token with a new one and save
            var newRefreshToken = generateRefreshToken(ipAddress);
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            user.RefreshTokens.Add(newRefreshToken);
            _context.Update(user);
            _context.SaveChanges();

            // generate new jwt
            var jwtToken = generateJwtToken(user);

            return new AuthenticateResponse(user, jwtToken, newRefreshToken.Token);
        }
        async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model, string ipAddress)
        {
            var userFromRepo = await _context.Accounts.Where(x => x.UserName.Equals(model.Username)).FirstOrDefaultAsync();
            if (userFromRepo == null)
                return null;

            var result = await
               Login(model.Username, model.Password);

            if (result == null)
                return null;

            // authentication successful so generate jwt and refresh tokens
            var jwtToken = generateJwtToken(userFromRepo);
            var refreshToken = generateRefreshToken(ipAddress);

            // save refresh token
            userFromRepo.RefreshTokens.Add(refreshToken);
            _context.Update(userFromRepo);
            _context.SaveChanges();

            return new AuthenticateResponse(userFromRepo, jwtToken, refreshToken.Token);
        }
        private bool RevokeToken(string token, string ipAddress)
        {
            var user = _context.Accounts.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            // return false if no user found with token
            if (user == null) return false;

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            // return false if token is not active
            if (!refreshToken.IsActive) return false;

            // revoke token and save
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            _context.Update(user);
            _context.SaveChanges();

            return true;
        }


        // helper methods
        private string generateJwtToken(Account account)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Token);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, account.ID.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = ipAddress
                };
            }
        }

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

        private async Task<Account> Login(string username, string password)
        {
            if (username == null || username == string.Empty)
                return null;

            var user = await _context.Accounts.FirstOrDefaultAsync(x => x.UserName.Equals(username));

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;
            return user;
        }
        private async Task<Account> Register(Account account, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            account.PasswordHash = passwordHash;
            account.PasswordSalt = passwordSalt;

            await _context.Accounts.AddAsync(account);

            await _context.SaveChangesAsync();

            return account;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
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
