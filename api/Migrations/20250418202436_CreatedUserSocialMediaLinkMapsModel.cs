using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductivityHarborApi.Migrations
{
    /// <inheritdoc />
    public partial class CreatedUserSocialMediaLinkMapsModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_productivityharbor_socialmedialinks _AspNetUsers_UserId",
                table: "productivityharbor_socialmedialinks ");

            migrationBuilder.DropIndex(
                name: "IX_productivityharbor_socialmedialinks _UserId",
                table: "productivityharbor_socialmedialinks ");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "productivityharbor_socialmedialinks ");

            migrationBuilder.CreateTable(
                name: "productivityharbor_usersocialmedialinksmap",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SocialMediaId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productivityharbor_usersocialmedialinksmap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_productivityharbor_usersocialmedialinksmap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_productivityharbor_usersocialmedialinksmap_productivityharbor_socialmedialinks _SocialMediaId",
                        column: x => x.SocialMediaId,
                        principalTable: "productivityharbor_socialmedialinks ",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_productivityharbor_usersocialmedialinksmap_SocialMediaId",
                table: "productivityharbor_usersocialmedialinksmap",
                column: "SocialMediaId");

            migrationBuilder.CreateIndex(
                name: "IX_productivityharbor_usersocialmedialinksmap_UserId",
                table: "productivityharbor_usersocialmedialinksmap",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "productivityharbor_usersocialmedialinksmap");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "productivityharbor_socialmedialinks ",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_productivityharbor_socialmedialinks _UserId",
                table: "productivityharbor_socialmedialinks ",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_productivityharbor_socialmedialinks _AspNetUsers_UserId",
                table: "productivityharbor_socialmedialinks ",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
