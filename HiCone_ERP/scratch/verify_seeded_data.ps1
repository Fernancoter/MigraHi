$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

Write-Output "--- TURNOS ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT nombre, clave, hora_inicio, hora_fin FROM turnos WHERE clave = 'TUR-MIX'"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Nombre: " + $r["nombre"] + " | Clave: " + $r["clave"] + " | Inicio: " + $r["hora_inicio"] + " | Fin: " + $r["hora_fin"]) }
$r.Close()

Write-Output "`n--- OPERARIOS ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT nombre, numero_empleado, activo FROM operarios WHERE numero_empleado = 'EMP-900'"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Nombre: " + $r["nombre"] + " | No. Empleado: " + $r["numero_empleado"] + " | Activo: " + $r["activo"]) }
$r.Close()

Write-Output "`n--- EXTRUSORAS ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT nombre, codigo, capacidad_kg_hora, modelo FROM extrusoras WHERE codigo = 'EXT-05'"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Nombre: " + $r["nombre"] + " | Código: " + $r["codigo"] + " | Capacidad: " + $r["capacidad_kg_hora"] + " kg/h | Modelo: " + $r["modelo"]) }
$r.Close()

Write-Output "`n--- PRENSAS ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT nombre, codigo, modelo FROM prensas WHERE codigo = 'PRE-05'"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Nombre: " + $r["nombre"] + " | Código: " + $r["codigo"] + " | Marca/Modelo: " + $r["modelo"]) }
$r.Close()

Write-Output "`n--- SILOS ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT nombre, codigo, capacidad_maxima, existencia_actual, estado_material, tipo_material FROM silos WHERE codigo IN ('SILO-V-05', 'SILO-M-05')"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Nombre: " + $r["nombre"] + " | Capacidad: " + $r["capacidad_maxima"] + " kg | Existencia: " + $r["existencia_actual"] + " kg | Material: " + $r["tipo_material"]) }
$r.Close()

Write-Output "`n--- PRODUCTOS ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT codigo, nombre, calibre, ancho, longitud, precio_unitario, clave_externa_sae FROM productos WHERE codigo = 'PROD-UV-05'"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Código: " + $r["codigo"] + " | Nombre: " + $r["nombre"] + " | Calibre: " + $r["calibre"] + " | Ancho: " + $r["ancho"] + "cm | Longitud: " + $r["longitud"] + "m | Precio: $" + $r["precio_unitario"] + " | SAP: " + $r["clave_externa_sae"]) }
$r.Close()

Write-Output "`n--- TROQUELES ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT codigo, nombre FROM troqueles WHERE codigo = 'TROQ-12'"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Código: " + $r["codigo"] + " | Nombre: " + $r["nombre"]) }
$r.Close()

Write-Output "`n--- EXTRUSION INICIADA ---"
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT codigo, fecha_inicio, estado, producto_nombre, meta_kg, virgen_kg, molido_kg, lote_paquete_aditivos FROM extrusiones WHERE codigo = 'EXT-20260812-001'"
$r = $cmd.ExecuteReader()
while ($r.Read()) { Write-Output ("Folio: " + $r["codigo"] + " | Producto: " + $r["producto_nombre"] + " | Estado: EnProceso (" + $r["estado"] + ") | Meta: " + $r["meta_kg"] + " kg | Virgen: " + $r["virgen_kg"] + " kg | Molido: " + $r["molido_kg"] + " kg | Lote Adit: " + $r["lote_paquete_aditivos"]) }
$r.Close()

$conn.Close()
