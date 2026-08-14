$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
try {
    $conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $conn.Open()
    
    Write-Output "=== EXTRUSORAS ==="
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT id, nombre, codigo FROM Extrusoras WHERE is_deleted = 0"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output "Extrusora ID: $($reader['id']) | Nombre: $($reader['nombre'])"
    }
    $reader.Close()

    Write-Output "`n=== ALL EXTRUSIONES IN DB ==="
    $cmd.CommandText = "SELECT e.id, e.extrusora_id, ex.nombre AS ExtrusoraNombre, e.turno_id, t.nombre AS TurnoNombre, e.producto_id, p.nombre AS ProductoNombre, e.estado, e.fecha, e.programado, e.meta_kg FROM Extrusiones e LEFT JOIN Extrusoras ex ON e.extrusora_id = ex.id LEFT JOIN Turnos t ON e.turno_id = t.id LEFT JOIN Productos p ON e.producto_id = p.id WHERE e.is_deleted = 0"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output "ID: $($reader['id']) | Machine: $($reader['ExtrusoraNombre']) ($($reader['extrusora_id'])) | Turno: $($reader['TurnoNombre']) ($($reader['turno_id'])) | Prod: $($reader['ProductoNombre']) ($($reader['producto_id'])) | Estado: $($reader['estado']) | Fecha: $($reader['fecha']) | Plan: $($reader['programado']) | Meta: $($reader['meta_kg'])"
    }
    $reader.Close()

    $conn.Close()
} catch {
    Write-Output "ERROR: $_"
}
