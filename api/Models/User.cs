using Microsoft.AspNetCore.Identity;

namespace ProductivityHarborApi.Models
{
    public class User : IdentityUser
    {
        public string? FullName { get; set; }
        public string? Avatar { get; set; }
        public string? Token { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Guid CreatedById { get; set; } 
        public DateTime? UpdatedAt { get; set; }
        public Guid? UpdatedById { get; set; }
    }
}
