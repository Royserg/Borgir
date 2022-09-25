using Borgir.Application;
using Borgir.Infrastructure;
using Borgir.Infrastructure.EF.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

{
    builder.Services
        .AddApplication()
        .AddInfrastructure();

    builder.Services.AddDbContext<DatabaseContext>(ctx => ctx.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


    builder.Services.AddControllers();
}

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Initialize database connection, run migrations and seed data
using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<DatabaseContextInitializer>();
    await initializer.InitializeAsync();
    await initializer.SeedAsync();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
