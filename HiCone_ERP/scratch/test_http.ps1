$body = @{
    prensaId = '21a70687-65bf-4778-b497-19ff9bf57b03'
    operarioId = '7e3e03ac-4495-444d-838c-33de1f188b7d'
    turnoId = '420d87bb-169c-4559-a365-8594932820ce'
    productoId = '63eb77ac-113f-4f74-8e90-391dd468c66a'
    troquelId = '114a2bf6-ea47-46bf-a148-7a430d3efdc6'
} | ConvertTo-Json

try {
    $res = Invoke-RestMethod -Uri "http://localhost:5007/api/produccion/prensado/iniciar" -Method Post -Body $body -ContentType "application.json"
    Write-Output "SUCCESS: "
    Write-Output ($res | ConvertTo-Json -Depth 5)
} catch {
    Write-Output "ERROR STATUS: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $respStream = $_.Exception.Response.GetResponseStream()
        $sr = New-Object System.IO.StreamReader($respStream)
        Write-Output "RESPONSE BODY: $($sr.ReadToEnd())"
    }
}
