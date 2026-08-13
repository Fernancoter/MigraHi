$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$missingCols = @(
    @{ Table="extrusiones"; Column="kg_molido"; Type="decimal(18,2) NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="kg_virgen"; Type="decimal(18,2) NOT NULL DEFAULT 0" },
    @{ Table="extrusiones"; Column="maquina_id"; Type="uniqueidentifier NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'" },
    @{ Table="extrusiones"; Column="status"; Type="int NOT NULL DEFAULT 1" },
    @{ Table="extrusiones"; Column="target"; Type="decimal(18,2) NOT NULL DEFAULT 0" }
)

foreach ($c in $missingCols) {
    $tbl = $c.Table
    $col = $c.Column
    $type = $c.Type
    
    $cmd = $conn.CreateCommand()
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

# Also update extrusiones maquina_id to match extrusora_id for existing rows
$cmd = $conn.CreateCommand()
$cmd.CommandText = "UPDATE extrusiones SET maquina_id = extrusora_id WHERE maquina_id = '00000000-0000-0000-0000-000000000000'"
$cmd.ExecuteNonQuery() | Out-Null

$conn.Close()
Write-Output "Database schema sync completed successfully!"
