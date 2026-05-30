using System.ComponentModel.DataAnnotations;

namespace ProductivityHarborApi.Core.Models.Shared
{
    public class PhBaseModel
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Notes { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public Guid? CreatedByUserId { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
        public Guid? UpdatedByUserId { get; set; }

    }
}
