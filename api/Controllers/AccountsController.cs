using Microsoft.AspNetCore.Mvc;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context) 
        {
            _context = context;
        }


    }
}
