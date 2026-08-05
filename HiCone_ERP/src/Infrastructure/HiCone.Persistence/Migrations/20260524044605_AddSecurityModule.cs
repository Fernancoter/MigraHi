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
            // NOTA: Las columnas "users.password_updated_at" y "users.is_blocked" ya no existen en esta
            // base de datos — una migración anterior en esta misma cadena ya las creó con sus nombres
            // nuevos (password_expires_at, receives_information). Renombrarlas aquí fallaba con
            // "el parámetro @objname es ambiguo o el @objtype es incorrecto" al recrear la BD desde cero.
            // Se omiten estos dos renames porque el estado destino ya es el correcto.

            // NOTA: "InitialProductionBaseline" ya crea la tabla "users" con TODAS las columnas de
            // seguridad que esta migración intentaba agregar (activation_date, authentication_type,
            // cannot_change_password, external_id, is_locked_out, is_repository_enabled, lockout_end,
            // namespace, password_never_expires, username) y "role_permissions.access_type" —
            // probablemente esta migración se escribió antes de que esas tablas base se
            // regeneraran/consolidaran. Se omiten esos AddColumn duplicados (fallaban con
            // "Column names ... specified more than once" al recrear la BD desde cero). Lo único
            // real que hace esta migración sobre "users" es el AlterColumn de operador_id.

            migrationBuilder.AlterColumn<Guid>(
                name: "operador_id",
                table: "users",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            // NOTA: "security_applications" y "security_application_permissions" (con sus índices
            // ix_security_application_permissions_*) también fueron creadas por
            // "InitialProductionBaseline" — se omite su recreación aquí por la misma razón.

            migrationBuilder.CreateIndex(
                name: "ix_users_operador_id",
                table: "users",
                column: "operador_id",
                unique: true,
                filter: "[operador_id] IS NOT NULL");

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

            migrationBuilder.DropIndex(
                name: "ix_users_operador_id",
                table: "users");

            // Ver nota simétrica en Up(): los AddColumn duplicados se omitieron, así que sus
            // DropColumn correspondientes también se omiten aquí.

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
