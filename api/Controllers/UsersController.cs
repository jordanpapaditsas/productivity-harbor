using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.Task;
using ProductivityHarborApi.Core.Dto.User;
using ProductivityHarborApi.Core.Models.Task;
using ProductivityHarborApi.Core.Models.User;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    public class UsersController : PhBaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public UsersController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();

            return Ok(users);
        }

        [HttpGet("getUserById/{userId}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            return Ok(user);
        }
        
        [HttpPost("createUser")]
        public async Task<IActionResult> CreateUser(UserDto userDto)
        {
            var actionUser = await _userManager.GetUserAsync(User);

            var user = new User();

            if (userDto != null)
            {
                user.Avatar = userDto.Avatar;
                user.UserName = userDto.UserName;
                user.Email = userDto.Email;
                user.PasswordHash = userDto.PasswordHash;
                user.CreatedByUserId = actionUser?.Id;
                user.IsActive = userDto.IsActive;
                user.IsDeleted = userDto.IsDeleted;
                user.Token = userDto.Token;
                user.SocialMediaLinks = userDto.SocialMediaLinks;
            } 
                
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(UserDto userDto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userDto.Id);

            if (user == null)
            {
                return BadRequest("User not found.");
            } 
            else
            {
                user.Avatar = userDto.Avatar;
                user.UserName = userDto.UserName;
                user.Email = userDto.Email;
                user.PasswordHash = userDto.PasswordHash;
                user.UpdatedByUserId = actionUser?.Id;
                user.IsActive = userDto.IsActive;
                user.IsDeleted = userDto.IsDeleted;
                user.Token = userDto.Token;
                user.SocialMediaLinks = userDto.SocialMediaLinks;

                await _context.SaveChangesAsync();

                return Ok(user);
            } 
        }

        [HttpDelete("deleteUserById/{id}")]
        public async Task<IActionResult> DeleteUserById(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return BadRequest("User not found.");
            }
            else
            {
                await _context.SaveChangesAsync();
                _context.Remove(user);

                return Ok(user);
            }
        }
    }
}
