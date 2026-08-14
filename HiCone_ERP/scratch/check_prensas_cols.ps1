$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='prensas'"
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Output $reader["COLUMN_NAME"]
}
$reader.Close()
$conn.Close()
