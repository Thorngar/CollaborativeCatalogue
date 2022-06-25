using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    [Table("EducationTools", Schema = "dbo")]
    public class EducationTool
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Subtitle { get; set; }
        public string Description { get; set; }
        public string ToolType { get; set; }
        public bool IsDigitalTool { get; set; }
        public bool IsNewTool { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }
        public bool IsValidatedByAdmin { get; set; }
    }
}
