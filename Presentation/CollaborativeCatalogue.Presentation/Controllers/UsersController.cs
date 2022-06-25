using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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

        //[HttpPost]
        //public async Task<IActionResult> Login(Credentials credentials)
        //{
        //    (var userData, var roleList) = await this._userDomain.Login(credentials);

        //    if (userData == null)
        //    {
        //        return this.Unauthorized();
        //    }

        //    var authClaims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.NameIdentifier, userData.Id.ToString()),
        //        new Claim(ClaimTypes.Email, userData.Email),
        //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //    };

        //    foreach (var role in roleList)
        //    {
        //        authClaims.Add(new Claim(ClaimTypes.Role, role));
        //    }

        //    var token = this.GetToken(authClaims);

        //    var response = new ConnectedUser
        //    {
        //        Token = new JwtSecurityTokenHandler().WriteToken(token),
        //        Expiration = token.ValidTo,
        //        Id = userData.Id,
        //        Email = userData.Email,
        //        Roles = roleList
        //    };

        //    return this.Ok(response);
        //}

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
    }
}
