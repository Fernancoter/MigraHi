using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixTechnicalDebt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // virgen_min/virgen_max/kg_virgen ya existen en la BD real (solo el lado
            // "molido" tenia el typo legado "moldo" y le faltaban las columnas nuevas).
            migrationBuilder.AddColumn<decimal>(
                name: "kg_molido",
                table: "extrusora_mezcladoras",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "molido_max",
                table: "extrusora_mezcladoras",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "molido_min",
                table: "extrusora_mezcladoras",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "kg_molido",
                table: "extrusora_mezcladoras");

            migrationBuilder.DropColumn(
                name: "molido_max",
                table: "extrusora_mezcladoras");

            migrationBuilder.DropColumn(
                name: "molido_min",
                table: "extrusora_mezcladoras");
        }
    }
}
