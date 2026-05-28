namespace ProductivityHarborApi.Core.Dto.Auth
{
    public class RegisterDto
    {
        public string UserName { get; set; } 
        public string Password { get; set; } 
        public string Email { get; set; } 
        public string? Fullname { get; set; }

    }
}
