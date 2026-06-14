using ProductivityHarborApi.Core.Models.Shared;

namespace ProductivityHarborApi.Core.Interfaces
{
    public interface IModuleRepository
    {
        Task<Module?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<List<Module>> GetAllAsync(CancellationToken cancellationToken);
        Module Create(Module module);
        void Update(Module module);
        void Delete(Module module);
    }
}
