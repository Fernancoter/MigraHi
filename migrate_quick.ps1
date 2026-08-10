$source1 = "C:\Users\FCO\Desktop\HiMI\MigraHi\HiCone_ERP\src"
$source2 = "C:\Users\FCO\Desktop\HiMI\MigraHi\HiCone6\HiCone_ERP\src"
$sourceCodigos1 = "C:\Users\FCO\Desktop\HiMI\MigraHi\CodigosHi"
$sourceCodigos2 = "C:\Users\FCO\Desktop\HiMI\MigraHi\HiCone6\CodigosHi"

$destination = "C:\KBs\HiCone6"
$excludeList = @('.git', 'node_modules', 'bin', 'obj', '.angular', 'dist')

function Copy-FilteredFiles {
    param($srcPath, $destPath)
    
    if (-not (Test-Path -Path $srcPath)) {
        return
    }

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
Copy-FilteredFiles -srcPath $sourceCodigos1 -destPath "$destination\CodigosHi"
Copy-FilteredFiles -srcPath $sourceCodigos2 -destPath "$destination\CodigosHi"

Write-Host "Copying HiCone_ERP Backend (Core, Infrastructure, Presentation)..."
$erpDest = "$destination\HiCone_ERP\src"
Copy-FilteredFiles -srcPath "$source1\Core" -destPath "$erpDest\Core"
Copy-FilteredFiles -srcPath "$source1\Infrastructure" -destPath "$erpDest\Infrastructure"
Copy-FilteredFiles -srcPath "$source1\Presentation" -destPath "$erpDest\Presentation"

Copy-FilteredFiles -srcPath "$source2\Core" -destPath "$erpDest\Core"
Copy-FilteredFiles -srcPath "$source2\Infrastructure" -destPath "$erpDest\Infrastructure"
Copy-FilteredFiles -srcPath "$source2\Presentation" -destPath "$erpDest\Presentation"

Write-Host "Copying HiCone_ERP Frontend..."
$frontDest = "$destination\HiCone_ERP\src\Frontend\hicone-web\src"
Copy-FilteredFiles -srcPath "$source1\Frontend\hicone-web\src" -destPath $frontDest
Copy-FilteredFiles -srcPath "$source2\Frontend\hicone-web\src" -destPath $frontDest

Write-Host "Migration completed."
