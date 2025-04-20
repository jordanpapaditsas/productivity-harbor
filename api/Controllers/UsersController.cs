using System.Xml;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.Relations;
using ProductivityHarborApi.Core.Dto.User;
using ProductivityHarborApi.Core.Models.Owned;
using ProductivityHarborApi.Core.Models.Relations;
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
            var data = await _context.Users.ToListAsync();

            return Ok(data);
        }

        [HttpGet("getUserById/{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var data = await _context.Users
                .Include(x => x.UserSocialMediaLinksMap)
                .ThenInclude(y => y.SocialMedia) 
                .FirstOrDefaultAsync(x => x.Id == id);

            if (data == null)
            {
                return BadRequest("User not found.");
            }

            var userSocialMediaDto = data.UserSocialMediaLinksMap
                    .Select(x => new UserSocialMediaMapDto
                    {
                        Id = x.Id,
                        SocialMediaId = x.SocialMediaId,
                        Url = x.Url,
                        UserId = x.UserId,
                        Icon = x.SocialMedia.Icon,
                        Name = x.SocialMedia.Name
                    })
                    .ToList();

            var userDto = new UserDto
            {
                Id = data.Id,
                FullName = data.FullName,
                Avatar = data.Avatar,
                UserName = data.UserName,
                Email = data.Email,
                IsActive = data.IsActive,
                IsDeleted = data.IsDeleted,
                Color = data.Color,
                Portfolio = data.Portfolio,
                Address = data.Address ?? new Address
                {
                    Street = string.Empty,
                    City = string.Empty,
                    Zip = string.Empty
                },
                Phone = data.Phone ?? new Phone
                {
                    Home = string.Empty,
                    Mobile = string.Empty,
                    Work = string.Empty
                },
                Country = data.Country,
                BirthDate = data.BirthDate,
                UserSocialMediaLinksMap = userSocialMediaDto
            };
     
            return Ok(userDto);
        }
        
        [HttpPost("createUser")]
        public async Task<IActionResult> CreateUser(UserDto dto)
        {
            var actionUser = await _userManager.GetUserAsync(User);

            var data = new User();

            if (dto != null)
            {
                dto.Id = data.Id;
                data.Avatar = dto.Avatar;
                data.UserName = dto.UserName;
                data.Email = dto.Email;
                data.CreatedByUserId = actionUser?.Id;
                data.IsActive = dto.IsActive;
                data.IsDeleted = dto.IsDeleted;
                data.Token = dto.Token;
                data.Color = dto.Color;
                data.Portfolio = dto.Portfolio;
                data.BirthDate = dto.BirthDate;
                data.Phone = dto.Phone;
                data.Address = dto.Address;
                data.Country = dto.Country;
            }

            _context.Users.Add(data);
            await _context.SaveChangesAsync();

            return Ok(dto);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(UserDto dto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var data = await _context.Users
                .Include(x => x.UserSocialMediaLinksMap)
                .Include(y => y.Phone)
                .Include(z => z.Address)
                .FirstOrDefaultAsync(x => x.Id == dto.Id);

            if (data == null)
            {
                return BadRequest("User not found.");
            } 
            else
            {
                dto.Id = data.Id;
                data.Avatar = dto.Avatar;
                data.FullName = dto.FullName;
                data.UserName = dto.UserName;
                data.Email = dto.Email;
                data.UpdatedByUserId = actionUser?.Id;
                data.IsActive = dto.IsActive;
                data.IsDeleted = dto.IsDeleted;
                data.Token = dto.Token;
                data.Color = dto.Color;
                data.Portfolio = dto.Portfolio;
                data.BirthDate = dto.BirthDate;
                data.Phone = dto.Phone;
                data.Address = dto.Address;
                data.Country = dto.Country;

                await _context.SaveChangesAsync();
                try
                {
                    return Ok(dto);

                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Error occurred" + ex.Message);
                }
            } 
        }

        [HttpDelete("deleteUserById/{id}")]
        public async Task<IActionResult> DeleteUserById(Guid id)
        {
            var data = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (data == null)
            {
                return BadRequest("User not found.");
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
