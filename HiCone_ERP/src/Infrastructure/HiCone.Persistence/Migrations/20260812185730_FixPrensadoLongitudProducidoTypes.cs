using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixPrensadoLongitudProducidoTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // prensados.longitud y prensados.producido quedaron fisicamente como int desde
            // una migracion historica, pero Prensado.Longitud y Prensado.Producido siempre
            // fueron "decimal". Mismo caso que Extrusion.Longitud/Producido
            // (FixExtrusionAnchoLongitudTypes/FixExtrusionProducidoType): nunca genero error
            // porque la tabla estuvo vacia hasta ahora.
            migrationBuilder.AlterColumn<decimal>(
                name: "longitud",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "producido",
                table: "prensados",
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
                name: "longitud",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "producido",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");
        }
    }
}
