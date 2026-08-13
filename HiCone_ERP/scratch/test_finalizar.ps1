Start-Sleep -Seconds 8
$url = "http://localhost:5007/api/v1/produccion/extrusion/00287082-3b22-479b-80dd-8ca03db4cf94/finalizar"
$body = @{ motivo = "Prueba de finalización" } | ConvertTo-Json

try {
    $res = Invoke-WebRequest -Uri $url -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Output "Finalizar Extrusión Result -> HTTP $($res.StatusCode) : $($res.Content)"
} catch {
    Write-Output "Finalizar Extrusión Error -> $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Output "Response Body: $($reader.ReadToEnd())"
    }
}
