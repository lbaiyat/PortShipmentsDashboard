using Microsoft.EntityFrameworkCore;
// using Npgsql;
using Microsoft.AspNetCore.Mvc;
// using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
namespace DefaultNamespace;



public class Program
{
    public static void Main(string[] args)
    {

        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}


public class AppDbContext : DbContext {
    public DbSet<Shipment> Shipment { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Shipment>().Property(p => p.ShipmentDate)
            .HasColumnType("TEXT") // This ensures the SQLite uses TEXT type to store datetime
            .IsRequired();
        modelBuilder.Entity<Shipment>().ToTable("Shipment");
    }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
}