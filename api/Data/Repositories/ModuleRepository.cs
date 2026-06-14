using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Interfaces;
using ProductivityHarborApi.Core.Models.Contact;
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
        public async Task<List<Module>> GetAllAsync(CancellationToken cancellationToken)
        {
            var modules = await _context.Modules.ToListAsync(cancellationToken);

            return modules;
        }

        public async Task<Module?> GetByIdAsync(Guid Id, CancellationToken cancellationToken)
        {
            var module = await _context.Modules.SingleOrDefaultAsync(x => x.Id == Id, cancellationToken);

            if (module == null) 
            {
                return null;
            }

            else
            {
               return module;
            }
        }

        public Module Create(Module module)
        {
            _context.Add(module);

            return module;
        }

        public void Delete(Module module)
        {
            _context.Remove(module);
        }

        

        public void Update(Module module)
        {
            _context.Update(module);
        }
    }
}
