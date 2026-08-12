using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CleanupOrphanColumnsProduccion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ── Renombres reales: se preserva el dato copiandolo a la columna nueva
            //    (ya creada por FixProduccionCalidadLogisticaSchema) antes de borrar la vieja.
            migrationBuilder.Sql("UPDATE carreras SET carrera_no = numero_carrera;");
            migrationBuilder.DropColumn(name: "numero_carrera", table: "carreras");

            migrationBuilder.Sql("UPDATE carretes SET no_serie = codigo WHERE codigo IS NOT NULL AND (no_serie IS NULL OR no_serie = '');");
            migrationBuilder.DropColumn(name: "codigo", table: "carretes");

            migrationBuilder.Sql("UPDATE palets SET no_serie = codigo WHERE codigo IS NOT NULL AND (no_serie IS NULL OR no_serie = '');");
            migrationBuilder.DropColumn(name: "codigo", table: "palets");

            migrationBuilder.Sql("UPDATE ordenes_etiquetado SET fecha = fecha_orden WHERE fecha_orden IS NOT NULL;");
            migrationBuilder.DropColumn(name: "fecha_orden", table: "ordenes_etiquetado");

            // ── Columnas huerfanas sin equivalente 1:1 en el diseno actual: el dato que
            //    representaban fue superado por columnas nuevas de distinto significado
            //    (no es renombre, es rediseno). Ninguna de estas tablas tiene filas reales
            //    a la fecha de esta migracion (verificado); si en otro entorno las tuviera,
            //    revisar antes de aplicar si esos datos aun se necesitan en algun reporte.
            migrationBuilder.DropColumn(name: "estado", table: "palets"); // string legado, sustituido por "estatus" (int/enum), tipos incompatibles

            // lote_id/maquina_id1 tienen FK reales activas (relaciones fantasma de
            // Maquina.cs/Lote.cs ya eliminadas del modelo) -- hay que quitar la FK
            // y su indice antes de poder borrar la columna.
            migrationBuilder.DropForeignKey(name: "fk_palets_lotes_lote_id", table: "palets");
            migrationBuilder.DropIndex(name: "ix_palets_lote_id", table: "palets");
            migrationBuilder.DropColumn(name: "lote_id", table: "palets");

            migrationBuilder.DropForeignKey(name: "fk_bobinas_lotes_lote_id", table: "bobinas");
            migrationBuilder.DropIndex(name: "ix_bobinas_lote_id", table: "bobinas");
            migrationBuilder.DropColumn(name: "lote_id", table: "bobinas");
            migrationBuilder.DropColumn(name: "peso_neto", table: "bobinas"); // sustituido por "kg"
            migrationBuilder.DropColumn(name: "metros", table: "bobinas");
            migrationBuilder.DropColumn(name: "turno", table: "bobinas");
            migrationBuilder.DropForeignKey(name: "fk_bobinas_palets_palet_id", table: "bobinas");
            migrationBuilder.DropIndex(name: "ix_bobinas_palet_id", table: "bobinas");
            migrationBuilder.DropColumn(name: "palet_id", table: "bobinas");

            migrationBuilder.DropColumn(name: "producto", table: "extrusiones"); // sustituido por relacion real producto_id
            migrationBuilder.DropForeignKey(name: "fk_extrusiones_lotes_lote_id", table: "extrusiones");
            migrationBuilder.DropIndex(name: "ix_extrusiones_lote_id", table: "extrusiones");
            migrationBuilder.DropColumn(name: "lote_id", table: "extrusiones");
            migrationBuilder.DropForeignKey(name: "fk_extrusiones_maquinas_maquina_id1", table: "extrusiones"); // relacion fantasma (ver Maquina.cs/Lote.cs)
            migrationBuilder.DropIndex(name: "ix_extrusiones_maquina_id1", table: "extrusiones");
            migrationBuilder.DropColumn(name: "maquina_id1", table: "extrusiones");
            migrationBuilder.DropColumn(name: "duracion_min", table: "extrusion_interrupciones"); // sustituido por hora_inicio/hora_fin reales
            migrationBuilder.DropColumn(name: "bobinas_fabricadas", table: "extrusion_resultados"); // sustituido por el desglose total_bobinas_*
            migrationBuilder.DropColumn(name: "moldo_min", table: "extrusora_mezcladoras"); // typo legado, sustituido por molido_min
            migrationBuilder.DropColumn(name: "moldo_max", table: "extrusora_mezcladoras");
            migrationBuilder.DropColumn(name: "kg_moldo", table: "extrusora_mezcladoras");
            migrationBuilder.DropColumn(name: "producto_nombre", table: "extrusora_productos"); // texto libre sustituido por relacion producto_id
            migrationBuilder.DropColumn(name: "producto_calibre", table: "extrusora_productos");
            migrationBuilder.DropColumn(name: "producto_ancho", table: "extrusora_productos");
            migrationBuilder.DropColumn(name: "producto_longitud", table: "extrusora_productos");
            migrationBuilder.DropColumn(name: "reposo_min", table: "extrusora_productos");
            migrationBuilder.DropColumn(name: "proceso_min", table: "extrusora_productos");
            migrationBuilder.DropColumn(name: "producto", table: "prensados"); // sustituido por relacion real producto_id
            migrationBuilder.DropColumn(name: "duracion_min", table: "prensado_interrupciones");
            migrationBuilder.DropColumn(name: "carretes_fabricados", table: "prensado_resultados"); // sustituido por el desglose total_*
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(name: "numero_carrera", table: "carreras", type: "int", nullable: false, defaultValue: 0);
            migrationBuilder.Sql("UPDATE carreras SET numero_carrera = carrera_no;");

            migrationBuilder.AddColumn<string>(name: "codigo", table: "carretes", type: "nvarchar(max)", nullable: true);
            migrationBuilder.Sql("UPDATE carretes SET codigo = no_serie;");

            migrationBuilder.AddColumn<string>(name: "codigo", table: "palets", type: "nvarchar(max)", nullable: true);
            migrationBuilder.Sql("UPDATE palets SET codigo = no_serie;");

            migrationBuilder.AddColumn<DateTime>(name: "fecha_orden", table: "ordenes_etiquetado", type: "datetime2", nullable: true);
            migrationBuilder.Sql("UPDATE ordenes_etiquetado SET fecha_orden = fecha;");

            migrationBuilder.AddColumn<string>(name: "estado", table: "palets", type: "nvarchar(max)", nullable: true);

            migrationBuilder.AddColumn<Guid>(name: "lote_id", table: "palets", type: "uniqueidentifier", nullable: true);
            migrationBuilder.CreateIndex(name: "ix_palets_lote_id", table: "palets", column: "lote_id");
            migrationBuilder.AddForeignKey(name: "fk_palets_lotes_lote_id", table: "palets", column: "lote_id", principalTable: "lotes", principalColumn: "id");

            migrationBuilder.AddColumn<Guid>(name: "lote_id", table: "bobinas", type: "uniqueidentifier", nullable: true);
            migrationBuilder.CreateIndex(name: "ix_bobinas_lote_id", table: "bobinas", column: "lote_id");
            migrationBuilder.AddForeignKey(name: "fk_bobinas_lotes_lote_id", table: "bobinas", column: "lote_id", principalTable: "lotes", principalColumn: "id");
            migrationBuilder.AddColumn<decimal>(name: "peso_neto", table: "bobinas", type: "decimal(18,2)", nullable: false, defaultValue: 0m);
            migrationBuilder.AddColumn<decimal>(name: "metros", table: "bobinas", type: "decimal(18,2)", nullable: false, defaultValue: 0m);
            migrationBuilder.AddColumn<string>(name: "turno", table: "bobinas", type: "nvarchar(max)", nullable: true);
            migrationBuilder.AddColumn<Guid>(name: "palet_id", table: "bobinas", type: "uniqueidentifier", nullable: true);
            migrationBuilder.CreateIndex(name: "ix_bobinas_palet_id", table: "bobinas", column: "palet_id");
            migrationBuilder.AddForeignKey(name: "fk_bobinas_palets_palet_id", table: "bobinas", column: "palet_id", principalTable: "palets", principalColumn: "id");

            migrationBuilder.AddColumn<string>(name: "producto", table: "extrusiones", type: "nvarchar(max)", nullable: true);
            migrationBuilder.AddColumn<Guid>(name: "lote_id", table: "extrusiones", type: "uniqueidentifier", nullable: true);
            migrationBuilder.CreateIndex(name: "ix_extrusiones_lote_id", table: "extrusiones", column: "lote_id");
            migrationBuilder.AddForeignKey(name: "fk_extrusiones_lotes_lote_id", table: "extrusiones", column: "lote_id", principalTable: "lotes", principalColumn: "id");
            migrationBuilder.AddColumn<Guid>(name: "maquina_id1", table: "extrusiones", type: "uniqueidentifier", nullable: true);
            migrationBuilder.CreateIndex(name: "ix_extrusiones_maquina_id1", table: "extrusiones", column: "maquina_id1");
            migrationBuilder.AddForeignKey(name: "fk_extrusiones_maquinas_maquina_id1", table: "extrusiones", column: "maquina_id1", principalTable: "maquinas", principalColumn: "id");
            migrationBuilder.AddColumn<int>(name: "duracion_min", table: "extrusion_interrupciones", type: "int", nullable: false, defaultValue: 0);
            migrationBuilder.AddColumn<int>(name: "bobinas_fabricadas", table: "extrusion_resultados", type: "int", nullable: false, defaultValue: 0);
            migrationBuilder.AddColumn<decimal>(name: "moldo_min", table: "extrusora_mezcladoras", type: "decimal(18,2)", nullable: false, defaultValue: 0m);
            migrationBuilder.AddColumn<decimal>(name: "moldo_max", table: "extrusora_mezcladoras", type: "decimal(18,2)", nullable: false, defaultValue: 0m);
            migrationBuilder.AddColumn<decimal>(name: "kg_moldo", table: "extrusora_mezcladoras", type: "decimal(18,2)", nullable: false, defaultValue: 0m);
            migrationBuilder.AddColumn<string>(name: "producto_nombre", table: "extrusora_productos", type: "nvarchar(max)", nullable: true);
            migrationBuilder.AddColumn<decimal>(name: "producto_calibre", table: "extrusora_productos", type: "decimal(18,2)", nullable: false, defaultValue: 0m);
            migrationBuilder.AddColumn<string>(name: "producto_ancho", table: "extrusora_productos", type: "nvarchar(max)", nullable: true);
            migrationBuilder.AddColumn<decimal>(name: "producto_longitud", table: "extrusora_productos", type: "decimal(18,2)", nullable: false, defaultValue: 0m);
            migrationBuilder.AddColumn<int>(name: "reposo_min", table: "extrusora_productos", type: "int", nullable: false, defaultValue: 0);
            migrationBuilder.AddColumn<int>(name: "proceso_min", table: "extrusora_productos", type: "int", nullable: false, defaultValue: 0);
            migrationBuilder.AddColumn<string>(name: "producto", table: "prensados", type: "nvarchar(max)", nullable: true);
            migrationBuilder.AddColumn<int>(name: "duracion_min", table: "prensado_interrupciones", type: "int", nullable: false, defaultValue: 0);
            migrationBuilder.AddColumn<int>(name: "carretes_fabricados", table: "prensado_resultados", type: "int", nullable: false, defaultValue: 0);
        }
    }
}
