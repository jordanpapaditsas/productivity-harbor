using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProductivityHarborApi.Core.Models.User;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    public class UserSocialMediaLinksMapController : PhBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public UserSocialMediaLinksMapController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("getAllUserSocialMediaLinksByUserId/{userId}")]
        public async Task<IActionResult> GetAllUserSocialMediaLinksByUserId(Guid userId)
        {
            return Ok();
        }
    }
}
