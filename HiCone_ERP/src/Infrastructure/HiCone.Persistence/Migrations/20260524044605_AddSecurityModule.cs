using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSecurityModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "password_updated_at",
                table: "users",
                newName: "password_expires_at");

            migrationBuilder.RenameColumn(
                name: "is_blocked",
                table: "users",
                newName: "receives_information");

            migrationBuilder.AlterColumn<Guid>(
                name: "operador_id",
                table: "users",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "activation_date",
                table: "users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "authentication_type",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "cannot_change_password",
                table: "users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "external_id",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_locked_out",
                table: "users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "is_repository_enabled",
                table: "users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "lockout_end",
                table: "users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "namespace",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "password_never_expires",
                table: "users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "access_type",
                table: "role_permissions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "operadores",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    activo = table.Column<bool>(type: "bit", nullable: false),
                    user_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_operadores", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "security_applications",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_security_applications", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "security_application_permissions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    security_application_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    permission_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_security_application_permissions", x => x.id);
                    table.ForeignKey(
                        name: "fk_security_application_permissions_permissions_permission_id",
                        column: x => x.permission_id,
                        principalTable: "permissions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_security_application_permissions_security_applications_security_application_id",
                        column: x => x.security_application_id,
                        principalTable: "security_applications",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_users_operador_id",
                table: "users",
                column: "operador_id",
                unique: true,
                filter: "[operador_id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "ix_security_application_permissions_permission_id",
                table: "security_application_permissions",
                column: "permission_id");

            migrationBuilder.CreateIndex(
                name: "ix_security_application_permissions_security_application_id",
                table: "security_application_permissions",
                column: "security_application_id");

            migrationBuilder.AddForeignKey(
                name: "fk_users_operadores_operador_id",
                table: "users",
                column: "operador_id",
                principalTable: "operadores",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_users_operadores_operador_id",
                table: "users");

            migrationBuilder.DropTable(
                name: "operadores");

            migrationBuilder.DropTable(
                name: "security_application_permissions");

            migrationBuilder.DropTable(
                name: "security_applications");

            migrationBuilder.DropIndex(
                name: "ix_users_operador_id",
                table: "users");

            migrationBuilder.DropColumn(
                name: "activation_date",
                table: "users");

            migrationBuilder.DropColumn(
                name: "authentication_type",
                table: "users");

            migrationBuilder.DropColumn(
                name: "cannot_change_password",
                table: "users");

            migrationBuilder.DropColumn(
                name: "external_id",
                table: "users");

            migrationBuilder.DropColumn(
                name: "is_locked_out",
                table: "users");

            migrationBuilder.DropColumn(
                name: "is_repository_enabled",
                table: "users");

            migrationBuilder.DropColumn(
                name: "lockout_end",
                table: "users");

            migrationBuilder.DropColumn(
                name: "namespace",
                table: "users");

            migrationBuilder.DropColumn(
                name: "password_never_expires",
                table: "users");

            migrationBuilder.DropColumn(
                name: "username",
                table: "users");

            migrationBuilder.DropColumn(
                name: "access_type",
                table: "role_permissions");

            migrationBuilder.RenameColumn(
                name: "receives_information",
                table: "users",
                newName: "is_blocked");

            migrationBuilder.RenameColumn(
                name: "password_expires_at",
                table: "users",
                newName: "password_updated_at");

            migrationBuilder.AlterColumn<int>(
                name: "operador_id",
                table: "users",
                type: "int",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }
    }
}
