using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    [Table("Users", Schema = "dbo")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? WebsiteLink { get; set; }
    }
}
