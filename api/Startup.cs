using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

// using Npgsql;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
namespace DefaultNamespace;


public class Startup
{

    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // app.UseAuthorization();
        services.AddAuthorization();
        services.AddControllers();
        services.AddDbContext<AppDbContext>(options =>
        {
            // For SQLite
            var dbName = $"myapp.db";
            options.UseSqlite($"Data Source={dbName}");

            // For In-Memory
            // var dbName = $"InMemoryDb_{Guid.NewGuid()}";
            // options.UseInMemoryDatabase(dbName);
        });
        // services.AddDbContext<AppDbContext>(options =>
        //     options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAnyOrigin",
                builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });

        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var dbContext = serviceScope.ServiceProvider.GetService<AppDbContext>();
            dbContext.Database.Migrate();
        }
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        // Configure middleware and routes here

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseCors("AllowAnyOrigin");
        app.UseRouting();
        // app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }

}