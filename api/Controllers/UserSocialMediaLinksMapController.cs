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
            var userSocialMedia = await _context.UserSocialMediaLinksMap.Where(x => x.UserId == userId).ToListAsync();

            if (userSocialMedia == null) 
            {
                return NotFound("There are no social media for this user.");
            }

            return Ok(userSocialMedia);
        }

        [HttpPost("createUserSocialMedia")]
        public async Task<IActionResult> CreateUserSocialMedia(UserSocialMediaMapDto userSocialMediaMapDto)
        {
            var userSocial = new UserSocialMediaMap();

            userSocial.Url = userSocialMediaMapDto.Url;
            userSocial.UserId = userSocialMediaMapDto.UserId;
            userSocial.SocialMediaId = userSocialMediaMapDto.SocialMediaId;

            _context.UserSocialMediaLinksMap.Add(userSocial);
            await _context.SaveChangesAsync();

            return Ok(userSocial);

        }       
        
        [HttpPut("updateUserSocialMedia")]
        public async Task<IActionResult> UpdateUserSocialMedia(UserSocialMediaMapDto userSocialMediaMapDto)
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

        [HttpDelete("deleteUserSocialMedia/{id}")]
        public async Task<IActionResult> DeleteUserSocialMedia(Guid id)
        {
            var userSocial = await _context.UserSocialMediaLinksMap.FirstOrDefaultAsync(x => x.Id == id);

            if (userSocial == null)
            {
                return BadRequest("User social media not found.");
            }
            else
            {
                await _context.SaveChangesAsync();
                _context.Remove(userSocial);

                return Ok(userSocial);
            }
        }
    }
}
