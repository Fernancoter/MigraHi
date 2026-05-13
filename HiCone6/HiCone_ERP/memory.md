# Project Memory: HiCone ERP Modernization

## Rama Activa
`configurarProduccion/refactor` — funcional, sincronizada con el nuevo baseline de DB.

## Estado Actual (2026-05-13)
- **Backend:** Operativo (Puerto 5007). Seeder corregido y estable.
- **Frontend:** Operativo (Puerto 4200). Módulo "Configurar Producción" (Sección Extrusión) completado al 100%.
- **Base de Datos:** `HiCone_ERP_V3` estabilizada mediante `InitialProductionBaseline`.

✅ **Módulo de Seguridad COMPLETADO** (commit: 3a869aa)
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
- [x] **Módulo de Producción - Extrusión (Inicio) FINALIZADO**:
    - **Backend**: Implementación de controladores para Programación y Operación.
    - **Database**: Recreación de esquema limpio y generación de `InitialProductionBaseline` para resolver conflictos de tipos (Guid vs Int).
    - **Seeder**: Lógica de inserción robusta para datos maestros de producción y registros semilla.
    - **Frontend**: Dashboard con dos tablas interactivas, ordenamiento, filtrado (placeholder) y modales de edición.
    - **UI/UX**: Reemplazo de iconos literales por SVG chevrons y alineación flexbox para headers multilínea.

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
- [ ] Integración final de permisos con el backend real cuando se ejecute el seeder en producción.
- [ ] Implementar páginas de Registro y Recuperación de contraseña (actualmente placeholders).
- [ ] Resolver advertencias de precisión decimal en entidades financieras detectadas durante el build.

## Notes
- Se completó la carga de todos los archivos PDF proporcionados.
- La arquitectura ahora permite escalar a múltiples aplicaciones compartiendo el mismo catálogo de permisos.
- Se renombró el módulo legacy "GAM" a "GAM Backoffice" para mayor claridad.
- Se forzó la recreación de la base de datos para aplicar el cambio estructural.
