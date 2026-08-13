foreach ($port in @(5007, 4200, 4201)) {
    $tcp = New-Object System.Net.Sockets.TcpClient
    try {
        $tcp.Connect('127.0.0.1', $port)
        Write-Output "Port ${port} : OPEN"
        $tcp.Close()
    } catch {
        Write-Output "Port ${port} : CLOSED / STILL BUILDING"
    }
}
