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
        public string Url { get; set; } 
        public  Guid UserId { get; set; }
        public User User { get; set; }
        public  Guid SocialMediaId { get; set; }
        public SocialMedia SocialMedia { get; set; }
    }
}
