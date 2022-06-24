﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CollaborativeCatalogue.Data.Providers.Sql.Models
{
    [Table("User", Schema="dbo")]
    public class User
    {
        [Key]
        public int Id { get; set; }
    }
}
