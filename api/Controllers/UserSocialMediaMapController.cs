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
            var data = await _context.UserSocialMediaLinksMap.Where(x => x.UserId == userId).Select(x => new UserSocialMediaMapDto
            {
                UserId = x.UserId,
                SocialMediaId = x.SocialMediaId,
                Url = x.Url,
            }).ToListAsync();


            if (data == null) 
            {
                return NotFound("There are no social media for this user.");
            }

            return Ok(data);
        }

        [HttpPost("createUserSocialMediaMap")]
        public async Task<IActionResult> CreateUserSocialMediaMap(UserSocialMediaMapDto dto)
        {
            var data = new UserSocialMediaMap();

            dto.Id = data.Id;
            data.Url = dto.Url;
            data.UserId = dto.UserId;
            data.SocialMediaId = dto.SocialMediaId;

            _context.UserSocialMediaLinksMap.Add(data);
            await _context.SaveChangesAsync();

            return Ok(dto);

        }       
        
        [HttpPut("updateUserSocialMediaMap")]
        public async Task<IActionResult> UpdateUserSocialMediaMap(UserSocialMediaMapDto dto)
        {
            var data = await _context.UserSocialMediaLinksMap
                .FirstOrDefaultAsync(x => x.UserId == dto.UserId && x.SocialMediaId == dto.SocialMediaId && x.Id == dto.Id);

            if (data == null)
            {
                return NotFound("User social media not found.");
            }

            data.Url = dto.Url;
            data.UserId = dto.UserId;
            data.SocialMediaId = dto.SocialMediaId;

            await _context.SaveChangesAsync();

            return Ok(dto);
        }

        [HttpDelete("deleteUserSocialMediaMapById/{id}")]
        public async Task<IActionResult> DeleteUserSocialMediaMapById(Guid id)
        {
            var data = await _context.UserSocialMediaLinksMap.FirstOrDefaultAsync(x => x.Id == id);

            if (data == null)
            {
                return BadRequest("User social media not found.");
            }
            else
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }
    }
}
