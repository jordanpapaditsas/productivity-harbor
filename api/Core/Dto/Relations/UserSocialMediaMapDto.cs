namespace ProductivityHarborApi.Core.Dto.Relations
{
    public class UserSocialMediaMapDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid SocialMediaId { get; set; }
        public string Url { get; set; }
        public string Icon {  get; set; }
        public string Name {  get; set; }

    }
}
