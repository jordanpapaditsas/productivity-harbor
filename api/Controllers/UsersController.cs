using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.Task;
using ProductivityHarborApi.Core.Dto.User;
using ProductivityHarborApi.Core.Models.Task;
using ProductivityHarborApi.Core.Models.User;
using ProductivityHarborApi.Data;

namespace ProductivityHarborApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UsersController(ApplicationDbContext context)
        {
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
        
        [HttpPost("insertUser")]
        public async Task<IActionResult> InsertUser(UserDto userDto)
        {
            var user = new User();

            if (userDto != null)
            {
                user.Avatar = userDto.Avatar;
                user.UserName = userDto.UserName;
                user.Email = userDto.Email;
                user.PasswordHash = userDto.PasswordHash;
                user.CreatedAt = userDto.CreatedAt;
                user.UpdatedAt = userDto.UpdatedAt;
                user.CreatedByUserId = userDto.CreatedByUserId;
                user.UpdatedByUserId = userDto.UpdatedByUserId;
                user.IsActive = userDto.IsActive;
                user.IsDeleted = userDto.IsDeleted;
                user.Token = userDto.Token;
            } 
                
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(UserDto userDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userDto.Id);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            user.Avatar = userDto.Avatar;
            user.UserName = userDto.UserName;
            user.Email = userDto.Email;
            user.PasswordHash = userDto.PasswordHash;
            user.CreatedAt = userDto.CreatedAt;
            user.UpdatedAt = userDto.UpdatedAt;
            user.CreatedByUserId = userDto.CreatedByUserId;
            user.UpdatedByUserId = userDto.UpdatedByUserId;
            user.IsActive = userDto.IsActive;
            user.IsDeleted = userDto.IsDeleted;
            user.Token = userDto.Token;
      
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete("deleteById/{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            _context.Remove(user);

           await _context.SaveChangesAsync();

            return Ok(user);
        }
    }
}
