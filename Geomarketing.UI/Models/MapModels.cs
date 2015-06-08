using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Geomarketing.UI.Models
{
    public class MapModels
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string IdMap { get; set; }
        public string Nombre { get; set; }
        public bool Estado { get; set; }

    }
    public class MapDbContext : DbContext
    {
        public DbSet<MapModels> Maps { get; set; }
        public MapDbContext()
            : base("MapConnection")
        {
        }

        static MapDbContext()
        {
            Database.SetInitializer<MapDbContext>(null);
        }

        public static MapDbContext Create()
        {
            return new MapDbContext();
        }
    }
}