# Bloque A — Configuración de API por ambiente (DIFERIDO)

> **Estado: pendiente, por decisión del equipo.** No se ejecuta ahora porque la app **sigue en pruebas** contra el servidor local. Este documento deja registrado qué falta y cuándo hacerlo, para que no se olvide al pasar a planta/producción.

## Qué es

Hoy la dirección del servidor de la API está **quemada a mano** en el código:

- `src/app/core/services/produccion.ts:138` → `private apiUrl = 'http://localhost:5007/api/v1/produccion';`
- `src/app/features/captura/escanear/escanear.component.ts` (líneas ~235-257) → arma URLs `http://localhost:5007/...` a mano, duplicando la dirección.

## Por qué NO se hace ahora

La app está **en fase de pruebas** contra el servidor corriendo en la misma PC del desarrollador, donde `localhost:5007` **sí funciona**. Mientras siga así, cambiarlo no aporta y solo añade ruido. Decisión tomada: dejarlo como está por ahora.

## ⚠️ Por qué hay que hacerlo ANTES de instalar en celulares de planta

`localhost` significa "esta misma máquina". En un **celular físico**, `localhost` es el propio teléfono, no el servidor → **ninguna llamada conecta** (no cargan catálogos, no se guardan capturas). Es un bloqueante absoluto para salir de pruebas.

## Qué hacer cuando se retome

1. Crear archivos de entorno Angular:
   - `src/environments/environment.ts` (desarrollo) → `apiUrl: 'http://<IP-de-la-PC>:5007/api/v1'`
   - `src/environments/environment.prod.ts` (planta/producción) → `apiUrl: '<URL real del servidor>'`
2. `ProduccionService` lee `environment.apiUrl` en vez de la URL quemada.
3. `escanear.component.ts` deja de armar URLs a mano y llama a métodos de `ProduccionService` (p. ej. `guardarBobina(...)`) — **una sola fuente de verdad**.
4. Registrar `fileReplacements` de environments en `angular.json` para el build de producción.

**Dato requerido para ejecutarlo:** la IP/dominio real del servidor del ERP en la red de planta.

**Riesgo:** bajo (es reubicar un texto de configuración, no cambiar lógica). **Verificación:** `ng build` compila y las llamadas apuntan a la ruta correcta.
