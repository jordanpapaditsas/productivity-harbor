using Microsoft.EntityFrameworkCore;

namespace ProductivityHarborApi.Core.Models.User
{
    [Owned]
    public class Address
    {
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Zip { get; set; } = string.Empty;
    }
}
