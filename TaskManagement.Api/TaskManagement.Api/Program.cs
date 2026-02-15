using Microsoft.EntityFrameworkCore;
using TaskManagement.Api.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TaskManagementCon")));

builder.Services.AddCors();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowCors",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200/", "https://localhost:4200/")
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
