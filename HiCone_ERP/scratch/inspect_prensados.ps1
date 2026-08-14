try {
    $req = [System.Net.WebRequest]::Create("http://localhost:5007/api/v1/produccion/trabajos-asignados?maquinaId=da8862d9-a71a-4d55-90ec-7142b3096e24&tipoProceso=extrusion")
    $res = $req.GetResponse()
    $stream = $res.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Output "SUCCESS:"
    Write-Output $reader.ReadToEnd()
} catch {
    Write-Output "ERROR DETAILS:"
    Write-Output $_.Exception.Message
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Output $reader.ReadToEnd()
    }
}
