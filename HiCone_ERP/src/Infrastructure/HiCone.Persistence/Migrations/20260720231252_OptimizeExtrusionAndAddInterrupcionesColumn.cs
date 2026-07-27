using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class OptimizeExtrusionAndAddInterrupcionesColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_extrusiones_maquinas_maquina_id",
                table: "extrusiones");

            migrationBuilder.DropIndex(
                name: "ix_extrusiones_maquina_id",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "process_end",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "process_start",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "status",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "kg_molido",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "kg_virgen",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "maquina_id",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "process_end",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "process_start",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "status",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "target",
                table: "extrusiones");

            migrationBuilder.AlterColumn<string>(
                name: "clave",
                table: "turnos",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<decimal>(
                name: "cost",
                table: "sae_products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "exist",
                table: "sae_products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "group",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "packaging",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "pallets",
                table: "sae_products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "pieces_plt",
                table: "sae_products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "product8020",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "sub_product_type",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tipo_producto",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "rfc",
                table: "sae_customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "budget_outlook",
                table: "sae_budgets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "budget_price",
                table: "sae_budgets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "budget_price_outlook",
                table: "sae_budgets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "maquina_id1",
                table: "extrusiones",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "bobina_interrupciones_id",
                table: "bobinas",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "configuraciones_sistema",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    key = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    valor = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("pk_configuraciones_sistema", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_maquina_id1",
                table: "extrusiones",
                column: "maquina_id1");

            migrationBuilder.AddForeignKey(
                name: "fk_extrusiones_maquinas_maquina_id1",
                table: "extrusiones",
                column: "maquina_id1",
                principalTable: "maquinas",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_extrusiones_maquinas_maquina_id1",
                table: "extrusiones");

            migrationBuilder.DropTable(
                name: "configuraciones_sistema");

            migrationBuilder.DropIndex(
                name: "ix_extrusiones_maquina_id1",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "cost",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "exist",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "group",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "packaging",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "pallets",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "pieces_plt",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "product8020",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "sub_product_type",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "tipo_producto",
                table: "sae_products");

            migrationBuilder.DropColumn(
                name: "rfc",
                table: "sae_customers");

            migrationBuilder.DropColumn(
                name: "budget_outlook",
                table: "sae_budgets");

            migrationBuilder.DropColumn(
                name: "budget_price",
                table: "sae_budgets");

            migrationBuilder.DropColumn(
                name: "budget_price_outlook",
                table: "sae_budgets");

            migrationBuilder.DropColumn(
                name: "maquina_id1",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "bobina_interrupciones_id",
                table: "bobinas");

            migrationBuilder.AlterColumn<string>(
                name: "clave",
                table: "turnos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AddColumn<Guid>(
                name: "maquina_id",
                table: "extrusiones",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_maquina_id",
                table: "extrusiones",
                column: "maquina_id");

            migrationBuilder.AddForeignKey(
                name: "fk_extrusiones_maquinas_maquina_id",
                table: "extrusiones",
                column: "maquina_id",
                principalTable: "maquinas",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
