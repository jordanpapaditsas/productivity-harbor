using Microsoft.EntityFrameworkCore;

namespace ProductivityHarborApi.Core.Models.User
{
    [Owned]
    public class Address
    {
        public string Street { get; set; } 
        public string City { get; set; } 
        public string Zip { get; set; }
    }
}
