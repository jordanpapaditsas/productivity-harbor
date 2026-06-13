using ProductivityHarborApi.Core.Models.Shared;

namespace ProductivityHarborApi.Core.Interfaces
{
    public interface IModuleRepository
    {
        Task<Module?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<List<Module>> GetAllAsync(CancellationToken cancellationToken);
        Task<Module> CreateAsync(Module module, CancellationToken cancellationToken);
        Task<Module> UpdateAsync(Module module, CancellationToken cancellationToken);
        Task<Module> DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}
