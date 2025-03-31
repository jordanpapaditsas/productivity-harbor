using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

builder.Services.AddScoped<ApplicationDbSeeder>();

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    builder.Configuration.AddUserSecrets<Program>();
}

// Using Methods
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var seeder = scope.ServiceProvider.GetRequiredService<ApplicationDbSeeder>();

    await seeder.SeedRoles(roleManager);
    await seeder.SeedUsers(userManager);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<User>();

app.UseCors("productivity_harbor");

// Run API
app.Run();
