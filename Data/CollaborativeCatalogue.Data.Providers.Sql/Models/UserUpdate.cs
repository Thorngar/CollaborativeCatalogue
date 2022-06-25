using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    public class UserUpdate
    {
        [Key]
        public string Name { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? WebsiteLink { get; set; }
    }
}
