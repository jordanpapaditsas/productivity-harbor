namespace ProductivityHarborApi.Core.utils
{
    public class AppStaticData
    {
        public static class Roles
        {
            // Guids
            public static readonly Guid PhAdminRoleId = Guid.Parse("3b28c94b-c894-4f91-b5e6-3bb0671dd09a");
            public static readonly Guid AdminRoleId = Guid.Parse("4993238c-ea61-4c59-a015-b54f4efc7701");
            public static readonly Guid UserRoleId = Guid.Parse("08a67996-9d5a-44b6-9416-dfdbe2b6b812");
            public static readonly Guid GuestRoleId = Guid.Parse("c26a8d32-8511-426d-8f51-2f0990bd569c");
            // Strings
            public static readonly string PhAdminRoleName = "PhAdmin";
            public static readonly string AdminRoleName = "Admin";
            public static readonly string UserRoleName = "User";
            public static readonly string GuestRoleName = "Guest";
        }
        public static class Users
        {
            // Guids
            public static readonly Guid PhAdminId = Guid.Parse("4576ae9e-90d9-4271-b023-d50d6442c5d4");
            public static readonly Guid AdminId = Guid.Parse("eed6a6a2-09a2-4d3f-8163-87be46c9ac57");
            // Strings
            public static readonly string PhAdminUserName = "PhAdmin";
            public static readonly string AdminUserName = "Admin";
        }
    }
}
