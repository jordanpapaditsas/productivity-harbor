using System.ComponentModel.DataAnnotations.Schema;
using ProductivityHarborApi.Core.Models.Shared;
using UserEntity = ProductivityHarborApi.Core.Models.User.User;


namespace ProductivityHarborApi.Core.Models.Relations
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
        public Guid UserId { get; set; }
        public UserEntity User { get; set; }
        public  Guid SocialMediaId { get; set; }
        public SocialMedia SocialMedia { get; set; }
    }
}
