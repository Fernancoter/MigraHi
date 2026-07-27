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
            migrationBuilder.AddColumn<string>(
                name: "clave",
                table: "turnos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "color",
                table: "turnos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "clave",
                table: "productos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "precio_unitario",
                table: "productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "producto_base",
                table: "productos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "producto_sae",
                table: "productos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "imagen",
                table: "prensas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "marca",
                table: "prensas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "numero_prensa",
                table: "prensas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ancho",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "calibre",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "en_curso",
                table: "prensados",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "kg_molido",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "kg_virgen",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "longitud",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "lote_silo",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "prensado_id_legacy",
                table: "prensados",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<DateTime>(
                name: "process_end",
                table: "prensados",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "process_start",
                table: "prensados",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "producido",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "producto_nombre",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "programado",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "target",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "tiempo_interrupcion_min",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "activo",
                table: "operarios",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "nombre",
                table: "operarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "imagen",
                table: "extrusoras",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "numero_extrusora",
                table: "extrusoras",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "en_curso",
                table: "extrusiones",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "extrusion_id_legacy",
                table: "extrusiones",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<decimal>(
                name: "kg_molido",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "kg_virgen",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "process_end",
                table: "extrusiones",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "process_start",
                table: "extrusiones",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "producido",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "producto_nombre",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "programado",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "target",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "tiempo_interrupcion_min",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AddColumn<int>(
                name: "bobbin_no",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mill",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mill_reason",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observations",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "product_name",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "reel",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "rest_minutes",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "rest_start",
                table: "bobinas",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "scrap_kg",
                table: "bobinas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "serial_no",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "station",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "thickness",
                table: "bobinas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "cat_estados_material",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cat_estados_material", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "cat_tipos_material",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cat_tipos_material", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "catalogo_claves",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    valor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    orden = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_catalogo_claves", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "extrusora_operarios",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    extrusora_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    operario_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    turno_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_extrusora_operarios", x => x.id);
                    table.ForeignKey(
                        name: "fk_extrusora_operarios_extrusoras_extrusora_id",
                        column: x => x.extrusora_id,
                        principalTable: "extrusoras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_extrusora_operarios_operarios_operario_id",
                        column: x => x.operario_id,
                        principalTable: "operarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_extrusora_operarios_turnos_turno_id",
                        column: x => x.turno_id,
                        principalTable: "turnos",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "silos_produccion",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    capacidad_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    minimo_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    maximo_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    estado_material = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tipo_material = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    silo_activo = table.Column<bool>(type: "bit", nullable: false),
                    is_archived = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_silos_produccion", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_extrusora_operarios_extrusora_id",
                table: "extrusora_operarios",
                column: "extrusora_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusora_operarios_operario_id",
                table: "extrusora_operarios",
                column: "operario_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusora_operarios_turno_id",
                table: "extrusora_operarios",
                column: "turno_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cat_estados_material");

            migrationBuilder.DropTable(
                name: "cat_tipos_material");

            migrationBuilder.DropTable(
                name: "catalogo_claves");

            migrationBuilder.DropTable(
                name: "extrusora_operarios");

            migrationBuilder.DropTable(
                name: "silos_produccion");

            migrationBuilder.DropColumn(
                name: "clave",
                table: "turnos");

            migrationBuilder.DropColumn(
                name: "color",
                table: "turnos");

            migrationBuilder.DropColumn(
                name: "clave",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "precio_unitario",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "producto_base",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "producto_sae",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "imagen",
                table: "prensas");

            migrationBuilder.DropColumn(
                name: "marca",
                table: "prensas");

            migrationBuilder.DropColumn(
                name: "numero_prensa",
                table: "prensas");

            migrationBuilder.DropColumn(
                name: "ancho",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "calibre",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "en_curso",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "kg_molido",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "kg_virgen",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "longitud",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "lote_silo",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "prensado_id_legacy",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "process_end",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "process_start",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "producido",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "producto_nombre",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "programado",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "status",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "target",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "tiempo_interrupcion_min",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "activo",
                table: "operarios");

            migrationBuilder.DropColumn(
                name: "nombre",
                table: "operarios");

            migrationBuilder.DropColumn(
                name: "imagen",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "numero_extrusora",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "en_curso",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "extrusion_id_legacy",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "kg_molido",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "kg_virgen",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "process_end",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "process_start",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "producido",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "producto_nombre",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "programado",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "status",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "target",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "tiempo_interrupcion_min",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "en_turno_segun_sistema",
                table: "existencia_productos");

            migrationBuilder.DropColumn(
                name: "producido_en_turno",
                table: "existencia_productos");

            migrationBuilder.DropColumn(
                name: "bobbin_no",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "mill",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "mill_reason",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "observations",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "product_name",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "reel",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "rest_minutes",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "rest_start",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "scrap_kg",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "serial_no",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "station",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "thickness",
                table: "bobinas");
        }
    }
}
