using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.Auth;
using ProductivityHarborApi.Core.Dto.Shared;
using ProductivityHarborApi.Core.Dto.User;
using ProductivityHarborApi.Data;
using ProductivityHarborApi.Services;

namespace ProductivityHarborApi.Controllers
{
    public class AccountController : PhBaseController
    {
        private readonly ApplicationDbContext _context;
        private TokenProviderService _tokenProviderService;

        public AccountController(ApplicationDbContext context, TokenProviderService tokenProviderService) 
        {
            _context = context;
            _tokenProviderService = tokenProviderService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var apiResponseDto = new ApiResponseDto();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == dto.UserName);

            if (user == null) {
                return BadRequest("User not found");
            }

            var userLoggedIn = new UserDto
            {
                UserName = dto.UserName,
                Token = this._tokenProviderService.GenerateToken(user),
                FullName = user.FullName,
                Address = user.Address,
                Avatar = user.Avatar,
                BirthDate = user.BirthDate,
                Color = user.Color,
                Country = user.Country,
                CreatedAt = user.CreatedAt,
                CreatedByUserId = user.CreatedByUserId,
                Email = user.Email,
                Id = user.Id,
                IsActive = user.IsActive,
                IsDeleted = user.IsDeleted,
                Phone = user.Phone,
                Portfolio = user.Portfolio,
                UpdatedAt = user.UpdatedAt,
                UpdatedByUserId = user.UpdatedByUserId,
            };

            //if (checkpassword == true)
            //{
            //apiResponseDto.Data = userLoggedIn;
            //apiResponseDto.IsSuccess = true;
            //apiResponseDto.StatusCode = "200";
            //apiResponseDto.Message = "Login was successful.";
            //
            //}
            // else 
            // {
            //    apiResponseDto.StatusCode = "200";
            //    apiResponseDto.Error = "Login Failed";

            //   return Ok(apiResponseDto)
            // }



            apiResponseDto.Data = userLoggedIn;
            apiResponseDto.IsSuccess = true;
            apiResponseDto.StatusCode = "200";
            apiResponseDto.Message = "Login was successful.";
            apiResponseDto.Error = "Login Failed";
            
            return Ok(apiResponseDto);
        }

    }
}
