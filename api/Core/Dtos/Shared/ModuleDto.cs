namespace ProductivityHarborApi.Core.Dtos.Shared
{
    public class ModuleDto
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Key { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
        public int? SortOrder { get; set; } = 0;
        public bool IsVisible { get; set; } = false;
        public List<ModuleDto>? SubModules { get; set; } = new List<ModuleDto>();

    }
}
