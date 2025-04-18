using Microsoft.EntityFrameworkCore;

namespace ProductivityHarborApi.Core.Models.User
{
    [Owned]
    public class Phone
    {
        public string Home { get; set; } 
        public string Mobile { get; set; } 
        public string Work {  get; set; } 
    }
}
