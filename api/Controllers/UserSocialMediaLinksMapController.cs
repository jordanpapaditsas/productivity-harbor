using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.User;
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
            var userSocialMedia = await _context.SocialMediaLinksMap.Where(x => x.UserId == userId).ToListAsync();

            if (userSocialMedia == null) 
            {
                return NotFound("There are no social media for this user.");
            }

            return Ok(userSocialMedia);
        }

        [HttpPost("createUserSocialMedia")]
        public async Task<IActionResult> CreateUserSocialMedia(UserSocialMediaMapDto userSocialMediaMapDto)
        {
            var actionUser = await _userManager.GetUserAsync(User);

            var userSocial = new UserSocialMediaMap();

            return Ok(userSocial);

        }        
    }
}
