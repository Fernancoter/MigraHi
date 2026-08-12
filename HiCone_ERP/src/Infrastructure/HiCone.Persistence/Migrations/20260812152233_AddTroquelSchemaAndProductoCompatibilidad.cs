using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTroquelSchemaAndProductoCompatibilidad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ciclos_acumulados",
                table: "troqueles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ciclos_video_mantenimiento",
                table: "troqueles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "troqueles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "troqueles",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_ultimo_mantenimiento",
                table: "troqueles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "troqueles",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "troqueles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "activo",
                table: "prensa_troqueles",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_asignacion",
                table: "prensa_troqueles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_desasignacion",
                table: "prensa_troqueles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "prensa_troqueles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "troquel_productos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    troquel_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("pk_troquel_productos", x => x.id);
                    table.ForeignKey(
                        name: "fk_troquel_productos_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_troquel_productos_troqueles_troquel_id",
                        column: x => x.troquel_id,
                        principalTable: "troqueles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_troquel_productos_producto_id",
                table: "troquel_productos",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_troquel_productos_troquel_id",
                table: "troquel_productos",
                column: "troquel_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "troquel_productos");

            migrationBuilder.DropColumn(
                name: "ciclos_acumulados",
                table: "troqueles");

            migrationBuilder.DropColumn(
                name: "ciclos_video_mantenimiento",
                table: "troqueles");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "troqueles");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "troqueles");

            migrationBuilder.DropColumn(
                name: "fecha_ultimo_mantenimiento",
                table: "troqueles");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "troqueles");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "troqueles");

            migrationBuilder.DropColumn(
                name: "activo",
                table: "prensa_troqueles");

            migrationBuilder.DropColumn(
                name: "fecha_asignacion",
                table: "prensa_troqueles");

            migrationBuilder.DropColumn(
                name: "fecha_desasignacion",
                table: "prensa_troqueles");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "prensa_troqueles");
        }
    }
}
