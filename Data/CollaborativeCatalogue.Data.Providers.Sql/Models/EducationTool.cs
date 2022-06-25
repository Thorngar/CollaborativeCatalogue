using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    public class EducationTool
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public string ToolType { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }
    }
}
