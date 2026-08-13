using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixSaeTablesMissingColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // La tabla sae_orders se creo en InitialProductionBaseline solo con las columnas
            // base de TenantEntity. La entidad SaeOrder se amplio despues con 10 propiedades
            // mas y el snapshot de EF se actualizo para reflejarlo, pero nunca se genero la
            // migracion que agregara esas columnas a la tabla fisica real. Nunca genero error
            // porque casi todo el codigo lee SaeOrders via proyecciones parciales;
            // FinalizarRemisionSAEAsync es de los pocos que materializa la entidad completa.
            // La tabla tiene 0 filas, migracion puramente aditiva sin riesgo de perdida de datos.
            migrationBuilder.AddColumn<string>(
                name: "order_doc",
                table: "sae_orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "order_date",
                table: "sae_orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1900, 1, 1));

            migrationBuilder.AddColumn<DateTime>(
                name: "order_delivery_date",
                table: "sae_orders",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "customer_code",
                table: "sae_orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "customer_name",
                table: "sae_orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "sales_person_code",
                table: "sae_orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "shipping",
                table: "sae_orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "total_amount",
                table: "sae_orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "procesada",
                table: "sae_orders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_sincronizacion",
                table: "sae_orders",
                type: "datetime2",
                nullable: true);

            // sae_customers: mismo caso, solo tenia "rfc" ademas de las columnas base.
            migrationBuilder.AddColumn<string>(
                name: "customer_code",
                table: "sae_customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "customer_name",
                table: "sae_customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "consolidated_name",
                table: "sae_customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "shipping",
                table: "sae_customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "sae_customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "phone",
                table: "sae_customers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "sae_customers",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_sincronizacion",
                table: "sae_customers",
                type: "datetime2",
                nullable: true);

            // sae_products: le faltaban las columnas identificadoras y de precio.
            migrationBuilder.AddColumn<string>(
                name: "product_number",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "product_name",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "unit",
                table: "sae_products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "price",
                table: "sae_products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "sae_products",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_sincronizacion",
                table: "sae_products",
                type: "datetime2",
                nullable: true);

            // sae_remissions: creada solo con columnas base, igual que sae_orders.
            migrationBuilder.AddColumn<string>(
                name: "remission_doc",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "order_doc",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "remission_date",
                table: "sae_remissions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1900, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "product_number",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "quantity",
                table: "sae_remissions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "customer_code",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "customer_name",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "shipping",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "consolidated_name",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "customer_shipping",
                table: "sae_remissions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_sincronizacion",
                table: "sae_remissions",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "order_doc", table: "sae_orders");
            migrationBuilder.DropColumn(name: "order_date", table: "sae_orders");
            migrationBuilder.DropColumn(name: "order_delivery_date", table: "sae_orders");
            migrationBuilder.DropColumn(name: "customer_code", table: "sae_orders");
            migrationBuilder.DropColumn(name: "customer_name", table: "sae_orders");
            migrationBuilder.DropColumn(name: "sales_person_code", table: "sae_orders");
            migrationBuilder.DropColumn(name: "shipping", table: "sae_orders");
            migrationBuilder.DropColumn(name: "total_amount", table: "sae_orders");
            migrationBuilder.DropColumn(name: "procesada", table: "sae_orders");
            migrationBuilder.DropColumn(name: "fecha_sincronizacion", table: "sae_orders");

            migrationBuilder.DropColumn(name: "customer_code", table: "sae_customers");
            migrationBuilder.DropColumn(name: "customer_name", table: "sae_customers");
            migrationBuilder.DropColumn(name: "consolidated_name", table: "sae_customers");
            migrationBuilder.DropColumn(name: "shipping", table: "sae_customers");
            migrationBuilder.DropColumn(name: "email", table: "sae_customers");
            migrationBuilder.DropColumn(name: "phone", table: "sae_customers");
            migrationBuilder.DropColumn(name: "is_active", table: "sae_customers");
            migrationBuilder.DropColumn(name: "fecha_sincronizacion", table: "sae_customers");

            migrationBuilder.DropColumn(name: "product_number", table: "sae_products");
            migrationBuilder.DropColumn(name: "product_name", table: "sae_products");
            migrationBuilder.DropColumn(name: "unit", table: "sae_products");
            migrationBuilder.DropColumn(name: "price", table: "sae_products");
            migrationBuilder.DropColumn(name: "is_active", table: "sae_products");
            migrationBuilder.DropColumn(name: "fecha_sincronizacion", table: "sae_products");

            migrationBuilder.DropColumn(name: "remission_doc", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "order_doc", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "remission_date", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "product_number", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "quantity", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "customer_code", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "customer_name", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "shipping", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "consolidated_name", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "customer_shipping", table: "sae_remissions");
            migrationBuilder.DropColumn(name: "fecha_sincronizacion", table: "sae_remissions");
        }
    }
}
