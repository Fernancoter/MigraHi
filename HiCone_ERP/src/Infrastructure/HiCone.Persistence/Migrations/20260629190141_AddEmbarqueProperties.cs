using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddEmbarqueProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "producto_nombre",
                table: "palets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "eficiencia",
                table: "ordenes_etiquetado",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "etiquetadora_activa",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_inicio",
                table: "ordenes_etiquetado",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_termina",
                table: "ordenes_etiquetado",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "horas_utiles",
                table: "ordenes_etiquetado",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "no_orden",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            // migrationBuilder.AddColumn<string>(
            //     name: "observaciones",
            //     table: "ordenes_etiquetado",
            //     type: "nvarchar(max)",
            //     nullable: false,
            //     defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "operador_nombre",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "piezas_buenas",
                table: "ordenes_etiquetado",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "piezas_molino",
                table: "ordenes_etiquetado",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "turno_nombre",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "vel_linea_dos",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "vel_linea_uno",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            // migrationBuilder.AddColumn<string>(
            //     name: "cliente_grupo",
            //     table: "embarques",
            //     type: "nvarchar(max)",
            //     nullable: false,
            //     defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "cliente_nombre",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "destino_envia",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            // migrationBuilder.AddColumn<DateTime>(
            //     name: "fecha",
            //     table: "embarques",
            //     type: "datetime2",
            //     nullable: false,
            //     defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "folio",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            // migrationBuilder.AddColumn<Guid>(
            //     name: "embarque_id",
            //     table: "embarque_pallets",
            //     type: "uniqueidentifier",
            //     nullable: false,
            //     defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "no_pallet",
                table: "embarque_pallets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            // migrationBuilder.AddColumn<Guid>(
            //     name: "palet_id",
            //     table: "embarque_pallets",
            //     type: "uniqueidentifier",
            //     nullable: false,
            //     defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            // migrationBuilder.AddColumn<Guid>(
            //     name: "embarque_id",
            //     table: "embarque_detalles",
            //     type: "uniqueidentifier",
            //     nullable: false,
            //     defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "producto_nombre",
                table: "embarque_detalles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            // migrationBuilder.AddColumn<string>(
            //     name: "no_serie",
            //     table: "carretes",
            //     type: "nvarchar(max)",
            //     nullable: false,
            //     defaultValue: "");
            // 
            // migrationBuilder.AddColumn<string>(
            //     name: "observaciones",
            //     table: "carretes",
            //     type: "nvarchar(max)",
            //     nullable: false,
            //     defaultValue: "");

            // migrationBuilder.CreateIndex(
            //     name: "ix_palet_carretes_carrete_id",
            //     table: "palet_carretes",
            //     column: "carrete_id");

            migrationBuilder.CreateIndex(
                name: "ix_palet_carretes_palet_id",
                table: "palet_carretes",
                column: "palet_id");

            // migrationBuilder.CreateIndex(
            //     name: "ix_embarque_pallets_embarque_id",
            //     table: "embarque_pallets",
            //     column: "embarque_id");
            // 
            // migrationBuilder.CreateIndex(
            //     name: "ix_embarque_pallets_palet_id",
            //     table: "embarque_pallets",
            //     column: "palet_id");
            // 
            // migrationBuilder.CreateIndex(
            //     name: "ix_embarque_detalles_embarque_id",
            //     table: "embarque_detalles",
            //     column: "embarque_id");

            // migrationBuilder.AddForeignKey(
            //     name: "fk_embarque_detalles_embarques_embarque_id",
            //     table: "embarque_detalles",
            //     column: "embarque_id",
            //     principalTable: "embarques",
            //     principalColumn: "id",
            //     onDelete: ReferentialAction.Cascade);
            // 
            // migrationBuilder.AddForeignKey(
            //     name: "fk_embarque_pallets_embarques_embarque_id",
            //     table: "embarque_pallets",
            //     column: "embarque_id",
            //     principalTable: "embarques",
            //     principalColumn: "id",
            //     onDelete: ReferentialAction.Cascade);
            // 
            // migrationBuilder.AddForeignKey(
            //     name: "fk_embarque_pallets_palets_palet_id",
            //     table: "embarque_pallets",
            //     column: "palet_id",
            //     principalTable: "palets",
            //     principalColumn: "id",
            //     onDelete: ReferentialAction.Cascade);

            // migrationBuilder.AddForeignKey(
            //     name: "fk_palet_carretes_carretes_carrete_id",
            //     table: "palet_carretes",
            //     column: "carrete_id",
            //     principalTable: "carretes",
            //     principalColumn: "id",
            //     onDelete: ReferentialAction.Cascade);
            // 
            // migrationBuilder.AddForeignKey(
            //     name: "fk_palet_carretes_palets_palet_id",
            //     table: "palet_carretes",
            //     column: "palet_id",
            //     principalTable: "palets",
            //     principalColumn: "id",
            //     onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropForeignKey(
            //     name: "fk_embarque_detalles_embarques_embarque_id",
            //     table: "embarque_detalles");
            // 
            // migrationBuilder.DropForeignKey(
            //     name: "fk_embarque_pallets_embarques_embarque_id",
            //     table: "embarque_pallets");
            // 
            // migrationBuilder.DropForeignKey(
            //     name: "fk_embarque_pallets_palets_palet_id",
            //     table: "embarque_pallets");

            // migrationBuilder.DropForeignKey(
            //     name: "fk_palet_carretes_carretes_carrete_id",
            //     table: "palet_carretes");
            // 
            // migrationBuilder.DropForeignKey(
            //     name: "fk_palet_carretes_palets_palet_id",
            //     table: "palet_carretes");

            // migrationBuilder.DropIndex(
            //     name: "ix_palet_carretes_carrete_id",
            //     table: "palet_carretes");

            migrationBuilder.DropIndex(
                name: "ix_palet_carretes_palet_id",
                table: "palet_carretes");

            // migrationBuilder.DropIndex(
            //     name: "ix_embarque_pallets_embarque_id",
            //     table: "embarque_pallets");
            // 
            // migrationBuilder.DropIndex(
            //     name: "ix_embarque_pallets_palet_id",
            //     table: "embarque_pallets");
            // 
            // migrationBuilder.DropIndex(
            //     name: "ix_embarque_detalles_embarque_id",
            //     table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "producto_nombre",
                table: "palets");

            migrationBuilder.DropColumn(
                name: "eficiencia",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "etiquetadora_activa",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "fecha_inicio",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "fecha_termina",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "horas_utiles",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "no_orden",
                table: "ordenes_etiquetado");

            // migrationBuilder.DropColumn(
            //     name: "observaciones",
            //     table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "operador_nombre",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "piezas_buenas",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "piezas_molino",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "turno_nombre",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "vel_linea_dos",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "vel_linea_uno",
                table: "ordenes_etiquetado");

            // migrationBuilder.DropColumn(
            //     name: "cliente_grupo",
            //     table: "embarques");

            migrationBuilder.DropColumn(
                name: "cliente_nombre",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "destino_envia",
                table: "embarques");

            // migrationBuilder.DropColumn(
            //     name: "fecha",
            //     table: "embarques");

            migrationBuilder.DropColumn(
                name: "folio",
                table: "embarques");

            // migrationBuilder.DropColumn(
            //     name: "embarque_id",
            //     table: "embarque_pallets");

            migrationBuilder.DropColumn(
                name: "no_pallet",
                table: "embarque_pallets");

            // migrationBuilder.DropColumn(
            //     name: "palet_id",
            //     table: "embarque_pallets");

            // migrationBuilder.DropColumn(
            //     name: "embarque_id",
            //     table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "producto_nombre",
                table: "embarque_detalles");

            // migrationBuilder.DropColumn(
            //     name: "no_serie",
            //     table: "carretes");
            // 
            // migrationBuilder.DropColumn(
            //     name: "observaciones",
            //     table: "carretes");
        }
    }
}
