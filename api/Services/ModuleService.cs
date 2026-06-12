using AutoMapper;
using ProductivityHarborApi.Core.Dtos.Shared;
using ProductivityHarborApi.Core.Interfaces;
using ProductivityHarborApi.Core.Models.Shared;

namespace ProductivityHarborApi.Services
{
    public class ModuleService : IModuleService
    {
        private readonly IModuleRepository _moduleRepository;
        private readonly IMapper _mapper;
        
        public async Task<ModuleDto> GetByIdAsync(Guid Id)
        {
            var module = await _moduleRepository.GetByIdAsync(Id);

            return _mapper.Map<ModuleDto>(module);
        }
        public async Task<List<ModuleDto>> GetAllAsync()
        {
            var modules = await _moduleRepository.GetAllAsync();

            return _mapper.Map<List<ModuleDto>>(modules);
        }
        public async Task CreateAsync(ModuleDto moduleDto)
        {
            var module = _mapper.Map<Module>(moduleDto);

            await _moduleRepository.CreateAsync(module);
        }
        public async Task UpdateAsync(ModuleDto moduleDto)
        {
            var module = _mapper.Map<Module>(moduleDto);

            await _moduleRepository.UpdateAsync(module);
        }
        public async Task DeleteAsync(Guid Id)
        {
            var module = await _moduleRepository.GetByIdAsync(Id);

            await _moduleRepository.DeleteAsync(module.Id);
        }
    }
}
