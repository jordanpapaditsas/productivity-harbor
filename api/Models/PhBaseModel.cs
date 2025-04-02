using System.ComponentModel.DataAnnotations;

namespace ProductivityHarborApi.Models
{
    public class PhBaseModel
    {
        public virtual string Name { get; set; } = string.Empty;
        public virtual string? Notes { get; set; }
        public virtual DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public virtual Guid? CreatedByUserId { get; set; }
        public virtual DateTimeOffset? UpdatedAt { get; set; }
        public virtual Guid? UpdatedByUserId { get; set; }

    }
}
