# Documentación: Automatización del Módulo de Inventarios (Silos)

Se han completado todas las implementaciones descritas en el plan para replicar la lógica transaccional de GeneXus en el nuevo ERP en .NET. Los inventarios de los Silos ahora reaccionarán de forma automática a los procesos productivos.

## 📦 Entradas: Lotes (InventarioService.cs)
*   **Suma Automática:** Al crear un lote desde el frontend, el Backend (`CreateLoteAsync`) ahora consulta la entidad `Silo` vinculada (`LoteSiloId`).
*   **Validación de Tope:** Calcula si `Silo.ExistenciaActual` + `LoteKg` sobrepasa la `CapacidadMaxima` del Silo. Si la excede, cancela la operación y lanza un `InvalidOperationException`.
*   **UI Actualizada:** El componente `lotes.component.ts` ahora captura este error y muestra una alerta (`❌ No se puede registrar el lote. La cantidad excede la capacidad máxima del silo...`) sin romper la pantalla.

## 🏭 Salidas: Consumos por Extrusión (ProduccionService.cs)
*   **Resta Automática:** Se agregó el método `RegistrarConsumoExtrusionAsync` en el servicio de Producción.
*   **Multisilo:** Toma en cuenta tanto el consumo de material Virgen (Silo Principal) como Molido (Silo Secundario).
*   **Validación de Quiebre de Stock:** Revisa que cada silo tenga existencias suficientes. Si no hay suficiente material, bloquea la transacción lanzando un error (`Stock insuficiente en el Silo...`) asegurando que el inventario nunca caiga a números negativos.
*   **Nuevo Endpoint:** Se habilitó la ruta `POST /api/v1/Produccion/extrusion/{id}/consumo` para enviar estos consumos desde la pantalla del operario.

## 📊 Ajuste Físico: Existencias (ExistenciasComponent)
*   **Endpoint de Ajustes:** Se creó `POST /api/v1/Inventario/existencia-silo/guardar` en el Backend.
*   **Pestañas Dinámicas:** En la vista de Existencias (`existencias.component.ts`), la pestaña **"Existencia en Silos"** ahora es funcional y carga los datos reales de la base de datos (nombre de Silo, tipo de material, y Lote).
*   **Guardado Masivo:** El usuario puede teclear la nueva "Cantidad Física" de cada Silo y al presionar "Confirmar Ajuste", se sobrescribe la `ExistenciaActual` en la base de datos corrigiendo cualquier descuadre.

> [!TIP]
> Todo esto se implementó respetando meticulosamente el diseño visual, colores y botones del frontend que ya tenías desarrollados en Angular. El cambio fue "quirúrgico" en la comunicación y validación entre Angular y el Backend .NET 8.
