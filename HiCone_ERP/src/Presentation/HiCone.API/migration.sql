IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [migration_id] nvarchar(150) NOT NULL,
        [product_version] nvarchar(32) NOT NULL,
        CONSTRAINT [pk___ef_migrations_history] PRIMARY KEY ([migration_id])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [carreras] (
    [id] uniqueidentifier NOT NULL,
    [numero_carrera] int NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_carreras] PRIMARY KEY ([id])
);
GO

CREATE TABLE [carrete_defectos] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_carrete_defectos] PRIMARY KEY ([id])
);
GO

CREATE TABLE [carretes] (
    [id] uniqueidentifier NOT NULL,
    [codigo] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_carretes] PRIMARY KEY ([id])
);
GO

CREATE TABLE [categorias] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [descripcion] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_categorias] PRIMARY KEY ([id])
);
GO

CREATE TABLE [causas_interrupcion] (
    [id] uniqueidentifier NOT NULL,
    [descripcion] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_causas_interrupcion] PRIMARY KEY ([id])
);
GO

CREATE TABLE [clientes] (
    [id] uniqueidentifier NOT NULL,
    [codigo] nvarchar(max) NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [direccion] nvarchar(max) NULL,
    [telefono] nvarchar(max) NULL,
    [email] nvarchar(max) NULL,
    [rfc] nvarchar(max) NULL,
    [is_active] bit NOT NULL,
    [limite_credito] decimal(18,2) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_clientes] PRIMARY KEY ([id])
);
GO

CREATE TABLE [configuraciones_sistema] (
    [id] uniqueidentifier NOT NULL,
    [key] nvarchar(max) NOT NULL,
    [valor] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_configuraciones_sistema] PRIMARY KEY ([id])
);
GO

CREATE TABLE [embarque_detalles] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_embarque_detalles] PRIMARY KEY ([id])
);
GO

CREATE TABLE [embarque_pallets] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_embarque_pallets] PRIMARY KEY ([id])
);
GO

CREATE TABLE [embarques] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_embarques] PRIMARY KEY ([id])
);
GO

CREATE TABLE [existencias] (
    [id] uniqueidentifier NOT NULL,
    [fecha_hora] datetime2 NOT NULL,
    [usuario] nvarchar(max) NOT NULL,
    [estado] nvarchar(max) NOT NULL,
    [observaciones] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_existencias] PRIMARY KEY ([id])
);
GO

CREATE TABLE [extrusion_interrupciones] (
    [id] uniqueidentifier NOT NULL,
    [extrusion_id] uniqueidentifier NOT NULL,
    [duracion_min] int NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusion_interrupciones] PRIMARY KEY ([id])
);
GO

CREATE TABLE [extrusion_resultados] (
    [id] uniqueidentifier NOT NULL,
    [extrusion_id] uniqueidentifier NOT NULL,
    [bobinas_fabricadas] int NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusion_resultados] PRIMARY KEY ([id])
);
GO

CREATE TABLE [extrusoras] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusoras] PRIMARY KEY ([id])
);
GO

CREATE TABLE [inspecciones_calidad] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_inspecciones_calidad] PRIMARY KEY ([id])
);
GO

CREATE TABLE [lotes] (
    [id] uniqueidentifier NOT NULL,
    [codigo] nvarchar(max) NOT NULL,
    [fecha_creacion] datetime2 NOT NULL,
    [descripcion] nvarchar(max) NULL,
    [estado] nvarchar(max) NOT NULL,
    [lote_embarque] nvarchar(max) NULL,
    [lote_po] nvarchar(max) NULL,
    [lote_fecha_registro] datetime2 NULL,
    [lote_trunk_no] nvarchar(max) NULL,
    [lote_tipo_material] nvarchar(max) NULL,
    [lote_silo_id] uniqueidentifier NULL,
    [lote_kg] decimal(18,2) NOT NULL,
    [lote_consumido] bit NOT NULL,
    [lote_paquete_aditivos] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_lotes] PRIMARY KEY ([id])
);
GO

CREATE TABLE [maquinas] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_maquinas] PRIMARY KEY ([id])
);
GO

CREATE TABLE [operarios] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [activo] bit NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_operarios] PRIMARY KEY ([id])
);
GO

CREATE TABLE [ordenes_etiquetado] (
    [id] uniqueidentifier NOT NULL,
    [fecha_orden] datetime2 NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_ordenes_etiquetado] PRIMARY KEY ([id])
);
GO

CREATE TABLE [palet_carretes] (
    [id] uniqueidentifier NOT NULL,
    [palet_id] uniqueidentifier NOT NULL,
    [carrete_id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_palet_carretes] PRIMARY KEY ([id])
);
GO

CREATE TABLE [permissions] (
    [id] uniqueidentifier NOT NULL,
    [module] nvarchar(max) NOT NULL,
    [name] nvarchar(max) NOT NULL,
    [code] nvarchar(max) NOT NULL,
    [description] nvarchar(max) NULL,
    CONSTRAINT [pk_permissions] PRIMARY KEY ([id])
);
GO

CREATE TABLE [prensa_troqueles] (
    [id] uniqueidentifier NOT NULL,
    [prensa_id] uniqueidentifier NOT NULL,
    [troquel_id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_prensa_troqueles] PRIMARY KEY ([id])
);
GO

CREATE TABLE [prensado_bobinas] (
    [id] uniqueidentifier NOT NULL,
    [prensado_id] uniqueidentifier NOT NULL,
    [bobina_id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_prensado_bobinas] PRIMARY KEY ([id])
);
GO

CREATE TABLE [prensado_interrupciones] (
    [id] uniqueidentifier NOT NULL,
    [prensado_id] uniqueidentifier NOT NULL,
    [duracion_min] int NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_prensado_interrupciones] PRIMARY KEY ([id])
);
GO

CREATE TABLE [prensado_resultados] (
    [id] uniqueidentifier NOT NULL,
    [prensado_id] uniqueidentifier NOT NULL,
    [carretes_fabricados] int NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_prensado_resultados] PRIMARY KEY ([id])
);
GO

CREATE TABLE [prensas] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [marca] nvarchar(max) NULL,
    [modelo] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_prensas] PRIMARY KEY ([id])
);
GO

CREATE TABLE [producto_categorias] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_producto_categorias] PRIMARY KEY ([id])
);
GO

CREATE TABLE [productos_terminados] (
    [id] uniqueidentifier NOT NULL,
    [terminado_palets] int NOT NULL,
    [carrete_miliar] int NOT NULL,
    [palet_miliar] int NOT NULL,
    [terminado_peso] decimal(18,2) NOT NULL,
    [peso_carrete] decimal(18,2) NOT NULL,
    [peso_palet] decimal(18,2) NOT NULL,
    [con_etiqueta] bit NOT NULL,
    [etiquetable] bit NOT NULL,
    [producto] nvarchar(max) NULL,
    [codigo_sap] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_productos_terminados] PRIMARY KEY ([id])
);
GO

CREATE TABLE [reclamo_detalles] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_reclamo_detalles] PRIMARY KEY ([id])
);
GO

CREATE TABLE [reclamos] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_reclamos] PRIMARY KEY ([id])
);
GO

CREATE TABLE [roles] (
    [id] uniqueidentifier NOT NULL,
    [name] nvarchar(max) NOT NULL,
    [description] nvarchar(max) NULL,
    [is_system] bit NOT NULL,
    [tenant_id] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    CONSTRAINT [pk_roles] PRIMARY KEY ([id])
);
GO

CREATE TABLE [sae_customers] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_sae_customers] PRIMARY KEY ([id])
);
GO

CREATE TABLE [sae_orders] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_sae_orders] PRIMARY KEY ([id])
);
GO

CREATE TABLE [sae_products] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_sae_products] PRIMARY KEY ([id])
);
GO

CREATE TABLE [sae_remissions] (
    [id] uniqueidentifier NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_sae_remissions] PRIMARY KEY ([id])
);
GO

CREATE TABLE [security_applications] (
    [id] uniqueidentifier NOT NULL,
    [name] nvarchar(max) NOT NULL,
    [description] nvarchar(max) NULL,
    CONSTRAINT [pk_security_applications] PRIMARY KEY ([id])
);
GO

CREATE TABLE [silos_produccion] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [capacidad_kg] decimal(18,2) NOT NULL,
    [minimo_kg] decimal(18,2) NOT NULL,
    [maximo_kg] decimal(18,2) NOT NULL,
    [estado_material] nvarchar(max) NULL,
    [tipo_material] nvarchar(max) NULL,
    [silo_activo] bit NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_silos_produccion] PRIMARY KEY ([id])
);
GO

CREATE TABLE [tenants] (
    [id] uniqueidentifier NOT NULL,
    [name] nvarchar(max) NOT NULL,
    [slug] nvarchar(max) NOT NULL,
    [description] nvarchar(max) NULL,
    [is_active] bit NOT NULL,
    [logo_url] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    CONSTRAINT [pk_tenants] PRIMARY KEY ([id])
);
GO

CREATE TABLE [troqueles] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_troqueles] PRIMARY KEY ([id])
);
GO

CREATE TABLE [turnos] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [hora_inicio] time NOT NULL,
    [hora_fin] time NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_turnos] PRIMARY KEY ([id])
);
GO

CREATE TABLE [users] (
    [id] uniqueidentifier NOT NULL,
    [username] nvarchar(max) NOT NULL,
    [email] nvarchar(max) NOT NULL,
    [password_hash] nvarchar(max) NOT NULL,
    [first_name] nvarchar(max) NOT NULL,
    [last_name] nvarchar(max) NOT NULL,
    [phone_number] nvarchar(max) NULL,
    [avatar_url] nvarchar(max) NULL,
    [is_active] bit NOT NULL,
    [email_confirmed] bit NOT NULL,
    [last_login_at] datetime2 NULL,
    [gender] nvarchar(max) NULL,
    [authentication_type] nvarchar(max) NULL,
    [operador_id] uniqueidentifier NULL,
    [company_id] int NULL,
    [namespace] nvarchar(max) NULL,
    [external_id] nvarchar(max) NULL,
    [birthday] datetime2 NULL,
    [activation_date] datetime2 NULL,
    [receives_information] bit NOT NULL,
    [cannot_change_password] bit NOT NULL,
    [password_never_expires] bit NOT NULL,
    [security_policy_id] nvarchar(max) NULL,
    [is_repository_enabled] bit NOT NULL,
    [must_change_password] bit NOT NULL,
    [password_expires_at] datetime2 NULL,
    [access_failed_count] int NOT NULL,
    [is_locked_out] bit NOT NULL,
    [lockout_end] datetime2 NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_users] PRIMARY KEY ([id])
);
GO

CREATE TABLE [articulos] (
    [id] uniqueidentifier NOT NULL,
    [codigo] nvarchar(max) NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [descripcion] nvarchar(max) NULL,
    [precio] decimal(18,2) NOT NULL,
    [existencia] decimal(18,2) NOT NULL,
    [categoria_id] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_articulos] PRIMARY KEY ([id]),
    CONSTRAINT [fk_articulos_categorias_categoria_id] FOREIGN KEY ([categoria_id]) REFERENCES [categorias] ([id])
);
GO

CREATE TABLE [ventas] (
    [id] uniqueidentifier NOT NULL,
    [folio] nvarchar(max) NOT NULL,
    [fecha] datetime2 NOT NULL,
    [cliente_id] uniqueidentifier NOT NULL,
    [subtotal] decimal(18,2) NOT NULL,
    [impuesto] decimal(18,2) NOT NULL,
    [total] decimal(18,2) NOT NULL,
    [observaciones] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_ventas] PRIMARY KEY ([id]),
    CONSTRAINT [fk_ventas_clientes_cliente_id] FOREIGN KEY ([cliente_id]) REFERENCES [clientes] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [extrusora_mezcladoras] (
    [id] uniqueidentifier NOT NULL,
    [extrusora_id] uniqueidentifier NOT NULL,
    [virgen_min] decimal(18,2) NOT NULL,
    [virgen_max] decimal(18,2) NOT NULL,
    [moldo_min] decimal(18,2) NOT NULL,
    [moldo_max] decimal(18,2) NOT NULL,
    [kg_virgen] decimal(18,2) NOT NULL,
    [kg_moldo] decimal(18,2) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusora_mezcladoras] PRIMARY KEY ([id]),
    CONSTRAINT [fk_extrusora_mezcladoras_extrusoras_extrusora_id] FOREIGN KEY ([extrusora_id]) REFERENCES [extrusoras] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [extrusora_productos] (
    [id] uniqueidentifier NOT NULL,
    [extrusora_id] uniqueidentifier NOT NULL,
    [producto_nombre] nvarchar(max) NOT NULL,
    [producto_calibre] decimal(18,2) NOT NULL,
    [producto_ancho] nvarchar(max) NOT NULL,
    [producto_longitud] int NOT NULL,
    [reposo_min] int NOT NULL,
    [proceso_min] int NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusora_productos] PRIMARY KEY ([id]),
    CONSTRAINT [fk_extrusora_productos_extrusoras_extrusora_id] FOREIGN KEY ([extrusora_id]) REFERENCES [extrusoras] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [palets] (
    [id] uniqueidentifier NOT NULL,
    [codigo] nvarchar(max) NOT NULL,
    [tipo] nvarchar(max) NOT NULL,
    [hora_inicio_ensamble] datetime2 NULL,
    [hora_fin_ensamble] datetime2 NULL,
    [estado] nvarchar(max) NOT NULL,
    [lote_id] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_palets] PRIMARY KEY ([id]),
    CONSTRAINT [fk_palets_lotes_lote_id] FOREIGN KEY ([lote_id]) REFERENCES [lotes] ([id])
);
GO

CREATE TABLE [prensa_productos] (
    [id] uniqueidentifier NOT NULL,
    [prensa_id] uniqueidentifier NOT NULL,
    [item] nvarchar(max) NOT NULL,
    [carrete] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_prensa_productos] PRIMARY KEY ([id]),
    CONSTRAINT [fk_prensa_productos_prensas_prensa_id] FOREIGN KEY ([prensa_id]) REFERENCES [prensas] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [productos] (
    [id] uniqueidentifier NOT NULL,
    [categoria_id] uniqueidentifier NULL,
    [producto_base] nvarchar(max) NULL,
    [clave] nvarchar(max) NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [descripcion] nvarchar(max) NULL,
    [precio_unitario] decimal(18,2) NOT NULL,
    [tipo_material] nvarchar(max) NULL,
    [is_active] bit NOT NULL,
    [producto_sae] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_productos] PRIMARY KEY ([id]),
    CONSTRAINT [fk_productos_producto_categorias_categoria_id] FOREIGN KEY ([categoria_id]) REFERENCES [producto_categorias] ([id])
);
GO

CREATE TABLE [role_permissions] (
    [id] uniqueidentifier NOT NULL,
    [role_id] uniqueidentifier NOT NULL,
    [permission_id] uniqueidentifier NOT NULL,
    [access_type] int NOT NULL,
    CONSTRAINT [pk_role_permissions] PRIMARY KEY ([id]),
    CONSTRAINT [fk_role_permissions_permissions_permission_id] FOREIGN KEY ([permission_id]) REFERENCES [permissions] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_role_permissions_roles_role_id] FOREIGN KEY ([role_id]) REFERENCES [roles] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [security_application_permissions] (
    [id] uniqueidentifier NOT NULL,
    [security_application_id] uniqueidentifier NOT NULL,
    [permission_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_security_application_permissions] PRIMARY KEY ([id]),
    CONSTRAINT [fk_security_application_permissions_permissions_permission_id] FOREIGN KEY ([permission_id]) REFERENCES [permissions] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_security_application_permissions_security_applications_security_application_id] FOREIGN KEY ([security_application_id]) REFERENCES [security_applications] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [tenant_settings] (
    [id] uniqueidentifier NOT NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    [key] nvarchar(max) NOT NULL,
    [value] nvarchar(max) NOT NULL,
    [data_type] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    CONSTRAINT [pk_tenant_settings] PRIMARY KEY ([id]),
    CONSTRAINT [fk_tenant_settings_tenants_tenant_id] FOREIGN KEY ([tenant_id]) REFERENCES [tenants] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [extrusiones] (
    [id] uniqueidentifier NOT NULL,
    [fecha] datetime2 NOT NULL,
    [extrusora_id] uniqueidentifier NOT NULL,
    [turno_id] uniqueidentifier NULL,
    [producto] nvarchar(max) NULL,
    [operario_id] uniqueidentifier NULL,
    [producido] int NOT NULL,
    [tiempo_interrupcion_min] int NOT NULL,
    [en_curso] bit NOT NULL,
    [extrusion_id_legacy] bigint NOT NULL,
    [programado] decimal(18,2) NOT NULL,
    [status] int NOT NULL,
    [lote_id] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusiones] PRIMARY KEY ([id]),
    CONSTRAINT [fk_extrusiones_extrusoras_extrusora_id] FOREIGN KEY ([extrusora_id]) REFERENCES [extrusoras] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_extrusiones_lotes_lote_id] FOREIGN KEY ([lote_id]) REFERENCES [lotes] ([id]),
    CONSTRAINT [fk_extrusiones_operarios_operario_id] FOREIGN KEY ([operario_id]) REFERENCES [operarios] ([id]),
    CONSTRAINT [fk_extrusiones_turnos_turno_id] FOREIGN KEY ([turno_id]) REFERENCES [turnos] ([id])
);
GO

CREATE TABLE [prensados] (
    [id] uniqueidentifier NOT NULL,
    [fecha] datetime2 NOT NULL,
    [prensa_id] uniqueidentifier NOT NULL,
    [turno_id] uniqueidentifier NULL,
    [producto] nvarchar(max) NULL,
    [operario_id] uniqueidentifier NULL,
    [producido] int NOT NULL,
    [tiempo_interrupcion_min] int NOT NULL,
    [en_curso] bit NOT NULL,
    [programado] decimal(18,2) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_prensados] PRIMARY KEY ([id]),
    CONSTRAINT [fk_prensados_operarios_operario_id] FOREIGN KEY ([operario_id]) REFERENCES [operarios] ([id]),
    CONSTRAINT [fk_prensados_prensas_prensa_id] FOREIGN KEY ([prensa_id]) REFERENCES [prensas] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_prensados_turnos_turno_id] FOREIGN KEY ([turno_id]) REFERENCES [turnos] ([id])
);
GO

CREATE TABLE [refresh_tokens] (
    [id] uniqueidentifier NOT NULL,
    [user_id] uniqueidentifier NOT NULL,
    [token] nvarchar(max) NOT NULL,
    [expires_at] datetime2 NOT NULL,
    [created_at] datetime2 NOT NULL,
    [revoked_at] datetime2 NULL,
    [replaced_by] nvarchar(max) NULL,
    [device_info] nvarchar(max) NULL,
    CONSTRAINT [pk_refresh_tokens] PRIMARY KEY ([id]),
    CONSTRAINT [fk_refresh_tokens_users_user_id] FOREIGN KEY ([user_id]) REFERENCES [users] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [user_roles] (
    [id] uniqueidentifier NOT NULL,
    [user_id] uniqueidentifier NOT NULL,
    [role_id] uniqueidentifier NOT NULL,
    [assigned_at] datetime2 NOT NULL,
    CONSTRAINT [pk_user_roles] PRIMARY KEY ([id]),
    CONSTRAINT [fk_user_roles_roles_role_id] FOREIGN KEY ([role_id]) REFERENCES [roles] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_user_roles_users_user_id] FOREIGN KEY ([user_id]) REFERENCES [users] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [user_tenants] (
    [id] uniqueidentifier NOT NULL,
    [user_id] uniqueidentifier NOT NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    [is_default] bit NOT NULL,
    [assigned_at] datetime2 NOT NULL,
    CONSTRAINT [pk_user_tenants] PRIMARY KEY ([id]),
    CONSTRAINT [fk_user_tenants_users_user_id] FOREIGN KEY ([user_id]) REFERENCES [users] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [silos] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [codigo] nvarchar(max) NOT NULL,
    [capacidad_maxima] decimal(18,2) NOT NULL,
    [existencia_actual] decimal(18,2) NOT NULL,
    [kg_minimo] decimal(18,2) NOT NULL,
    [kg_maximo] decimal(18,2) NOT NULL,
    [estado_material] nvarchar(max) NULL,
    [tipo_material] nvarchar(max) NULL,
    [activo] bit NOT NULL,
    [articulo_id] uniqueidentifier NULL,
    [estado] nvarchar(max) NOT NULL,
    [ubicacion] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_silos] PRIMARY KEY ([id]),
    CONSTRAINT [fk_silos_articulos_articulo_id] FOREIGN KEY ([articulo_id]) REFERENCES [articulos] ([id])
);
GO

CREATE TABLE [venta_detalles] (
    [id] uniqueidentifier NOT NULL,
    [venta_id] uniqueidentifier NOT NULL,
    [articulo_id] uniqueidentifier NOT NULL,
    [cantidad] decimal(18,2) NOT NULL,
    [precio_unitario] decimal(18,2) NOT NULL,
    [importe] decimal(18,2) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_venta_detalles] PRIMARY KEY ([id]),
    CONSTRAINT [fk_venta_detalles_articulos_articulo_id] FOREIGN KEY ([articulo_id]) REFERENCES [articulos] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_venta_detalles_ventas_venta_id] FOREIGN KEY ([venta_id]) REFERENCES [ventas] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [bobinas] (
    [id] uniqueidentifier NOT NULL,
    [codigo] nvarchar(max) NOT NULL,
    [peso_neto] decimal(18,2) NOT NULL,
    [metros] decimal(18,2) NOT NULL,
    [fecha_produccion] datetime2 NOT NULL,
    [turno] nvarchar(max) NULL,
    [palet_id] uniqueidentifier NULL,
    [lote_id] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_bobinas] PRIMARY KEY ([id]),
    CONSTRAINT [fk_bobinas_lotes_lote_id] FOREIGN KEY ([lote_id]) REFERENCES [lotes] ([id]),
    CONSTRAINT [fk_bobinas_palets_palet_id] FOREIGN KEY ([palet_id]) REFERENCES [palets] ([id])
);
GO

CREATE TABLE [existencia_productos] (
    [id] uniqueidentifier NOT NULL,
    [existencia_id] uniqueidentifier NOT NULL,
    [producto_id] uniqueidentifier NOT NULL,
    [cantidad_real] decimal(18,2) NOT NULL,
    [cantidad_sistema] decimal(18,2) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_existencia_productos] PRIMARY KEY ([id]),
    CONSTRAINT [fk_existencia_productos_existencias_existencia_id] FOREIGN KEY ([existencia_id]) REFERENCES [existencias] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_existencia_productos_productos_producto_id] FOREIGN KEY ([producto_id]) REFERENCES [productos] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [existencias_silos] (
    [id] uniqueidentifier NOT NULL,
    [silo_id] uniqueidentifier NOT NULL,
    [existencia_id] uniqueidentifier NULL,
    [cantidad] decimal(18,2) NOT NULL,
    [lote_virgen] nvarchar(max) NULL,
    [fecha_registro] datetime2 NOT NULL,
    [observaciones] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_existencias_silos] PRIMARY KEY ([id]),
    CONSTRAINT [fk_existencias_silos_existencias_existencia_id] FOREIGN KEY ([existencia_id]) REFERENCES [existencias] ([id]),
    CONSTRAINT [fk_existencias_silos_silos_silo_id] FOREIGN KEY ([silo_id]) REFERENCES [silos] ([id]) ON DELETE CASCADE
);
GO

CREATE INDEX [ix_articulos_categoria_id] ON [articulos] ([categoria_id]);
GO

CREATE INDEX [ix_bobinas_lote_id] ON [bobinas] ([lote_id]);
GO

CREATE INDEX [ix_bobinas_palet_id] ON [bobinas] ([palet_id]);
GO

CREATE INDEX [ix_existencia_productos_existencia_id] ON [existencia_productos] ([existencia_id]);
GO

CREATE INDEX [ix_existencia_productos_producto_id] ON [existencia_productos] ([producto_id]);
GO

CREATE INDEX [ix_existencias_silos_existencia_id] ON [existencias_silos] ([existencia_id]);
GO

CREATE INDEX [ix_existencias_silos_silo_id] ON [existencias_silos] ([silo_id]);
GO

CREATE INDEX [ix_extrusiones_extrusora_id] ON [extrusiones] ([extrusora_id]);
GO

CREATE INDEX [ix_extrusiones_lote_id] ON [extrusiones] ([lote_id]);
GO

CREATE INDEX [ix_extrusiones_operario_id] ON [extrusiones] ([operario_id]);
GO

CREATE INDEX [ix_extrusiones_turno_id] ON [extrusiones] ([turno_id]);
GO

CREATE INDEX [ix_extrusora_mezcladoras_extrusora_id] ON [extrusora_mezcladoras] ([extrusora_id]);
GO

CREATE INDEX [ix_extrusora_productos_extrusora_id] ON [extrusora_productos] ([extrusora_id]);
GO

CREATE INDEX [ix_palets_lote_id] ON [palets] ([lote_id]);
GO

CREATE INDEX [ix_prensa_productos_prensa_id] ON [prensa_productos] ([prensa_id]);
GO

CREATE INDEX [ix_prensados_operario_id] ON [prensados] ([operario_id]);
GO

CREATE INDEX [ix_prensados_prensa_id] ON [prensados] ([prensa_id]);
GO

CREATE INDEX [ix_prensados_turno_id] ON [prensados] ([turno_id]);
GO

CREATE INDEX [ix_productos_categoria_id] ON [productos] ([categoria_id]);
GO

CREATE INDEX [ix_refresh_tokens_user_id] ON [refresh_tokens] ([user_id]);
GO

CREATE INDEX [ix_role_permissions_permission_id] ON [role_permissions] ([permission_id]);
GO

CREATE INDEX [ix_role_permissions_role_id] ON [role_permissions] ([role_id]);
GO

CREATE INDEX [ix_security_application_permissions_permission_id] ON [security_application_permissions] ([permission_id]);
GO

CREATE INDEX [ix_security_application_permissions_security_application_id] ON [security_application_permissions] ([security_application_id]);
GO

CREATE INDEX [ix_silos_articulo_id] ON [silos] ([articulo_id]);
GO

CREATE INDEX [ix_tenant_settings_tenant_id] ON [tenant_settings] ([tenant_id]);
GO

CREATE INDEX [ix_user_roles_role_id] ON [user_roles] ([role_id]);
GO

CREATE INDEX [ix_user_roles_user_id] ON [user_roles] ([user_id]);
GO

CREATE INDEX [ix_user_tenants_user_id] ON [user_tenants] ([user_id]);
GO

CREATE INDEX [ix_venta_detalles_articulo_id] ON [venta_detalles] ([articulo_id]);
GO

CREATE INDEX [ix_venta_detalles_venta_id] ON [venta_detalles] ([venta_id]);
GO

CREATE INDEX [ix_ventas_cliente_id] ON [ventas] ([cliente_id]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260513214720_InitialProductionBaseline', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [extrusiones] ADD [ancho] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [extrusiones] ADD [calibre] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [kg_molido] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [kg_virgen] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [longitud] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [extrusiones] ADD [process_end] datetime2 NULL;
GO

ALTER TABLE [extrusiones] ADD [process_start] datetime2 NULL;
GO

ALTER TABLE [extrusiones] ADD [target] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [bobinas] ADD [bobbin_no] bigint NOT NULL DEFAULT CAST(0 AS bigint);
GO

ALTER TABLE [bobinas] ADD [extrusion_id] uniqueidentifier NULL;
GO

ALTER TABLE [bobinas] ADD [kg] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [bobinas] ADD [mill] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [mill_reason] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [observations] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [product_name] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [reel] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [rest_minutes] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [bobinas] ADD [rest_start] datetime2 NULL;
GO

ALTER TABLE [bobinas] ADD [scrap_kg] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [bobinas] ADD [serial_no] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [station] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [thickness] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

CREATE INDEX [ix_bobinas_extrusion_id] ON [bobinas] ([extrusion_id]);
GO

ALTER TABLE [bobinas] ADD CONSTRAINT [fk_bobinas_extrusiones_extrusion_id] FOREIGN KEY ([extrusion_id]) REFERENCES [extrusiones] ([id]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260514205752_AddProduccionInfoBlock', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [prensados] ADD [ancho] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [prensados] ADD [calibre] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [longitud] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [prensados] ADD [status] int NOT NULL DEFAULT 0;
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260518171158_AddPrensadoProperties', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [prensados] ADD [kg_molido] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [kg_virgen] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [lote_silo] nvarchar(max) NULL;
GO

ALTER TABLE [prensados] ADD [process_end] datetime2 NULL;
GO

ALTER TABLE [prensados] ADD [process_start] datetime2 NULL;
GO

ALTER TABLE [prensados] ADD [target] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260518190827_AddPrensadoAdditionalProperties', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [audit_logs] (
    [id] uniqueidentifier NOT NULL,
    [entity_name] nvarchar(max) NOT NULL,
    [entity_id] nvarchar(max) NOT NULL,
    [action] nvarchar(max) NOT NULL,
    [username] nvarchar(max) NULL,
    [changes_json] nvarchar(max) NULL,
    [timestamp] datetime2 NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_audit_logs] PRIMARY KEY ([id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260521180455_AddAuditLogs', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[users].[password_updated_at]', N'password_expires_at', N'COLUMN';
GO

EXEC sp_rename N'[users].[is_blocked]', N'receives_information', N'COLUMN';
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[users]') AND [c].[name] = N'operador_id');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [users] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [users] ALTER COLUMN [operador_id] uniqueidentifier NULL;
GO

ALTER TABLE [users] ADD [activation_date] datetime2 NULL;
GO

ALTER TABLE [users] ADD [authentication_type] nvarchar(max) NULL;
GO

ALTER TABLE [users] ADD [cannot_change_password] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [users] ADD [external_id] nvarchar(max) NULL;
GO

ALTER TABLE [users] ADD [is_locked_out] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [users] ADD [is_repository_enabled] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [users] ADD [lockout_end] datetime2 NULL;
GO

ALTER TABLE [users] ADD [namespace] nvarchar(max) NULL;
GO

ALTER TABLE [users] ADD [password_never_expires] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [users] ADD [username] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [role_permissions] ADD [access_type] int NOT NULL DEFAULT 0;
GO

CREATE TABLE [operadores] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [codigo] nvarchar(max) NULL,
    [activo] bit NOT NULL,
    [user_guid] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_operadores] PRIMARY KEY ([id])
);
GO

CREATE TABLE [security_applications] (
    [id] uniqueidentifier NOT NULL,
    [name] nvarchar(max) NOT NULL,
    [description] nvarchar(max) NULL,
    CONSTRAINT [pk_security_applications] PRIMARY KEY ([id])
);
GO

CREATE TABLE [security_application_permissions] (
    [id] uniqueidentifier NOT NULL,
    [security_application_id] uniqueidentifier NOT NULL,
    [permission_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_security_application_permissions] PRIMARY KEY ([id]),
    CONSTRAINT [fk_security_application_permissions_permissions_permission_id] FOREIGN KEY ([permission_id]) REFERENCES [permissions] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_security_application_permissions_security_applications_security_application_id] FOREIGN KEY ([security_application_id]) REFERENCES [security_applications] ([id]) ON DELETE CASCADE
);
GO

CREATE UNIQUE INDEX [ix_users_operador_id] ON [users] ([operador_id]) WHERE [operador_id] IS NOT NULL;
GO

CREATE INDEX [ix_security_application_permissions_permission_id] ON [security_application_permissions] ([permission_id]);
GO

CREATE INDEX [ix_security_application_permissions_security_application_id] ON [security_application_permissions] ([security_application_id]);
GO

ALTER TABLE [users] ADD CONSTRAINT [fk_users_operadores_operador_id] FOREIGN KEY ([operador_id]) REFERENCES [operadores] ([id]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260524044605_AddSecurityModule', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [extrusoras] ADD [imagen] nvarchar(max) NULL;
GO

ALTER TABLE [extrusoras] ADD [numero_extrusora] nvarchar(max) NOT NULL DEFAULT N'';
GO

CREATE TABLE [extrusora_operarios] (
    [id] uniqueidentifier NOT NULL,
    [extrusora_id] uniqueidentifier NOT NULL,
    [turno_id] uniqueidentifier NOT NULL,
    [operario_id] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusora_operarios] PRIMARY KEY ([id]),
    CONSTRAINT [fk_extrusora_operarios_extrusoras_extrusora_id] FOREIGN KEY ([extrusora_id]) REFERENCES [extrusoras] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_extrusora_operarios_operarios_operario_id] FOREIGN KEY ([operario_id]) REFERENCES [operarios] ([id]),
    CONSTRAINT [fk_extrusora_operarios_turnos_turno_id] FOREIGN KEY ([turno_id]) REFERENCES [turnos] ([id]) ON DELETE CASCADE
);
GO

CREATE INDEX [ix_extrusora_operarios_extrusora_id] ON [extrusora_operarios] ([extrusora_id]);
GO

CREATE INDEX [ix_extrusora_operarios_operario_id] ON [extrusora_operarios] ([operario_id]);
GO

CREATE INDEX [ix_extrusora_operarios_turno_id] ON [extrusora_operarios] ([turno_id]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260602215714_AddExtrusoraOperarioAndFields', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [turnos] ADD [clave] nvarchar(max) NULL;
GO

CREATE TABLE [catalogo_claves] (
    [id] uniqueidentifier NOT NULL,
    [valor] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_catalogo_claves] PRIMARY KEY ([id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260602232945_AddClaveToTurnoAndCatalogoClave', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [prensas] ADD [imagen] nvarchar(max) NULL;
GO

ALTER TABLE [prensas] ADD [numero_prensa] nvarchar(max) NULL;
GO

ALTER TABLE [catalogo_claves] ADD [orden] int NOT NULL DEFAULT 0;
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260603002018_PrensasAndClavesOrden', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [silos_produccion] ADD [is_archived] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

CREATE TABLE [cat_estados_material] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_cat_estados_material] PRIMARY KEY ([id])
);
GO

CREATE TABLE [cat_tipos_material] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_cat_tipos_material] PRIMARY KEY ([id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260603011641_UpdateSilosAndMaterialCatalogs', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [turnos] ADD [clave] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [turnos] ADD [color] nvarchar(max) NULL;
GO

ALTER TABLE [productos] ADD [clave] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [productos] ADD [precio_unitario] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [productos] ADD [producto_base] nvarchar(max) NULL;
GO

ALTER TABLE [productos] ADD [producto_sae] nvarchar(max) NULL;
GO

ALTER TABLE [prensas] ADD [imagen] nvarchar(max) NULL;
GO

ALTER TABLE [prensas] ADD [marca] nvarchar(max) NULL;
GO

ALTER TABLE [prensas] ADD [numero_prensa] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [prensados] ADD [ancho] nvarchar(max) NULL;
GO

ALTER TABLE [prensados] ADD [calibre] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [en_curso] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [prensados] ADD [kg_molido] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [kg_virgen] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [longitud] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [lote_silo] nvarchar(max) NULL;
GO

ALTER TABLE [prensados] ADD [prensado_id_legacy] bigint NOT NULL DEFAULT CAST(0 AS bigint);
GO

ALTER TABLE [prensados] ADD [process_end] datetime2 NULL;
GO

ALTER TABLE [prensados] ADD [process_start] datetime2 NULL;
GO

ALTER TABLE [prensados] ADD [producido] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [producto_nombre] nvarchar(max) NULL;
GO

ALTER TABLE [prensados] ADD [programado] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [status] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [prensados] ADD [target] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [prensados] ADD [tiempo_interrupcion_min] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [operarios] ADD [activo] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [operarios] ADD [nombre] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [extrusoras] ADD [imagen] nvarchar(max) NULL;
GO

ALTER TABLE [extrusoras] ADD [numero_extrusora] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [extrusiones] ADD [en_curso] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

ALTER TABLE [extrusiones] ADD [extrusion_id_legacy] bigint NOT NULL DEFAULT CAST(0 AS bigint);
GO

ALTER TABLE [extrusiones] ADD [kg_molido] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [kg_virgen] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [process_end] datetime2 NULL;
GO

ALTER TABLE [extrusiones] ADD [process_start] datetime2 NULL;
GO

ALTER TABLE [extrusiones] ADD [producido] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [producto_nombre] nvarchar(max) NULL;
GO

ALTER TABLE [extrusiones] ADD [programado] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [status] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [extrusiones] ADD [target] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [extrusiones] ADD [tiempo_interrupcion_min] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [existencia_productos] ADD [en_turno_segun_sistema] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [existencia_productos] ADD [producido_en_turno] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [bobinas] ADD [bobbin_no] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [bobinas] ADD [codigo] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [mill] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [mill_reason] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [observations] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [product_name] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [reel] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [rest_minutes] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [bobinas] ADD [rest_start] datetime2 NULL;
GO

ALTER TABLE [bobinas] ADD [scrap_kg] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [bobinas] ADD [serial_no] nvarchar(max) NOT NULL DEFAULT N'';
GO

ALTER TABLE [bobinas] ADD [station] nvarchar(max) NULL;
GO

ALTER TABLE [bobinas] ADD [thickness] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

CREATE TABLE [cat_estados_material] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_cat_estados_material] PRIMARY KEY ([id])
);
GO

CREATE TABLE [cat_tipos_material] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_cat_tipos_material] PRIMARY KEY ([id])
);
GO

CREATE TABLE [catalogo_claves] (
    [id] uniqueidentifier NOT NULL,
    [valor] nvarchar(max) NOT NULL,
    [orden] int NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_catalogo_claves] PRIMARY KEY ([id])
);
GO

CREATE TABLE [extrusora_operarios] (
    [id] uniqueidentifier NOT NULL,
    [extrusora_id] uniqueidentifier NOT NULL,
    [operario_id] uniqueidentifier NOT NULL,
    [turno_id] uniqueidentifier NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_extrusora_operarios] PRIMARY KEY ([id]),
    CONSTRAINT [fk_extrusora_operarios_extrusoras_extrusora_id] FOREIGN KEY ([extrusora_id]) REFERENCES [extrusoras] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_extrusora_operarios_operarios_operario_id] FOREIGN KEY ([operario_id]) REFERENCES [operarios] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_extrusora_operarios_turnos_turno_id] FOREIGN KEY ([turno_id]) REFERENCES [turnos] ([id])
);
GO

CREATE TABLE [silos_produccion] (
    [id] uniqueidentifier NOT NULL,
    [nombre] nvarchar(max) NOT NULL,
    [capacidad_kg] decimal(18,2) NOT NULL,
    [minimo_kg] decimal(18,2) NOT NULL,
    [maximo_kg] decimal(18,2) NOT NULL,
    [estado_material] nvarchar(max) NULL,
    [tipo_material] nvarchar(max) NULL,
    [silo_activo] bit NOT NULL,
    [is_archived] bit NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_silos_produccion] PRIMARY KEY ([id])
);
GO

CREATE INDEX [ix_extrusora_operarios_extrusora_id] ON [extrusora_operarios] ([extrusora_id]);
GO

CREATE INDEX [ix_extrusora_operarios_operario_id] ON [extrusora_operarios] ([operario_id]);
GO

CREATE INDEX [ix_extrusora_operarios_turno_id] ON [extrusora_operarios] ([turno_id]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260607081132_AddProducidoEnTurnoToExistencia', N'8.0.11');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [sae_budgets] (
    [id] uniqueidentifier NOT NULL,
    [customer_code] nvarchar(max) NOT NULL,
    [customer_name] nvarchar(max) NULL,
    [consolidated_name] nvarchar(max) NULL,
    [product_number] nvarchar(max) NOT NULL,
    [budget_year] int NOT NULL,
    [budget_month] int NOT NULL,
    [budget_estimated] decimal(18,2) NOT NULL,
    [budget_real] decimal(18,2) NOT NULL,
    [created_at] datetime2 NOT NULL,
    [created_by] nvarchar(max) NULL,
    [updated_at] datetime2 NULL,
    [updated_by] nvarchar(max) NULL,
    [is_deleted] bit NOT NULL,
    [deleted_at] datetime2 NULL,
    [tenant_id] uniqueidentifier NOT NULL,
    CONSTRAINT [pk_sae_budgets] PRIMARY KEY ([id])
);
GO

CREATE TABLE [sae_sales_persons] (
    [sales_person_name] nvarchar(100) NOT NULL,
    [sales_person_active] bit NOT NULL,
    CONSTRAINT [pk_sae_sales_persons] PRIMARY KEY ([sales_person_name])
);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20260611015701_AddSaeSalesPerson', N'8.0.11');
GO

COMMIT;
GO

