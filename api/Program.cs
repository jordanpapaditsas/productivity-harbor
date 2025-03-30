using Microsoft.EntityFrameworkCore;
using ProductivityHarborApi.Data;
using ProductivityHarborApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<TokenProviderService>();

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
