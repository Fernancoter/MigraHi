# Registro de avance — Backend: Prensado + Captura móvil

> Fecha: 2026-06-08 · Rama: `Prensado/Refactor` · Proyecto: `HiCone_ERP/` (el activo, NO `HiCone6/HiCone_ERP`)
> Autor del cambio: Gerardo (con Claude) · Estado base verificado: `dotnet build` = **0 errores** antes de empezar.

## Contexto / por qué

Al analizar el módulo de prensado y la app móvil (`hicone-mobile`) se detectó que:

1. **La app móvil llama a endpoints que NO existen en el backend** → escanear un carrete o un pallet no guardaba nada (bloqueante).
2. **No se puede cerrar un prensado**: no existía `FinalizarPrensadoAsync` ni el cálculo de KPIs (`PrensadoResultado` estaba definido pero nunca se llenaba).
3. **Valores quemados** en la lógica de prensado (defaults de `PrensaProducto` ignorados, serie de palet con `Random()`, 6 carretes fijos sin nombrar).

Contratos reales que envía la app móvil (`escanear.component.ts`), usados para diseñar los endpoints:
- `POST produccion/carrete/registrar` → `{ noSerie, estado: "Validado" }`
- `POST produccion/pallet/registrar` → `{ noSerie, estado: "Terminado" }`
- `POST produccion/captura/registrar` → genérico (fallback)

## Alcance de ESTA entrega (lo que se hace ahora)

### ✅ Opción 1 — Endpoints de captura que faltaban
Nuevos endpoints en `ProduccionController` + métodos de servicio:
- `POST produccion/carrete/registrar` → busca el carrete por `NoSerie` y actualiza su estado (escaneo en planta). Equivale a `SDEscanearCarrete` del legado.
- `POST produccion/pallet/registrar` → busca el palet por `NoSerie` y actualiza su estatus. Equivale a `SDEscanearPallet`.
- `POST produccion/captura/registrar` → dispatcher genérico por tipo (bobina/carrete/pallet).

### ✅ Opción 3 — Cierre de prensado + KPIs
- `FinalizarPrensadoAsync(prensadoId, motivo?)`: cierra el prensado, libera la prensa (→ `Disponible`), desmonta bobinas activas (→ `EnReposo`) y **genera `PrensadoResultado`** con: total pallets vs meta, total carreras / validadas, bobinas molidas, kg merma, minutos de interrupción y **eficiencia %**. Espeja a `FinalizarExtrusionAsync`.
- `GetPrensadoResultadoAsync(prensadoId)`: consulta el resultado/KPIs.
- Endpoints: `POST produccion/prensado/{id}/finalizar`, `GET produccion/prensado/{id}/resultado`.

### ✅ Opción 4 — Quitar valores quemados
- `IniciarPrensadoAsync` ahora aplica los **defaults de `PrensaProducto`** (meta de pallets y parámetros de Levas/Rodillos) si existe la combinación prensa+producto.
- `CrearPaletAsync`: serie de palet **secuencial** y sin colisiones (elimina `new Random()`); capacidad tomada del default cuando exista.
- Constante nombrada `CarretesPorCarrera = 6` en vez del número mágico.

## Pendiente (registrado, NO en esta entrega)

| # | Item | Motivo de diferir |
|---|---|---|
| 2 | **Idempotencia** (dedup por header `Idempotency-Key`) | Requiere tabla nueva + migración + filtro. La app ya manda el header; el server aún lo ignora. Siguiente entrega. |
| 5 | **Auth/GAM para móvil** | La app no manda token; hay que definir login de operarios. |
| 6 | **Limpiar proyecto duplicado** (`HiCone6/HiCone_ERP` vs `HiCone_ERP`) | Requiere decisión del equipo antes de borrar. |
| 7 | **Endpoints SD del legado** (SDCambioTroquel, SDAsignarTroquel, etiquetas PrinterSD, etc.) | Alcance grande, se hace por partes. |

## Verificación

- `dotnet build HiCone.ERP.sln` debe seguir en **0 errores**.
- Prueba manual sugerida (Swagger): iniciar prensado → iniciar carrera → `carrete/registrar` con el `NoSerie` generado → `prensado/{id}/finalizar` → `prensado/{id}/resultado` devuelve KPIs.

## Archivos tocados

- `src/Core/HiCone.Application/Interfaces/IProduccionService.cs`
- `src/Core/HiCone.Application/Services/Produccion/ProduccionService.cs`
- `src/Presentation/HiCone.API/Controllers/ProduccionController.cs`
