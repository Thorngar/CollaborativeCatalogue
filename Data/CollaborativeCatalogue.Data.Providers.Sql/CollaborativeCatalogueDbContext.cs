using CollaborativeCatalogue.Data.Providers.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace CollaborativeCatalogue.Data.Providers.Sql
{
    public class CollaborativeCatalogueDbContext : DbContext
    {
        public CollaborativeCatalogueDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<EducationTool> EducationTools { get; set; }
    }
}
