using ProductivityHarborApi.Core.Dtos.Shared;

namespace ProductivityHarborApi.Core.Interfaces
{
    public interface IModuleService
    {
        Task<ModuleDto> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<List<ModuleDto>> GetAllAsync(CancellationToken cancellationToken);
        Task CreateAsync(ModuleDto moduleDto, CancellationToken cancellationToken);
        Task UpdateAsync(ModuleDto moduleDto, CancellationToken cancellationToken);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}
