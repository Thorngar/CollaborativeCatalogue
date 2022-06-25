using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    [Table("Thematics", Schema = "dbo")]
    public class Thematic
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
