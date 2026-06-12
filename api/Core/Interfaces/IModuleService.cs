using ProductivityHarborApi.Core.Dtos.Shared;

namespace ProductivityHarborApi.Core.Interfaces
{
    public interface IModuleService
    {
        Task<ModuleDto> GetByIdAsync(Guid Id);
        Task<List<ModuleDto>> GetAllAsync();
        Task CreateAsync(ModuleDto moduleDto);
        Task UpdateAsync(ModuleDto moduleDto);
        Task DeleteAsync(Guid Id);
    }
}
