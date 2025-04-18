using System.ComponentModel.DataAnnotations.Schema;

namespace ProductivityHarborApi.Core.Models.User
{
    [Table("productivityharbor_usersocialmedialinksmap")]
    public class UserSocialMediaMap
    {
        public UserSocialMediaMap() 
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public required Guid UserId { get; set; } 
        public required User User { get; set; }
        public required Guid SocialMediaId { get; set; }
        public required SocialMedia SocialMedia { get; set; }
    }
}
