using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    public class EducationTool
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string ToolType { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public int Duration { get; set; }
        public double Price { get; set; }
    }
}
