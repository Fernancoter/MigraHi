$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE '%sap%' OR COLUMN_NAME LIKE '%carrete%' OR COLUMN_NAME LIKE '%palet%' OR COLUMN_NAME LIKE '%clave%'"
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Output ($reader["TABLE_NAME"] + "." + $reader["COLUMN_NAME"])
}
$reader.Close()
$conn.Close()
