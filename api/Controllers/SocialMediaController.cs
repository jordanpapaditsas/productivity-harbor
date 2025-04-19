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
            var socialMedia = await _context.SocialMediaLinks.ToListAsync();

            if (socialMedia == null)
            {
                return NotFound("Social Media not found.");
            }

            return Ok(socialMedia);
        }

        [HttpGet("getSocialMediaById/{id}")]
        public async Task<IActionResult> GetSocialMediaByUserId(Guid id)
        {
            var socialMedia = await _context.SocialMediaLinks.FirstOrDefaultAsync(x => x.Id == id);

            if (socialMedia == null)
            {
                return NotFound("Social Media not found.");
            }

            return Ok(socialMedia);
        }
        
        [HttpPost("createSocialMedia")]
        public async Task<IActionResult> CreateSocialMedia(SocialMediaDto socialMediaDto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var socialMedia = new SocialMedia();

            if (socialMediaDto != null) 
            {
                socialMedia.Icon = socialMediaDto.Icon;
                socialMedia.Name = socialMediaDto.Name;
                socialMedia.CreatedByUserId = actionUser?.Id;
            }

             _context.Add(socialMedia);
             await _context.SaveChangesAsync();   

            return Ok(socialMedia);
        }

        [HttpPut("updateSocialMedia")]
        public async Task<IActionResult> UpdateSocialMedia(SocialMediaDto socialMediaDto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var socialMedia = await _context.SocialMediaLinks.FirstOrDefaultAsync(x => x.Id == socialMediaDto.Id);

            if (socialMedia == null) 
            {
                return BadRequest("Social Media not found.");
            }
            else
            {
                socialMedia.Icon = socialMediaDto.Icon;
                socialMedia.Name = socialMediaDto.Name;
                socialMedia.UpdatedByUserId = actionUser?.Id;
            }

                await _context.SaveChangesAsync();   

            return Ok(socialMedia);
        }

        [HttpDelete("deleteSocialMediaById/{socialMediaId}")]
        public async Task<IActionResult> DeleteSocialMediaById(Guid socialMediaId)
        {
            var socialMedia = await _context.SocialMediaLinks.FirstOrDefaultAsync(x => x.Id == socialMediaId);

            if (socialMedia == null) 
            {
                return BadRequest("Social Media not found.");
            }
            else
            {
                _context.Remove(socialMedia);
                await _context.SaveChangesAsync();
                
                return Ok(socialMedia);
            }


        }

    }
}
