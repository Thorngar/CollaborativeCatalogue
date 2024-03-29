﻿using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Transactions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CollaborativeCatalogue.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CollaborativeCatalogueDbContext collaborativeCatalogueDbContext;

        private readonly IConfiguration _configuration;

        public UsersController(CollaborativeCatalogueDbContext collaborativeCatalogueDbContext, IConfiguration configuration)
        {
            this.collaborativeCatalogueDbContext = collaborativeCatalogueDbContext;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllAsync()
        {
            return Ok(await collaborativeCatalogueDbContext.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetByIdAsync(int id)
        {
            return Ok(await collaborativeCatalogueDbContext.Users.FindAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateAsync([FromBody] User user)
        {
            try { 
                CurrentUser currentUser = this.GetCurrentUser();

                if(currentUser.RoleId == 1)
                {
                    (var hash, var salt) = EncryptionPassword(user.Password);
                    user.Salt = Convert.ToBase64String(hash);
                    user.Password = Convert.ToBase64String(salt);

                    user.RoleId = 1;

                    collaborativeCatalogueDbContext.Attach(user);
                    await collaborativeCatalogueDbContext.SaveChangesAsync();
                    return Created("", user);
                }
                else if(currentUser.RoleId == 0)
                {
                    (var hash, var salt) = EncryptionPassword(user.Password);
                    user.Salt = Convert.ToBase64String(salt);
                    user.Password = Convert.ToBase64String(hash);

                    user.RoleId = 2;

                    collaborativeCatalogueDbContext.Attach(user);
                    await collaborativeCatalogueDbContext.SaveChangesAsync();
                    return Created("", user);
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult> Login(Credentials credentials)
        {
            var userDb = await this.GetByEmail(credentials.Email);

            if (userDb == null)
            {
                return Unauthorized();
            }

            this.Decryption(credentials.Password, userDb.Salt);
            var hashToCompare = Decryption(credentials.Password, userDb.Salt);

            if (!userDb.Password.Equals(hashToCompare))
            {
                return Unauthorized();
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userDb.Id.ToString()),
                new Claim(ClaimTypes.Email, userDb.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, userDb.RoleId.ToString(), ClaimValueTypes.Integer32)
            };


            var token = this.GetToken(authClaims);

            var response = new ConnectedUser
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo,
                Id = userDb.Id,
                Email = userDb.Email,
                Role = userDb.RoleId
            };

            return this.Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] UserUpdate userUpdate)
        {
            try
            {
                var userDb = await this.GetByEmail(this.GetCurrentUser().Email);

                if (userDb == null)
                {
                    return Unauthorized();
                }
                
                userDb.Name = userUpdate.Name;
                userDb.Address = userUpdate.Address;
                userDb.PhoneNumber = userUpdate.PhoneNumber;
                userDb.WebsiteLink = userUpdate.WebsiteLink;

                collaborativeCatalogueDbContext.Attach(userDb);
                collaborativeCatalogueDbContext.Entry(userDb).State = EntityState.Modified;
                await collaborativeCatalogueDbContext.SaveChangesAsync();

                return this.Ok(userDb);
            }
            catch 
            {
                return Unauthorized();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePasswordAsync(UserUpdatePassword user)
        {
            try
            {
                CurrentUser currentUser = this.GetCurrentUser();

                if (currentUser.Email != user.Email)
                {
                    return this.Unauthorized();
                }

                await this.UpdatePassword(user);
                return this.Ok();
            }
            catch (Exception e)
            {
                return this.BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            CurrentUser currentUser = this.GetCurrentUser();

            if (currentUser.RoleId == 2 && currentUser.Id == id)
            {
                var userDb = await this.GetByEmail(currentUser.Email);

                collaborativeCatalogueDbContext.Remove(userDb);
                await collaborativeCatalogueDbContext.SaveChangesAsync();

                return Ok();
            } else if (currentUser.RoleId == 1)
            {
                var dbUser = await collaborativeCatalogueDbContext.Users.FindAsync(id);

                collaborativeCatalogueDbContext.Remove(dbUser);
                await collaborativeCatalogueDbContext.SaveChangesAsync();

                return Ok();
            }

            return Unauthorized();
        }


        private async Task<User?> GetByEmail(string email)
        {
            return await this.collaborativeCatalogueDbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        }

        private CurrentUser GetCurrentUser()
        {
            var context = this.HttpContext.User.Claims;
            CurrentUser currentUser = new CurrentUser();

            if (context.Count() != 0)
            {
                currentUser.Id = Int32.Parse(context.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
                currentUser.Email = context.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;
                currentUser.RoleId = Int32.Parse(context.FirstOrDefault(r => r.Type == ClaimTypes.Role).Value);
                
            }

            return currentUser;
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            return new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddDays(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
                );
        }

        private async Task UpdatePassword(UserUpdatePassword user)
        {
            var userDb = await this.GetByEmail(user.Email);

            await this.ValidateOldPasswordAsync(user.Email, user.OldPassword);

            (var hash, var salt) = EncryptionPassword(user.NewPassword);

            user.Salt = Convert.ToBase64String(salt);
            user.NewPassword = Convert.ToBase64String(hash);

            userDb.Password = user.NewPassword;
            userDb.Salt = user.Salt;

            collaborativeCatalogueDbContext.Attach(userDb);
            collaborativeCatalogueDbContext.Entry(userDb).State = EntityState.Modified;

            await this.collaborativeCatalogueDbContext.SaveChangesAsync();
        }

        private async Task<ActionResult> ValidateOldPasswordAsync(string email, string oldPassword)
        {
            var userDb = await this.GetByEmail(email);

            if (userDb == null)
            {
                return Unauthorized();
            }

            var hashToCompare = Decryption(oldPassword, userDb.Salt);

            if (!userDb.Password.Equals(hashToCompare))
            {
                return Unauthorized();
            }

            return this.Ok();
        }

        private (byte[], byte[]) EncryptionPassword(string password)
        {
            var length = 1000;
            var iteration = 10000;
            var salt = GenerateSalt(length);
            var encodedPassword = Encoding.ASCII.GetBytes(password);
            var hash = GenerateHash(encodedPassword, salt, iteration, length);
            return (hash, salt);
        }

        private string Decryption(string password, string salt)
        {
            var length = 1000;
            var iteration = 10000;
            var encodedPassword = Encoding.ASCII.GetBytes(password);
            var hash = GenerateHash(encodedPassword, Convert.FromBase64String(salt), iteration, length);
            var hashToCompare = Convert.ToBase64String(hash);
            return hashToCompare;
        }

        private static byte[] GenerateHash(byte[] password, byte[] salt, int iterations, int length)
        {
            using (var deriveBytes = new Rfc2898DeriveBytes(password, salt, iterations))
            {
                return deriveBytes.GetBytes(length);
            }
        }

        private static byte[] GenerateSalt(int length)
        {
            var bytes = new byte[length];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(bytes);
            }
            return bytes;
        }
    }
}
