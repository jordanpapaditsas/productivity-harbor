using Microsoft.EntityFrameworkCore;

namespace ProductivityHarborApi.Core.Models.User
{
    [Owned]
    public class Phone
    {
        public string Home { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string Work {  get; set; } = string.Empty;
    }
}
