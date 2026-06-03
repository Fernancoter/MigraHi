using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HiCone.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "categorias",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_categorias", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "causas_interrupcion",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    orden_visual = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("pk_causas_interrupcion", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "clientes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    direccion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    telefono = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    rfc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    limite_credito = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
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
                    table.PrimaryKey("pk_clientes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "embarques",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    estatus = table.Column<int>(type: "int", nullable: false),
                    order_doc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    remission_doc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    folio_carga = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cliente = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cliente_grupo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cliente_envia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    order_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    order_delivery_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    hora_estimada_inicio = table.Column<DateTime>(type: "datetime2", nullable: true),
                    hora_inicio = table.Column<DateTime>(type: "datetime2", nullable: true),
                    hora_fin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    diff_dias_pedido = table.Column<int>(type: "int", nullable: true),
                    diff_dias_entrega = table.Column<int>(type: "int", nullable: true),
                    transporte = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    placas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    conductor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    destino = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    recibe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    elaboro = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    no_productos = table.Column<int>(type: "int", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    carga_observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_embarques", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "existencias",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fecha_hora = table.Column<DateTime>(type: "datetime2", nullable: false),
                    usuario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_existencias", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "extrusoras",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    modelo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    numero_serie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    capacidad_kg_hora = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    numero_estaciones = table.Column<int>(type: "int", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_extrusoras", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "inspecciones_calidad",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    numero_reporte = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha_inspeccion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    resultado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bobina_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    inspector = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    hallazgos = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_inspecciones_calidad", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "lotes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lote_embarque = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lote_po = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lote_fecha_registro = table.Column<DateTime>(type: "datetime2", nullable: true),
                    lote_trunk_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lote_tipo_material = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lote_silo_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    lote_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    lote_consumido = table.Column<bool>(type: "bit", nullable: false),
                    lote_paquete_aditivos = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_lotes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "maquinas",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    modelo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    numero_serie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("pk_maquinas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "operarios",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    numero_empleado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre_completo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    especialidad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    turno_preferido = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("pk_operarios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "permissions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    module = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_permissions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "prensas",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    modelo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    numero_serie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_prensas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "producto_categorias",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    clave_externa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("pk_producto_categorias", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "reclamos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    estatus = table.Column<int>(type: "int", nullable: false),
                    cliente = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    order_doc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    remission_doc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    accion_correctiva = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_cierre = table.Column<DateTime>(type: "datetime2", nullable: true),
                    cerrado_por = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_reclamos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_system = table.Column<bool>(type: "bit", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sae_customers",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    customer_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    customer_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    consolidated_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shipping = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    fecha_sincronizacion = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("pk_sae_customers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sae_orders",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    order_doc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    order_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    order_delivery_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    customer_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    customer_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sales_person_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shipping = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    total_amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    procesada = table.Column<bool>(type: "bit", nullable: false),
                    fecha_sincronizacion = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("pk_sae_orders", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sae_products",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    product_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    product_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    fecha_sincronizacion = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("pk_sae_products", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sae_remissions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    remission_doc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    order_doc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    remission_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    product_number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    customer_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    customer_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shipping = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    consolidated_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    customer_shipping = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_sincronizacion = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("pk_sae_remissions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tenants",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    slug = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    logo_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tenants", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "troqueles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    productos_compatibles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_ultimo_mantenimiento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ciclos_acumulados = table.Column<int>(type: "int", nullable: false),
                    ciclos_video_mantenimiento = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("pk_troqueles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "turnos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    hora_inicio = table.Column<TimeSpan>(type: "time", nullable: false),
                    hora_fin = table.Column<TimeSpan>(type: "time", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("pk_turnos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    first_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone_number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    avatar_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    email_confirmed = table.Column<bool>(type: "bit", nullable: false),
                    last_login_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    company_id = table.Column<int>(type: "int", nullable: true),
                    operador_id = table.Column<int>(type: "int", nullable: true),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    birthday = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_blocked = table.Column<bool>(type: "bit", nullable: false),
                    must_change_password = table.Column<bool>(type: "bit", nullable: false),
                    password_updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    access_failed_count = table.Column<int>(type: "int", nullable: false),
                    security_policy_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "articulos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    precio = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    existencia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    categoria_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_articulos", x => x.id);
                    table.ForeignKey(
                        name: "fk_articulos_categorias_categoria_id",
                        column: x => x.categoria_id,
                        principalTable: "categorias",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ventas",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    folio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    cliente_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    subtotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    impuesto = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_ventas", x => x.id);
                    table.ForeignKey(
                        name: "fk_ventas_clientes_cliente_id",
                        column: x => x.cliente_id,
                        principalTable: "clientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "extrusora_mezcladoras",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    extrusora_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_extrusora_mezcladoras", x => x.id);
                    table.ForeignKey(
                        name: "fk_extrusora_mezcladoras_extrusoras_extrusora_id",
                        column: x => x.extrusora_id,
                        principalTable: "extrusoras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "productos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tipo_material = table.Column<int>(type: "int", nullable: false),
                    calibre = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ancho = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    longitud = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    minutos_reposo_minimo = table.Column<int>(type: "int", nullable: false),
                    categoria_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    clave_externa_sae = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    etiquetable = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("pk_productos", x => x.id);
                    table.ForeignKey(
                        name: "fk_productos_producto_categorias_categoria_id",
                        column: x => x.categoria_id,
                        principalTable: "producto_categorias",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "reclamo_detalles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reclamo_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    no_serie_pallet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    no_serie_carrete = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tipo_defecto = table.Column<int>(type: "int", nullable: false),
                    cantidad_millares = table.Column<int>(type: "int", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ya_reportado = table.Column<bool>(type: "bit", nullable: false),
                    fecha_registro = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("pk_reclamo_detalles", x => x.id);
                    table.ForeignKey(
                        name: "fk_reclamo_detalles_reclamos_reclamo_id",
                        column: x => x.reclamo_id,
                        principalTable: "reclamos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "role_permissions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    role_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    permission_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_permissions", x => x.id);
                    table.ForeignKey(
                        name: "fk_role_permissions_permissions_permission_id",
                        column: x => x.permission_id,
                        principalTable: "permissions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_role_permissions_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tenant_settings",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    key = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    data_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tenant_settings", x => x.id);
                    table.ForeignKey(
                        name: "fk_tenant_settings_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prensa_troqueles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    prensa_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    troquel_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fecha_asignacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_desasignacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    activo = table.Column<bool>(type: "bit", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_prensa_troqueles", x => x.id);
                    table.ForeignKey(
                        name: "fk_prensa_troqueles_prensas_prensa_id",
                        column: x => x.prensa_id,
                        principalTable: "prensas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_prensa_troqueles_troqueles_troquel_id",
                        column: x => x.troquel_id,
                        principalTable: "troqueles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "refresh_tokens",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    expires_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    revoked_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    replaced_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    device_info = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_refresh_tokens", x => x.id);
                    table.ForeignKey(
                        name: "fk_refresh_tokens_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_roles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    role_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    assigned_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_roles", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_roles_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_roles_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_tenants",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    is_default = table.Column<bool>(type: "bit", nullable: false),
                    assigned_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_tenants", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_tenants_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "silos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    capacidad_maxima = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    existencia_actual = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    kg_minimo = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    kg_maximo = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    estado_material = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tipo_material = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    activo = table.Column<bool>(type: "bit", nullable: false),
                    articulo_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ubicacion = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_silos", x => x.id);
                    table.ForeignKey(
                        name: "fk_silos_articulos_articulo_id",
                        column: x => x.articulo_id,
                        principalTable: "articulos",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "venta_detalles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    venta_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    articulo_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    cantidad = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    precio_unitario = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    importe = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
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
                    table.PrimaryKey("pk_venta_detalles", x => x.id);
                    table.ForeignKey(
                        name: "fk_venta_detalles_articulos_articulo_id",
                        column: x => x.articulo_id,
                        principalTable: "articulos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_venta_detalles_ventas_venta_id",
                        column: x => x.venta_id,
                        principalTable: "ventas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "existencia_productos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    existencia_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    cantidad_real = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    cantidad_sistema = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
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
                    table.PrimaryKey("pk_existencia_productos", x => x.id);
                    table.ForeignKey(
                        name: "fk_existencia_productos_existencias_existencia_id",
                        column: x => x.existencia_id,
                        principalTable: "existencias",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_existencia_productos_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "extrusora_productos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    extrusora_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    default_calibre = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_ancho = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_longitud = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_virgen_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_molido_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_rev_husillo_virgen = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_rev_husillo_molido = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_meta_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_minutos_reposo = table.Column<int>(type: "int", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("pk_extrusora_productos", x => x.id);
                    table.ForeignKey(
                        name: "fk_extrusora_productos_extrusoras_extrusora_id",
                        column: x => x.extrusora_id,
                        principalTable: "extrusoras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_extrusora_productos_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prensa_productos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    prensa_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    default_levas_kg_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_levas_kg_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_levas_grados_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_levas_grados_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_rodillos_kg_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_rodillos_kg_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_rodillos_grados_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_rodillos_grados_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    default_meta_pallets = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("pk_prensa_productos", x => x.id);
                    table.ForeignKey(
                        name: "fk_prensa_productos_prensas_prensa_id",
                        column: x => x.prensa_id,
                        principalTable: "prensas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_prensa_productos_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prensados",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hora_inicia_proceso = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hora_fin_proceso = table.Column<DateTime>(type: "datetime2", nullable: true),
                    estado = table.Column<int>(type: "int", nullable: false),
                    levas_unidad_medida = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rodillos_unidad_medida = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    levas_kg_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    levas_kg_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    levas_grados_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    levas_grados_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    rodillos_kg_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    rodillos_kg_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    rodillos_grados_entrada = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    rodillos_grados_salida = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    meta_pallets = table.Column<int>(type: "int", nullable: false),
                    total_pallets = table.Column<int>(type: "int", nullable: false),
                    tiempo_interrupcion_minutos = table.Column<int>(type: "int", nullable: false),
                    interrupcion_en_curso = table.Column<bool>(type: "bit", nullable: false),
                    bobina_merma_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    motivo_anticipado = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    prensa_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    turno_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    operario_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    troquel_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_prensados", x => x.id);
                    table.ForeignKey(
                        name: "fk_prensados_operarios_operario_id",
                        column: x => x.operario_id,
                        principalTable: "operarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_prensados_prensas_prensa_id",
                        column: x => x.prensa_id,
                        principalTable: "prensas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_prensados_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_prensados_troqueles_troquel_id",
                        column: x => x.troquel_id,
                        principalTable: "troqueles",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_prensados_turnos_turno_id",
                        column: x => x.turno_id,
                        principalTable: "turnos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "productos_terminados",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("pk_productos_terminados", x => x.id);
                    table.ForeignKey(
                        name: "fk_productos_terminados_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "carrete_defectos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    no_serie_carrete = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tipo_defecto = table.Column<int>(type: "int", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    evidencia_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_reporte = table.Column<DateTime>(type: "datetime2", nullable: false),
                    reportado_por = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reclamo_detalle_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_carrete_defectos", x => x.id);
                    table.ForeignKey(
                        name: "fk_carrete_defectos_reclamo_detalles_reclamo_detalle_id",
                        column: x => x.reclamo_detalle_id,
                        principalTable: "reclamo_detalles",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "existencias_silos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    silo_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    existencia_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    cantidad = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    lote_virgen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_registro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_existencias_silos", x => x.id);
                    table.ForeignKey(
                        name: "fk_existencias_silos_existencias_existencia_id",
                        column: x => x.existencia_id,
                        principalTable: "existencias",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_existencias_silos_silos_silo_id",
                        column: x => x.silo_id,
                        principalTable: "silos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "extrusiones",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_fin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    estado = table.Column<int>(type: "int", nullable: false),
                    calibre = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ancho = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    longitud = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    meta_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    virgen_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    molido_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    rev_husillo_virgen = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    rev_husillo_molido = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    total_bobinas_meta = table.Column<int>(type: "int", nullable: false),
                    lote_silo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    lote_paquete_aditivos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    silo_virgen_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    silo_molido_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    motivo_anticipado = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tiempo_interrupcion = table.Column<int>(type: "int", nullable: false),
                    interrupcion_en_curso = table.Column<bool>(type: "bit", nullable: false),
                    bobinas_totales_reposo = table.Column<int>(type: "int", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    extrusora_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    maquina_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    operario_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    turno_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    lote_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_extrusiones", x => x.id);
                    table.ForeignKey(
                        name: "fk_extrusiones_extrusoras_extrusora_id",
                        column: x => x.extrusora_id,
                        principalTable: "extrusoras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_extrusiones_lotes_lote_id",
                        column: x => x.lote_id,
                        principalTable: "lotes",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_extrusiones_maquinas_maquina_id",
                        column: x => x.maquina_id,
                        principalTable: "maquinas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_extrusiones_operarios_operario_id",
                        column: x => x.operario_id,
                        principalTable: "operarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_extrusiones_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_extrusiones_silos_silo_molido_id",
                        column: x => x.silo_molido_id,
                        principalTable: "silos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_extrusiones_silos_silo_virgen_id",
                        column: x => x.silo_virgen_id,
                        principalTable: "silos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_extrusiones_turnos_turno_id",
                        column: x => x.turno_id,
                        principalTable: "turnos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "carreras",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    carrera_no = table.Column<int>(type: "int", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    fecha_registro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_validacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    carrera_troquel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    palet_terminado = table.Column<bool>(type: "bit", nullable: false),
                    prensado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    inicio_prensado_bobina_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    interrupcion_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_carreras", x => x.id);
                    table.ForeignKey(
                        name: "fk_carreras_prensados_prensado_id",
                        column: x => x.prensado_id,
                        principalTable: "prensados",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ordenes_etiquetado",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    codigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    completada = table.Column<bool>(type: "bit", nullable: false),
                    fecha_completada = table.Column<DateTime>(type: "datetime2", nullable: true),
                    prensado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    operario_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_ordenes_etiquetado", x => x.id);
                    table.ForeignKey(
                        name: "fk_ordenes_etiquetado_operarios_operario_id",
                        column: x => x.operario_id,
                        principalTable: "operarios",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_ordenes_etiquetado_prensados_prensado_id",
                        column: x => x.prensado_id,
                        principalTable: "prensados",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "prensado_interrupciones",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    prensado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    causa_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    hora_inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hora_fin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    concluida = table.Column<bool>(type: "bit", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_prensado_interrupciones", x => x.id);
                    table.ForeignKey(
                        name: "fk_prensado_interrupciones_causas_interrupcion_causa_id",
                        column: x => x.causa_id,
                        principalTable: "causas_interrupcion",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_prensado_interrupciones_prensados_prensado_id",
                        column: x => x.prensado_id,
                        principalTable: "prensados",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prensado_resultados",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    prensado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    total_palets = table.Column<int>(type: "int", nullable: false),
                    total_palets_meta = table.Column<int>(type: "int", nullable: false),
                    total_carreras = table.Column<int>(type: "int", nullable: false),
                    total_carreras_validadas = table.Column<int>(type: "int", nullable: false),
                    total_bobinas_molidas = table.Column<int>(type: "int", nullable: false),
                    kg_merma = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    tiempo_interrupcion_minutos = table.Column<int>(type: "int", nullable: false),
                    eficiencia_porc = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    observaciones_finales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_registro = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("pk_prensado_resultados", x => x.id);
                    table.ForeignKey(
                        name: "fk_prensado_resultados_prensados_prensado_id",
                        column: x => x.prensado_id,
                        principalTable: "prensados",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "embarque_detalles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    embarque_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_sae = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    cantidad_pallets_requerida = table.Column<int>(type: "int", nullable: false),
                    cantidad_pallets_escaneados = table.Column<int>(type: "int", nullable: false),
                    producto_terminado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    confirmado_por_administracion = table.Column<bool>(type: "bit", nullable: false),
                    validado = table.Column<bool>(type: "bit", nullable: false),
                    fecha_validacion = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("pk_embarque_detalles", x => x.id);
                    table.ForeignKey(
                        name: "fk_embarque_detalles_embarques_embarque_id",
                        column: x => x.embarque_id,
                        principalTable: "embarques",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_embarque_detalles_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_embarque_detalles_productos_terminados_producto_terminado_id",
                        column: x => x.producto_terminado_id,
                        principalTable: "productos_terminados",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "palets",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    no_serie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tipo = table.Column<int>(type: "int", nullable: false),
                    estatus = table.Column<int>(type: "int", nullable: false),
                    capacidad = table.Column<int>(type: "int", nullable: false),
                    total_carretes = table.Column<int>(type: "int", nullable: false),
                    hora_inicio_ensamble = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hora_fin_ensamble = table.Column<DateTime>(type: "datetime2", nullable: true),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    producto_terminado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    prensado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    operario_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    prensa_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    prensado_fin_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    lote_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_palets", x => x.id);
                    table.ForeignKey(
                        name: "fk_palets_lotes_lote_id",
                        column: x => x.lote_id,
                        principalTable: "lotes",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_palets_operarios_operario_id",
                        column: x => x.operario_id,
                        principalTable: "operarios",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_palets_prensados_prensado_id",
                        column: x => x.prensado_id,
                        principalTable: "prensados",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_palets_prensas_prensa_id",
                        column: x => x.prensa_id,
                        principalTable: "prensas",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_palets_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_palets_productos_terminados_producto_terminado_id",
                        column: x => x.producto_terminado_id,
                        principalTable: "productos_terminados",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "bobinas",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    no_serie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bobina_no = table.Column<int>(type: "int", nullable: false),
                    bobina_origen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    merma_kg = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    espesor = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    desviacion_estandar = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    hora_inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hora_salida = table.Column<DateTime>(type: "datetime2", nullable: false),
                    inicia_reposo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    minutos_en_reposo = table.Column<int>(type: "int", nullable: false),
                    fecha_produccion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    estado = table.Column<int>(type: "int", nullable: false),
                    color_estacion = table.Column<int>(type: "int", nullable: false),
                    motivo_molino = table.Column<int>(type: "int", nullable: false),
                    carreras = table.Column<int>(type: "int", nullable: false),
                    silo_virgen_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    lote_virgen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    silo_molido_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    extrusion_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    producto_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    operario_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    lote_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("pk_bobinas", x => x.id);
                    table.ForeignKey(
                        name: "fk_bobinas_extrusiones_extrusion_id",
                        column: x => x.extrusion_id,
                        principalTable: "extrusiones",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_bobinas_lotes_lote_id",
                        column: x => x.lote_id,
                        principalTable: "lotes",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_bobinas_operarios_operario_id",
                        column: x => x.operario_id,
                        principalTable: "operarios",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_bobinas_productos_producto_id",
                        column: x => x.producto_id,
                        principalTable: "productos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_bobinas_silos_silo_molido_id",
                        column: x => x.silo_molido_id,
                        principalTable: "silos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_bobinas_silos_silo_virgen_id",
                        column: x => x.silo_virgen_id,
                        principalTable: "silos",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "extrusion_interrupciones",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    extrusion_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    causa_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    hora_inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hora_fin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    concluida = table.Column<bool>(type: "bit", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_extrusion_interrupciones", x => x.id);
                    table.ForeignKey(
                        name: "fk_extrusion_interrupciones_causas_interrupcion_causa_id",
                        column: x => x.causa_id,
                        principalTable: "causas_interrupcion",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_extrusion_interrupciones_extrusiones_extrusion_id",
                        column: x => x.extrusion_id,
                        principalTable: "extrusiones",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "extrusion_resultados",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    extrusion_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    total_bobinas = table.Column<int>(type: "int", nullable: false),
                    total_bobinas_molidas = table.Column<int>(type: "int", nullable: false),
                    total_bobinas_rechazadas = table.Column<int>(type: "int", nullable: false),
                    total_bobinas_turno = table.Column<int>(type: "int", nullable: false),
                    total_bobinas_siguiente_turno = table.Column<int>(type: "int", nullable: false),
                    total_bobinas_meta = table.Column<int>(type: "int", nullable: false),
                    bobinas_totales_reposo = table.Column<int>(type: "int", nullable: false),
                    tiempo_interrupcion_minutos = table.Column<int>(type: "int", nullable: false),
                    tiempo_proceso_horas = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    eficiencia_porc = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    kg_producidos = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    kg_merma = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    kg_molido = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    observaciones_finales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_registro = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("pk_extrusion_resultados", x => x.id);
                    table.ForeignKey(
                        name: "fk_extrusion_resultados_extrusiones_extrusion_id",
                        column: x => x.extrusion_id,
                        principalTable: "extrusiones",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "carretes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    no_serie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    no_linea = table.Column<int>(type: "int", nullable: false),
                    estado = table.Column<int>(type: "int", nullable: false),
                    molino = table.Column<int>(type: "int", nullable: false),
                    termina_palet = table.Column<bool>(type: "bit", nullable: false),
                    palet_serie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    carrera_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("pk_carretes", x => x.id);
                    table.ForeignKey(
                        name: "fk_carretes_carreras_carrera_id",
                        column: x => x.carrera_id,
                        principalTable: "carreras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "embarque_pallets",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    embarque_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    palet_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    embarque_detalle_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    fecha_escaneo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    validado = table.Column<bool>(type: "bit", nullable: false),
                    escaneado_por = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("pk_embarque_pallets", x => x.id);
                    table.ForeignKey(
                        name: "fk_embarque_pallets_embarque_detalles_embarque_detalle_id",
                        column: x => x.embarque_detalle_id,
                        principalTable: "embarque_detalles",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_embarque_pallets_embarques_embarque_id",
                        column: x => x.embarque_id,
                        principalTable: "embarques",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_embarque_pallets_palets_palet_id",
                        column: x => x.palet_id,
                        principalTable: "palets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "prensado_bobinas",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    prensado_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    bobina_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    cant_carreras = table.Column<int>(type: "int", nullable: false),
                    activa = table.Column<bool>(type: "bit", nullable: false),
                    hora_inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hora_fin = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("pk_prensado_bobinas", x => x.id);
                    table.ForeignKey(
                        name: "fk_prensado_bobinas_bobinas_bobina_id",
                        column: x => x.bobina_id,
                        principalTable: "bobinas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_prensado_bobinas_prensados_prensado_id",
                        column: x => x.prensado_id,
                        principalTable: "prensados",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "palet_carretes",
                columns: table => new
                {
                    palet_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    carrete_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fecha_ensamble = table.Column<DateTime>(type: "datetime2", nullable: false),
                    posicion_en_palet = table.Column<int>(type: "int", nullable: false),
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("pk_palet_carretes", x => new { x.palet_id, x.carrete_id });
                    table.ForeignKey(
                        name: "fk_palet_carretes_carretes_carrete_id",
                        column: x => x.carrete_id,
                        principalTable: "carretes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_palet_carretes_palets_palet_id",
                        column: x => x.palet_id,
                        principalTable: "palets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_articulos_categoria_id",
                table: "articulos",
                column: "categoria_id");

            migrationBuilder.CreateIndex(
                name: "ix_bobinas_extrusion_id",
                table: "bobinas",
                column: "extrusion_id");

            migrationBuilder.CreateIndex(
                name: "ix_bobinas_lote_id",
                table: "bobinas",
                column: "lote_id");

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
                name: "ix_carreras_prensado_id",
                table: "carreras",
                column: "prensado_id");

            migrationBuilder.CreateIndex(
                name: "ix_carrete_defectos_reclamo_detalle_id",
                table: "carrete_defectos",
                column: "reclamo_detalle_id");

            migrationBuilder.CreateIndex(
                name: "ix_carretes_carrera_id",
                table: "carretes",
                column: "carrera_id");

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
                name: "ix_existencia_productos_existencia_id",
                table: "existencia_productos",
                column: "existencia_id");

            migrationBuilder.CreateIndex(
                name: "ix_existencia_productos_producto_id",
                table: "existencia_productos",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_existencias_silos_existencia_id",
                table: "existencias_silos",
                column: "existencia_id");

            migrationBuilder.CreateIndex(
                name: "ix_existencias_silos_silo_id",
                table: "existencias_silos",
                column: "silo_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusion_interrupciones_causa_id",
                table: "extrusion_interrupciones",
                column: "causa_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusion_interrupciones_extrusion_id",
                table: "extrusion_interrupciones",
                column: "extrusion_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusion_resultados_extrusion_id",
                table: "extrusion_resultados",
                column: "extrusion_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_extrusora_id",
                table: "extrusiones",
                column: "extrusora_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_lote_id",
                table: "extrusiones",
                column: "lote_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_maquina_id",
                table: "extrusiones",
                column: "maquina_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusiones_operario_id",
                table: "extrusiones",
                column: "operario_id");

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
                name: "ix_extrusiones_turno_id",
                table: "extrusiones",
                column: "turno_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusora_mezcladoras_extrusora_id",
                table: "extrusora_mezcladoras",
                column: "extrusora_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusora_productos_extrusora_id",
                table: "extrusora_productos",
                column: "extrusora_id");

            migrationBuilder.CreateIndex(
                name: "ix_extrusora_productos_producto_id",
                table: "extrusora_productos",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_ordenes_etiquetado_operario_id",
                table: "ordenes_etiquetado",
                column: "operario_id");

            migrationBuilder.CreateIndex(
                name: "ix_ordenes_etiquetado_prensado_id",
                table: "ordenes_etiquetado",
                column: "prensado_id");

            migrationBuilder.CreateIndex(
                name: "ix_palet_carretes_carrete_id",
                table: "palet_carretes",
                column: "carrete_id");

            migrationBuilder.CreateIndex(
                name: "ix_palets_lote_id",
                table: "palets",
                column: "lote_id");

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
                name: "ix_prensa_productos_prensa_id",
                table: "prensa_productos",
                column: "prensa_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensa_productos_producto_id",
                table: "prensa_productos",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensa_troqueles_prensa_id",
                table: "prensa_troqueles",
                column: "prensa_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensa_troqueles_troquel_id",
                table: "prensa_troqueles",
                column: "troquel_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensado_bobinas_bobina_id",
                table: "prensado_bobinas",
                column: "bobina_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensado_bobinas_prensado_id",
                table: "prensado_bobinas",
                column: "prensado_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensado_interrupciones_causa_id",
                table: "prensado_interrupciones",
                column: "causa_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensado_interrupciones_prensado_id",
                table: "prensado_interrupciones",
                column: "prensado_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensado_resultados_prensado_id",
                table: "prensado_resultados",
                column: "prensado_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_prensados_operario_id",
                table: "prensados",
                column: "operario_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensados_prensa_id",
                table: "prensados",
                column: "prensa_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensados_producto_id",
                table: "prensados",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensados_troquel_id",
                table: "prensados",
                column: "troquel_id");

            migrationBuilder.CreateIndex(
                name: "ix_prensados_turno_id",
                table: "prensados",
                column: "turno_id");

            migrationBuilder.CreateIndex(
                name: "ix_productos_categoria_id",
                table: "productos",
                column: "categoria_id");

            migrationBuilder.CreateIndex(
                name: "ix_productos_terminados_producto_id",
                table: "productos_terminados",
                column: "producto_id");

            migrationBuilder.CreateIndex(
                name: "ix_reclamo_detalles_reclamo_id",
                table: "reclamo_detalles",
                column: "reclamo_id");

            migrationBuilder.CreateIndex(
                name: "ix_refresh_tokens_user_id",
                table: "refresh_tokens",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_permissions_permission_id",
                table: "role_permissions",
                column: "permission_id");

            migrationBuilder.CreateIndex(
                name: "ix_role_permissions_role_id",
                table: "role_permissions",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_silos_articulo_id",
                table: "silos",
                column: "articulo_id");

            migrationBuilder.CreateIndex(
                name: "ix_tenant_settings_tenant_id",
                table: "tenant_settings",
                column: "tenant_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_roles_role_id",
                table: "user_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_roles_user_id",
                table: "user_roles",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_tenants_user_id",
                table: "user_tenants",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_venta_detalles_articulo_id",
                table: "venta_detalles",
                column: "articulo_id");

            migrationBuilder.CreateIndex(
                name: "ix_venta_detalles_venta_id",
                table: "venta_detalles",
                column: "venta_id");

            migrationBuilder.CreateIndex(
                name: "ix_ventas_cliente_id",
                table: "ventas",
                column: "cliente_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "carrete_defectos");

            migrationBuilder.DropTable(
                name: "embarque_pallets");

            migrationBuilder.DropTable(
                name: "existencia_productos");

            migrationBuilder.DropTable(
                name: "existencias_silos");

            migrationBuilder.DropTable(
                name: "extrusion_interrupciones");

            migrationBuilder.DropTable(
                name: "extrusion_resultados");

            migrationBuilder.DropTable(
                name: "extrusora_mezcladoras");

            migrationBuilder.DropTable(
                name: "extrusora_productos");

            migrationBuilder.DropTable(
                name: "inspecciones_calidad");

            migrationBuilder.DropTable(
                name: "ordenes_etiquetado");

            migrationBuilder.DropTable(
                name: "palet_carretes");

            migrationBuilder.DropTable(
                name: "prensa_productos");

            migrationBuilder.DropTable(
                name: "prensa_troqueles");

            migrationBuilder.DropTable(
                name: "prensado_bobinas");

            migrationBuilder.DropTable(
                name: "prensado_interrupciones");

            migrationBuilder.DropTable(
                name: "prensado_resultados");

            migrationBuilder.DropTable(
                name: "refresh_tokens");

            migrationBuilder.DropTable(
                name: "role_permissions");

            migrationBuilder.DropTable(
                name: "sae_customers");

            migrationBuilder.DropTable(
                name: "sae_orders");

            migrationBuilder.DropTable(
                name: "sae_products");

            migrationBuilder.DropTable(
                name: "sae_remissions");

            migrationBuilder.DropTable(
                name: "tenant_settings");

            migrationBuilder.DropTable(
                name: "user_roles");

            migrationBuilder.DropTable(
                name: "user_tenants");

            migrationBuilder.DropTable(
                name: "venta_detalles");

            migrationBuilder.DropTable(
                name: "reclamo_detalles");

            migrationBuilder.DropTable(
                name: "embarque_detalles");

            migrationBuilder.DropTable(
                name: "existencias");

            migrationBuilder.DropTable(
                name: "carretes");

            migrationBuilder.DropTable(
                name: "palets");

            migrationBuilder.DropTable(
                name: "bobinas");

            migrationBuilder.DropTable(
                name: "causas_interrupcion");

            migrationBuilder.DropTable(
                name: "permissions");

            migrationBuilder.DropTable(
                name: "tenants");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "ventas");

            migrationBuilder.DropTable(
                name: "reclamos");

            migrationBuilder.DropTable(
                name: "embarques");

            migrationBuilder.DropTable(
                name: "carreras");

            migrationBuilder.DropTable(
                name: "productos_terminados");

            migrationBuilder.DropTable(
                name: "extrusiones");

            migrationBuilder.DropTable(
                name: "clientes");

            migrationBuilder.DropTable(
                name: "prensados");

            migrationBuilder.DropTable(
                name: "extrusoras");

            migrationBuilder.DropTable(
                name: "lotes");

            migrationBuilder.DropTable(
                name: "maquinas");

            migrationBuilder.DropTable(
                name: "silos");

            migrationBuilder.DropTable(
                name: "operarios");

            migrationBuilder.DropTable(
                name: "prensas");

            migrationBuilder.DropTable(
                name: "productos");

            migrationBuilder.DropTable(
                name: "troqueles");

            migrationBuilder.DropTable(
                name: "turnos");

            migrationBuilder.DropTable(
                name: "articulos");

            migrationBuilder.DropTable(
                name: "producto_categorias");

            migrationBuilder.DropTable(
                name: "categorias");
        }
    }
}
