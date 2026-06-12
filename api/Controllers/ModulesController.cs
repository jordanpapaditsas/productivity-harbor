using ProductivityHarborApi.Services;

namespace ProductivityHarborApi.Controllers
{
    public class ModulesController
    {
        ModuleService _moduleService;

        public ModulesController(ModuleService moduleService)
        {
            _moduleService = moduleService;
        }


    }
}
