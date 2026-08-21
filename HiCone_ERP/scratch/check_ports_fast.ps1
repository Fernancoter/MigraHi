foreach ($port in @(5007, 4200, 4201)) {
    $client = New-Object System.Net.Sockets.TcpClient
    $asyncResult = $client.BeginConnect("127.0.0.1", $port, $null, $null)
    $waitHandle = $asyncResult.AsyncWaitHandle
    if ($waitHandle.WaitOne(1000, $false)) {
        try {
            $client.EndConnect($asyncResult)
            Write-Output "Port ${port} : OPEN"
        } catch {
            Write-Output "Port ${port} : CLOSED"
        }
    } else {
        $client.Close()
        Write-Output "Port ${port} : CLOSED / TIMEOUT"
    }
}
