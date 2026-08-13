$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $conn.Open()
    Write-Output "--- Prensados Columns ---"
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT c.name AS ColumnName, t.name AS DataType, c.is_nullable FROM sys.columns c JOIN sys.types t ON c.user_type_id = t.user_type_id WHERE object_id = OBJECT_ID('Prensados')"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output "$($reader['ColumnName']) | $($reader['DataType']) | Nullable: $($reader['is_nullable'])"
    }
    $reader.Close()

    Write-Output "`n--- Prensas Count ---"
    $cmd.CommandText = "SELECT COUNT(*) FROM Prensas"
    Write-Output "Prensas: $($cmd.ExecuteScalar())"

    Write-Output "`n--- Operarios Count ---"
    $cmd.CommandText = "SELECT COUNT(*) FROM Operarios"
    Write-Output "Operarios: $($cmd.ExecuteScalar())"

    Write-Output "`n--- Turnos Count ---"
    $cmd.CommandText = "SELECT COUNT(*) FROM Turnos"
    Write-Output "Turnos: $($cmd.ExecuteScalar())"

    Write-Output "`n--- Productos Count ---"
    $cmd.CommandText = "SELECT COUNT(*) FROM Productos"
    Write-Output "Productos: $($cmd.ExecuteScalar())"

    Write-Output "`n--- Troqueles Count ---"
    $cmd.CommandText = "SELECT COUNT(*) FROM Troqueles"
    Write-Output "Troqueles: $($cmd.ExecuteScalar())"

    $conn.Close()
} catch {
    Write-Output "ERROR: $_"
}
