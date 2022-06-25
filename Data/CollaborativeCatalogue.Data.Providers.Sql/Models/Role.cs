﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    [Table("Roles", Schema = "dbo")]
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
