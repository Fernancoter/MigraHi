using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixExtrusionProducidoType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // extrusiones.producido quedo fisicamente como int desde una migracion
            // historica, pero Extrusion.Producido siempre fue "decimal". Mismo caso
            // que ancho/longitud (FixExtrusionAnchoLongitudTypes): nunca genero error
            // porque la tabla estuvo vacia hasta las pruebas de Fase 5 - Bloque A.
            migrationBuilder.AlterColumn<decimal>(
                name: "producido",
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
            migrationBuilder.AlterColumn<int>(
                name: "producido",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
