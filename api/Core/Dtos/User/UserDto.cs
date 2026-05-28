using ProductivityHarborApi.Core.Dto.Relations;
using ProductivityHarborApi.Core.Models.Owned;

namespace ProductivityHarborApi.Core.Dto.User
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } 
        public string? Email { get; set; }
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
        public DateTimeOffset? BirthDate { get; set; }
        public string? Country { get; set; }
        public string? Portfolio { get; set; }
        public Phone? Phone { get; set; }
        public Address? Address { get; set; }
        public List<UserSocialMediaMapDto>? UserSocialMediaLinksMap { get; set; } = new ();
    }
}
