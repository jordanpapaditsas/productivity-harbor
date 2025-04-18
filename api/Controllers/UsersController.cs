using System.Xml;
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
            var user = await _context.Users.Include(x => x.UserSocialMediaLinksMap).FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var dto = new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Avatar = user.Avatar,
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                IsActive = user.IsActive,
                IsDeleted = user.IsDeleted,
                Color = user.Color,
                Portfolio = user.Portfolio,
                Address = user.Address ?? new Address
                {
                    Street = string.Empty,
                    City = string.Empty,
                    Zip = string.Empty
                },
                Phone = user.Phone ?? new Phone
                {
                    Home = string.Empty,
                    Mobile = string.Empty,
                    Work = string.Empty
                },
                Country = user.Country,
                BirthDate = user.BirthDate,
                //SocialMediaLinks = user.UserSocialMediaLinksMap.Select(link => new SocialMedia
                //{
                //    Url = link.Url,
                //    Icon = link.Icon,
                //    Name = link.Name
                //}).ToList()
            };

            return Ok(dto);
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
                user.UserSocialMediaLinksMap = userDto.UserSocialMediaLinksMap;
                user.Color = userDto.Color;
                user.Portfolio = userDto.Portfolio;
                user.BirthDate = userDto.BirthDate;
                user.Phone = userDto.Phone;
                user.Address = userDto.Address;
                user.Country = userDto.Country;
            } 
                
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(UserDto userDto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var user = await _context.Users.AsNoTracking().Include(x => x.UserSocialMediaLinksMap).FirstOrDefaultAsync(x => x.Id == userDto.Id);

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
                user.Color = userDto.Color;
                user.Portfolio = userDto.Portfolio;
                user.BirthDate = userDto.BirthDate;
                user.Phone = userDto.Phone;
                user.Address = userDto.Address;
                user.Country = userDto.Country;

                _context.Users.Attach(user);
                _context.Entry(user).State = EntityState.Modified;
                _context.Entry(user).Reference(u => u.Phone).TargetEntry.State = EntityState.Modified;
                _context.Entry(user).Reference(u => u.Address).TargetEntry.State = EntityState.Modified;
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
