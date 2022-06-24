using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CollaborativeCatalogue.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly CollaborativeCatalogueDbContext collaborativeCatalogueDbContext;

        public RolesController(CollaborativeCatalogueDbContext collaborativeCatalogueDbContext)
        {
            this.collaborativeCatalogueDbContext = collaborativeCatalogueDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllAsync()
        {
            return Ok(await collaborativeCatalogueDbContext.Roles.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetByIdAsync(int id)
        {
            return Ok(await collaborativeCatalogueDbContext.Roles.FindAsync(id));
        }
    }
}
