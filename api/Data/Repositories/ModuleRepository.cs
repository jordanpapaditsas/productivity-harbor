using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Interfaces;
using ProductivityHarborApi.Core.Models.Shared;

namespace ProductivityHarborApi.Data.Repositories
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly ApplicationDbContext _context;

        public ModuleRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        public async Task<Module> CreateAsync(Module module, CancellationToken cancellationToken)
        {
            _context.Add(module);

            return module;
        }

        public async Task<Module> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var module =  await _context.Modules.FirstOrDefaultAsync(id);
        }

        public async Task<List<Module>> GetAllAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Module> GetByIdAsync(Guid Id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Module> UpdateAsync(Module module, CancellationToken cancellationToken)
        {
            return module;
                
        }
    }
}
