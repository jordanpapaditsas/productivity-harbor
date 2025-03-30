using ProductivityHarborApi.Controllers.System;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers.Login
{
    public class UsersController : BaseController
    {
        private ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context) {

            _context = context;

        }
    }
}
