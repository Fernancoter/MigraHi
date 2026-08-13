$url = "http://localhost:5007/api/v1/produccion/catalogos/prensas"
$body = @{
    numeroPrensa = "UNO"
    nombre = "Prensa 1"
    marca = "coiteeo"
    modelo = "crock"
    estado = 1
    numeroSerie = "12112453"
    isActive = $true
    observaciones = "prueba en configurar prod"
} | ConvertTo-Json

try {
    $res = Invoke-WebRequest -Uri $url -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Output "Crear Prensa Result -> HTTP $($res.StatusCode) : $($res.Content)"
} catch {
    Write-Output "Crear Prensa Error -> $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Output "Response Body: $($reader.ReadToEnd())"
    }
}
