using System.ComponentModel.DataAnnotations.Schema;

namespace ProductivityHarborApi.Core.Models.User
{
    [Table("productivityharbor_socialmedialinks ")]
    public class SocialMedia: PhBaseModel
    {
        public SocialMedia() {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public User? User { get; set; }
        public string Url { get; set; } = string.Empty;
        public string? Icon {  get; set; }

    }
}
