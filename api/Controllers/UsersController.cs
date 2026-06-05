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

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.Users.ToListAsync();

            return Ok(data);
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
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
        
        [HttpPost("create")]
        public async Task<IActionResult> Create(UserDto dto)
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

            if (dto.UserSocialMediaLinksMap.Count > 0)
            {
                foreach (var item in dto.UserSocialMediaLinksMap)
                {
                    var userSocialMedia = new UserSocialMediaMap();
                    userSocialMedia.SocialMediaId = item.SocialMediaId;
                    userSocialMedia.Url = item.Url;
                    userSocialMedia.UserId = data.Id;

                    _context.UserSocialMediaLinksMap.Add(userSocialMedia);
                }
            }

            _context.Users.Add(data);
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

        [HttpPut("update")]
        public async Task<IActionResult> Update(UserDto dto)
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

                if (dto.UserSocialMediaLinksMap.Count > 0)
                {
                    foreach (var item in data.UserSocialMediaLinksMap)
                    {
                        data.UserSocialMediaLinksMap.Remove(item);
                    }

                    foreach (var item in dto.UserSocialMediaLinksMap)
                    {
                        var userSocialMedia = new UserSocialMediaMap();
                        userSocialMedia.Url = item.Url;
                        userSocialMedia.UserId = item.UserId;
                        userSocialMedia.SocialMediaId = item.SocialMediaId;

                        data.UserSocialMediaLinksMap.Add(userSocialMedia);
                    }
                    _context.UserSocialMediaLinksMap.AddRange(data.UserSocialMediaLinksMap);

                }
                try
                {
                    await _context.SaveChangesAsync();
               
                    return Ok(dto);

                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Error occurred" + ex.Message);
                }
            } 
        }

        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateStatus(UserDto dto)
        {
            var actionUser = await _userManager.GetUserAsync(User);
            var data = await _context.Users.FirstOrDefaultAsync(x => x.Id == dto.Id);

            if (data == null)
            {
                return BadRequest("User not found.");
            }
            else
            {
                data.IsActive = dto.IsActive;

                try
                {
                    await _context.SaveChangesAsync();

                    return Ok(dto);

                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Error occurred" + ex.Message);
                }
            }
        }

        [HttpDelete("deleteById/{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
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
