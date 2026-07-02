using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSaeSalesPerson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sae_budgets",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    customer_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    customer_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    consolidated_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    product_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    budget_year = table.Column<int>(type: "int", nullable: false),
                    budget_month = table.Column<int>(type: "int", nullable: false),
                    budget_estimated = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    budget_real = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
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
                    table.PrimaryKey("pk_sae_budgets", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sae_sales_persons",
                columns: table => new
                {
                    sales_person_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    sales_person_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_sae_sales_persons", x => x.sales_person_name);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sae_budgets");

            migrationBuilder.DropTable(
                name: "sae_sales_persons");
        }
    }
}
