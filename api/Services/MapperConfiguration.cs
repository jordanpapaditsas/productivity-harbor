using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ProductivityHarborApi.Core.Dto.Auth;
using ProductivityHarborApi.Core.Models.User;

namespace ProductivityHarborApi.Services
{
    public class MapperConfiguration : Profile
    {
        public MapperConfiguration()
        {
            CreateMap<User, RegisterDto>().ReverseMap();
        }
    }
}
