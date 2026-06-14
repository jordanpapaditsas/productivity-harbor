using ProductivityHarborApi.Core.Dtos.Shared;

namespace ProductivityHarborApi.Core.Interfaces
{
    public interface IModuleService
    {
        Task<ModuleDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<List<ModuleDto>> GetAllAsync(CancellationToken cancellationToken);
        Task<ModuleDto> CreateAsync(ModuleDto moduleDto, CancellationToken cancellationToken);
        Task<ModuleDto> UpdateAsync(ModuleDto moduleDto, CancellationToken cancellationToken);
        Task<ModuleDto?> DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}
