using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixPaletTipoType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // palets.tipo quedo fisicamente como nvarchar, pero Palet.Tipo es un enum
            // (TipoPalet: Normal=1, Externo=2) que EF mapea a int por defecto. Mismo caso
            // que productos.tipo_material (FixProductoTipoMaterialType). La tabla esta
            // vacia (0 filas) asi que se normaliza cualquier valor invalido a 1 (Normal)
            // por seguridad antes de convertir, igual que en esa migracion.
            migrationBuilder.Sql(@"
                UPDATE palets
                SET tipo = '1'
                WHERE tipo IS NULL
                   OR TRY_CAST(tipo AS int) IS NULL
                   OR TRY_CAST(tipo AS int) NOT IN (1, 2);
            ");

            migrationBuilder.AlterColumn<int>(
                name: "tipo",
                table: "palets",
                type: "int",
                nullable: false,
                defaultValue: 1,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "tipo",
                table: "palets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
