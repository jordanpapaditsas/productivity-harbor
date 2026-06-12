using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ProductivityHarborApi.Core.Dto.Auth;
using ProductivityHarborApi.Core.Models.User;

namespace ProductivityHarborApi.Services
{
    public class MapperConfigurationService : Profile
    {
        public MapperConfigurationService()
        {
            CreateMap<User, RegisterDto>().ReverseMap();
        }
    }
}
