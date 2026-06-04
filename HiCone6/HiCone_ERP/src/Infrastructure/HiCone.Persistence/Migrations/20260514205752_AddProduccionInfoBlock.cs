using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddProduccionInfoBlock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ancho",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "calibre",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

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

            migrationBuilder.AddColumn<int>(
                name: "longitud",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
                name: "target",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<long>(
                name: "bobbin_no",
                table: "bobinas",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<Guid>(
                name: "extrusion_id",
                table: "bobinas",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "kg",
                table: "bobinas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

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
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "ix_bobinas_extrusion_id",
                table: "bobinas",
                column: "extrusion_id");

            migrationBuilder.AddForeignKey(
                name: "fk_bobinas_extrusiones_extrusion_id",
                table: "bobinas",
                column: "extrusion_id",
                principalTable: "extrusiones",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_bobinas_extrusiones_extrusion_id",
                table: "bobinas");

            migrationBuilder.DropIndex(
                name: "ix_bobinas_extrusion_id",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "ancho",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "calibre",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "kg_molido",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "kg_virgen",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "longitud",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "process_end",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "process_start",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "target",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "bobbin_no",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "extrusion_id",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "kg",
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
