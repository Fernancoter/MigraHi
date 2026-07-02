$entitiesDir = "C:\KBs\HiCone6\HiCone_ERP\src\Core\HiCone.Domain\Entities"
$files = Get-ChildItem -Path $entitiesDir -Recurse -Filter "*.cs"

$output = "erDiagram`n"

foreach ($f in $files) {
    $content = Get-Content $f.FullName
    $className = ""
    
    foreach ($line in $content) {
        if ($line -match "public\s+(partial\s+)?class\s+(\w+)") {
            $className = $matches[2]
            $output += "    $className {`n"
        }
        
        if ($className -ne "") {
            if ($line -match "public\s+(\w+\??)\s+(\w+)\s+\{\s*get;") {
                $type = $matches[1]
                $prop = $matches[2]
                $output += "        $type $prop`n"
            }
        }
    }
    if ($className -ne "") {
        $output += "    }`n"
    }
}

foreach ($f in $files) {
    $content = Get-Content $f.FullName
    $className = ""
    
    foreach ($line in $content) {
        if ($line -match "public\s+(partial\s+)?class\s+(\w+)") {
            $className = $matches[2]
        }
        
        if ($className -ne "") {
            if ($line -match "public\s+(virtual\s+)?(ICollection|IEnumerable|IList|List)\<(\w+)\>\s+(\w+)") {
                $related = $matches[3]
                $output += "    $className ||--o{ $related : `"$matches[4]`"`n"
            }
            elseif ($line -match "public\s+(virtual\s+)?(\w+)\s+(\w+)\s+\{\s*get;") {
                $type = $matches[2]
                $prop = $matches[3]
                # exclude common types
                if ($type -notmatch "^(int|string|bool|DateTime|decimal|double|float|long|byte|Guid|DateTimeOffset|TimeSpan|ICollection)$") {
                    # Avoid self-referencing duplicates and simple enums if possible (heuristics)
                    $output += "    $className }o--|| $type : `"$prop`"`n"
                }
            }
        }
    }
}

$output | Out-File "C:\KBs\HiCone6\HiCone_ERP\schema_mermaid.txt"
Write-Host "Done"
