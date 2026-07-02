using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPrensadoAdditionalProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "lote_silo",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: true);

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
                name: "target",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "kg_molido",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "kg_virgen",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "lote_silo",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "process_end",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "process_start",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "target",
                table: "prensados");
        }
    }
}
