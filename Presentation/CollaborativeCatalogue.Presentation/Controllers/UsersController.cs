using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CollaborativeCatalogue.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CollaborativeCatalogueDbContext collaborativeCatalogueDbContext;

        public UsersController(CollaborativeCatalogueDbContext collaborativeCatalogueDbContext)
        {
            this.collaborativeCatalogueDbContext = collaborativeCatalogueDbContext;
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
            (var hash, var salt) = EncryptionPassword(user.Password);
            user.Salt = Convert.ToBase64String(salt);
            user.Password = Convert.ToBase64String(hash);

            var userCreate = this._mapper.Map<UserCore>(user);
            userCreate.CreationDate = DateTime.Now;

            try
            {
                using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    var userCreateReceive = await this._userRepository.CreateAsync(userCreate);
                    await this._userRoleRepository.AddUserRoleAsync(new UserRoleCore
                    {
                        UserId = userCreateReceive.Id,
                        RoleId = user.RoleGranted,
                        AuthorOfChange = currentUser.ListRoles.Count != Constants.RoleConstants.NoConnectedUser ? currentUser.Email : user.Email
                    });
                    scope.Complete();
                    return userCreateReceive;
                }
            }
            catch (Exception e)
            {
                throw new BusinessException($"{Constants.ExceptionMessages.ErrorCreateUserAndLinkWithRole}");
            }

            collaborativeCatalogueDbContext.Attach(user);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Created("", user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] User user)
        {
            var dbUser = await collaborativeCatalogueDbContext.Users.FindAsync(id);

            if (dbUser == null)
            {
                return NotFound();
            }

            collaborativeCatalogueDbContext.Attach(user);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var dbUser = await collaborativeCatalogueDbContext.Users.FindAsync(id);

            if (dbUser == null)
            {
                return NotFound();
            }

            collaborativeCatalogueDbContext.Remove(dbUser);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Ok();
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
