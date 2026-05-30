using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dto.Auth;
using ProductivityHarborApi.Core.Dto.Shared;
using ProductivityHarborApi.Core.Dto.User;
using ProductivityHarborApi.Core.Models.User;
using ProductivityHarborApi.Data;
using ProductivityHarborApi.Services;

namespace ProductivityHarborApi.Controllers
{
    public class AccountController : PhBaseController
    {
        private readonly ApplicationDbContext _context;
        private TokenProviderService _tokenProviderService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AccountController(ApplicationDbContext context, TokenProviderService tokenProviderService, UserManager<User> userManager, IMapper mapper) 
        {
            _context = context;
            _tokenProviderService = tokenProviderService;
            _userManager = userManager;
            _mapper = mapper;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == dto.UserName);

            var apiResponseDto = new ApiResponseDto();

            if (user == null)
            {
                apiResponseDto.IsSuccess = false;
                apiResponseDto.StatusCode = 400; 
                apiResponseDto.Message = "User not found";

                return BadRequest(apiResponseDto);
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (isPasswordValid)
            {
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

                apiResponseDto.IsSuccess = true;
                apiResponseDto.StatusCode = 200; 
                apiResponseDto.Message = "Login was successful";
                apiResponseDto.Data = userLoggedIn;

                return Ok(apiResponseDto);
            }
            else
            {
                apiResponseDto.IsSuccess = false;
                apiResponseDto.StatusCode = 401; 
                apiResponseDto.Message = "Login failed"; 

                return Unauthorized(apiResponseDto); 
            }
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var apiResponse = new ApiResponseDto();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == dto.UserId);

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);

            if (result.Succeeded) 
            {
                apiResponse.IsSuccess = true;
                apiResponse.StatusCode = 200;
                apiResponse.Message = "Password changed successfully!";

                return Ok(apiResponse);
            }
            else
            {
                apiResponse.IsSuccess = false;
                apiResponse.StatusCode = 400;
                apiResponse.Message = "Couldn't change password. Please try again.";

                return BadRequest(apiResponse);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (dto == null)
            {
                return BadRequest("User registration credentials cannot be empty.");
            }

            var userToCreate = _mapper.Map<User>(dto);
            var result = await _userManager.CreateAsync(userToCreate, dto.Password);



            return BadRequest();
        }
    }
}
