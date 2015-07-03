namespace Geomarketing.UI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MapModels",
                c => new
                    {
                        IdMap = c.String(nullable: false, maxLength: 128),
                        Nombre = c.String(),
                        Estado = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.IdMap);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MapModels");
        }
    }
}
