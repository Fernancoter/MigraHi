# Avance — App móvil de planta (`hicone-mobile`)

> Última actualización: 2026-06-24. Estado **real**, verificado leyendo el código (no solo el `resumen_estatus_movil.md`).

## Resumen honesto

La app existe y está bien estructurada (Angular 21 + Capacitor 8, arquitectura core/hardware + core/offline + features/captura). **Pero el avance real está más cerca del ~50% que del 75%** que reporta `resumen_estatus_movil.md`: dos de los tres servicios de hardware son simulaciones y las lecturas offline no existen.

## Lo que SÍ funciona (verificado en código)

- **Escáner de código de barras**: real, `@capacitor-mlkit/barcode-scanning` nativo + fallback manual en navegador (`scanner.service.ts`).
- **Cola de escritura offline**: `sync-queue.service.ts` — encola en disco (Capacitor Preferences), reintenta al volver la red, evita concurrencia con `isSyncing`.
- **Estructura + UI** de 4 pantallas: home, escanear, troquel, carrera.
- **Capacitor** configurado para Android e iOS; PWA con Service Worker + manifest.
- **Tests unitarios**: 13 pasan (5 archivos). `npx ng test --watch=false`.

## 🔴 Pendientes críticos (detectados en la revisión)

| # | Item | Estado | Nota |
|---|---|---|---|
| 1 | **Impresión real (Zebra)** | ❌ stub | `printer.service.ts:26-30` solo hace `console.log`. **Sin plugin BT/TCP**. Genera ZPL pero no lo envía |
| 2 | **NFC nativo** | ❌ simulado | `nfc.service.ts:17-21` devuelve un valor inventado. Sin plugin NFC nativo |
| 3 | **Autenticación / login GAM** | ❌ falta | `app.config.ts` sin interceptor; ninguna llamada lleva token |
| 4 | **URL de API quemada a `localhost`** | ⏸️ diferido | Ver [`bloque-a-config-api-pendiente.md`](bloque-a-config-api-pendiente.md). En pruebas no estorba; **bloquea planta** |
| 5 | **Captura kg/espesor falsos** | ❌ placeholder | `escanear.component.ts:240-245` manda `kg:25, espesor:1.2` fijos. Falta el formulario de cantidades |
| 6 | **Lecturas offline** | ❌ falta | `ProduccionService` pega directo a HTTP, sin fallback. La cola offline solo cubre escrituras |
| 7 | **Pantallas faltantes** | ❌ alcance | Paros/downtime, intercambio de silos, calidad/validación, perfil de operario |

## ✅ Hecho en esta sesión (2026-06-24) — Bloque B: integridad de datos en la cola

`sync-queue.service.ts` + sus tests. Dos correcciones de integridad:

1. **Idempotencia.** Cada operación viaja con header `Idempotency-Key: <op.id>`. El servidor puede deduplicar, evitando **registros duplicados** cuando una op se reenvía tras un timeout en que el servidor ya la había procesado.
2. **Fin del descarte silencioso de 4xx.** Antes, un error de cliente (400/403/404) se contaba como "éxito" y se borraba con solo un `console.error` → **pérdida silenciosa de capturas**. Ahora esas operaciones se mueven a una **bandeja de fallidos** (`sync_dead_letter`), visible vía `getDeadLetter()` / `deadLetterCount()`, para revisión manual. El 5xx/sin-red sigue reintentándose en la cola normal.

`FlushResult` ahora distingue: `succeeded` / `failed` (reintentable) / `deadLettered` (rechazado, requiere revisión).

**Verificación:** 13/13 tests pasan, incluyendo 4 nuevos: idempotency-key, 4xx→dead-letter, 5xx→reintento, y el flush exitoso existente.

### Pendiente que abre este cambio
- **UI de la bandeja de fallidos**: hoy `getDeadLetter()` existe pero ninguna pantalla la muestra. El operador/supervisor necesita verla y reintentar/corregir.
- **Soporte de idempotencia en el servidor**: el cliente ya manda `Idempotency-Key`; el API debe deduplicar por ese header para que sirva.
- **Backoff + tope de reintentos** en la cola (un 5xx persistente hoy se reintenta en cada evento `online`).

## Próximos pasos sugeridos (orden)

1. **Servidor**: deduplicar por `Idempotency-Key` (cierra el círculo del Bloque B).
2. **UI bandeja de fallidos** (consume `getDeadLetter()`).
3. **Captura real de cantidades** (#5) — quitar placeholders.
4. **Auth interceptor + login GAM** (#3).
5. **Bloque A** (#4) al salir de pruebas — ver doc dedicado.
6. **Impresión y NFC reales** (#1, #2) — sesión con hardware físico a la mano.
7. **Lecturas offline** (#6) y **pantallas faltantes** (#7).
