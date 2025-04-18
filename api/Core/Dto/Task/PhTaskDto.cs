namespace ProductivityHarborApi.Core.Dto.Task
{
    public class PhTaskDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int SerialNumber { get; set; }
        public Guid StatusId { get; set; }
        public string? Notes { get; set; }
        public virtual DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public virtual Guid? CreatedByUserId { get; set; }
        public virtual DateTimeOffset? UpdatedAt { get; set; }
        public virtual Guid? UpdatedByUserId { get; set; }
    }
}
