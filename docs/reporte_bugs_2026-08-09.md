# Reporte de bugs encontrados y corregidos — 2026-08-09

## Resumen
Durante la recuperación del módulo de Prensado (perdido en un merge mal resuelto) se hizo una auditoría más amplia del frontend. Se encontraron y corrigieron **10 bugs reales**, la mayoría fuera del alcance original de Prensado.

---

## 1. Ruta de API duplicada — Palets (backend)
**Módulo:** Prensado / Extrusión (compartido)
**Archivo:** `ProduccionController.cs`

Existían dos endpoints `GET /produccion/palets` en el mismo controlador. Cualquier llamada a esa ruta causaba `AmbiguousMatchException` (error 500), rompiendo la pantalla de Palets.

**Fix:** se renombró el endpoint sin uso (`productoCodigo`/`noSerie` de búsqueda, código muerto sin ningún caller en el frontend) a `GET /produccion/palets/buscar`. El endpoint real que usa Palets quedó funcionando solo.

---

## 2. Paginación no se reinicia al buscar (8 pantallas)
**Módulo:** Prensado y Extrusión

El campo de búsqueda actualizaba el filtro pero no reiniciaba la página actual a 1. Si el usuario estaba en la página 2 o 3 y escribía algo que reducía los resultados, la tabla se quedaba **vacía** (mostrando "página 3 de 1") hasta hacer clic manualmente en "«".

**Pantallas afectadas:**
- Prensados, Carreras, Carretes, Palets, Interrupciones (Prensado)
- Troqueles, Prensas (catálogos de Prensado)
- Interrupciones de Extrusión

**Fix:** se agregó `onSearchChange()` en cada componente, que resetea `currentPage` a 1 en cada tecleo del buscador.

---

## 3. Layout roto por `<div>` sin cerrar (2 pantallas)
**Módulo:** Extrusión y Tablero de Producción

**Archivos:** `extrusiones-list.ts`, `tablero.component.ts`

Al contenedor principal del componente le faltaba su `</div>` de cierre antes del final del template. Esto hace que el contenedor de la barra de herramientas envuelva accidentalmente el resto de la pantalla dentro de un `display:flex`, descuadrando todo el layout (mismo síntoma que tuvimos en Producto Terminado).

**Fix:** se agregó el `</div>` faltante en ambos archivos. Verificado con conteo de apertura/cierre de `<div>` en los ~110 archivos `.ts` de `src/app/` — **no quedan más casos**.

---

## Verificación
- Backend compila sin errores (`dotnet build`).
- Frontend compila sin errores (`ng build`).
- Sin rutas de API duplicadas en ninguno de los 15 controladores del backend.
- Sin más `<div>` desbalanceados en toda la carpeta `src/app/`.

## Pendiente / fuera de este reporte
- No se pudo probar en navegador en vivo (validación solo estática/compilación). Se recomienda una pasada manual rápida por Extrusión, Prensado y el Tablero para confirmar visualmente.
- Existe una carpeta `HiCone6/` en el repo con conflictos de merge sin resolver de julio — no afecta la app activa (no está en ningún `.sln`), pero convendría limpiarla o eliminarla si ya no se usa.
