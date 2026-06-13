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
        
        public async Task<ModuleDto> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var module = await _moduleRepository.GetByIdAsync(id, cancellationToken);

            if (module is not null)
            {
                var moduleDto = _mapper.Map<ModuleDto>(module);
                return moduleDto;
            }
            else
            {
                return null;
            }
        }
        public async Task<List<ModuleDto>> GetAllAsync(CancellationToken cancellationToken)
        {
            var modules = await _moduleRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<ModuleDto>>(modules);
        }
        public async Task CreateAsync(ModuleDto moduleDto, CancellationToken cancellationToken)
        {
            var module = _mapper.Map<Module>(moduleDto);

            await _moduleRepository.CreateAsync(module, cancellationToken);
        }
        public async Task UpdateAsync(ModuleDto moduleDto, CancellationToken cancellationToken)
        {
            var module = _mapper.Map<Module>(moduleDto);

            await _moduleRepository.UpdateAsync(module, cancellationToken);
        }
        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var module = await _moduleRepository.GetByIdAsync(id, cancellationToken);

            await _moduleRepository.DeleteAsync(module.Id, cancellationToken);
        }
    }
}
