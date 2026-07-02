using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPrensaExtrusoraToCausaInterrupcion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "extrusora",
                table: "causas_interrupcion",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "prensa",
                table: "causas_interrupcion",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "extrusora",
                table: "causas_interrupcion");

            migrationBuilder.DropColumn(
                name: "prensa",
                table: "causas_interrupcion");
        }
    }
}
