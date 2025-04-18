namespace ProductivityHarborApi.Core.Dto.User
{
    public class SocialMediaDto
    {
        public Guid Id { get; set; }
        public string? Icon { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
