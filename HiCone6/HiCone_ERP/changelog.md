# Changelog - HiCone ERP Modernization

## [1.5.0] - 2026-05-18
### Added
- **Catálogo de Productos (`productos.component.ts`)**: Creado nuevo catálogo independiente de Productos con visuales premium idénticos a los de Operarios.
- **Selector de Producto SAE**: Implementado input-select interactivo con desplegable de códigos SAE simulados y autocompletado en el modal de Información General.
- **Categoría en Producto**: Selector dinámico para asociar categorías cargadas en tiempo real desde el servicio API.

### Changed
- **Catálogo de Operarios (`operarios.component.ts`)**: Refactorizado por completo a un catálogo dinámico premium con grilla de 5 columnas.
- **Cabecera Activo Interactiva**: Añadida cabecera para "Activo" con desplegable interactivo conteniendo ordenación A-Z/Z-A, fijación de columnas e indicadores visuales de estado.
- **Modales de Operario**: Modal dinámico unificado que soporta el modo solo lectura (`Ver`) y modo edición (`Editar`/`Crear`), incorporando soporte para `fotografia` y `userGuid`.
- **Paginación Dinámica**: Implementación de lógica de ventana deslizante ("Sliding Window") para navegación reactiva de registros.
- **Limpieza de Inicio Extrusión (`tablero.component.ts`)**: Se revirtieron todos los cambios incorrectamente ubicados en la pantalla de extrusión de inicio, dejándola limpia en su estado nativo de monitoreo en tiempo real.

### Fixed
- **Exportación a PDF en Extrusión**: Corregido error en tiempo de ejecución de `jspdf-autotable` migrando al estándar ESM (`import autoTable`).

## [1.4.1] - 2026-05-14
### Added
- **Delete Confirmation Modal**: Nuevo modal visual para confirmar la eliminación de registros, reemplazando la alerta nativa.

### Changed
- **Modal Layout**: Refactorización de la estructura de bobinas a un diseño de 4 renglones horizontales (distribución horizontal de campos).
- **Dropdown Visibility**: Corregido el recorte del menú de acciones mediante ajustes de `overflow: visible` en el contenedor de la tabla y `z-index`.
- **Submenu Navigation**: Mejora del área de hover en el submenú de exportación para evitar cierres prematuros mediante solapamiento y padding técnico.

### Fixed
- **Delete Logic**: Ejecución real del borrado de extrusión en el backend y actualización inmediata del estado en el frontend.

## [1.4.0] - 2026-05-14
### Added
- **Production Module (Refactor)**: Fila de acciones completa (Editar, Eliminar, Menú de opciones).
- **Manual Entry**: Modal simplificado para agregar bobinas en pares mediante un único input.
- **Column Selector**: Modal dinámico para personalizar la visibilidad de los 12 campos de bobinas.
- **Backend API**: Endpoints para eliminación completa de extrusión y adición simplificada de bobinas.

### Changed
- **Modal Logic**: Persistencia de la estructura visual en el modal de edición (3 bloques) incluso con datos vacíos.
- **Localization**: Traducción integral al español de todos los componentes de producción.
- **UI/UX**: Reubicación del botón "Agregar manual" al menú contextual de la fila.

### Fixed
- **Interpretación de Requerimientos**: Corregido el error de ocultar campos cuando no había información registrada.
- **Estructura de Datos**: Alineación del campo "Pares de bobinas" con la visualización 000/000.

## [1.3.0] - 2026-05-13
### Added
- **Production Module (Extrusión)**: Implemented complete dashboard with two tables (Programación & Operación).
- **Interactive Features**: Added client-side sorting and operational status detail modals.
- **Database Baseline**: Generated `InitialProductionBaseline` for a clean database start.

### Changed
- **UI/UX Aesthetics**: Replaced literal characters with custom SVG chevrons for dropdowns.
- **Table Alignment**: Improved header layout using flexbox to maintain vertical alignment in multi-line headers.

### Fixed
- **Database Synchronization**: Resolved "Operand type clash" and "Invalid Column" errors by resetting migrations.
- **Seeder Robustness**: Fixed `ApplicationDbContextSeeder` to handle relational dependencies and avoid unique constraint violations.

## [1.1.0] - 2026-04-23
### Added
- **Auth System**: Full JWT authentication system replacing GeneXus GAM.
- **Identity Services**: `IIdentityService` and `ITokenService` in Infrastructure layer.
- **Security**: BCrypt hashing, Account Lockout (5 attempts), and Mandatory Password Change support.
- **Angular Integration**: Functional `AuthInterceptor` for automatic token injection and 401 handling.
- **User Context**: `Username` support for non-email logins (e.g., 'admin').

### Changed
- **User Entity**: Expanded with `OperadorId`, `Username`, and security timestamps.
- **Application Services**: `ICurrentUserService` now supports `OperadorId` for ERP business logic.
- **Seeder**: Updated `ApplicationDbContextSeeder` to initialize the system with `admin` / `hicone123`.
- **UI**: Login screen now accepts simple usernames and provides real-time backend error feedback.

### Fixed
- **Dependency Issues**: Resolved Central Package Management (CPM) conflicts by fixing floating versions.
- **Database Schema**: Recreated database to include the new `Username` column in the `Users` table.
- **Auth Flow**: Fixed password mismatch by implementing dynamic BCrypt hashing in the seeder.

## [1.2.0] - 2026-04-30
### Added
- **Permissions System**: Migration of 350+ security records from legacy system.
- **Application Modules**: Creation of "HICONE" as the primary operational module for security.
- **Frontend Security UI**: Advanced pagination (20 items/page) and search filtering in Roles/Permissions views.
- **Data Seeding**: Refactored `ApplicationDbContextSeeder` to include the complete unified permission catalog.

### Changed
- **Architecture**: Split security entries between GAM (Administrative) and HICONE (Operational) as per user requirements.
- **UX**: Implemented "Actions" dropdown for export/import functionality in the Roles screen.
- **Reactivity**: Converted `allPermissions` to Angular Signals for improved performance and real-time UI updates.

### Fixed
- **Pagination Bug**: Resolved issue where switching between applications would cause the page index to get stuck or out of range.
- **Filtering**: Fixed permissions view to correctly filter records by the selected Application (GAM/HICONE).

---
*Maintenance by Antigravity AI*
