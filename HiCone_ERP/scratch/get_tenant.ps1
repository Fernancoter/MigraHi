$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT id, name FROM tenants"
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Output ("Tenant: " + $reader["id"] + " - " + $reader["name"])
}
$reader.Close()

$conn.Close()
