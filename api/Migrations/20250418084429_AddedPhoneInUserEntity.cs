using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductivityHarborApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedPhoneInUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "AspNetUsers",
                newName: "Phone_Work");

            migrationBuilder.AddColumn<string>(
                name: "Phone_Home",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone_Mobile",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone_Home",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Phone_Mobile",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Phone_Work",
                table: "AspNetUsers",
                newName: "Phone");
        }
    }
}
