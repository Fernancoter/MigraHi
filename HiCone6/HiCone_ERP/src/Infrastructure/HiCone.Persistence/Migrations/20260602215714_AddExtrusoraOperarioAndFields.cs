using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddExtrusoraOperarioAndFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "extrusora_operarios",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    extrusora_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    turno_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    operario_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_extrusora_operarios_turnos_turno_id",
                        column: x => x.turno_id,
                        principalTable: "turnos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "extrusora_operarios");

            migrationBuilder.DropColumn(
                name: "imagen",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "numero_extrusora",
                table: "extrusoras");
        }
    }
}
