namespace ProductivityHarborApi.Core.Dto.Auth
{
    public class RegisterDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Fullname { get; set; }

    }
}
