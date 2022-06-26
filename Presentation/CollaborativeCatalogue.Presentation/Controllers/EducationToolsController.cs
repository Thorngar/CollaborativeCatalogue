using CollaborativeCatalogue.Data.Providers.Sql;
using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CollaborativeCatalogue.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
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

        [HttpGet]
        public async Task<ActionResult<EducationTool>> GetByIdAsync(int id)
        {
            return Ok(await collaborativeCatalogueDbContext.EducationTools.FindAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<EducationTool>> CreateAsync([FromBody] EducationTool educationTool)
        {
            CurrentUser currentUser = this.GetCurrentUser();

            if(currentUser.RoleId == 2)
            {
                educationTool.IsValidatedByAdmin = false;
                educationTool.UserId = currentUser.Id;

                collaborativeCatalogueDbContext.EducationTools.Attach(educationTool);
                await collaborativeCatalogueDbContext.SaveChangesAsync();
                return Created("", educationTool);
            }
            return Unauthorized();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] EducationTool educationTool)
        {
            CurrentUser currentUser = this.GetCurrentUser();
            var tool = await collaborativeCatalogueDbContext.EducationTools.FindAsync(id);

            if(currentUser.RoleId == 2 && tool.UserId == currentUser.Id)
            {
                var dbEducationTool = await collaborativeCatalogueDbContext.EducationTools.FindAsync(id);

                if (dbEducationTool == null)
                {
                    return NotFound();
                }

                dbEducationTool.UserId = currentUser.Id;
                dbEducationTool.IsValidatedByAdmin = false;

                dbEducationTool.Name = educationTool.Name;
                dbEducationTool.Subtitle = educationTool.Subtitle;
                dbEducationTool.Description = educationTool.Description;
                dbEducationTool.ToolType = educationTool.ToolType;
                dbEducationTool.IsDigitalTool = educationTool.IsDigitalTool;
                dbEducationTool.IsNewTool = educationTool.IsNewTool;
                dbEducationTool.MinAge = educationTool.MinAge;
                dbEducationTool.MaxAge = educationTool.MaxAge;
                dbEducationTool.StartDate = educationTool.StartDate;
                dbEducationTool.EndDate = educationTool.EndDate;
                dbEducationTool.Price = educationTool.Price;

                collaborativeCatalogueDbContext.Attach(dbEducationTool);
                collaborativeCatalogueDbContext.Entry(dbEducationTool).State = EntityState.Modified;
                await collaborativeCatalogueDbContext.SaveChangesAsync();
                return Ok();
            }
            return Unauthorized();
        }

        [HttpPut]
        public async Task<IActionResult> ValidByAdmin(int id)
        {
            CurrentUser currentUser = this.GetCurrentUser();
            var tool = await collaborativeCatalogueDbContext.EducationTools.FindAsync(id);
            
            if(currentUser.RoleId == 1)
            {
                var dbEducationTool = await collaborativeCatalogueDbContext.EducationTools.FindAsync(id);

                if (dbEducationTool == null)
                {
                    return NotFound();
                }

                dbEducationTool.IsValidatedByAdmin = !dbEducationTool.IsValidatedByAdmin;

                collaborativeCatalogueDbContext.Attach(dbEducationTool);
                collaborativeCatalogueDbContext.Entry(dbEducationTool).State = EntityState.Modified;
                await collaborativeCatalogueDbContext.SaveChangesAsync();
                return Ok();
            }

            return Unauthorized();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            CurrentUser currentUser = this.GetCurrentUser();
            var tool = await collaborativeCatalogueDbContext.EducationTools.FindAsync(id);

            if (currentUser.RoleId == 1)
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
            else if(currentUser.RoleId == 2 && tool.UserId == currentUser.Id)
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
