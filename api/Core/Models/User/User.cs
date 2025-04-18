using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
        public string? Color { get; set; }
        public Phone? Phone { get; set; }
        public string? Portfolio { get; set; }
        public Address? Address { get; set; }
        public string? Country { get; set; }
        public DateTimeOffset? BirthDate { get; set; }
        public ICollection<UserSocialMediaMap> UserSocialMediaLinksMap { get; set; } = new HashSet<UserSocialMediaMap>();
       
    }
}
