$connectionString = "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"
$tenantId = "00000000-0000-0000-0000-000000000001"

$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()
$transaction = $conn.BeginTransaction()

try {
    Write-Output "=== PASO 1: Catálogos Base ==="

    # 1. Turno: Turno Mixto Manual
    $turnoId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.CommandText = "SELECT id FROM turnos WHERE clave = 'TUR-MIX' OR nombre = 'Turno Mixto Manual'"
    $existingTurno = $cmd.ExecuteScalar()
    if ($existingTurno -ne $null) {
        $turnoId = [Guid]$existingTurno
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE turnos SET nombre = 'Turno Mixto Manual', clave = 'TUR-MIX', hora_inicio = '07:00:00', hora_fin = '15:00:00', is_active = 1, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $turnoId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Turno actualizado: Turno Mixto Manual ($turnoId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO turnos (id, nombre, clave, hora_inicio, hora_fin, is_active, is_deleted, tenant_id, created_at) VALUES (@id, 'Turno Mixto Manual', 'TUR-MIX', '07:00:00', '15:00:00', 1, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $turnoId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Turno creado: Turno Mixto Manual ($turnoId)"
    }

    # 2. Operario: Carlos López
    $operarioId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM operarios WHERE numero_empleado = 'EMP-900' OR nombre = 'Carlos López'"
    $existingOperario = $cmd.ExecuteScalar()
    if ($existingOperario -ne $null) {
        $operarioId = [Guid]$existingOperario
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE operarios SET nombre = 'Carlos López', nombre_completo = 'Carlos López', numero_empleado = 'EMP-900', activo = 1, is_active = 1, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $operarioId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Operario actualizado: Carlos López ($operarioId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO operarios (id, nombre, nombre_completo, numero_empleado, activo, is_active, is_deleted, tenant_id, created_at) VALUES (@id, 'Carlos López', 'Carlos López', 'EMP-900', 1, 1, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $operarioId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Operario creado: Carlos López ($operarioId)"
    }

    # 3. Extrusora: Extrusora 05
    $extrusoraId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM extrusoras WHERE codigo = 'EXT-05' OR nombre = 'Extrusora 05'"
    $existingExtrusora = $cmd.ExecuteScalar()
    if ($existingExtrusora -ne $null) {
        $extrusoraId = [Guid]$existingExtrusora
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE extrusoras SET nombre = 'Extrusora 05', codigo = 'EXT-05', numero_extrusora = 'EXT-05', capacidad_kg_hora = 300, modelo = 'XR-3000', numero_estaciones = 1, estado = 1, is_active = 1, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $extrusoraId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Extrusora actualizada: Extrusora 05 ($extrusoraId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO extrusoras (id, nombre, codigo, numero_extrusora, capacidad_kg_hora, modelo, numero_estaciones, estado, is_active, is_deleted, tenant_id, created_at) VALUES (@id, 'Extrusora 05', 'EXT-05', 'EXT-05', 300, 'XR-3000', 1, 1, 1, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $extrusoraId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Extrusora creada: Extrusora 05 ($extrusoraId)"
    }

    # 4. Prensa: Prensa 05
    $prensaId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM prensas WHERE codigo = 'PRE-05' OR nombre = 'Prensa 05'"
    $existingPrensa = $cmd.ExecuteScalar()
    if ($existingPrensa -ne $null) {
        $prensaId = [Guid]$existingPrensa
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE prensas SET nombre = 'Prensa 05', codigo = 'PRE-05', numero_prensa = 'PRE-05', modelo = 'Siemens', estado = 1, is_active = 1, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $prensaId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Prensa actualizada: Prensa 05 ($prensaId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO prensas (id, nombre, codigo, numero_prensa, modelo, estado, is_active, is_deleted, tenant_id, created_at) VALUES (@id, 'Prensa 05', 'PRE-05', 'PRE-05', 'Siemens', 1, 1, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $prensaId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Prensa creada: Prensa 05 ($prensaId)"
    }

    # 5. Silos
    # Silo Virgen 05
    $siloVirgenId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM silos WHERE codigo = 'SILO-V-05' OR nombre = 'Silo Virgen 05'"
    $existingSiloV = $cmd.ExecuteScalar()
    if ($existingSiloV -ne $null) {
        $siloVirgenId = [Guid]$existingSiloV
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE silos SET nombre = 'Silo Virgen 05', codigo = 'SILO-V-05', capacidad_maxima = 20000, existencia_actual = 15000, kg_minimo = 0, kg_maximo = 20000, estado_material = 'Virgen', tipo_material = 'Resina PE', activo = 1, estado = 'Operativo', is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $siloVirgenId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Silo Virgen actualizado: Silo Virgen 05 ($siloVirgenId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO silos (id, nombre, codigo, capacidad_maxima, existencia_actual, kg_minimo, kg_maximo, estado_material, tipo_material, activo, estado, is_deleted, tenant_id, created_at) VALUES (@id, 'Silo Virgen 05', 'SILO-V-05', 20000, 15000, 0, 20000, 'Virgen', 'Resina PE', 1, 'Operativo', 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $siloVirgenId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Silo Virgen creado: Silo Virgen 05 ($siloVirgenId)"
    }

    # Silo Molido 05
    $siloMolidoId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM silos WHERE codigo = 'SILO-M-05' OR nombre = 'Silo Molido 05'"
    $existingSiloM = $cmd.ExecuteScalar()
    if ($existingSiloM -ne $null) {
        $siloMolidoId = [Guid]$existingSiloM
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE silos SET nombre = 'Silo Molido 05', codigo = 'SILO-M-05', capacidad_maxima = 10000, existencia_actual = 5000, kg_minimo = 0, kg_maximo = 10000, estado_material = 'Molido', tipo_material = 'Reciclado PE', activo = 1, estado = 'Operativo', is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $siloMolidoId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Silo Molido actualizado: Silo Molido 05 ($siloMolidoId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO silos (id, nombre, codigo, capacidad_maxima, existencia_actual, kg_minimo, kg_maximo, estado_material, tipo_material, activo, estado, is_deleted, tenant_id, created_at) VALUES (@id, 'Silo Molido 05', 'SILO-M-05', 10000, 5000, 0, 10000, 'Molido', 'Reciclado PE', 1, 'Operativo', 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $siloMolidoId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Silo Molido creado: Silo Molido 05 ($siloMolidoId)"
    }

    # 6. Producto: Película Especial UV (PROD-UV-05)
    $productoId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM productos WHERE codigo = 'PROD-UV-05' OR clave = 'PROD-UV-05' OR nombre = 'Película Especial UV'"
    $existingProd = $cmd.ExecuteScalar()
    if ($existingProd -ne $null) {
        $productoId = [Guid]$existingProd
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE productos SET codigo = 'PROD-UV-05', clave = 'PROD-UV-05', nombre = 'Película Especial UV', calibre = 1.8, ancho = 280, longitud = 1100, precio_unitario = 180.00, tipo_material = 1, minutos_reposo_minimo = 60, clave_externa_sae = 'SAP-UV-500', is_active = 1, etiquetable = 1, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $productoId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Producto actualizado: Película Especial UV ($productoId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO productos (id, codigo, clave, nombre, calibre, ancho, longitud, precio_unitario, tipo_material, minutos_reposo_minimo, clave_externa_sae, is_active, etiquetable, is_deleted, tenant_id, created_at) VALUES (@id, 'PROD-UV-05', 'PROD-UV-05', 'Película Especial UV', 1.8, 280, 1100, 180.00, 1, 60, 'SAP-UV-500', 1, 1, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $productoId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Producto creado: Película Especial UV ($productoId)"
    }

    # 7. Troquel: TROQ-12
    $troquelId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM troqueles WHERE codigo = 'TROQ-12' OR nombre = 'Troquel 12 Cavidades Especial'"
    $existingTroquel = $cmd.ExecuteScalar()
    if ($existingTroquel -ne $null) {
        $troquelId = [Guid]$existingTroquel
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE troqueles SET codigo = 'TROQ-12', nombre = 'Troquel 12 Cavidades Especial', estado = 1, is_active = 1, ciclos_acumulados = 0, ciclos_video_mantenimiento = 10000, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $troquelId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Troquel actualizado: Troquel 12 Cavidades Especial ($troquelId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO troqueles (id, codigo, nombre, estado, is_active, ciclos_acumulados, ciclos_video_mantenimiento, is_deleted, tenant_id, created_at) VALUES (@id, 'TROQ-12', 'Troquel 12 Cavidades Especial', 1, 1, 0, 10000, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $troquelId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Troquel creado: Troquel 12 Cavidades Especial ($troquelId)"
    }


    Write-Output "`n=== PASO 2: Parametrización de Referencias ==="

    # 1. Extrusora-Producto
    $extProdId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM extrusora_productos WHERE extrusora_id = @extId AND producto_id = @prodId"
    $cmd.Parameters.AddWithValue("@extId", $extrusoraId) | Out-Null
    $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
    $existingExtProd = $cmd.ExecuteScalar()
    if ($existingExtProd -ne $null) {
        $extProdId = [Guid]$existingExtProd
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE extrusora_productos SET default_calibre = 1.8, default_ancho = 280, default_longitud = 1100, default_virgen_kg = 350, default_molido_kg = 60, default_rev_husillo_virgen = 0, default_rev_husillo_molido = 0, default_meta_kg = 2000, default_minutos_reposo = 60, is_active = 1, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $extProdId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "ExtrusoraProducto actualizado ($extProdId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO extrusora_productos (id, extrusora_id, producto_id, default_calibre, default_ancho, default_longitud, default_virgen_kg, default_molido_kg, default_rev_husillo_virgen, default_rev_husillo_molido, default_meta_kg, default_minutos_reposo, is_active, is_deleted, tenant_id, created_at) VALUES (@id, @extId, @prodId, 1.8, 280, 1100, 350, 60, 0, 0, 2000, 60, 1, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $extProdId) | Out-Null
        $cmd.Parameters.AddWithValue("@extId", $extrusoraId) | Out-Null
        $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "ExtrusoraProducto creado ($extProdId)"
    }

    # 2. Prensa-Producto
    $prensaProdId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM prensa_productos WHERE prensa_id = @prensaId AND producto_id = @prodId"
    $cmd.Parameters.AddWithValue("@prensaId", $prensaId) | Out-Null
    $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
    $existingPrensaProd = $cmd.ExecuteScalar()
    if ($existingPrensaProd -ne $null) {
        $prensaProdId = [Guid]$existingPrensaProd
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE prensa_productos SET default_meta_pallets = 5, is_active = 1, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $prensaProdId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "PrensaProducto actualizado ($prensaProdId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO prensa_productos (id, prensa_id, producto_id, default_levas_kg_entrada, default_levas_kg_salida, default_levas_grados_entrada, default_levas_grados_salida, default_rodillos_kg_entrada, default_rodillos_kg_salida, default_rodillos_grados_entrada, default_rodillos_grados_salida, default_meta_pallets, is_active, is_deleted, tenant_id, created_at) VALUES (@id, @prensaId, @prodId, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $prensaProdId) | Out-Null
        $cmd.Parameters.AddWithValue("@prensaId", $prensaId) | Out-Null
        $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "PrensaProducto creado ($prensaProdId)"
    }

    # 3. Especificación de Producto Terminado
    $prodTermId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM productos_terminados WHERE producto_id = @prodId OR nombre = 'Película Especial UV'"
    $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
    $existingProdTerm = $cmd.ExecuteScalar()
    if ($existingProdTerm -ne $null) {
        $prodTermId = [Guid]$existingProdTerm
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE productos_terminados SET nombre = 'Película Especial UV', descripcion = 'SAP-UV-500 | Palet Millar: 5 | Peso Carrete: 55 kg | Peso Palet: 550 kg | Carrete: CARRETE-UV-05', producto_id = @prodId, is_active = 1, mrd = 0, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $prodTermId) | Out-Null
        $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "ProductoTerminado actualizado ($prodTermId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO productos_terminados (id, nombre, descripcion, producto_id, is_active, mrd, is_deleted, tenant_id, created_at) VALUES (@id, 'Película Especial UV', 'SAP-UV-500 | Palet Millar: 5 | Peso Carrete: 55 kg | Peso Palet: 550 kg | Carrete: CARRETE-UV-05', @prodId, 1, 0, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $prodTermId) | Out-Null
        $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "ProductoTerminado creado ($prodTermId)"
    }


    Write-Output "`n=== PASO 3: Ejecución del Proceso de Extrusión ==="

    # 1. Lote Aditivos
    $loteId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM lotes WHERE codigo = 'LOTE-ADIT-UV-05'"
    $existingLote = $cmd.ExecuteScalar()
    if ($existingLote -ne $null) {
        $loteId = [Guid]$existingLote
        $cmd.Parameters.Clear()
        $cmd.CommandText = "UPDATE lotes SET descripcion = 'Lote Paquete Aditivos UV', estado = 'Activo', lote_paquete_aditivos = 'LOTE-ADIT-UV-05', lote_kg = 410, lote_consumido = 0, is_deleted = 0 WHERE id = @id"
        $cmd.Parameters.AddWithValue("@id", $loteId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Lote Aditivos actualizado ($loteId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = "INSERT INTO lotes (id, codigo, fecha_creacion, descripcion, estado, lote_paquete_aditivos, lote_kg, lote_consumido, is_deleted, tenant_id, created_at) VALUES (@id, 'LOTE-ADIT-UV-05', SYSUTCDATETIME(), 'Lote Paquete Aditivos UV', 'Activo', 'LOTE-ADIT-UV-05', 410, 0, 0, @tenantId, SYSUTCDATETIME())"
        $cmd.Parameters.AddWithValue("@id", $loteId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Lote Aditivos creado ($loteId)"
    }

    # 2. Iniciar Extrusión
    $extrusionId = [Guid]::NewGuid()
    $cmd = $conn.CreateCommand()
    $cmd.Transaction = $transaction
    $cmd.Parameters.Clear()
    $cmd.CommandText = "SELECT id FROM extrusiones WHERE codigo = 'EXT-20260812-001' OR (extrusora_id = @extId AND operario_id = @opId AND turno_id = @turId AND estado = 2)"
    $cmd.Parameters.AddWithValue("@extId", $extrusoraId) | Out-Null
    $cmd.Parameters.AddWithValue("@opId", $operarioId) | Out-Null
    $cmd.Parameters.AddWithValue("@turId", $turnoId) | Out-Null
    $existingExt = $cmd.ExecuteScalar()

    if ($existingExt -ne $null) {
        $extrusionId = [Guid]$existingExt
        $cmd.Parameters.Clear()
        $cmd.CommandText = @"
UPDATE extrusiones SET 
    codigo = 'EXT-20260812-001',
    fecha = GETUTCDATE(),
    fecha_inicio = GETUTCDATE(),
    estado = 2,
    en_curso = 1,
    extrusora_id = @extId,
    operario_id = @opId,
    turno_id = @turId,
    producto_id = @prodId,
    producto_nombre = 'Película Especial UV',
    calibre = 1.8,
    ancho = 280,
    longitud = 1100,
    silo_virgen_id = @siloVId,
    silo_molido_id = @siloMId,
    virgen_kg = 350,
    molido_kg = 60,
    meta_kg = 2000,
    programado = 2000,
    lote_paquete_aditivos = 'LOTE-ADIT-UV-05',
    lote_silo = 'SILO-V-05',
    lote_id = @loteId,
    is_deleted = 0
WHERE id = @id
"@
        $cmd.Parameters.AddWithValue("@id", $extrusionId) | Out-Null
        $cmd.Parameters.AddWithValue("@extId", $extrusoraId) | Out-Null
        $cmd.Parameters.AddWithValue("@opId", $operarioId) | Out-Null
        $cmd.Parameters.AddWithValue("@turId", $turnoId) | Out-Null
        $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
        $cmd.Parameters.AddWithValue("@siloVId", $siloVirgenId) | Out-Null
        $cmd.Parameters.AddWithValue("@siloMId", $siloMolidoId) | Out-Null
        $cmd.Parameters.AddWithValue("@loteId", $loteId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Extrusión actualizada: EXT-20260812-001 ($extrusionId)"
    } else {
        $cmd.Parameters.Clear()
        $cmd.CommandText = @"
INSERT INTO extrusiones (
    id, codigo, fecha, fecha_inicio, estado, en_curso,
    extrusora_id, operario_id, turno_id, producto_id, producto_nombre,
    calibre, ancho, longitud, meta_kg, programado, virgen_kg, molido_kg,
    rev_husillo_virgen, rev_husillo_molido, total_bobinas_meta,
    silo_virgen_id, silo_molido_id, lote_silo, lote_paquete_aditivos, lote_id,
    tiempo_interrupcion, interrupcion_en_curso, bobinas_totales_reposo, producido, tiempo_interrupcion_min, extrusion_id_legacy,
    is_deleted, tenant_id, created_at
) VALUES (
    @id, 'EXT-20260812-001', GETUTCDATE(), GETUTCDATE(), 2, 1,
    @extId, @opId, @turId, @prodId, 'Película Especial UV',
    1.8, 280, 1100, 2000, 2000, 350, 60,
    0, 0, 0,
    @siloVId, @siloMId, 'SILO-V-05', 'LOTE-ADIT-UV-05', @loteId,
    0, 0, 0, 0, 0, 10001,
    0, @tenantId, SYSUTCDATETIME()
)
"@
        $cmd.Parameters.AddWithValue("@id", $extrusionId) | Out-Null
        $cmd.Parameters.AddWithValue("@extId", $extrusoraId) | Out-Null
        $cmd.Parameters.AddWithValue("@opId", $operarioId) | Out-Null
        $cmd.Parameters.AddWithValue("@turId", $turnoId) | Out-Null
        $cmd.Parameters.AddWithValue("@prodId", $productoId) | Out-Null
        $cmd.Parameters.AddWithValue("@siloVId", $siloVirgenId) | Out-Null
        $cmd.Parameters.AddWithValue("@siloMId", $siloMolidoId) | Out-Null
        $cmd.Parameters.AddWithValue("@loteId", $loteId) | Out-Null
        $cmd.Parameters.AddWithValue("@tenantId", [Guid]$tenantId) | Out-Null
        $cmd.ExecuteNonQuery() | Out-Null
        Write-Output "Extrusión creada e iniciada: EXT-20260812-001 ($extrusionId)"
    }

    $transaction.Commit()
    Write-Output "`n¡TODOS LOS DATOS FUERON REGISTRADOS Y ASOCIADOS EXITOSAMENTE EN EL ERP!"
} catch {
    $transaction.Rollback()
    Write-Output ("ERROR: " + $_.Exception.Message)
} finally {
    $conn.Close()
}
