using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Geomarketing.UI.Models
{
    public class EncuestaModel
    {
    }
    public class EncuestaDbContext : DbContext
    {
        public DbSet<MapModels> Maps { get; set; }
        public EncuestaDbContext()
            : base("EncuestaConnection")
        {
        }

        static EncuestaDbContext()
        {
            Database.SetInitializer<EncuestaDbContext>(null);
        }

        public static EncuestaDbContext Create()
        {
            return new EncuestaDbContext();
        }
    }
}