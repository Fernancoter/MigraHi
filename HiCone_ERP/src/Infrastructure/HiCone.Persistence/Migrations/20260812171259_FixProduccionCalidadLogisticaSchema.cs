using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixProduccionCalidadLogisticaSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "reclamo_id",
                table: "reclamo_detalles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);

            migrationBuilder.RenameColumn(
                name: "clave",
                table: "productos",
                newName: "codigo");

            migrationBuilder.RenameColumn(
                name: "numero_prensa",
                table: "prensas",
                newName: "codigo");
            migrationBuilder.AddColumn<Guid>(
                name: "troquel_id",
                table: "prensados",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_id",
                table: "prensados",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);
            migrationBuilder.AddColumn<Guid>(
                name: "causa_id",
                table: "prensado_interrupciones",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_terminado_id",
                table: "palets",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_id",
                table: "palets",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "prensado_id",
                table: "palets",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "prensa_id",
                table: "palets",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "operario_id",
                table: "palets",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "prensado_id",
                table: "ordenes_etiquetado",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "operario_id",
                table: "ordenes_etiquetado",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_id",
                table: "extrusora_productos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);
            migrationBuilder.AddColumn<Guid>(
                name: "silo_virgen_id",
                table: "extrusiones",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "silo_molido_id",
                table: "extrusiones",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_id",
                table: "extrusiones",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "causa_id",
                table: "extrusion_interrupciones",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "palet_id",
                table: "embarque_pallets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);
            migrationBuilder.AddColumn<Guid>(
                name: "embarque_id",
                table: "embarque_pallets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);
            migrationBuilder.AddColumn<Guid>(
                name: "embarque_detalle_id",
                table: "embarque_pallets",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_terminado_id",
                table: "embarque_detalles",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_id",
                table: "embarque_detalles",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "embarque_id",
                table: "embarque_detalles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);
            migrationBuilder.AddColumn<Guid>(
                name: "carrera_id",
                table: "carretes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);
            migrationBuilder.AddColumn<Guid>(
                name: "reclamo_detalle_id",
                table: "carrete_defectos",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "prensado_id",
                table: "carreras",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: Guid.Empty);
            migrationBuilder.AddColumn<Guid>(
                name: "silo_virgen_id",
                table: "bobinas",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "silo_molido_id",
                table: "bobinas",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "producto_id",
                table: "bobinas",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "operario_id",
                table: "bobinas",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "turnos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "accion_correctiva",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cerrado_por",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cliente",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "descripcion",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "estatus",
                table: "reclamos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha",
                table: "reclamos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_cierre",
                table: "reclamos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "order_doc",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "remission_doc",
                table: "reclamos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "reclamo_id",
                table: "reclamo_detalles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "cantidad_millares",
                table: "reclamo_detalles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "descripcion",
                table: "reclamo_detalles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_registro",
                table: "reclamo_detalles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "no_serie_carrete",
                table: "reclamo_detalles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "no_serie_pallet",
                table: "reclamo_detalles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "tipo_defecto",
                table: "reclamo_detalles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "ya_reportado",
                table: "reclamo_detalles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "ancho",
                table: "productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "calibre",
                table: "productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "clave_externa_sae",
                table: "productos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "etiquetable",
                table: "productos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "longitud",
                table: "productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "minutos_reposo_minimo",
                table: "productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "clave_externa",
                table: "producto_categorias",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "descripcion",
                table: "producto_categorias",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "producto_categorias",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "prensas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "prensas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "numero_serie",
                table: "prensas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "prensas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "producto_id",
                table: "prensados",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "bobina_merma_kg",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_fin_proceso",
                table: "prensados",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_inicia_proceso",
                table: "prensados",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "interrupcion_en_curso",
                table: "prensados",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "levas_grados_entrada",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "levas_grados_salida",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "levas_kg_entrada",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "levas_kg_salida",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "levas_unidad_medida",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "meta_pallets",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "motivo_anticipado",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "rodillos_grados_entrada",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "rodillos_grados_salida",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "rodillos_kg_entrada",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "rodillos_kg_salida",
                table: "prensados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "rodillos_unidad_medida",
                table: "prensados",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "tiempo_interrupcion_minutos",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_pallets",
                table: "prensados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "eficiencia_porc",
                table: "prensado_resultados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_registro",
                table: "prensado_resultados",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "kg_merma",
                table: "prensado_resultados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "observaciones_finales",
                table: "prensado_resultados",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "tiempo_interrupcion_minutos",
                table: "prensado_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas_molidas",
                table: "prensado_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_carreras",
                table: "prensado_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_carreras_validadas",
                table: "prensado_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_palets",
                table: "prensado_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_palets_meta",
                table: "prensado_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "concluida",
                table: "prensado_interrupciones",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "descripcion",
                table: "prensado_interrupciones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_fin",
                table: "prensado_interrupciones",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_inicio",
                table: "prensado_interrupciones",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "activa",
                table: "prensado_bobinas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "cant_carreras",
                table: "prensado_bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_fin",
                table: "prensado_bobinas",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_inicio",
                table: "prensado_bobinas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "capacidad",
                table: "palets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "estatus",
                table: "palets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "no_serie",
                table: "palets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "prensado_fin_id",
                table: "palets",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "total_carretes",
                table: "palets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_ensamble",
                table: "palet_carretes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "posicion_en_palet",
                table: "palet_carretes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "completada",
                table: "ordenes_etiquetado",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha",
                table: "ordenes_etiquetado",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_completada",
                table: "ordenes_etiquetado",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "ordenes_etiquetado",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "especialidad",
                table: "operarios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "operarios",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "nombre_completo",
                table: "operarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "numero_empleado",
                table: "operarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "turno_preferido",
                table: "operarios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "maquinas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "estado",
                table: "maquinas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "maquinas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "modelo",
                table: "maquinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "numero_serie",
                table: "maquinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tipo",
                table: "maquinas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "bobina_id",
                table: "inspecciones_calidad",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_inspeccion",
                table: "inspecciones_calidad",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "hallazgos",
                table: "inspecciones_calidad",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "inspector",
                table: "inspecciones_calidad",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "numero_reporte",
                table: "inspecciones_calidad",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "resultado",
                table: "inspecciones_calidad",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "capacidad_kg_hora",
                table: "extrusoras",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "extrusoras",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "extrusoras",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "extrusoras",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "modelo",
                table: "extrusoras",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "numero_estaciones",
                table: "extrusoras",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "numero_serie",
                table: "extrusoras",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "extrusoras",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "producto_id",
                table: "extrusora_productos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "default_ancho",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "default_calibre",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "default_longitud",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "default_meta_kg",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "default_minutos_reposo",
                table: "extrusora_productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "default_molido_kg",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "default_rev_husillo_molido",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "default_rev_husillo_virgen",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "default_virgen_kg",
                table: "extrusora_productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "extrusora_productos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "extrusora_mezcladoras",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "extrusora_mezcladoras",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "nombre",
                table: "extrusora_mezcladoras",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "extrusora_mezcladoras",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "bobinas_totales_reposo",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "extrusiones",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_fin",
                table: "extrusiones",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_inicio",
                table: "extrusiones",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "interrupcion_en_curso",
                table: "extrusiones",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "lote_paquete_aditivos",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "lote_silo",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "meta_kg",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "molido_kg",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "motivo_anticipado",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "extrusiones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "rev_husillo_molido",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "rev_husillo_virgen",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "tiempo_interrupcion",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas_meta",
                table: "extrusiones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "virgen_kg",
                table: "extrusiones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "bobinas_totales_reposo",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "eficiencia_porc",
                table: "extrusion_resultados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_registro",
                table: "extrusion_resultados",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "kg_merma",
                table: "extrusion_resultados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "kg_molido",
                table: "extrusion_resultados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "kg_producidos",
                table: "extrusion_resultados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "observaciones_finales",
                table: "extrusion_resultados",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "tiempo_interrupcion_minutos",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "tiempo_proceso_horas",
                table: "extrusion_resultados",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas_meta",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas_molidas",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas_rechazadas",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas_siguiente_turno",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "total_bobinas_turno",
                table: "extrusion_resultados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "concluida",
                table: "extrusion_interrupciones",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "descripcion",
                table: "extrusion_interrupciones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_fin",
                table: "extrusion_interrupciones",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_inicio",
                table: "extrusion_interrupciones",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "extrusion_interrupciones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "carga_observaciones",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cliente",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cliente_envia",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cliente_grupo",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "embarques",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "conductor",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "destino",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "diff_dias_entrega",
                table: "embarques",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "diff_dias_pedido",
                table: "embarques",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "elaboro",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "estatus",
                table: "embarques",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha",
                table: "embarques",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "folio_carga",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_estimada_inicio",
                table: "embarques",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_fin",
                table: "embarques",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_inicio",
                table: "embarques",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "no_productos",
                table: "embarques",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "order_date",
                table: "embarques",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "order_delivery_date",
                table: "embarques",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "order_doc",
                table: "embarques",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "placas",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "recibe",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "remission_doc",
                table: "embarques",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "transporte",
                table: "embarques",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "palet_id",
                table: "embarque_pallets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "embarque_id",
                table: "embarque_pallets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "escaneado_por",
                table: "embarque_pallets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_escaneo",
                table: "embarque_pallets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "validado",
                table: "embarque_pallets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<Guid>(
                name: "embarque_id",
                table: "embarque_detalles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "cantidad_pallets_escaneados",
                table: "embarque_detalles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "cantidad_pallets_requerida",
                table: "embarque_detalles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "confirmado_por_administracion",
                table: "embarque_detalles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_validacion",
                table: "embarque_detalles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "producto_sae",
                table: "embarque_detalles",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "validado",
                table: "embarque_detalles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "causas_interrupcion",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "causas_interrupcion",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "orden_visual",
                table: "causas_interrupcion",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "tipo",
                table: "causas_interrupcion",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "carrera_id",
                table: "carretes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "carretes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "molino",
                table: "carretes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "no_linea",
                table: "carretes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "no_serie",
                table: "carretes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "carretes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "palet_serie",
                table: "carretes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "termina_palet",
                table: "carretes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "descripcion",
                table: "carrete_defectos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "evidencia_url",
                table: "carrete_defectos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_reporte",
                table: "carrete_defectos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "no_serie_carrete",
                table: "carrete_defectos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "reportado_por",
                table: "carrete_defectos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "tipo_defecto",
                table: "carrete_defectos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "prensado_id",
                table: "carreras",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "carrera_no",
                table: "carreras",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "carrera_troquel",
                table: "carreras",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "carreras",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_registro",
                table: "carreras",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_validacion",
                table: "carreras",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "inicio_prensado_bobina_id",
                table: "carreras",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "interrupcion_id",
                table: "carreras",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "palet_terminado",
                table: "carreras",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "bobina_no",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "bobina_origen",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "carreras",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "color_estacion",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "desviacion_estandar",
                table: "bobinas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "espesor",
                table: "bobinas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "estado",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_inicio",
                table: "bobinas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "hora_salida",
                table: "bobinas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "inicia_reposo",
                table: "bobinas",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "lote_virgen",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "merma_kg",
                table: "bobinas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "minutos_en_reposo",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "motivo_molino",
                table: "bobinas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "no_serie",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "observaciones",
                table: "bobinas",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_reclamo_detalles_reclamo_id",
                table: "reclamo_detalles",
                column: "reclamo_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensados_producto_id",
                table: "prensados",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensados_troquel_id",
                table: "prensados",
                column: "troquel_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensado_interrupciones_causa_id",
                table: "prensado_interrupciones",
                column: "causa_id");

            migrationBuilder.CreateIndex(
                name: "ix_palets_operario_id",
                table: "palets",
                column: "operario_id");

            migrationBuilder.CreateIndex(
                name: "ix_palets_prensa_id",
                table: "palets",
                column: "prensa_id");

            migrationBuilder.CreateIndex(
                name: "ix_palets_prensado_id",
                table: "palets",
                column: "prensado_id");

            migrationBuilder.CreateIndex(
                name: "ix_palets_producto_id",
                table: "palets",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_palets_producto_terminado_id",
                table: "palets",
                column: "producto_terminado_id");

            migrationBuilder.CreateIndex(
                name: "ix_ordenes_etiquetado_operario_id",
                table: "ordenes_etiquetado",
                column: "operario_id");

            migrationBuilder.CreateIndex(
                name: "ix_ordenes_etiquetado_prensado_id",
                table: "ordenes_etiquetado",
                column: "prensado_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusora_productos_producto_id",
                table: "extrusora_productos",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_producto_id",
                table: "extrusiones",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_silo_molido_id",
                table: "extrusiones",
                column: "silo_molido_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_silo_virgen_id",
                table: "extrusiones",
                column: "silo_virgen_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusion_interrupciones_causa_id",
                table: "extrusion_interrupciones",
                column: "causa_id");

            migrationBuilder.CreateIndex(
                name: "ix_embarque_pallets_embarque_detalle_id",
                table: "embarque_pallets",
                column: "embarque_detalle_id");

            migrationBuilder.CreateIndex(
                name: "ix_embarque_pallets_embarque_id",
                table: "embarque_pallets",
                column: "embarque_id");

            migrationBuilder.CreateIndex(
                name: "ix_embarque_pallets_palet_id",
                table: "embarque_pallets",
                column: "palet_id");

            migrationBuilder.CreateIndex(
                name: "ix_embarque_detalles_embarque_id",
                table: "embarque_detalles",
                column: "embarque_id");

            migrationBuilder.CreateIndex(
                name: "ix_embarque_detalles_producto_id",
                table: "embarque_detalles",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_embarque_detalles_producto_terminado_id",
                table: "embarque_detalles",
                column: "producto_terminado_id");

            migrationBuilder.CreateIndex(
                name: "ix_carretes_carrera_id",
                table: "carretes",
                column: "carrera_id");

            migrationBuilder.CreateIndex(
                name: "ix_carrete_defectos_reclamo_detalle_id",
                table: "carrete_defectos",
                column: "reclamo_detalle_id");

            migrationBuilder.CreateIndex(
                name: "ix_carreras_prensado_id",
                table: "carreras",
                column: "prensado_id");

            migrationBuilder.CreateIndex(
                name: "ix_bobinas_operario_id",
                table: "bobinas",
                column: "operario_id");

            migrationBuilder.CreateIndex(
                name: "ix_bobinas_producto_id",
                table: "bobinas",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_bobinas_silo_molido_id",
                table: "bobinas",
                column: "silo_molido_id");

            migrationBuilder.CreateIndex(
                name: "ix_bobinas_silo_virgen_id",
                table: "bobinas",
                column: "silo_virgen_id");
            migrationBuilder.CreateIndex(
                name: "ix_prensado_interrupciones_prensado_id",
                table: "prensado_interrupciones",
                column: "prensado_id");

            migrationBuilder.AddForeignKey(
                name: "fk_reclamo_detalles_reclamos_reclamo_id",
                table: "reclamo_detalles",
                column: "reclamo_id",
                principalTable: "reclamos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_prensados_productos_producto_id",
                table: "prensados",
                column: "producto_id",
                principalTable: "productos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_prensados_troqueles_troquel_id",
                table: "prensados",
                column: "troquel_id",
                principalTable: "troqueles",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_prensado_interrupciones_causas_interrupcion_causa_id",
                table: "prensado_interrupciones",
                column: "causa_id",
                principalTable: "causas_interrupcion",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_prensado_interrupciones_prensados_prensado_id",
                table: "prensado_interrupciones",
                column: "prensado_id",
                principalTable: "prensados",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_palets_operarios_operario_id",
                table: "palets",
                column: "operario_id",
                principalTable: "operarios",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_palets_prensas_prensa_id",
                table: "palets",
                column: "prensa_id",
                principalTable: "prensas",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_palets_prensados_prensado_id",
                table: "palets",
                column: "prensado_id",
                principalTable: "prensados",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_palets_productos_producto_id",
                table: "palets",
                column: "producto_id",
                principalTable: "productos",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_palets_productos_terminados_producto_terminado_id",
                table: "palets",
                column: "producto_terminado_id",
                principalTable: "productos_terminados",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_ordenes_etiquetado_operarios_operario_id",
                table: "ordenes_etiquetado",
                column: "operario_id",
                principalTable: "operarios",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_ordenes_etiquetado_prensados_prensado_id",
                table: "ordenes_etiquetado",
                column: "prensado_id",
                principalTable: "prensados",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_extrusora_productos_productos_producto_id",
                table: "extrusora_productos",
                column: "producto_id",
                principalTable: "productos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_extrusiones_productos_producto_id",
                table: "extrusiones",
                column: "producto_id",
                principalTable: "productos",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_extrusiones_silos_silo_molido_id",
                table: "extrusiones",
                column: "silo_molido_id",
                principalTable: "silos",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_extrusiones_silos_silo_virgen_id",
                table: "extrusiones",
                column: "silo_virgen_id",
                principalTable: "silos",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_extrusion_interrupciones_causas_interrupcion_causa_id",
                table: "extrusion_interrupciones",
                column: "causa_id",
                principalTable: "causas_interrupcion",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_embarque_pallets_embarque_detalles_embarque_detalle_id",
                table: "embarque_pallets",
                column: "embarque_detalle_id",
                principalTable: "embarque_detalles",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_embarque_pallets_embarques_embarque_id",
                table: "embarque_pallets",
                column: "embarque_id",
                principalTable: "embarques",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_embarque_pallets_palets_palet_id",
                table: "embarque_pallets",
                column: "palet_id",
                principalTable: "palets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_embarque_detalles_embarques_embarque_id",
                table: "embarque_detalles",
                column: "embarque_id",
                principalTable: "embarques",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_embarque_detalles_productos_producto_id",
                table: "embarque_detalles",
                column: "producto_id",
                principalTable: "productos",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_embarque_detalles_productos_terminados_producto_terminado_id",
                table: "embarque_detalles",
                column: "producto_terminado_id",
                principalTable: "productos_terminados",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_carretes_carreras_carrera_id",
                table: "carretes",
                column: "carrera_id",
                principalTable: "carreras",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_carrete_defectos_reclamo_detalles_reclamo_detalle_id",
                table: "carrete_defectos",
                column: "reclamo_detalle_id",
                principalTable: "reclamo_detalles",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_carreras_prensados_prensado_id",
                table: "carreras",
                column: "prensado_id",
                principalTable: "prensados",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_bobinas_operarios_operario_id",
                table: "bobinas",
                column: "operario_id",
                principalTable: "operarios",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_bobinas_productos_producto_id",
                table: "bobinas",
                column: "producto_id",
                principalTable: "productos",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_bobinas_silos_silo_molido_id",
                table: "bobinas",
                column: "silo_molido_id",
                principalTable: "silos",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_bobinas_silos_silo_virgen_id",
                table: "bobinas",
                column: "silo_virgen_id",
                principalTable: "silos",
                principalColumn: "id");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_reclamo_detalles_reclamos_reclamo_id",
                table: "reclamo_detalles");

            migrationBuilder.DropForeignKey(
                name: "fk_prensados_productos_producto_id",
                table: "prensados");

            migrationBuilder.DropForeignKey(
                name: "fk_prensados_troqueles_troquel_id",
                table: "prensados");

            migrationBuilder.DropForeignKey(
                name: "fk_prensado_interrupciones_causas_interrupcion_causa_id",
                table: "prensado_interrupciones");

            migrationBuilder.DropForeignKey(
                name: "fk_prensado_interrupciones_prensados_prensado_id",
                table: "prensado_interrupciones");

            migrationBuilder.DropForeignKey(
                name: "fk_palets_operarios_operario_id",
                table: "palets");

            migrationBuilder.DropForeignKey(
                name: "fk_palets_prensas_prensa_id",
                table: "palets");

            migrationBuilder.DropForeignKey(
                name: "fk_palets_prensados_prensado_id",
                table: "palets");

            migrationBuilder.DropForeignKey(
                name: "fk_palets_productos_producto_id",
                table: "palets");

            migrationBuilder.DropForeignKey(
                name: "fk_palets_productos_terminados_producto_terminado_id",
                table: "palets");

            migrationBuilder.DropForeignKey(
                name: "fk_ordenes_etiquetado_operarios_operario_id",
                table: "ordenes_etiquetado");

            migrationBuilder.DropForeignKey(
                name: "fk_ordenes_etiquetado_prensados_prensado_id",
                table: "ordenes_etiquetado");

            migrationBuilder.DropForeignKey(
                name: "fk_extrusora_productos_productos_producto_id",
                table: "extrusora_productos");

            migrationBuilder.DropForeignKey(
                name: "fk_extrusiones_productos_producto_id",
                table: "extrusiones");

            migrationBuilder.DropForeignKey(
                name: "fk_extrusiones_silos_silo_molido_id",
                table: "extrusiones");

            migrationBuilder.DropForeignKey(
                name: "fk_extrusiones_silos_silo_virgen_id",
                table: "extrusiones");

            migrationBuilder.DropForeignKey(
                name: "fk_extrusion_interrupciones_causas_interrupcion_causa_id",
                table: "extrusion_interrupciones");

            migrationBuilder.DropForeignKey(
                name: "fk_embarque_pallets_embarque_detalles_embarque_detalle_id",
                table: "embarque_pallets");

            migrationBuilder.DropForeignKey(
                name: "fk_embarque_pallets_embarques_embarque_id",
                table: "embarque_pallets");

            migrationBuilder.DropForeignKey(
                name: "fk_embarque_pallets_palets_palet_id",
                table: "embarque_pallets");

            migrationBuilder.DropForeignKey(
                name: "fk_embarque_detalles_embarques_embarque_id",
                table: "embarque_detalles");

            migrationBuilder.DropForeignKey(
                name: "fk_embarque_detalles_productos_producto_id",
                table: "embarque_detalles");

            migrationBuilder.DropForeignKey(
                name: "fk_embarque_detalles_productos_terminados_producto_terminado_id",
                table: "embarque_detalles");

            migrationBuilder.DropForeignKey(
                name: "fk_carretes_carreras_carrera_id",
                table: "carretes");

            migrationBuilder.DropForeignKey(
                name: "fk_carrete_defectos_reclamo_detalles_reclamo_detalle_id",
                table: "carrete_defectos");

            migrationBuilder.DropForeignKey(
                name: "fk_carreras_prensados_prensado_id",
                table: "carreras");

            migrationBuilder.DropForeignKey(
                name: "fk_bobinas_operarios_operario_id",
                table: "bobinas");

            migrationBuilder.DropForeignKey(
                name: "fk_bobinas_productos_producto_id",
                table: "bobinas");

            migrationBuilder.DropForeignKey(
                name: "fk_bobinas_silos_silo_molido_id",
                table: "bobinas");

            migrationBuilder.DropForeignKey(
                name: "fk_bobinas_silos_silo_virgen_id",
                table: "bobinas");

            migrationBuilder.DropIndex(
                name: "ix_prensado_interrupciones_prensado_id",
                table: "prensado_interrupciones");

            migrationBuilder.DropIndex(
                name: "ix_reclamo_detalles_reclamo_id",
                table: "reclamo_detalles");

            migrationBuilder.DropIndex(
                name: "ix_prensados_producto_id",
                table: "prensados");

            migrationBuilder.DropIndex(
                name: "ix_prensados_troquel_id",
                table: "prensados");

            migrationBuilder.DropIndex(
                name: "ix_prensado_interrupciones_causa_id",
                table: "prensado_interrupciones");

            migrationBuilder.DropIndex(
                name: "ix_palets_operario_id",
                table: "palets");

            migrationBuilder.DropIndex(
                name: "ix_palets_prensa_id",
                table: "palets");

            migrationBuilder.DropIndex(
                name: "ix_palets_prensado_id",
                table: "palets");

            migrationBuilder.DropIndex(
                name: "ix_palets_producto_id",
                table: "palets");

            migrationBuilder.DropIndex(
                name: "ix_palets_producto_terminado_id",
                table: "palets");

            migrationBuilder.DropIndex(
                name: "ix_ordenes_etiquetado_operario_id",
                table: "ordenes_etiquetado");

            migrationBuilder.DropIndex(
                name: "ix_ordenes_etiquetado_prensado_id",
                table: "ordenes_etiquetado");

            migrationBuilder.DropIndex(
                name: "ix_extrusora_productos_producto_id",
                table: "extrusora_productos");

            migrationBuilder.DropIndex(
                name: "ix_extrusiones_producto_id",
                table: "extrusiones");

            migrationBuilder.DropIndex(
                name: "ix_extrusiones_silo_molido_id",
                table: "extrusiones");

            migrationBuilder.DropIndex(
                name: "ix_extrusiones_silo_virgen_id",
                table: "extrusiones");

            migrationBuilder.DropIndex(
                name: "ix_extrusion_interrupciones_causa_id",
                table: "extrusion_interrupciones");

            migrationBuilder.DropIndex(
                name: "ix_embarque_pallets_embarque_detalle_id",
                table: "embarque_pallets");

            migrationBuilder.DropIndex(
                name: "ix_embarque_pallets_embarque_id",
                table: "embarque_pallets");

            migrationBuilder.DropIndex(
                name: "ix_embarque_pallets_palet_id",
                table: "embarque_pallets");

            migrationBuilder.DropIndex(
                name: "ix_embarque_detalles_embarque_id",
                table: "embarque_detalles");

            migrationBuilder.DropIndex(
                name: "ix_embarque_detalles_producto_id",
                table: "embarque_detalles");

            migrationBuilder.DropIndex(
                name: "ix_embarque_detalles_producto_terminado_id",
                table: "embarque_detalles");

            migrationBuilder.DropIndex(
                name: "ix_carretes_carrera_id",
                table: "carretes");

            migrationBuilder.DropIndex(
                name: "ix_carrete_defectos_reclamo_detalle_id",
                table: "carrete_defectos");

            migrationBuilder.DropIndex(
                name: "ix_carreras_prensado_id",
                table: "carreras");

            migrationBuilder.DropIndex(
                name: "ix_bobinas_operario_id",
                table: "bobinas");

            migrationBuilder.DropIndex(
                name: "ix_bobinas_producto_id",
                table: "bobinas");

            migrationBuilder.DropIndex(
                name: "ix_bobinas_silo_molido_id",
                table: "bobinas");

            migrationBuilder.DropIndex(
                name: "ix_bobinas_silo_virgen_id",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "turnos");

            migrationBuilder.DropColumn(
                name: "accion_correctiva",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "cerrado_por",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "cliente",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "estatus",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "fecha",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "fecha_cierre",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "order_doc",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "remission_doc",
                table: "reclamos");

            migrationBuilder.DropColumn(
                name: "cantidad_millares",
                table: "reclamo_detalles");

            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "reclamo_detalles");

            migrationBuilder.DropColumn(
                name: "fecha_registro",
                table: "reclamo_detalles");

            migrationBuilder.DropColumn(
                name: "no_serie_carrete",
                table: "reclamo_detalles");

            migrationBuilder.DropColumn(
                name: "no_serie_pallet",
                table: "reclamo_detalles");

            migrationBuilder.DropColumn(
                name: "tipo_defecto",
                table: "reclamo_detalles");

            migrationBuilder.DropColumn(
                name: "ya_reportado",
                table: "reclamo_detalles");

            migrationBuilder.DropColumn(
                name: "ancho",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "calibre",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "clave_externa_sae",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "etiquetable",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "longitud",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "minutos_reposo_minimo",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "clave_externa",
                table: "producto_categorias");

            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "producto_categorias");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "producto_categorias");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "prensas");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "prensas");

            migrationBuilder.DropColumn(
                name: "numero_serie",
                table: "prensas");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "prensas");

            migrationBuilder.DropColumn(
                name: "bobina_merma_kg",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "hora_fin_proceso",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "hora_inicia_proceso",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "interrupcion_en_curso",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "levas_grados_entrada",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "levas_grados_salida",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "levas_kg_entrada",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "levas_kg_salida",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "levas_unidad_medida",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "meta_pallets",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "motivo_anticipado",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "rodillos_grados_entrada",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "rodillos_grados_salida",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "rodillos_kg_entrada",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "rodillos_kg_salida",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "rodillos_unidad_medida",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "tiempo_interrupcion_minutos",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "total_pallets",
                table: "prensados");

            migrationBuilder.DropColumn(
                name: "eficiencia_porc",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "fecha_registro",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "kg_merma",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "observaciones_finales",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "tiempo_interrupcion_minutos",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "total_bobinas_molidas",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "total_carreras",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "total_carreras_validadas",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "total_palets",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "total_palets_meta",
                table: "prensado_resultados");

            migrationBuilder.DropColumn(
                name: "concluida",
                table: "prensado_interrupciones");

            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "prensado_interrupciones");

            migrationBuilder.DropColumn(
                name: "hora_fin",
                table: "prensado_interrupciones");

            migrationBuilder.DropColumn(
                name: "hora_inicio",
                table: "prensado_interrupciones");

            migrationBuilder.DropColumn(
                name: "activa",
                table: "prensado_bobinas");

            migrationBuilder.DropColumn(
                name: "cant_carreras",
                table: "prensado_bobinas");

            migrationBuilder.DropColumn(
                name: "hora_fin",
                table: "prensado_bobinas");

            migrationBuilder.DropColumn(
                name: "hora_inicio",
                table: "prensado_bobinas");

            migrationBuilder.DropColumn(
                name: "capacidad",
                table: "palets");

            migrationBuilder.DropColumn(
                name: "estatus",
                table: "palets");

            migrationBuilder.DropColumn(
                name: "no_serie",
                table: "palets");

            migrationBuilder.DropColumn(
                name: "prensado_fin_id",
                table: "palets");

            migrationBuilder.DropColumn(
                name: "total_carretes",
                table: "palets");

            migrationBuilder.DropColumn(
                name: "fecha_ensamble",
                table: "palet_carretes");

            migrationBuilder.DropColumn(
                name: "posicion_en_palet",
                table: "palet_carretes");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "completada",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "fecha",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "fecha_completada",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "ordenes_etiquetado");

            migrationBuilder.DropColumn(
                name: "especialidad",
                table: "operarios");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "operarios");

            migrationBuilder.DropColumn(
                name: "nombre_completo",
                table: "operarios");

            migrationBuilder.DropColumn(
                name: "numero_empleado",
                table: "operarios");

            migrationBuilder.DropColumn(
                name: "turno_preferido",
                table: "operarios");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "maquinas");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "maquinas");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "maquinas");

            migrationBuilder.DropColumn(
                name: "modelo",
                table: "maquinas");

            migrationBuilder.DropColumn(
                name: "numero_serie",
                table: "maquinas");

            migrationBuilder.DropColumn(
                name: "tipo",
                table: "maquinas");

            migrationBuilder.DropColumn(
                name: "bobina_id",
                table: "inspecciones_calidad");

            migrationBuilder.DropColumn(
                name: "fecha_inspeccion",
                table: "inspecciones_calidad");

            migrationBuilder.DropColumn(
                name: "hallazgos",
                table: "inspecciones_calidad");

            migrationBuilder.DropColumn(
                name: "inspector",
                table: "inspecciones_calidad");

            migrationBuilder.DropColumn(
                name: "numero_reporte",
                table: "inspecciones_calidad");

            migrationBuilder.DropColumn(
                name: "resultado",
                table: "inspecciones_calidad");

            migrationBuilder.DropColumn(
                name: "capacidad_kg_hora",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "modelo",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "numero_estaciones",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "numero_serie",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "extrusoras");

            migrationBuilder.DropColumn(
                name: "default_ancho",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_calibre",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_longitud",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_meta_kg",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_minutos_reposo",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_molido_kg",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_rev_husillo_molido",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_rev_husillo_virgen",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "default_virgen_kg",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "extrusora_productos");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "extrusora_mezcladoras");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "extrusora_mezcladoras");

            migrationBuilder.DropColumn(
                name: "nombre",
                table: "extrusora_mezcladoras");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "extrusora_mezcladoras");

            migrationBuilder.DropColumn(
                name: "bobinas_totales_reposo",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "fecha_fin",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "fecha_inicio",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "interrupcion_en_curso",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "lote_paquete_aditivos",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "lote_silo",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "meta_kg",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "molido_kg",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "motivo_anticipado",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "rev_husillo_molido",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "rev_husillo_virgen",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "tiempo_interrupcion",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "total_bobinas_meta",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "virgen_kg",
                table: "extrusiones");

            migrationBuilder.DropColumn(
                name: "bobinas_totales_reposo",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "eficiencia_porc",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "fecha_registro",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "kg_merma",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "kg_molido",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "kg_producidos",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "observaciones_finales",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "tiempo_interrupcion_minutos",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "tiempo_proceso_horas",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "total_bobinas",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "total_bobinas_meta",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "total_bobinas_molidas",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "total_bobinas_rechazadas",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "total_bobinas_siguiente_turno",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "total_bobinas_turno",
                table: "extrusion_resultados");

            migrationBuilder.DropColumn(
                name: "concluida",
                table: "extrusion_interrupciones");

            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "extrusion_interrupciones");

            migrationBuilder.DropColumn(
                name: "hora_fin",
                table: "extrusion_interrupciones");

            migrationBuilder.DropColumn(
                name: "hora_inicio",
                table: "extrusion_interrupciones");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "extrusion_interrupciones");

            migrationBuilder.DropColumn(
                name: "carga_observaciones",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "cliente",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "cliente_envia",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "cliente_grupo",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "conductor",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "destino",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "diff_dias_entrega",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "diff_dias_pedido",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "elaboro",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "estatus",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "fecha",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "folio_carga",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "hora_estimada_inicio",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "hora_fin",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "hora_inicio",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "no_productos",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "order_date",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "order_delivery_date",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "order_doc",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "placas",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "recibe",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "remission_doc",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "transporte",
                table: "embarques");

            migrationBuilder.DropColumn(
                name: "escaneado_por",
                table: "embarque_pallets");

            migrationBuilder.DropColumn(
                name: "fecha_escaneo",
                table: "embarque_pallets");

            migrationBuilder.DropColumn(
                name: "validado",
                table: "embarque_pallets");

            migrationBuilder.DropColumn(
                name: "cantidad_pallets_escaneados",
                table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "cantidad_pallets_requerida",
                table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "confirmado_por_administracion",
                table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "fecha_validacion",
                table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "producto_sae",
                table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "validado",
                table: "embarque_detalles");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "causas_interrupcion");

            migrationBuilder.DropColumn(
                name: "is_active",
                table: "causas_interrupcion");

            migrationBuilder.DropColumn(
                name: "orden_visual",
                table: "causas_interrupcion");

            migrationBuilder.DropColumn(
                name: "tipo",
                table: "causas_interrupcion");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "carretes");

            migrationBuilder.DropColumn(
                name: "molino",
                table: "carretes");

            migrationBuilder.DropColumn(
                name: "no_linea",
                table: "carretes");

            migrationBuilder.DropColumn(
                name: "no_serie",
                table: "carretes");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "carretes");

            migrationBuilder.DropColumn(
                name: "palet_serie",
                table: "carretes");

            migrationBuilder.DropColumn(
                name: "termina_palet",
                table: "carretes");

            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "carrete_defectos");

            migrationBuilder.DropColumn(
                name: "evidencia_url",
                table: "carrete_defectos");

            migrationBuilder.DropColumn(
                name: "fecha_reporte",
                table: "carrete_defectos");

            migrationBuilder.DropColumn(
                name: "no_serie_carrete",
                table: "carrete_defectos");

            migrationBuilder.DropColumn(
                name: "reportado_por",
                table: "carrete_defectos");

            migrationBuilder.DropColumn(
                name: "tipo_defecto",
                table: "carrete_defectos");

            migrationBuilder.DropColumn(
                name: "carrera_no",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "carrera_troquel",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "fecha_registro",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "fecha_validacion",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "inicio_prensado_bobina_id",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "interrupcion_id",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "palet_terminado",
                table: "carreras");

            migrationBuilder.DropColumn(
                name: "bobina_no",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "bobina_origen",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "carreras",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "color_estacion",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "desviacion_estandar",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "espesor",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "hora_inicio",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "hora_salida",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "inicia_reposo",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "lote_virgen",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "merma_kg",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "minutos_en_reposo",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "motivo_molino",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "no_serie",
                table: "bobinas");

            migrationBuilder.DropColumn(
                name: "observaciones",
                table: "bobinas");
            migrationBuilder.DropColumn(
                name: "reclamo_id",
                table: "reclamo_detalles");

            migrationBuilder.RenameColumn(
                name: "codigo",
                table: "productos",
                newName: "clave");

            migrationBuilder.RenameColumn(
                name: "codigo",
                table: "prensas",
                newName: "numero_prensa");
            migrationBuilder.DropColumn(
                name: "troquel_id",
                table: "prensados");
            migrationBuilder.DropColumn(
                name: "producto_id",
                table: "prensados");
            migrationBuilder.DropColumn(
                name: "causa_id",
                table: "prensado_interrupciones");
            migrationBuilder.DropColumn(
                name: "producto_terminado_id",
                table: "palets");
            migrationBuilder.DropColumn(
                name: "producto_id",
                table: "palets");
            migrationBuilder.DropColumn(
                name: "prensado_id",
                table: "palets");
            migrationBuilder.DropColumn(
                name: "prensa_id",
                table: "palets");
            migrationBuilder.DropColumn(
                name: "operario_id",
                table: "palets");
            migrationBuilder.DropColumn(
                name: "prensado_id",
                table: "ordenes_etiquetado");
            migrationBuilder.DropColumn(
                name: "operario_id",
                table: "ordenes_etiquetado");
            migrationBuilder.DropColumn(
                name: "producto_id",
                table: "extrusora_productos");
            migrationBuilder.DropColumn(
                name: "silo_virgen_id",
                table: "extrusiones");
            migrationBuilder.DropColumn(
                name: "silo_molido_id",
                table: "extrusiones");
            migrationBuilder.DropColumn(
                name: "producto_id",
                table: "extrusiones");
            migrationBuilder.DropColumn(
                name: "causa_id",
                table: "extrusion_interrupciones");
            migrationBuilder.DropColumn(
                name: "palet_id",
                table: "embarque_pallets");
            migrationBuilder.DropColumn(
                name: "embarque_id",
                table: "embarque_pallets");
            migrationBuilder.DropColumn(
                name: "embarque_detalle_id",
                table: "embarque_pallets");
            migrationBuilder.DropColumn(
                name: "producto_terminado_id",
                table: "embarque_detalles");
            migrationBuilder.DropColumn(
                name: "producto_id",
                table: "embarque_detalles");
            migrationBuilder.DropColumn(
                name: "embarque_id",
                table: "embarque_detalles");
            migrationBuilder.DropColumn(
                name: "carrera_id",
                table: "carretes");
            migrationBuilder.DropColumn(
                name: "reclamo_detalle_id",
                table: "carrete_defectos");
            migrationBuilder.DropColumn(
                name: "prensado_id",
                table: "carreras");
            migrationBuilder.DropColumn(
                name: "silo_virgen_id",
                table: "bobinas");
            migrationBuilder.DropColumn(
                name: "silo_molido_id",
                table: "bobinas");
            migrationBuilder.DropColumn(
                name: "producto_id",
                table: "bobinas");
            migrationBuilder.DropColumn(
                name: "operario_id",
                table: "bobinas");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReclamoId",
                table: "reclamo_detalles",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductoId",
                table: "prensados",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductoId",
                table: "extrusora_productos",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "PaletId",
                table: "embarque_pallets",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "EmbarqueId",
                table: "embarque_pallets",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "EmbarqueId",
                table: "embarque_detalles",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "CarreraId",
                table: "carretes",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "PrensadoId",
                table: "carreras",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");
        }
    }
}
