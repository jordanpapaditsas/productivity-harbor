using Microsoft.AspNetCore.Mvc;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers.System
{
    public class BaseController : Controller
    {
        private ApplicationDbContext _context;
        public BaseController(ApplicationDbContext context)
        {
            _context = context;
        }

        public BaseController() { }
    }
}
