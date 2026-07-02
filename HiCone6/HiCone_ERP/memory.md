# Project Memory: HiCone ERP Modernization

## Rama Activa
<<<<<<< HEAD
`security/refactor` — compilación estable, sincronizada con `main`.

## Estado Actual
✅ **Módulo de Seguridad COMPLETADO** (commit: 3a869aa)
=======
`information_report/refactor` — activa y con los servidores del backend (5007) y frontend (4200) iniciados.

## Estado Actual (2026-06-29)
- **Backend:** Operativo (Puerto 5007, levantado en segundo plano). Controladores y endpoints de reportes operativos (DRR, Pallet Embarque, Carrete Pallet, Existencias) completamente integrados.
- **Frontend:** Operativo (Puerto 4200, levantado en segundo plano). Módulo de "Reportes HC" ampliado con la nueva pantalla de "Existencia" y columnas agregadas en el "Resumen de Extrusión".
- **Base de Datos:** Migración `AddEmbarqueProperties` aplicada exitosamente sobre el servidor local de SQL Server.

✅ **Reporte de Existencia y Columnas de Extrusión COMPLETADOS** (2026-06-29)
- [x] **Backend API**: Implementado listado de cortes (`GET /api/v1/inventario/existencias`) y seeding automatizado de datos de Silos y Existencias.
- [x] **Reporte Existencia Component**: Creado componente Angular Standalone con filtros de cortes y categorías, y tabs para stock en Silos y Productos.
- [x] **Resumen Extrusión**: Integradas las columnas `revHusilloMolido` y `revHusilloVirgen` en listados, PDFs y Excel.
- [x] **Terminal Guardian (The Customs Guard)**: Implementado interceptor de comandos en Node.js para ejecución segura y autónoma.
- [x] **Gestión de Contexto**: El Guardian mantiene el estado del directorio actual (CWD) para navegaciones complejas.
- [x] **Whitelist/Blacklist**: Filtro robusto que previene operaciones destructivas (rm, rf, etc.) y permite `dotnet`, `npm` y `git`.
- [x] **Reinicio de Servidores**: Backend y Frontend operativos bajo supervisión del entorno de trabajo.

>>>>>>> origin/information_report/refactor
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
- [x] **Refactor de Operadores y Seguridad**:
    - Se creó la entidad `Operador` vinculada a Identity mediante `UserGUID`.
    - Se implementaron los procedimientos `DeshabilitarOperador` y `HabilitarOperador` mapeando la lógica de GAM (`IsRepositoryEnabled`).
    - Se estandarizaron los IDs de operadores a `Guid`.
- [x] **Generación de Reporte de Estructura**: Se analizó el entorno heredado (`HiCone6`) identificando que la lógica existe como metadatos encriptados/comprimidos (base de datos `.mdf` y `kb.data`) exclusivos para el IDE de GeneXus. El reporte fue guardado como `reporteEstructura.md`.

- Documentation:
    - `init.md`: Guía de inicio rápido con comandos y puertos.
    - `config_servidores.csv`: Resumen de servidores y comandos en formato Excel/CSV.
- Frontend: `src/Frontend/hicone-web/src/app`
    - `core/services/auth.service.ts`
    - `core/guards/auth.guard.ts`
    - `features/auth/login/login.component.ts`
    - `features/seguridad/roles/roles.component.ts`
- Backend:
    - `HiCone.Persistence/Seeds/ApplicationDbContextSeeder.cs`
- Routes: `app.routes.ts`

## Technical Decisions
- **Standalone Architecture**: Using Angular Standalone Components for the entire frontend.
- **Session Management**: Currently simulated with LocalStorage persistence for developer preview; ready for JWT integration.
- **Validation**: Using Reactive Forms for real-time feedback and server-simulated error messages.
- **Reactivity**: Converted `allPermissions` to Angular Signals in the Roles component for improved performance and real-time UI updates.

## Next Steps
- [x] Integración final de permisos con el backend real.
- [ ] Implementar páginas de Registro y Recuperación de contraseña (actualmente placeholders).
- [ ] Resolver advertencias de precisión decimal en entidades financieras detectadas durante el build.

## Notes
- Se completó la carga de todos los archivos PDF proporcionados.
- La arquitectura ahora permite escalar a múltiples aplicaciones compartiendo el mismo catálogo de permisos.
- Se renombró el módulo legacy "GAM" a "GAM Backoffice" para mayor claridad.
- Se forzó la recreación de la base de datos para aplicar el cambio estructural.
<<<<<<< HEAD
=======
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
>>>>>>> origin/information_report/refactor
