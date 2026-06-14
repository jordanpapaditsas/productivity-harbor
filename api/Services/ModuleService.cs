using AutoMapper;
using ProductivityHarborApi.Core.Dtos.Shared;
using ProductivityHarborApi.Core.Interfaces;
using ProductivityHarborApi.Core.Models.Shared;
using ProductivityHarborApi.Data;
using ProductivityHarborApi.Data.Repositories;

namespace ProductivityHarborApi.Services
{
    public class ModuleService : IModuleService
    {
        private readonly IModuleRepository _moduleRepository;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public ModuleService(IModuleRepository moduleRepository, IMapper mapper, ApplicationDbContext context)
        {
            _moduleRepository = moduleRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<ModuleDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var module = await _moduleRepository.GetByIdAsync(id, cancellationToken);

            if (module != null)
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
        public async Task<ModuleDto> CreateAsync(ModuleDto moduleDto, CancellationToken cancellationToken)
        {
            var module = _mapper.Map<Module>(moduleDto);

            _moduleRepository.Create(module);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ModuleDto>(module);
        }
        public async Task<ModuleDto> UpdateAsync(ModuleDto moduleDto, CancellationToken cancellationToken)
        {
            var module = _mapper.Map<Module>(moduleDto);

            _moduleRepository.Update(module);
            await _context.SaveChangesAsync(cancellationToken);

            return  _mapper.Map<ModuleDto>(module);
        }
        public async Task<ModuleDto?> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var module = await _moduleRepository.GetByIdAsync(id, cancellationToken);

            if (module  == null)
            {
                return null;
            }

            else
            {
                _moduleRepository.Delete(module);
                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<ModuleDto>(module);
            }

        }
    }
}
