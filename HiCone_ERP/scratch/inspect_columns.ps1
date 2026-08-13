$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$tables = @(
    "turnos", "operarios", "extrusoras", "prensas", "silos", "productos", "troqueles",
    "extrusora_productos", "prensa_productos", "productos_terminados", "extrusiones", "lotes",
    "existencias_silos", "carretes"
)

$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

foreach ($table in $tables) {
    Write-Output "=== TABLE: $table ==="
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = "SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='$table'"
    $reader = $cmd.ExecuteReader()
    while ($reader.Read()) {
        Write-Output ("  " + $reader["COLUMN_NAME"] + " (" + $reader["DATA_TYPE"] + ", null=" + $reader["IS_NULLABLE"] + ")")
    }
    $reader.Close()
}

$conn.Close()
