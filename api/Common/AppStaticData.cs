namespace ProductivityHarborApi.Common
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
    }
}
