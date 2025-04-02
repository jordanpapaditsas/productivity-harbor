namespace ProductivityHarborApi.Core.Dto.Shared
{
    public class StatusDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string? Priority { get; set; }
    }
}
