using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Core.Models.User;
using ProductivityHarborApi.Core.utils;

namespace ProductivityHarborApi.Data
{
    public class ApplicationDbSeed
    {
        private readonly string _phAdminPassword;
        private readonly string _adminPassword;

        public ApplicationDbSeed(IConfiguration configuration)
        {
            _phAdminPassword = configuration["PhAdmin:Password"] ?? throw new ArgumentNullException(nameof(configuration), "PhAdmin password cannot be null");
            _adminPassword = configuration["Admin:Password"] ?? throw new ArgumentNullException(nameof(configuration), "Admin password cannot be null");
        }

        // Seed Roles Method
        public async Task SeedRoles(RoleManager<Role> roleManager)
        {
            var roleNames = new List<Role>
                {
                    new Role
                    {
                        Id = AppStaticData.Roles.PhAdminRoleId,
                        Name = AppStaticData.Roles.PhAdminRoleName,
                        NormalizedName = AppStaticData.Roles.PhAdminRoleName.ToUpper(),
                    },
                    new Role
                    {
                        Id = AppStaticData.Roles.AdminRoleId,
                        Name = AppStaticData.Roles.AdminRoleName,
                        NormalizedName = AppStaticData.Roles.AdminRoleName.ToUpper(),
                    },
                     new Role
                    {
                        Id = AppStaticData.Roles.UserRoleId,
                        Name = AppStaticData.Roles.UserRoleName,
                        NormalizedName = AppStaticData.Roles.UserRoleName.ToUpper(),
                    },
                    new Role
                    {
                        Id = AppStaticData.Roles.GuestRoleId,
                        Name = AppStaticData.Roles.GuestRoleName,
                        NormalizedName = AppStaticData.Roles.GuestRoleName.ToUpper(),
                    },
                };

            foreach (var role in roleNames)
            {
                var roleExists = await roleManager.RoleExistsAsync(role.Name);

                if (!roleExists)
                {
                    await roleManager.CreateAsync(role);
                }
            }
        }

        // Seed Users Method
        public async Task SeedUsers(UserManager<User> userManager)
        {

            var users = new List<User>
                {
                    new User
                    {
                        Id = AppStaticData.Users.PhAdminId,
                        UserName = AppStaticData.Users.PhAdminUserName,
                        NormalizedUserName = AppStaticData.Users.PhAdminUserName.ToUpper(),
                        SecurityStamp = Guid.NewGuid().ToString(""),
                        PasswordHash = new PasswordHasher<User>().HashPassword(null, _phAdminPassword),
                        IsActive = true,
                    },
                    new User
                    {
                        Id = AppStaticData.Users.AdminId,
                        UserName = AppStaticData.Users.AdminUserName,
                        NormalizedUserName = AppStaticData.Users.AdminUserName.ToUpper(),
                        SecurityStamp = Guid.NewGuid().ToString(""),
                        PasswordHash = new PasswordHasher<User>().HashPassword(null, _adminPassword),
                    },
                };

            foreach (var user in users)
            {
                var userExists = await userManager.Users.AnyAsync(x => x.UserName == user.UserName);

                if (!userExists)
                {
                    var result = await userManager.CreateAsync(user);
                    if (result.Succeeded)
                    {
                        if (user.UserName == AppStaticData.Users.PhAdminUserName)
                        {
                            await userManager.AddToRoleAsync(user, AppStaticData.Roles.PhAdminRoleName);
                        }
                        else if (user.UserName == AppStaticData.Users.AdminUserName)
                        {
                            await userManager.AddToRoleAsync(user, AppStaticData.Roles.AdminRoleName);
                        }
                    }
                }
            }
        }
    }
}
