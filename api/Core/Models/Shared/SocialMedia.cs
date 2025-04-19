using System.ComponentModel.DataAnnotations.Schema;
using ProductivityHarborApi.Core.Models.Relations;

namespace ProductivityHarborApi.Core.Models.Shared
{
    [Table("productivityharbor_socialmedialinks ")]
    public class SocialMedia: PhBaseModel
    {
        public SocialMedia() {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string? Icon {  get; set; }
        public ICollection<UserSocialMediaMap> UserSocialMediaLinksMap { get; set; } = new HashSet<UserSocialMediaMap>();

    }
}
