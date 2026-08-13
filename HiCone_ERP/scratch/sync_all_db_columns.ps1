$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cols = @(
    @{ Table="extrusora_mezcladoras"; Column="virgen_min"; Type="decimal(18,2) NOT NULL DEFAULT 50" },
    @{ Table="extrusora_mezcladoras"; Column="virgen_max"; Type="decimal(18,2) NOT NULL DEFAULT 100" },
    @{ Table="extrusora_mezcladoras"; Column="molido_min"; Type="decimal(18,2) NOT NULL DEFAULT 0" },
    @{ Table="extrusora_mezcladoras"; Column="molido_max"; Type="decimal(18,2) NOT NULL DEFAULT 50" },
    @{ Table="extrusora_mezcladoras"; Column="kg_virgen"; Type="decimal(18,2) NOT NULL DEFAULT 80" },
    @{ Table="extrusora_mezcladoras"; Column="kg_molido"; Type="decimal(18,2) NOT NULL DEFAULT 20" },

    @{ Table="extrusiones"; Column="kg_molido"; Type="decimal(18,2) NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="kg_virgen"; Type="decimal(18,2) NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="maquina_id"; Type="uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'" },
    @{ Table="extrusiones"; Column="status"; Type="int NOT NULL DEFAULT 1" },
    @{ Table="extrusiones"; Column="target"; Type="decimal(18,2) NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="interrupcion_en_curso"; Type="bit NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="bobinas_totales_reposo"; Type="int NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="total_bobinas_meta"; Type="int NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="tiempo_interrupcion_min"; Type="decimal(18,2) NOT NULL DEFAULT 0" }
)

foreach ($c in $cols) {
    $tbl = $c.Table
    $col = $c.Column
    $type = $c.Type
    
    # Check if table exists
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='$tbl'"
    $tExists = [int]$cmd.ExecuteScalar()
    if ($tExists -eq 0) {
        Write-Output "Table $tbl does not exist, creating..."
        if ($tbl -eq "extrusora_mezcladoras") {
            $cmd.CommandText = "CREATE TABLE extrusora_mezcladoras (id uniqueidentifier PRIMARY KEY DEFAULT NEWID(), tenant_id uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001', extrusora_id uniqueidentifier NOT NULL, nombre nvarchar(100) NOT NULL, codigo nvarchar(50) NULL, is_active bit NOT NULL DEFAULT 1, observaciones nvarchar(max) NULL, is_deleted bit NOT NULL DEFAULT 0, created_at datetime2 NOT NULL DEFAULT GETUTCDATE(), updated_at datetime2 NULL, deleted_at datetime2 NULL, created_by nvarchar(100) NULL, updated_by nvarchar(100) NULL, virgen_min decimal(18,2) NOT NULL DEFAULT 50, virgen_max decimal(18,2) NOT NULL DEFAULT 100, molido_min decimal(18,2) NOT NULL DEFAULT 0, molido_max decimal(18,2) NOT NULL DEFAULT 50, kg_virgen decimal(18,2) NOT NULL DEFAULT 80, kg_molido decimal(18,2) NOT NULL DEFAULT 20)"
            $cmd.ExecuteNonQuery() | Out-Null
            Write-Output "Created table extrusora_mezcladoras successfully."
        }
    } else {
        $cmd.CommandText = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='$tbl' AND COLUMN_NAME='$col'"
        $cnt = [int]$cmd.ExecuteScalar()
        if ($cnt -eq 0) {
            Write-Output "Adding column $col to $tbl..."
            $cmd.CommandText = "ALTER TABLE [$tbl] ADD [$col] $type"
            $cmd.ExecuteNonQuery() | Out-Null
            Write-Output "Added $col to $tbl successfully."
        } else {
            Write-Output "Column $col already exists in $tbl."
        }
    }
}

$conn.Close()
Write-Output "All DB columns synced successfully!"
