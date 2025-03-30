using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Models;

namespace ProductivityHarborApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
      
        public ApplicationDbContext(DbContextOptions options): base(options)
        {
        }
        public DbSet<User> AppUsers { get; set; }
        public DbSet<Role> AppRoles { get; set; }
        public DbSet<UserRole> AppUserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
