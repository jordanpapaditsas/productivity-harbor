namespace ProductivityHarborApi.Core.Models.Shared
{
    public class Module
    {
        public Module()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public Module? Parent { get; set; }
        public string Key { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
        public int? SortOrder { get; set; } = 0;
        public bool IsVisible { get; set; } = false;
        public ICollection<Module>? SubModules { get; set; } = new HashSet<Module>();
        
    }
}
