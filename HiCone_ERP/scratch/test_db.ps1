$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $conn.Open()
    Write-Output "SUCCESS: Connected to HiCone_ERP_V3"
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output $reader["TABLE_NAME"]
    }
    $conn.Close()
} catch {
    Write-Output "ERROR: $_"
}
