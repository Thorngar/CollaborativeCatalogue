using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace CollaborativeCatalogue.Presentation.Controllers
{
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
            collaborativeCatalogueDbContext.Attach(thematic);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Created("", thematic);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] Thematic thematic)
        {
            var dbTheme = await collaborativeCatalogueDbContext.Thematics.FindAsync(id);

            if (dbTheme == null)
            {
                return NotFound();
            }

            collaborativeCatalogueDbContext.Attach(thematic);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var dbTheme = await collaborativeCatalogueDbContext.Thematics.FindAsync(id);

            if (dbTheme == null)
            {
                return NotFound();
            }

            collaborativeCatalogueDbContext.Remove(dbTheme);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
