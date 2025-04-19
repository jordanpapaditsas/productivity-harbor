using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.Shared;
using ProductivityHarborApi.Core.Models.Shared;
using ProductivityHarborApi.Core.Models.User;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    public class SocialMediaController : PhBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public SocialMediaController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("getAllSocialMedia")]
        public async Task<IActionResult> GetAllSocialMedia()
        {
            var data = await _context.SocialMediaLinks.Select(x => new SocialMediaDto
            {
                Id = x.Id,
                Icon = x.Icon,
                Name = x.Name,

            }).ToListAsync();

            if (data == null)
            {
                return NotFound("Social Media not found.");
            }

            return Ok(data);
        }

        [HttpGet("getSocialMediaById/{id}")]
        public async Task<IActionResult> GetSocialMediaByUserId(Guid id)
        {
            var data = await _context.SocialMediaLinks.FirstOrDefaultAsync(x => x.Id == id);

            if (data == null)
            {
                return NotFound("Social Media not found.");
            }

            return Ok(data);
        }
        
        [HttpPost("createSocialMedia")]
        public async Task<IActionResult> CreateSocialMedia(SocialMediaDto dto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var data = new SocialMedia();

            if (dto != null) 
            {
                dto.Id = data.Id;
                data.Icon = dto.Icon;
                data.Name = dto.Name;
                data.CreatedByUserId = actionUser?.Id;
            }

             _context.Add(data);
             await _context.SaveChangesAsync();   

            return Ok(dto);
        }

        [HttpPut("updateSocialMedia")]
        public async Task<IActionResult> UpdateSocialMedia(SocialMediaDto dto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var data = await _context.SocialMediaLinks.FirstOrDefaultAsync(x => x.Id == dto.Id);

            if (data == null) 
            {
                return BadRequest("Social Media not found.");
            }
            else
            {
                data.Icon = dto.Icon;
                data.Name = dto.Name;
                data.UpdatedByUserId = actionUser?.Id;
            }

                await _context.SaveChangesAsync();   

            return Ok(dto);
        }

        [HttpDelete("deleteSocialMediaById/{id}")]
        public async Task<IActionResult> DeleteSocialMediaById(Guid id)
        {
            var data = await _context.SocialMediaLinks.FirstOrDefaultAsync(x => x.Id == id);

            if (data == null) 
            {
                return BadRequest("Social Media not found.");
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
