namespace ProductivityHarborApi.Core.Dto.Shared
{
    public class StatusDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string Color { get; set; } 
        public string? Priority { get; set; }
    }
}
