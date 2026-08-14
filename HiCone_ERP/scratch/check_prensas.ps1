$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='prensas'"
$r = $cmd.ExecuteReader()
while ($r.Read()) {
    Write-Output "Column: $($r['COLUMN_NAME']) | Type: $($r['DATA_TYPE'])"
}
$r.Close()
$conn.Close()
