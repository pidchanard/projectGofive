
namespace Api.Data;
using Microsoft.EntityFrameworkCore;



public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<UserPermission> UserPermissions { get; set; }
    public DbSet<Document> Documents {get; set;}
    public DbSet<SavedSearch> SavedSearches { get; set; } = null!;



  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
             base.OnModelCreating(modelBuilder);

        // One-to-Many: User → Role
        modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.RoleId);

        // Many-to-Many: User ↔ Permission ผ่าน UserPermissions
        modelBuilder.Entity<UserPermission>()
            .HasOne(up => up.User)
            .WithMany(u => u.UserPermissions)
            .HasForeignKey(up => up.UserId);

        modelBuilder.Entity<UserPermission>()
            .HasOne(up => up.Permission)
            .WithMany(p => p.UserPermissions)
            .HasForeignKey(up => up.PermissionId);

    }
}