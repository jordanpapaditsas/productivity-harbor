using Microsoft.EntityFrameworkCore;

namespace ProductivityHarborApi.Core.Models.Owned
{
    [Owned]
    public class Phone
    {
        public string Home { get; set; } 
        public string Mobile { get; set; } 
        public string Work {  get; set; } 
    }
}
