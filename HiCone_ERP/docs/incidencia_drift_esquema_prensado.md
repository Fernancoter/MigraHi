# Incidencia: desincronización entidad ↔ base de datos (Troquel, Operario, CausaInterrupcion)

**Fecha del reporte:** 2026-08-05
**Módulo donde se detectó:** Prensado (pero el problema es transversal, no exclusivo de Prensado)
**Reportado por:** revisión de Prensado, verificando cada endpoint contra la base de datos real

## Resumen para el equipo

Al terminar el trabajo de Prensado (CRUD completo, columnas, navegación, MRD, función Imprimir), hicimos una auditoría cruzando **cada entidad de C# contra las columnas reales en SQL Server** (no solo contra el código). Encontramos que 3 entidades — `Troquel`, `Operario` y `CausaInterrupcion` — tienen propiedades en C# que **nunca se migraron a la base de datos**. El código compila perfecto (eso no lo detecta el compilador), pero **truena en tiempo de ejecución** con `Invalid column name '...'` en cuanto EF Core intenta leer o escribir esos campos.

Esto no lo causó el trabajo de Prensado de esta semana — la evidencia de Git muestra que la desincronización existe desde junio/julio. Lo que hicimos fue exponerla, porque Prensado tiene pantallas que dependen de esas 3 entidades (catálogo de Troqueles, selector de Operario y selector de Causa en Interrupciones).

## Causa raíz (para quien no conozca EF Core Migrations)

Este proyecto usa **Code-First**: las clases C# (`Troquel.cs`, `Operario.cs`, etc.) son la fuente de verdad del modelo, y cada cambio a una clase debería ir acompañado de un archivo de migración (`dotnet ef migrations add ...`) que genera el `ALTER TABLE` correspondiente. Si alguien agrega una propiedad a la clase pero **no genera la migración**, o la genera pero no se aplica contra la base compartida del equipo, la clase y la tabla real se desincronizan silenciosamente — no hay ningún aviso hasta que alguien ejecuta ese código específico.

Eso fue exactamente lo que pasó con estas 3 entidades.

## Evidencia

### 1. `Troquel`

| Columna esperada por la entidad | ¿Existe en `troqueles`? |
|---|---|
| `codigo` | ❌ No |
| `nombre` | ✅ Sí |
| `estado` | ❌ No |
| `is_active` | ❌ No |
| `productos_compatibles` | ❌ No |
| `observaciones` | ❌ No |
| `fecha_ultimo_mantenimiento` | ❌ No |
| `ciclos_acumulados` | ❌ No |
| `ciclos_video_mantenimiento` | ❌ No |

La tabla real solo tiene `id, nombre` + columnas de auditoría (`created_at`, `is_deleted`, `tenant_id`, etc.) — 8 de las 9 propiedades de negocio de la entidad no están.

**Git:** la entidad recibió estos campos el `2026-06-03` (commit `6b665a76`, "cambios de extrusion, seguridad") y se volvió a tocar el `2026-07-27` (commit `3d1fafee`, "Part One Frontend"). La migración base del proyecto (`InitialProductionBaseline`) se generó el `2026-07-02` — es decir, **la migración base ya nació sin estas columnas**, a pesar de que la entidad ya las tenía desde un mes antes.

### 2. `Operario`

| Columna esperada por la entidad | ¿Existe en `operarios`? |
|---|---|
| `numero_empleado` | ❌ No |
| `nombre_completo` | ❌ No |
| `especialidad` | ❌ No |
| `turno_preferido` | ❌ No |
| `is_active` | ❌ No |
| `nombre` *(alias de compatibilidad)* | ✅ Sí |
| `activo` *(alias de compatibilidad)* | ✅ Sí |

La entidad tiene propiedades `Nombre`/`Activo` marcadas como "retrocompatibilidad" que redirigen a `NombreCompleto`/`IsActive` — pero esas dos SÍ se mapean como columnas propias en EF (no están marcadas `[NotMapped]`), así que la tabla terminó con `nombre`/`activo` (de los alias) pero nunca se agregaron `numero_empleado`, `nombre_completo`, `especialidad`, `turno_preferido`, `is_active`.

**Git:** mismo commit del `2026-06-03` le agregó estos campos a `Operario`, y se tocó de nuevo el `2026-07-02` (commit `0d355691`, "Limpieza") — el mismo día que se generó la migración base, que aun así no incluyó estas columnas.

**Efecto colateral:** el `Seed` inicial del backend intenta insertar Operarios de prueba con estos campos → el arranque del backend siempre loguea `Invalid column name 'is_active'` (no tumba la app, pero el seed de Operarios/Turnos falla completo).

### 3. `CausaInterrupcion`

| Columna esperada por la entidad | ¿Existe en `causas_interrupcion`? |
|---|---|
| `codigo` | ❌ No |
| `descripcion` | ✅ Sí |
| `tipo` | ❌ No |
| `is_active` | ❌ No |
| `orden_visual` | ❌ No |
| `prensa` | ❌ No |
| `extrusora` | ❌ No |

La tabla real solo tiene `id, descripcion` + auditoría.

**Git:** la entidad se creó el `2026-06-03` ya con `Codigo/Tipo/IsActive/OrdenVisual`, y se le agregaron `Prensa`/`Extrusora` el `2026-07-27`. La migración base (`2026-07-02`) solo generó `descripcion`.

## Impacto concreto (qué se rompe al usarlo)

| Pantalla | Qué falla | Por qué |
|---|---|---|
| Prensado → Troqueles (catálogo) | La página no carga la lista — error 500 | `GET /catalogos/troqueles` hace `SELECT` de columnas que no existen |
| Prensado → Prensados → Modificar → selector Troquel | Selector vacío/con error | Mismo endpoint de arriba |
| Prensado → Prensados → Modificar → selector Operario | Selector vacío/con error | `GET /operarios` selecciona `numero_empleado, nombre_completo, especialidad, is_active` |
| Prensado → Interrupciones → Agregar/Modificar → selector Causa | Selector vacío/con error | `GET /causas-interrupcion` filtra por `is_active`/`orden_visual` |
| Extrusión → Interrupciones → mismo selector de Causa | Mismo error | `CausaInterrupcion` es compartida entre Prensado y Extrusión |
| Arranque del backend | Log de error en cada inicio (no crítico) | El seed intenta insertar Operarios con campos inexistentes |

## Lo que SÍ está sano en Prensado

Todo lo demás del módulo (Prensados, Carreras, Carretes, Palets, listados de Interrupciones sin el selector de causa, Prensa Producto, Producto Terminado con MRD, navegación, función Imprimir) corre contra tablas correctamente sincronizadas y fue verificado con `ng build` + pruebas directas contra la base de datos.

## Qué necesitamos validar con el equipo

1. **¿Estos 3 catálogos (Troquel, Operario, Causa de Interrupción) tienen datos reales en producción/staging que no podemos perder?** Si sí, el fix debe ser una migración aditiva (`ALTER TABLE ADD COLUMN`) — no se puede recrear la tabla.
2. **¿Los campos que le sobran a la entidad (`ProductosCompatibles`, `TurnoPreferido`, `Prensa`/`Extrusora` en Causa, etc.) siguen siendo necesarios?** Si alguno ya no aplica, es más simple quitarlo de la entidad que agregarlo a la base.
3. **¿Alguien del equipo tiene el contexto de por qué la migración base se generó sin estos campos?** Ayuda a saber si fue un olvido puntual o si hay más entidades con el mismo problema fuera de Prensado/Extrusión.

Una vez confirmado esto, el fix es mecánico: generar una migración `dotnet ef migrations add AddCamposFaltantes...` por cada entidad y aplicarla contra la base compartida.
