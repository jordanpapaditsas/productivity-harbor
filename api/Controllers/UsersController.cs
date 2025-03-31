using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    public class UsersController
    {
        private readonly ApplicationDbContext _context;
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
