using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.Relations;
using ProductivityHarborApi.Core.Models.Relations;
using ProductivityHarborApi.Core.Models.User;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    public class UserSocialMediaMapController : PhBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public UserSocialMediaMapController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("getAllUserSocialMediaMapByUserId/{userId}")]
        public async Task<IActionResult> GetAllUserSocialMediaMapByUserId(Guid userId)
        {
            var userSocialMedia = await _context.UserSocialMediaLinksMap.Where(x => x.UserId == userId).ToListAsync();

            if (userSocialMedia == null) 
            {
                return NotFound("There are no social media for this user.");
            }

            return Ok(userSocialMedia);
        }

        [HttpPost("createUserSocialMediaMap")]
        public async Task<IActionResult> CreateUserSocialMediaMap(UserSocialMediaMapDto userSocialMediaMapDto)
        {
            var userSocial = new UserSocialMediaMap();

            userSocial.Url = userSocialMediaMapDto.Url;
            userSocial.UserId = userSocialMediaMapDto.UserId;
            userSocial.SocialMediaId = userSocialMediaMapDto.SocialMediaId;

            _context.UserSocialMediaLinksMap.Add(userSocial);
            await _context.SaveChangesAsync();

            return Ok(userSocial);

        }       
        
        [HttpPut("updateUserSocialMediaMap")]
        public async Task<IActionResult> UpdateUserSocialMediaMap(UserSocialMediaMapDto userSocialMediaMapDto)
        {
            var userSocialMedia = await _context.UserSocialMediaLinksMap
                .FirstOrDefaultAsync(x => x.UserId == userSocialMediaMapDto.UserId && x.SocialMediaId == userSocialMediaMapDto.SocialMediaId);

            if (userSocialMedia == null)
            {
                return NotFound("User social media not found.");
            }

            userSocialMedia.Url = userSocialMediaMapDto.Url;
            userSocialMedia.UserId = userSocialMediaMapDto.UserId;
            userSocialMedia.SocialMediaId = userSocialMediaMapDto.SocialMediaId;

            await _context.SaveChangesAsync();

            return Ok(userSocialMedia);
        }

        [HttpDelete("deleteUserSocialMediaMapById/{id}")]
        public async Task<IActionResult> DeleteUserSocialMediaMapById(Guid id)
        {
            var userSocial = await _context.UserSocialMediaLinksMap.FirstOrDefaultAsync(x => x.Id == id);

            if (userSocial == null)
            {
                return BadRequest("User social media not found.");
            }
            else
            {
                _context.Remove(userSocial);
                await _context.SaveChangesAsync();

                return Ok(userSocial);
            }
        }
    }
}
