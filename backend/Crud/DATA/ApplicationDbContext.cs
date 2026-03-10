
using Crud.MODELS.ENTITY;
using Microsoft.EntityFrameworkCore;

namespace Crud.DATA
{
	public class ApplicationDbContext:DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
		{
			
		}

		public DbSet<User> Users { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Optional: Ensure Username is unique
			modelBuilder.Entity<User>()
				.HasIndex(u => u.Username)
				.IsUnique();
		}
	}
}
