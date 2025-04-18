using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductivityHarborApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedUrlPropertyInUserSocialMediaModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "productivityharbor_socialmedialinks ");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "productivityharbor_usersocialmedialinksmap",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "productivityharbor_usersocialmedialinksmap");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "productivityharbor_socialmedialinks ",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
