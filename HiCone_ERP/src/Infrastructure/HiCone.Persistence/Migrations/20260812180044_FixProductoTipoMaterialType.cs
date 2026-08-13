using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixProductoTipoMaterialType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // productos.tipo_material quedo fisicamente como nvarchar con datos no
            // numericos ("0", que ademas no es un valor valido del enum TipoMaterial:
            // Virgen=1, Molido=2, Mixto=3), pero Producto.TipoMaterial es un enum que
            // EF mapea a int por defecto. Nunca genero error porque nadie habia
            // ejecutado una consulta que materializara Producto completo con datos
            // reales hasta las pruebas de Fase 5 - Bloque A (Extrusion -> Producto).
            // Se normaliza cualquier valor no valido a 1 (Virgen) antes de convertir.
            migrationBuilder.Sql(@"
                UPDATE productos
                SET tipo_material = '1'
                WHERE tipo_material IS NULL
                   OR TRY_CAST(tipo_material AS int) IS NULL
                   OR TRY_CAST(tipo_material AS int) NOT IN (1, 2, 3);
            ");

            migrationBuilder.AlterColumn<int>(
                name: "tipo_material",
                table: "productos",
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
                name: "tipo_material",
                table: "productos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
