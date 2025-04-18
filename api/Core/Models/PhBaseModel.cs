using System.ComponentModel.DataAnnotations;

namespace ProductivityHarborApi.Core.Models
{
    public class PhBaseModel
    {
        public virtual string Name { get; set; }
        public virtual string? Notes { get; set; }
        public virtual DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public virtual Guid? CreatedByUserId { get; set; }
        public virtual DateTimeOffset? UpdatedAt { get; set; }
        public virtual Guid? UpdatedByUserId { get; set; }

    }
}
