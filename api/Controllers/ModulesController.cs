using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Dtos.Shared;
using ProductivityHarborApi.Services;

namespace ProductivityHarborApi.Controllers
{
    public class ModulesController : PhBaseController
    {
        private readonly ModuleService _moduleService;

        public ModulesController(ModuleService moduleService)
        {
            _moduleService = moduleService;
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ModuleDto>> GetById(Guid id, CancellationToken cancellationToken)
        {
            var module = await _moduleService.GetByIdAsync(id, cancellationToken);

            if (module == null)
            {
                return NotFound();
            }

            return Ok(module);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ModuleDto>>> GetAll(CancellationToken cancellationToken)
        {
            var modules = await _moduleService.GetAllAsync(cancellationToken);
            return Ok(modules);  
        }

    }
}
