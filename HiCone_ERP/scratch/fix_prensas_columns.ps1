$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cols = @(
    @{ Table="prensas"; Column="marca"; Type="nvarchar(100) NULL" }
)

foreach ($c in $cols) {
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

$conn.Close()
Write-Output "Schema fix applied successfully!"
