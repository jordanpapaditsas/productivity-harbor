using System.Reflection.Emit;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Models.Contact;
using ProductivityHarborApi.Core.Models.Relations;
using ProductivityHarborApi.Core.Models.Shared;
using ProductivityHarborApi.Core.Models.Task;
using ProductivityHarborApi.Core.Models.User;

namespace ProductivityHarborApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {}
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<PhTask> PhTasks { get; set; }
        public DbSet<SocialMedia> SocialMediaLinks { get; set; }
        public DbSet<UserSocialMediaMap> UserSocialMediaLinksMap { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<User>().OwnsOne(u => u.Phone);
            builder.Entity<User>().OwnsOne(u => u.Address);
        }

        public override int SaveChanges()
        {
            ApplyTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ApplyTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void ApplyTimestamps()
        {
            var now = DateTimeOffset.UtcNow;

            foreach (var entry in ChangeTracker.Entries<PhBaseModel>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = now;
                    entry.Entity.UpdatedAt = now;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = now;
                }
            }
        }
    }
}
