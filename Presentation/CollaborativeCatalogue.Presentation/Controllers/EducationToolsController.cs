using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CollaborativeCatalogue.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationToolsController : ControllerBase
    {
        private readonly CollaborativeCatalogueDbContext collaborativeCatalogueDbContext;

        public EducationToolsController(CollaborativeCatalogueDbContext collaborativeCatalogueDbContext)
        {
            this.collaborativeCatalogueDbContext = collaborativeCatalogueDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EducationTool>>> GetAllAsync()
        {
            return Ok(await collaborativeCatalogueDbContext.EducationTools.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EducationTool>> GetByIdAsync(int id)
        {
            return Ok(await collaborativeCatalogueDbContext.EducationTools.FindAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<EducationTool>> CreateAsync([FromBody] EducationTool educationTool)
        {
            collaborativeCatalogueDbContext.Attach(educationTool);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Created("", educationTool);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] EducationTool educationTool)
        {
            var dbEducationTool = await collaborativeCatalogueDbContext.EducationTools.FindAsync(id);

            if (dbEducationTool == null)
            {
                return NotFound();
            }

            collaborativeCatalogueDbContext.Attach(educationTool);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var dbEducationTool = await collaborativeCatalogueDbContext.EducationTools.FindAsync(id);

            if (dbEducationTool == null)
            {
                return NotFound();
            }

            collaborativeCatalogueDbContext.Remove(dbEducationTool);
            await collaborativeCatalogueDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
