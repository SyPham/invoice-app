using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using TrackingOrder.Entities;

namespace TrackingOrder.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Container> Containers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map table names
            // base.OnModelCreating(modelBuilder);
        }
    }
}
