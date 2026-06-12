using ProductivityHarborApi.Core.Models.Shared;

namespace ProductivityHarborApi.Core.Interfaces
{
    public interface IModuleRepository
    {
        Task<Module> GetByIdAsync(Guid Id);
        Task<List<Module>> GetAllAsync();
        Task CreateAsync(Module moduleDto);
        Task UpdateAsync(Module moduleDto);
        Task DeleteAsync(Guid Id);
    }
}
