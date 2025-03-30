using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ProductivityHarborApi.Models;

namespace ProductivityHarborApi.Services
{
    public class TokenProviderService
    {
        private readonly string? _secret;

        public TokenProviderService(IConfiguration configuration)
        {
            _secret = configuration["JwtSettings:SecretKey"];
        }

        public string GenerateToken(User user)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = Encoding.ASCII.GetBytes(_secret!);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
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
