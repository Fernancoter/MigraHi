$source = "C:\Users\FCO\Desktop\HiMI\MigraHi"
$destination = "C:\KBs\HiCone6"
$excludeList = @('.git', 'node_modules', 'bin', 'obj', '.angular', 'dist')

function Copy-FilteredFiles {
    param($srcPath, $destPath)
    
    # Check if directory exists, otherwise create it
    if (-not (Test-Path -Path $destPath)) {
        New-Item -ItemType Directory -Path $destPath | Out-Null
    }

    $items = Get-ChildItem -Path $srcPath
    foreach ($item in $items) {
        $exclude = $false
        foreach ($ex in $excludeList) {
            if ($item.FullName -like "*\$ex*" -or $item.Name -eq $ex) {
                $exclude = $true
                break
            }
        }

        if (-not $exclude) {
            $destItem = Join-Path -Path $destPath -ChildPath $item.Name
            if ($item.PSIsContainer) {
                Copy-FilteredFiles -srcPath $item.FullName -destPath $destItem
            } else {
                Copy-Item -Path $item.FullName -Destination $destItem -Force
            }
        }
    }
}

Write-Host "Copying CodigosHi..."
if (Test-Path "$source\CodigosHi") {
    Copy-FilteredFiles -srcPath "$source\CodigosHi" -destPath "$destination\CodigosHi"
}

Write-Host "Copying HiCone_ERP Backend (Core, Infrastructure, Presentation)..."
$erpSrc = "$source\HiCone_ERP\src"
$erpDest = "$destination\HiCone_ERP\src"
Copy-FilteredFiles -srcPath "$erpSrc\Core" -destPath "$erpDest\Core"
Copy-FilteredFiles -srcPath "$erpSrc\Infrastructure" -destPath "$erpDest\Infrastructure"
Copy-FilteredFiles -srcPath "$erpSrc\Presentation" -destPath "$erpDest\Presentation"

Write-Host "Copying HiCone_ERP Frontend..."
$frontSrc = "$source\HiCone_ERP\src\Frontend\hicone-web\src"
$frontDest = "$destination\HiCone_ERP\src\Frontend\hicone-web\src"
if (Test-Path $frontSrc) {
    Copy-FilteredFiles -srcPath $frontSrc -destPath $frontDest
} else {
    Write-Host "Frontend source path not found: $frontSrc"
}

Write-Host "Migration completed."
