# Project Memory: HiCone ERP Modernization

## Rama Activa
`QA` — sincronizada y actualizada en remoto (`origin/QA`). Servidores operativos: Backend (5007), Web (4200), Móvil (4201).

## Estado Actual (2026-08-11)
- **Backend (.NET API):** Operativo en `http://localhost:5007` y Swagger en `http://localhost:5007/swagger` (dotnet run).
- **Frontend Web (`hicone-web`):** Operativo en `http://localhost:4200` (ng serve). Compilación con 0 errores y 11 suites de pruebas unitarias Vitest pasando al 100%.
- **Frontend Móvil (`hicone-mobile`):** Operativo en `http://localhost:4201` (ng serve --port 4201). Compilación con 0 errores y 5 suites de pruebas unitarias Vitest pasando al 100%.
- **Hardware Industrial & Pipelines (MOB-03, MOB-04, WEB-01, WEB-02, WEB-03):**
  - Drivers de impresión Zebra ZPL II (Red TCP 9100, Bluetooth BLE y descarga ZPL) y NFC NDEF (`printer.service.ts`, `nfc.service.ts`).
  - Desacopladas 22 URLs fijas en `hicone-web` mediante `environment.apiUrl`.
  - Roles y permisos reales preservados en `auth.service.ts` con soporte superusuario `admin` / `hicone123`.
  - Pipelines de Vitest en Web y Móvil configurados con JSDOM y BrowserTestingModule (100% pruebas en verde).

✅ **Reporte de Existencia y Columnas de Extrusión COMPLETADOS** (2026-06-29)
- [x] **Backend API**: Implementado listado de cortes (`GET /api/v1/inventario/existencias`) y seeding automatizado de datos de Silos y Existencias.
- [x] **Reporte Existencia Component**: Creado componente Angular Standalone con filtros de cortes y categorías, y tabs para stock en Silos y Productos.
- [x] **Resumen Extrusión**: Integradas las columnas `revHusilloMolido` y `revHusilloVirgen` en listados, PDFs y Excel.
- [x] **Terminal Guardian (The Customs Guard)**: Implementado interceptor de comandos en Node.js para ejecución segura y autónoma.
- [x] **Gestión de Contexto**: El Guardian mantiene el estado del directorio actual (CWD) para navegaciones complejas.
- [x] **Whitelist/Blacklist**: Filtro robusto que previene operaciones destructivas (rm, rf, etc.) y permite `dotnet`, `npm` y `git`.
- [x] **Reinicio de Servidores**: Backend y Frontend operativos bajo supervisión del entorno de trabajo.

The project is in the initial phase of modernization/migration from a GeneXus-based ERP to a modern Angular + .NET platform. The focus is currently on the **Authentication Module**.

## Completed Tasks
- [x] **Analysis of Reference System**: Analyzed `erphi-cone.com` login behavior and visual requirements.
- [x] **Base Authentication Infrastructure**:
    - Implemented `AuthService` for session and persistence management.
    - Implemented `AuthGuard` to protect private routes.
- [x] **Login Component Modernization**:
    - Migrated to Reactive Forms.
    - Implemented "Remember Me" logic.
    - Integrated external links (Register, Forgot Password, APK Download).
    - Premium glassmorphism UI/UX implementation with official **Hi-Cone Branding**.
    - Proper validation handling (GAM18/GAM79 matching styles).
    - **Branding Update**: Integrated official Hi-Cone logo and removed temporary placeholders.
    - **Security/UX**: Added password visibility toggle with interactive SVG icons.
- [x] **Refactor de Arquitectura de Permisos (Many-to-Many)**:
    - Se implementaron las entidades `SecurityApplication` y `SecurityApplicationPermission`.
    - Se migraron los 878 permisos a una estructura relacional donde un permiso puede pertenecer a múltiples aplicaciones.
    - Se crearon 4 aplicaciones base: `GAM Backoffice`, `HICONE`, `ReportesHICONE` y `KBS2022_HiCone2022`.
    - Se automatizó la vinculación en el Seeder.
- [x] **Migración Masiva de Permisos FINALIZADA**:
    - Se migraron los **878 permisos** totales desde el sistema legacy (GeneXus).
    - Consolidación total de módulos: **GAM Backoffice** y **HICONE/Reportes**.
    - Inyección automatizada en Backend (`ApplicationDbContextSeeder.cs`) mediante lotes validados.
    - **Refactor de Paginación**: Implementación de lógica "Sliding Window" en el frontend.
    - **Mejoras de Organización**: Ordenamiento alfabético y buscador dinámico.
- [x] **Visual Identity & Infrastructure**:
    - Created `public/assets/images` directory for graphic resource management.
    - Integrated `login-bg.png` as high-resolution background for the login screen.
    - Configured background with `background-size: cover` and precise centering to highlight the product.
    - Added dark linear-gradient overlay to improve text legibility while maintaining the glassmorphism effect.
    - Migrated global theme in `styles.scss` from blue to corporate green (`#10b981`).
    - Ajusted shadows, glows, and interactive elements to harmonize with the new brand palette.
- [x] **Generación de Reporte de Estructura**: Se analizó el entorno heredado (`HiCone6`) identificando que la lógica existe como metadatos encriptados/comprimidos (base de datos `.mdf` y `kb.data`) exclusivos para el IDE de GeneXus. El reporte fue guardado como `reporteEstructura.md`.
- [x] **Módulo de Producción - Extrusión (Segunda Etapa) COMPLETADO**:
    - **Filtros Dinámicos**: Implementación de 4 tipos de popovers en encabezados (Ordenamiento, Búsqueda, Rangos y Estados Booleanos).
    - **Modal de Edición**: Actualización del campo de operador a un selector dinámico conectado a la base de datos.
    - **Infraestructura**: Nuevo endpoint PATCH en el backend y método en el servicio para actualizaciones parciales de operadores.
    - **UI/UX**: Refinamiento de estilos para paneles flotantes y alineación inteligente de headers.
- [x] **Módulo de Producción - Bloque de Información (Bobinas) REFACTORIZADO Y CORREGIDO**:
    - **Estructura por Renglones**: El modal de edición ahora organiza la información en 4 renglones horizontales (R1: Dimensiones, R2: Pesos/Estado, R3: Tiempos, R4: Pares) para una lectura clara.
    - **Gestión de Acciones Corregida**: Se solucionaron problemas de visibilidad en el menú desplegable "!" y se mejoró la navegación del submenú de exportación (hover estable).
    - **Eliminación Segura**: Se implementó un modal de confirmación personalizado (UI Premium) que reemplaza la alerta nativa y ejecuta el borrado real en backend y state.
    - **Localización**: Consolidación total de términos en español.
- [x] **Módulo de Producción - Prensado (Tercera Etapa) COMPLETADO**:
    - **Tablero de Prensado**: Desarrollo completo de las tablas de Programación y Operación.
    - **Programación Prensado**: Columnas con 3 espacios iniciales vacíos, Fecha Prensado, Prensa, Turno, Producto, Operador y Cantidad Programada. Filtros dinámicos interactivos y ordenación habilitada.
    - **Operación Prensado**: Visualización en vivo con columnas para Estado, Acciones (Editar/Eliminar), Menú "!" (Hover con Submenú de Exportación y Selección de Columnas), Turno, Producto, Operador, Programado, Prensa, Producido, Tiempo Interrupción y En Curso.
    - **Modal de Edición Prensado**: Selector dinámico para Prensa y Operador conectados al catálogo del servicio, con estados de carga e interactividad premium.
    - **Menú de Acciones "!"**: Hover de exportación estable y modal de confirmación de borrado de Prensado integrado y funcional.
- [x] **Funcionalidad de Exportación (Excel y PDF) CORREGIDA Y COMPLETADA**:
    - **Exportar a Excel**: Generación de archivos `.xlsx` estructurados con SheetJS (`xlsx`). Respeta de forma precisa los filtros aplicados en las tablas y mantiene cabeceras en español bien formateadas.
    - **Exportar a PDF**: Generación de reportes estéticos en `.pdf` con `jsPDF` y `jspdf-autotable`. Columnas alineadas, tipografía corporativa y aplicación inmediata de los filtros actuales en pantalla.
    - **Descarga Automática**: Flujo de descarga nativa instantánea para ambos formatos al hacer clic desde el menú desplegable "!".
- [x] **Ajustes y Desarrollo Continuo del Módulo de Prensado**:
    - **Idioma y Terminología**: Traducción total de términos a español (`Ancho`, `Calibre`, `Longitud`) y renombrado estricto de `Largo` a `Longitud`.
    - **Ampliación de Persistencia Real (SQL Server)**: Se agregaron `KgVirgen`, `Target`, `KgMolido`, `ProcessStart`, `ProcessEnd` y `LoteSilo` a la entidad `Prensado`, actualizando DTOs, endpoint y aplicando la migración Entity Framework Core.
    - **Modal de Edición Renovado**: Estructuración del modal con Renglón de Información Adicional (Virgen Kg, Meta, Molido Kg, Estado), Renglón de Tiempos de Proceso (Inicia Proceso, Fin Proceso) y Lote Silo.
    - **Subtabla Expandible "Carreras Registradas"**: Activada con el icono `!` en la columna 4. Renderiza columnas `Bobina`, `Reposo (Hr)`, `Carreras`, `En Proceso`, `Terminadas`, `Validadas` y `Carretes`. Habilitados accesos directos de exportación local en subtabla.
    - **Popovers Dinámicos de Cabecera**: Prensa, Turno, Producto y Operario incluyen inputs de búsqueda y sugerencias rápidas autoejecutables. Campos numéricos de rango (Producido, Tiempo Interrupción) incorporan botón explícito `Buscar`.
- [x] **Nueva Pantalla de Catálogo de Operarios**:
    - **Vista Premium**: Diseñada de forma independiente en `/produccion/operarios` con consumo de servicio API real de la base de datos.
    - **Barra de Acciones**: Exportar (CSV/PDF), Seleccionar columnas (popover reactivo con checkboxes), Agregar (+) y buscador interactivo en vivo.
    - **Estructura y Paginación**: Grilla de 5 columnas (Ver, Editar, Borrar, Nombre, Activo) con cabecera de Activo interactiva con opciones de ordenamiento y fijación. Paginación por ventana deslizante.
    - **Modales de Operario**: Modal de solo lectura para "Ver" y editable con botones "Confirmar" y "Cancelar" para "Editar" y "Crear".
- [x] **Nueva Pantalla de Catálogo de Productos**:
    - **Ubicación**: Creado en `/produccion/productos` y registrado en `app.routes.ts`.
    - **Estructura Premium**: Réplica exacta de la grilla de Operarios con barra superior, selector de columnas y exportación a Excel (CSV)/PDF.
    - **Modal Información General**: Implementa campos "SAE Product" (con selector interactivo y lista desplegable de códigos SAE simulados que autocompletan el nombre) y "Categoría" (cargada dinámicamente desde el backend).
    - **Filtros e Interactividad en Cabeceras**: Se incorporó el sistema de Popovers Dinámicos (búsquedas en vivo, ordenamiento, filtrado por rangos de precio unitario y cálculo autogenerado de valores más frecuentes) idéntico a la experiencia del Tablero de Extrusión para absolutamente todas las columnas.
- [x] **Ajustes y Reestructuración de la Sección de Inicio del Módulo de Extrusión**:
    - **Exportación a PDF Corregida**: Se migró `jspdf-autotable` a la importación ESM estándar `import autoTable from 'jspdf-autotable'` y se actualizó la llamada para solucionar el error en tiempo de ejecución.
    - **Limpieza Estructural**: Se removieron todos los elementos agregados por error del submódulo de Operarios de la pantalla de inicio, dejándola limpia en su estado nativo de monitoreo.
- [x] **Refactor de Catálogo de Productos (Vista Legacy)**:
    - **Rediseño Full-Page**: Eliminación del modal flotante y migración de "Visualizar/Modificar" a una vista de formulario a pantalla completa con navegación interna.
    - **Estructura Clásica**: Maquetación de la cabecera invertida, acordeón interactivo de Información General con diseño grid nativo.
    - **Auditoría visual**: Maquetación de las tablas de "Historial de Auditoría" (Change Log y Detail).
- [x] **Nuevo Módulo Front-End: Turnos por Semana**:
    - **Enrutamiento**: Pantalla accesible en `/produccion/turnos-semana` y enlazada correctamente en la barra lateral.
    - **Gestión de Pestañas**: Sistema dinámico entre "Extrusoras" y "Prensas" con actualización en tiempo real de cabeceras de tablas.
    - **Interactividad Flotante**: Se integraron paneles tipo popover para el Calendario (selección de Fecha Inicio/Fin) y menú de Acciones del Grid (Exportación y ocultamiento de columnas).
    - **Distribución de Turnos**: Maquetación de las tres parrillas (1er, 2do y 3er Turno) con soporte para selectores de operadores y controles semanales (Lunes a Domingo).


## Technical Decisions
- **Standalone Architecture**: Using Angular Standalone Components for the entire frontend.
- **Session Management**: Currently simulated with LocalStorage persistence for developer preview; ready for JWT integration.
- **Validation**: Using Reactive Forms for real-time feedback and server-simulated error messages.
- **Reactivity**: Converted `allPermissions` to Angular Signals in the Roles component for improved performance and real-time UI updates.
- **Bundle Optimization**: Increased the initial bundle budget in `angular.json` to 3MB to accommodate large libraries (xlsx, jspdf) for correct production building.

## Next Steps
- [ ] Integración final de permisos con el backend real cuando se ejecute el seeder en producción.
- [ ] Implementar páginas de Registro y Recuperación de contraseña (actualmente placeholders).
- [ ] Resolver advertencias de precisión decimal en entidades financieras detectadas durante el build.

## Notes
- Se completó la carga de todos los archivos PDF proporcionados.
- La arquitectura ahora permite escalar a múltiples aplicaciones compartiendo el mismo catálogo de permisos.
- Se renombró el módulo legacy "GAM" a "GAM Backoffice" para mayor claridad.
- Se forzó la recreación de la base de datos para aplicar el cambio estructural.
- El proyecto compila al 100% de manera exitosa y limpia (`exit code: 0`).
- **Servidores levantados localmente**:
  - **Backend**: Disponible en `http://localhost:5007` (dotnet run).
  - **Frontend**: Disponible en `http://localhost:4200` (ng serve).
- **Pruebas unitarias corregidas y pasando al 100%** (11/11 tests aprobados):
  - Se configuró `vitest.config.ts` para evitar timeouts en Windows ejecutando en modo single-fork.
  - Se corrigieron las importaciones rotas de componentes de listas y se mockearon las llamadas HTTP directas en los specs.


## 2026-06-02: Implementación de Catálogo de Silos y Catálogos Materiales
- Se rediseñó e implementó el catálogo de **Silos** en el Frontend (Angular) bajo los nuevos estándares de diseño.
- Se implementaron los catálogos en BD para CatEstadoMaterial (Virgen, Molido, Polvo) y CatTipoMaterial (PCR, HDPE, LDPE).
- Se configuraron los dropdowns en la vista de Silos enlazados dinámicamente con los catálogos del backend.
- Se implementó la funcionalidad 'Archivar' (soft delete u ocultamiento de listas) para el catálogo de Silos en Backend y Frontend.
- Los submódulos completados a la fecha son: Turnos, Prensas, Extrusoras, Operarios, Productos, Categorías y Silos.

## 2026-06-03: Módulo de Referencias y Correcciones en Navegación
- Se corrigió el bug de navegación y contexto global en navigation.service.ts que redirigía erróneamente 'Silos' a 'Inventario' al interceptar la ruta.
- Se agregó e integró la pantalla de **Configuración** (/produccion/referencias/configuracion) con un formulario modal para agregar nuevas claves-valor.
- Se diseñaron e implementaron exitosamente las vistas de **Extrusora Producto** y **Extrusora Mezcladora** en /produccion/referencias utilizando estructuras de datos simuladas alineadas con el diseño visual del sistema.
- Se implementó la vista de **Prensa Producto** con su modal de información general e historial de auditoría estático, registrándose exitosamente en las rutas principales.
- Se resolvieron errores de guardado en Extrusora Producto reiniciando el servicio Backend, y se ajustó el layout de tablas (botones de acciones a la izquierda) y modos readonly ("Visualizar") en todos los submódulos de Referencias implementados hoy.

## 2026-06-09: Estandarización UI/UX y Exportación del Módulo de Producción
- **Exportación Excel Auténtica**: Integración global de `xlsx` (SheetJS) en los 10 módulos de catálogos y referencias (Productos, Categorías, Turnos, Extrusoras, Prensas, Silos, Extrusora Producto, Extrusora Mezcladora, Prensa Producto, Producto Terminado). Ahora generan archivos `.xlsx` reales con celdas delimitadas correctamente.
- **Limpieza de Datos**: Se erradicaron los datos hardcodeados (`getMockData`) de las vistas de referencias (Extrusora Mezcladora, Prensa Producto y Producto Terminado), enlazándolos a la carga desde las APIs correspondientes y mejorando las pantallas de carga vacías.
- **Estandarización UI**: 
  - Todos los botones de filtro ahora utilizan uniformemente el icono de **embudo** (SVG) en sustitución del engrane.
  - Las acciones de las tablas (Visualizar, Modificar, Eliminar) se trasladaron a la izquierda (fijas) en Producto Terminado, con diseño en tres columnas.
  - Implementación global de directiva de colapso automático (`ClickOutsideDirective`) en menús contextuales y selectores de columnas.
- **Fijación de Errores TypeScript**: Se resolvieron problemas de tipado durante el build (NG5002 y TS2339) para garantizar la compilación 100% exitosa del Frontend.

## 2026-07-20: Corrección de Extrusora Producto y Migración de Base de Datos
- **Base de Datos**: Se aplicó la migración pendiente de Entity Framework Core `AddEmbarqueProperties` en el servidor local SQL Server (`HiCone_ERP_V3`), lo que resolvió el error de columna inexistente `bobina_interrupciones_id` al consultar extrusiones.
- **Rutas de API en Extrusora-Producto**: Se modificaron las rutas del frontend en `ProduccionService` para apuntar a `/referencias/extrusora-producto` (el CRUD real) en lugar del endpoint genérico `/extrusora-productos` que generaba errores 400.
- **Mapeo de DTO Extrusora-Producto**: Se corrigió el método `save()` en `ExtrusoraProductoListComponent` para mapear los campos del formulario al DTO esperado por el backend (`ExtrusoraProductoDto`), resolviendo problemas de campos requeridos vacíos (como `ProductoNombre`).
- **Alineación de Modelos**: Se ajustó la proyección del controlador en el backend (`GetExtrusoraProductos`) para devolver objetos anidados `Extrusora` y `Producto` con los nombres de propiedad correctos, lo que permitió que la grilla y el formulario de edición en el frontend lean y carguen la información de forma correcta.
- **Servidores e Integridad**: Servidores iniciados de manera exitosa y pruebas de frontend pasando al 100%.
- **Optimización de Base de Datos (Extrusiones y Prensados)**: Se identificó que las propiedades alias para retrocompatibilidad en las entidades C# (`Extrusion` y `Prensado`) estaban generando columnas redundantes duplicadas en SQL Server. Se agregaron atributos `[NotMapped]` en `Status`, `KgVirgen`, `KgMolido`, `Target`, `ProcessStart`, `ProcessEnd` y `MaquinaId`, y se ejecutó la migración `20260720231252_OptimizeExtrusionAndAddInterrupcionesColumn` para eliminar físicamente estas columnas y agregar la columna faltante `bobina_interrupciones_id` en la tabla `bobinas`. Con esto, la base de datos local quedó optimizada y el error de columna inexistente al consultar extrusiones se resolvió definitivamente.

## 2026-07-22: Corrección en Configuración de Operarios de Extrusora y Eliminación de Semillas
- **Backend API**: Se corrigió un error de violación de clave foránea (`FOREIGN KEY constraint conflict`) al intentar guardar turnos sin operadores asignados (`-- Sin asignar --`) en el catálogo de Extrusoras. 
  - Anteriormente, al seleccionar "Sin asignar", el backend recibía un valor nulo y le asignaba `Guid.Empty` (`00000000-0000-0000-0000-000000000000`), el cual fallaba al validarse contra la tabla `operarios`.
  - Se modificaron los endpoints `UpsertExtrusoraOperario` y `SaveExtrusoraOperariosBatch` en `CatalogosController.cs` para remover la relación de base de datos (`ExtrusoraOperario`) o evitar su inserción si el operador es nulo o `Guid.Empty`.
- **Sembrador de Base de Datos**: A solicitud del usuario, se eliminó por completo la siembra automática de extrusoras, prensas, extrusiones y prensados de demostración en `ApplicationDbContextSeeder.cs`.
- **Base de Datos**: Se ejecutó una limpieza en el servidor local de SQL Server (`HiCone_ERP_V3`) eliminando físicamente todos los registros de prueba y demostración de las tablas `extrusoras`, `maquinas` y `extrusora_operarios`.
- **Compilación y Servidor**: Se reconstruyó el backend confirmando 0 errores, y se reinició el servidor en el puerto 5007.
