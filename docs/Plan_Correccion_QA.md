# Plan de Implementación y Corrección — Reporte QA HiCone ERP

**Fuente:** `docs/Reporte_Casos_de_Prueba_QA.xlsx` (18 casos ejecutados, 17 fallidos según hoja Resumen; 17 con estado "Falló" en detalle)
**Fecha del análisis:** 2026-07-16
**Código analizado:** `MigraHi/HiCone_ERP` (backend .NET `HiCone.API` puerto 5007 + frontend Angular `hicone-web` puerto 4200)

---

## 1. Casos fallidos y causa raíz rastreada en el código

### Módulo Login / Seguridad

| Caso | Falla reportada | Causa raíz encontrada | Archivo(s) |
|------|----------------|----------------------|------------|
| **CP-006** (Media) | Aunque se desactive la opción, siempre pide cambiar contraseña a usuarios nuevos | El backend respeta la bandera (`CreateUserAsync` asigna `dto.MustChangePassword`), pero `CreateUserDto.MustChangePassword` tiene default `= true`: si el JSON no incluye el campo (o llega con otro nombre), queda en `true`. Requiere reproducir con red inspeccionada | `Core/HiCone.Application/Services/Identity/IdentityService.cs` (línea 68 DTO, línea 338 asignación), `usuarios.component.ts` |
| **CP-007** (Media) | "Olvidaste contraseña" no envía correo | SMTP configurado como placeholder: `Host: localhost, Port: 25`, sin credenciales. Nunca se conectó un servidor real | `Presentation/HiCone.API/appsettings.json` (sección `Smtp`), `Infrastructure/Services/EmailService.cs` |
| **CP-008** (Alta) | Usuario registrado desde login "no se crea a nivel seguridad" | `AuthController.Register` busca el rol **"Operario"**, pero los roles sembrados son `Unknown, Administrator, Operador, Supervisor, Mantenimiento` → el usuario se crea **sin ningún rol ni permiso** y sin registro de Operador | `Presentation/HiCone.API/Controllers/AuthController.cs:123`, `Infrastructure/HiCone.Persistence/Seeds/ApplicationDbContextSeeder.cs:1431` |
| **CP-013** (Baja) | El borde rojo de validación no se limpia al corregir el campo | La lógica `isFieldInvalid` (invalid && dirty/touched) es correcta en código; falla de refresco de vista a reproducir (posible interacción señales/change detection). Requiere depuración en runtime | `Frontend/.../features/auth/login/login.component.ts:421` |
| **CP-031** (Baja) | Dashboard de seguridad no muestra indicadores | Los KPI están **hardcodeados como "—"** en el template; nunca se conectaron a servicios | `Frontend/.../features/seguridad/inicio/` (kpi-value estáticos) |
| **CP-033** (Media) | Exportar usuarios a Excel no funciona | Funcionalidad stub: muestra `alert("...en preparación (Paso 2)")`; en backend `ExportUsersToExcelAsync` es scaffolding sin implementar | `usuarios.component.ts:411-416`, `IdentityService.cs:213-215` |

### Módulo Extrusión

| Caso | Falla reportada | Causa raíz encontrada | Archivo(s) |
|------|----------------|----------------------|------------|
| **CP-014** (Baja) | Dashboard de inicio sin información; "tablero directo" con datos falsos y sin botón regresar | Al fallar la carga del API el componente ejecuta `cargarMocks()` con datos hardcodeados (operarios, extrusoras ficticias). La vista tablero (`?tablero=true`) no tiene botón de regreso | `Frontend/.../produccion/extrusion-inicio/extrusion-inicio.ts:780-860` |
| **CP-015** (Media/Alta) | "Ocurrió un error en el servidor al cargar plantilla" en turnos por semana | `GetTurnosSemana` asigna `OperarioId = defaultTenantId` (un GUID que **no es un operario**) cuando no hay operarios/asignaciones → violación de llave foránea → 500. Además `DateTime.Parse` sin cultura fija y `Substring` sobre nombres cortos son fallas latentes | `Presentation/.../Controllers/ProduccionController.cs:439-525` |
| **CP-017** (Alta) | No se puede seleccionar número de extrusora ni turno; no se puede confirmar | Los `<select>` se llenan de los catálogos `claves` y `turnos`; si están vacíos no hay opciones que elegir y los campos requeridos bloquean el guardado. No hay mensaje ni alta rápida de catálogo | `Frontend/.../produccion/extrusoras-list/extrusoras-list.ts:176-217, 534-545` |
| **CP-018** (Alta) | Error 400 al agregar Extrusora-Producto | **Desalineación de rutas**: el frontend hace `POST api/v1/produccion/extrusora-productos`, pero ese endpoint solo existe como GET; el POST real está en `referencias/extrusora-producto` (otro controlador, singular) | `Frontend/.../core/services/produccion.ts:303-308`, `ProduccionController.cs:435`, `ReferenciasController.cs:115` |
| **CP-019** (Alta) | Operación > Extrusiones pide campos que no se pueden ingresar | Misma dependencia de catálogos vacíos + formulario con requeridos sin datos seleccionables (mismo patrón que CP-017). Confirmar en runtime tras corregir CP-017/CP-018 | `Frontend/.../produccion/extrusiones-list/extrusiones-list.ts` |
| **CP-020** (Alta) | No hay botón para agregar bobinas | El componente `bobinas-list` **no tiene ninguna función de alta** (no existe "agregar/crear" en el código). Las bobinas se crean vía `POST extrusion/guardar-bobina` desde el flujo de operación, pero la vista de lista no lo expone | `Frontend/.../produccion/bobinas-list/bobinas-list.ts` (660 líneas, sin alta), `ProduccionController.cs:158` |

### Módulo Inventario

| Caso | Falla reportada | Causa raíz encontrada | Archivo(s) |
|------|----------------|----------------------|------------|
| **CP-021** (Baja) | Permite crear silo con máximo mayor a la capacidad | `CreateSiloAsync` **no tiene ninguna validación de negocio** (ni Kg máx ≤ capacidad, ni mínimo < máximo) | `Core/.../Services/Inventario/InventarioService.cs:64-81` |
| **CP-022** (Media) | Permite duplicar código de silo | `CreateSiloAsync` no verifica unicidad de `Codigo` antes de insertar | Mismo método |
| **CP-024** (Baja) | La auditoría del silo muestra un correo que no es el del usuario | `CurrentUserService.Email` está **hardcodeado**: `=> "admin@hicone.com"`; el interceptor de auditoría siempre registra ese correo | `Infrastructure/Services/CurrentUserService.cs:8`, `Persistence/Interceptors/AuditLogInterceptor.cs:54` |
| **CP-029** (Alta) | El reporte de cierre de mes se genera pero está vacío | El snapshot de productos se crea con `CantidadSistema = 0, CantidadReal = 0` (no toma existencias reales) y **no existe endpoint GET de detalle del cierre** para consultarlo después | `Presentation/.../Controllers/ExistenciasHistoricoController.cs:41-85` |
| **CP-030** (Alta) | El módulo Inventario (inicio) no muestra información | El componente es un **cascarón estático**: clase vacía y template con empty-state fijo "No hay datos estadísticos disponibles" | `Frontend/.../inventario/inicio/inicio.ts` (clase vacía), `inicio.html` |

### Observaciones en casos que "pasaron" (deuda a corregir)

| Caso | Observación | Causa |
|------|------------|-------|
| CP-002/003 | Cambiar mensaje "credenciales invalidas" por "Usuario o contraseña incorrectos" | Texto en `Infrastructure/Identity/IdentityService.cs:54` y `:88` |
| CP-010 | La hora del bloqueo temporal se muestra incorrecta | `LockoutEnd` se guarda/muestra en **UTC** sin convertir a hora local (`IdentityService.cs:57-59, 85`) |
| CP-012 | No muestra mensaje al intentar entrar sin credenciales | El formulario solo marca campos; agregar mensaje general |
| CP-009 | Sustituir descarga de APK por redirección a PWA | Botón en pantalla de login |
| CP-025/028 | PDF de silos/lotes con datos falsos (teléfono, etc.) | Encabezado hardcodeado en `core/services/pdf-export.service.ts` |
| CP-026 | Al seleccionar silo en lote se muestra un cero de más (67,000 → 670,000) | Error de formato/binding en el modal de lote |

---

## 2. Plan de corrección por fases

Criterio de orden: primero lo que **bloquea flujos completos** (severidad Alta), luego integridad de datos, después seguridad/infraestructura y al final pulido UX. Cada fase termina con verificación de los casos de prueba que cubre.

### Fase 1 — Desbloquear Extrusión (severidad Alta) · CP-017, CP-018, CP-019, CP-020, CP-015

Objetivo: que el flujo completo extrusora → producto → extrusión → bobina sea operable.

1. **CP-018 — Alinear rutas de Extrusora-Producto.** Agregar `POST/PUT/DELETE extrusora-productos` en `ProduccionController` (o apuntar el servicio Angular a `referencias/extrusora-producto`). Unificar el DTO esperado para eliminar el 400.
2. **CP-017 — Modal de extrusora.** Sembrar/verificar catálogos `CatalogoClave` (números de extrusora) y `Turnos`; en el frontend mostrar mensaje claro cuando el catálogo esté vacío con enlace a su alta, o permitir captura manual del número.
3. **CP-019 — Operación > Extrusiones.** Reprobar tras 1 y 2; corregir los campos requeridos que no tienen control de captura (mismo patrón de catálogos vacíos).
4. **CP-020 — Alta de bobinas.** Agregar botón "Agregar" en `bobinas-list` que consuma `POST extrusion/guardar-bobina` (endpoint ya existente), con modal de captura.
5. **CP-015 — Turnos por semana.** En `GetTurnosSemana`: no crear extrusiones si no hay operarios (devolver 400 con mensaje claro en vez de usar `defaultTenantId` como `OperarioId`); usar `DateTime.ParseExact`/`TryParse` con formato fijo; proteger el `Substring` de nombres cortos. Mostrar en el frontend el mensaje real del servidor en lugar del texto genérico.

**Verificación:** re-ejecutar CP-015, 017, 018, 019, 020.

### Fase 2 — Integridad de datos en Inventario · CP-021, CP-022, CP-029, CP-030

1. **CP-021/CP-022 — Validaciones de silo.** En `CreateSiloAsync` (y `UpdateSiloAsync`): rechazar `KgMaximo > CapacidadMaxima`, `KgMinimo >= KgMaximo` y `Codigo` duplicado (índice único en BD + validación con mensaje). Replicar las validaciones en el formulario Angular.
2. **CP-029 — Cierre de mes.** Al crear el cierre, poblar `CantidadSistema` con la existencia real de cada producto; agregar endpoint `GET ExistenciasHistorico/{id}` con los detalles (silos y productos) y conectar la vista de detalle/reporte.
3. **CP-030 — Inicio de Inventario.** Implementar el dashboard: total de silos, % de llenado, lotes activos, últimas existencias (endpoints ya disponibles en `InventarioController`); reemplazar el empty-state estático.

**Verificación:** re-ejecutar CP-021, 022, 023 (regresión), 029, 030.

### Fase 3 — Seguridad e infraestructura · CP-008, CP-006, CP-007, CP-024, CP-033, CP-031

1. **CP-008 — Registro desde login.** Corregir `AuthController.Register`: usar el rol sembrado `"Operador"` (o crear el rol si no existe) para que el usuario nazca con rol y permisos; devolver error visible si la asignación falla.
2. **CP-006 — Bandera "debe cambiar contraseña".** Reproducir con las herramientas de red; corregir el punto donde se pierde la bandera (candidato: default `= true` del DTO cuando el campo no viaja u orden de binding). Agregar test de integración: crear usuario con bandera apagada → login directo sin pedir cambio.
3. **CP-007 — SMTP.** Configurar servidor SMTP real (host, puerto, credenciales, SSL) vía `appsettings`/variables de entorno; nunca en el repositorio. Probar "olvidé contraseña" de punta a punta.
4. **CP-024 — Auditoría con usuario real.** Reescribir `CurrentUserService` para leer el correo/ID de los claims del JWT (`IHttpContextAccessor`) en lugar del valor fijo `admin@hicone.com`. Esto también corrige `CreatedBy/UpdatedBy` de todas las entidades.
5. **CP-033 — Exportar/Importar usuarios a Excel.** Implementar `ExportUsersToExcelAsync` (ClosedXML/EPPlus) y conectar el botón; retirar los `alert` de stub.
6. **CP-031 — Dashboard de seguridad.** Conectar los KPI (usuarios activos, roles, permisos) a los endpoints existentes de `UsersController`/`RolesController`.

**Verificación:** re-ejecutar CP-005, 006, 007, 008, 024, 031, 032, 033.

### Fase 4 — UX y pulido (severidad Baja + observaciones) · CP-013, CP-014 y observaciones

1. **CP-013 — Limpieza de validaciones en login.** Reproducir y corregir el refresco del borde rojo/mensaje al teclear.
2. **CP-014 — Inicio de Extrusión.** Eliminar `cargarMocks()` y datos hardcodeados: en error mostrar estado de error real con opción de reintento; agregar botón "Regresar" al Tablero Directivo; conectar estadísticas reales.
3. **Mensajes de login (CP-002/003, CP-012).** Cambiar "Credenciales inválidas." por "Usuario o contraseña incorrectos"; mostrar mensaje al enviar sin credenciales.
4. **CP-010 — Hora de bloqueo.** Convertir `LockoutEnd` a hora local (o enviar UTC y formatear en el cliente).
5. **CP-025/028 — PDF.** Sustituir datos falsos del encabezado (teléfono, dirección) por datos de empresa configurables.
6. **CP-026 — Cero de más al seleccionar silo en Lote.** Corregir el binding/formato de capacidad en el modal.
7. **CP-009 — Botón APK → PWA.** Cambiar la descarga del APK legado por redirección/instalación de la PWA.

### Fase 5 — Regresión y cierre

1. Re-ejecutar los 18 casos del Excel más los flujos tocados (regresión de login, extrusión completa, inventario completo).
2. Actualizar `Reporte_Casos_de_Prueba_QA.xlsx` con resultados, evidencias y fechas.
3. Corregir de paso la fórmula del Resumen (hoy marca 16 "Pasó" + 17 "Falló" con 18 casos totales y "% Avance 1.83": los rangos de las fórmulas no cuadran con las filas reales).

---

## 3. Riesgos y dependencias

- **Fase 1 depende de datos semilla**: varios fallos de extrusión son combinación de bug + catálogos vacíos; conviene definir un seed mínimo de QA (turnos, claves, operarios) para que las pruebas sean reproducibles.
- **CP-024 (CurrentUserService) toca a todo el sistema**: al dejar de ser un valor fijo, cualquier endpoint sin JWT válido registrará "Sistema"; probar auditoría en los tres módulos.
- **SMTP (CP-007) requiere decisión de negocio**: proveedor (Office365, Gmail workspace, SendGrid...) y credenciales; es el único punto no resoluble solo con código.
- **CP-006 y CP-013 requieren reproducción en runtime** antes de codificar; el análisis estático no muestra el defecto de forma concluyente.
