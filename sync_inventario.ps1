$sourceBase = "C:\KBs\HiCone6\HiCone_ERP"
$targetBase = "C:\Users\FCO\Desktop\HiMI\MigraHi\HiCone_ERP"

$pathsToCopy = @(
    "src\Presentation\HiCone.WebApi\Controllers\InventarioController.cs",
    "src\Core\HiCone.Application\Services\Inventario",
    "src\Core\HiCone.Domain\Entities\Inventario",
    "src\Frontend\hicone-web\src\app\features\inventario",
    "src\Frontend\hicone-web\src\app\core\services\inventario.ts",
    "src\Frontend\hicone-web\src\app\core\services\inventario.service.ts",
    "src\Frontend\hicone-web\src\styles.scss",
    "src\Frontend\hicone-web\src\app\app.routes.ts"
)

foreach ($p in $pathsToCopy) {
    $srcPath = Join-Path $sourceBase $p
    $tgtPath = Join-Path $targetBase $p

    if (Test-Path $srcPath) {
        $tgtDir = Split-Path $tgtPath -Parent
        if (-not (Test-Path $tgtDir)) {
            New-Item -ItemType Directory -Force -Path $tgtDir | Out-Null
        }

        $isDir = (Get-Item $srcPath).PSIsContainer
        if ($isDir) {
            Copy-Item -Path "$srcPath\*" -Destination $tgtPath -Recurse -Force
            Write-Host "Copied Directory: $p"
        } else {
            Copy-Item -Path $srcPath -Destination $tgtPath -Force
            Write-Host "Copied File: $p"
        }
    } else {
        Write-Host "WARNING: Source path not found: $srcPath"
    }
}
