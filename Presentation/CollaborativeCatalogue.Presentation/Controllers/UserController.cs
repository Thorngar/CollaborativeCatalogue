using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CollaborativeCatalogue.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            
        }

        [HttpGet]
        public async Task<IActionResult> GetByIdAsync(int id)
        {

        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync()
        {

        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync()
        {

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
           
        }
    }
}
