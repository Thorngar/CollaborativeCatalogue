using System.ComponentModel.DataAnnotations;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    public class Thematic
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
