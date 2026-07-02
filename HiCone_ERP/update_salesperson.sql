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

