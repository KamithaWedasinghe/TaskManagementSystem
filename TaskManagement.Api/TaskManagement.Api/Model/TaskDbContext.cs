using Microsoft.EntityFrameworkCore;

namespace TaskManagement.Api.Model
{
    public class TaskDbContext:DbContext

    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
    }
}
