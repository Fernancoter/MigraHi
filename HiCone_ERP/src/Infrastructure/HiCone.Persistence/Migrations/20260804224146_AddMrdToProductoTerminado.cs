using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMrdToProductoTerminado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "mrd",
                table: "productos_terminados",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "mrd",
                table: "productos_terminados");
        }
    }
}
