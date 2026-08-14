$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $conn.Open()
    
    Write-Output "=== OPERARIOS EN BASE DE DATOS ==="
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT id, numero_empleado, nombre_completo, is_active, is_deleted FROM Operarios"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output "ID: $($reader['id']) | Empleado: $($reader['numero_empleado']) | Nombre: $($reader['nombre_completo']) | Active: $($reader['is_active']) | Deleted: $($reader['is_deleted'])"
    }
    $reader.Close()

    $conn.Close()
} catch {
    Write-Output "ERROR: $_"
}
