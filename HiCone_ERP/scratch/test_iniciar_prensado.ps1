$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()
$cmd = $conn.CreateCommand()

$cmd.CommandText = "SELECT TOP 1 Id FROM Prensas"
$prensaId = $cmd.ExecuteScalar()

$cmd.CommandText = "SELECT TOP 1 Id FROM Operarios"
$operarioId = $cmd.ExecuteScalar()

$cmd.CommandText = "SELECT TOP 1 Id FROM Turnos"
$turnoId = $cmd.ExecuteScalar()

$cmd.CommandText = "SELECT TOP 1 Id FROM Productos"
$productoId = $cmd.ExecuteScalar()

$cmd.CommandText = "SELECT TOP 1 Id FROM Troqueles"
$troquelId = $cmd.ExecuteScalar()

$conn.Close()

Write-Output "PrensaId: $prensaId"
Write-Output "OperarioId: $operarioId"
Write-Output "TurnoId: $turnoId"
Write-Output "ProductoId: $productoId"
Write-Output "TroquelId: $troquelId"

$body = @{
    prensaId = $prensaId.ToString()
    operarioId = $operarioId.ToString()
    turnoId = $turnoId.ToString()
    productoId = $productoId.ToString()
    troquelId = $troquelId.ToString()
} | ConvertTo-Json

try {
    $res = Invoke-RestMethod -Uri "http://localhost:5007/api/produccion/prensado/iniciar" -Method Post -Body $body -ContentType "application.json"
    Write-Output "SUCCESS:"
    Write-Output ($res | ConvertTo-Json)
} catch {
    Write-Output "FAILED RESPONSE:"
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Output $reader.ReadToEnd()
}
