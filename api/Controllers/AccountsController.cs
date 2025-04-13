using Microsoft.AspNetCore.Mvc;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    public class AccountsController : PhBaseController
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context) 
        {
            _context = context;
        }


    }
}
