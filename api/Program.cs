using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ProductivityHarborApi.Common;
using ProductivityHarborApi.Data;
using ProductivityHarborApi.Models;
using ProductivityHarborApi.Services;

var builder = WebApplication.CreateBuilder(args);


// Adding Services
builder.Services.AddSingleton<TokenProviderService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("productivity_harbor", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:4200");
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
        policyBuilder.AllowCredentials();
    });
});

builder.Services.AddIdentityApiEndpoints<User>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<Role>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

// Seed Roles
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    await SeedRoles(roleManager);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Using Methods
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<User>();

app.UseCors("productivity_harbor");


// Run API
app.Run();


// Seed Roles Method
async Task SeedRoles(RoleManager<Role> roleManager)
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