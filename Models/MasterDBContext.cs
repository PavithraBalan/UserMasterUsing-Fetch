using Microsoft.EntityFrameworkCore;

namespace MasterDetails.Models
{
    public class MasterDBContext:DbContext
    {
        public MasterDBContext(DbContextOptions<MasterDBContext>options ): base(options)
        {

        }
        public DbSet<UsersMaster> UsersDetails {get; set;}
    }
}