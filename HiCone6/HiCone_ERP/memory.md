# Project Memory: HiCone ERP Modernization

## Rama Activa
`configurarProduccion/refactor` — funcional, sincronizada con el nuevo baseline de DB.

## Estado Actual (2026-05-14)
- **Backend:** Operativo (Puerto 5007). Seeder corregido y estable.
- **Frontend:** Operativo (Puerto 4200). Módulo "Configurar Producción" (Sección Extrusión) refactorizado y completado al 100%.
- **Base de Datos:** `HiCone_ERP_V3` estabilizada mediante `InitialProductionBaseline`.

✅ **Módulo de Seguridad COMPLETADO** (commit: 3a869aa)
✅ **Vibe Coding Infrastructure** (commit: d38f43d)
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
