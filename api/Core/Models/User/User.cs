using Microsoft.AspNetCore.Identity;

namespace ProductivityHarborApi.Core.Models.User
{
    public class User : IdentityUser<Guid> 
    {
        public string? FullName { get; set; }
        public string? Avatar { get; set; }
        public string? Token { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public Guid? CreatedByUserId { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
        public Guid? UpdatedByUserId { get; set; }
        public ICollection<SocialMedia> SocialMediaLinks { get; set; } = new HashSet<SocialMedia>();

    }
}
