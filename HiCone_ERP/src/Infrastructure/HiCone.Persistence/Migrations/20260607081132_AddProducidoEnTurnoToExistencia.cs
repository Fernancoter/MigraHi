using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddProducidoEnTurnoToExistencia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // NOTA: esta migración originalmente re-agregaba una gran cantidad de columnas y tablas
            // (prensados.ancho/calibre/kg_molido/..., extrusiones.kg_molido/target/..., bobinas.mill/
            // rest_start/..., extrusoras.imagen/numero_extrusora, prensas.imagen/numero_prensa,
            // catalogo_claves.orden, y las tablas cat_estados_material/cat_tipos_material/
            // extrusora_operarios/silos_produccion) que YA habían sido agregadas por migraciones
            // anteriores en esta misma cadena (AddProduccionInfoBlock, AddPrensadoProperties,
            // AddPrensadoAdditionalProperties, AddExtrusoraOperarioAndFields, PrensasAndClavesOrden,
            // UpdateSilosAndMaterialCatalogs). Se verificó cada nombre contra el texto real de esas
            // migraciones antes de removerlo — solo queda aquí lo genuinamente nuevo.

            migrationBuilder.AddColumn<string>(
                name: "color",
                table: "turnos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "prensado_id_legacy",
                table: "prensados",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "producto_nombre",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "producto_nombre",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "en_turno_segun_sistema",
                table: "existencia_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "producido_en_turno",
                table: "existencia_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "color",
                table: "turnos");

            migrationBuilder.DropColumn(
                name: "prensado_id_legacy",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "producto_nombre",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "producto_nombre",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "en_turno_segun_sistema",
                table: "existencia_productos");

            migrationBuilder.DropColumn(
                name: "producido_en_turno",
                table: "existencia_productos");
        }
    }
}
