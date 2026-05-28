using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ProductivityHarborApi.Core.Models.User;

namespace ProductivityHarborApi.Services
{
    public class TokenProviderService
    {
        private readonly string? _secret;

        public TokenProviderService(IConfiguration configuration)
        {
            if (configuration["JwtSettings:SecretKey"] is not null)
            {
               _secret = configuration["JwtSettings:SecretKey"];
            }
            else 
            { 
              _secret = "7xX9kM4vW2zB6qP9bL5mK8sT1vN4wZ3xY7rA2eG5hJ8="; 
            }


        }

        public string GenerateToken(User user)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = Encoding.ASCII.GetBytes(_secret!);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(60),
                Issuer = "http://localhost:5000", // When production need to give the normal URL of Live
                Audience = "ProductivityHarbor-users",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
