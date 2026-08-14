$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $conn.Open()
    
    Write-Output "=== EXTRUSIONES EN BASE DE DATOS ==="
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT id, extrusora_id, turno_id, producto_id, estado, programado, fecha FROM Extrusiones WHERE is_deleted = 0"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output "ID: $($reader['id']) | ExtrusoraId: $($reader['extrusora_id']) | TurnoId: $($reader['turno_id']) | Estado: $($reader['estado']) | Fecha: $($reader['fecha'])"
    }
    $reader.Close()

    Write-Output "`n=== PRENSADOS EN BASE DE DATOS ==="
    $cmd.CommandText = "SELECT id, prensa_id, turno_id, producto_id, estado, programado, fecha FROM Prensados WHERE is_deleted = 0"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output "ID: $($reader['id']) | PrensaId: $($reader['prensa_id']) | TurnoId: $($reader['turno_id']) | Estado: $($reader['estado']) | Fecha: $($reader['fecha'])"
    }
    $reader.Close()

    $conn.Close()
} catch {
    Write-Output "ERROR: $_"
}
