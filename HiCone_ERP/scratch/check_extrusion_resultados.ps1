$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='extrusion_resultados'"
$tExists = [int]$cmd.ExecuteScalar()
Write-Output "Table extrusion_resultados exists: $tExists"

if ($tExists -gt 0) {
    $cmd.CommandText = "SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='extrusion_resultados'"
    $r = $cmd.ExecuteReader()
    while ($r.Read()) {
        Write-Output "Column: $($r['COLUMN_NAME']) | Type: $($r['DATA_TYPE']) | Nullable: $($r['IS_NULLABLE'])"
    }
    $r.Close()
}
$conn.Close()
