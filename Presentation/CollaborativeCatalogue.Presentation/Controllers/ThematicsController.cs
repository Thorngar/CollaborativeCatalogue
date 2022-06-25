using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using System.Security.Claims;

namespace CollaborativeCatalogue.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ThematicsController : ControllerBase
    {
        private readonly CollaborativeCatalogueDbContext collaborativeCatalogueDbContext;

        public ThematicsController(CollaborativeCatalogueDbContext collaborativeCatalogueDbContext)
        {
            this.collaborativeCatalogueDbContext = collaborativeCatalogueDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Thematic>>> GetAllAsync()
        {
            return Ok(await collaborativeCatalogueDbContext.Thematics.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Thematic>> GetByIdAsync(int id)
        {
            return Ok(await collaborativeCatalogueDbContext.Thematics.FindAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<Thematic>> CreateAsync([FromBody] Thematic thematic)
        {
            CurrentUser currentUser = this.GetCurrentUser();

            try
            {
                if (currentUser.RoleId == 1)
                {
                    collaborativeCatalogueDbContext.Attach(thematic);
                    await collaborativeCatalogueDbContext.SaveChangesAsync();

                    return Created("", thematic);
                }

                return Unauthorized();
            }
            catch (Exception e)
            {

                throw;
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            CurrentUser currentUser = this.GetCurrentUser();

            if (currentUser.RoleId == 1)
            {
                var dbTheme = await collaborativeCatalogueDbContext.Thematics.FindAsync(id);

                collaborativeCatalogueDbContext.Remove(dbTheme);
                await collaborativeCatalogueDbContext.SaveChangesAsync();
                return Ok();
            }

            return Unauthorized();
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
    }
}
