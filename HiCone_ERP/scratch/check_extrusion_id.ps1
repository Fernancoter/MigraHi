$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT id, codigo, estado, is_deleted FROM extrusiones WHERE id = '00287082-3b22-479b-80dd-8ca03db4cf94'"
$reader = $cmd.ExecuteReader()

if ($reader.Read()) {
    Write-Output "Found: ID=$($reader['id']) | Codigo=$($reader['codigo']) | Estado=$($reader['estado']) | IsDeleted=$($reader['is_deleted'])"
} else {
    Write-Output "NOT FOUND in database extrusiones table!"
}
$reader.Close()

Write-Output "`n--- Recent Extrusiones in DB ---"
$cmd.CommandText = "SELECT TOP 10 id, codigo, estado, is_deleted FROM extrusiones ORDER BY created_at DESC"
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Output "ID=$($reader['id']) | Codigo=$($reader['codigo']) | Estado=$($reader['estado']) | IsDeleted=$($reader['is_deleted'])"
}
$reader.Close()
$conn.Close()
