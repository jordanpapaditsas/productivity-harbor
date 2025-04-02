using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Models.Contact;
using ProductivityHarborApi.Models.Shared;
using ProductivityHarborApi.Models.Task;
using ProductivityHarborApi.Models.User;

namespace ProductivityHarborApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {}
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<PhTask> PhTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }   

    }
}
