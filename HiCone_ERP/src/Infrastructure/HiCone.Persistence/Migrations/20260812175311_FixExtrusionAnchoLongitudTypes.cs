using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixExtrusionAnchoLongitudTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // extrusiones.ancho quedo fisicamente como nvarchar y extrusiones.longitud
            // como int desde una migracion historica (InitialProductionBaseline), pero
            // la entidad Extrusion.Ancho/Longitud siempre fue "decimal". Nunca genero
            // error porque la tabla estuvo vacia hasta ahora (confirmado con datos
            // reales durante las pruebas de Fase 5 - Bloque A). Se limpian valores no
            // numericos antes de convertir para no perder ninguna fila real.
            migrationBuilder.Sql(@"
                UPDATE extrusiones
                SET ancho = NULL
                WHERE ancho IS NOT NULL AND TRY_CAST(ancho AS decimal(18,2)) IS NULL;
            ");

            migrationBuilder.AlterColumn<decimal>(
                name: "ancho",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "longitud",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ancho",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "longitud",
                table: "extrusiones",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
