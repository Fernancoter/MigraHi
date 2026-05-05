# Project Memory: HiCone ERP Modernization

## Rama Activa
`security/refactor` — compilación estable, sincronizada con `main`.

## Estado Actual
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
- [x] **Migración Masiva de Permisos FINALIZADA**:
    - Se migraron los **878 permisos** totales desde el sistema legacy (GeneXus).
    - Consolidación total de módulos: **GAM** (13 administrativos) y **HICONE** (865 operativos).
    - Inyección automatizada en Backend (`ApplicationDbContextSeeder.cs`) mediante lotes validados.
    - **Refactor de Paginación**: Implementación de lógica "Sliding Window" (1 ... 18, 19, [20], 21, 22 ... 88) en el frontend.
    - **Mejoras de Organización**:
        - Se implementó ordenamiento alfabético (por Módulo y Nombre) en todas las listas de permisos (Modal, Vista de Permisos, Agregar Permisos).
        - Se añadió un buscador dinámico en la vista de "Agregar Permisos" para facilitar la selección en el catálogo de 870 registros.
- [x] **Visual Identity & Infrastructure**:
    - Created `public/assets/images` directory for graphic resource management.
    - Integrated `login-bg.png` as high-resolution background for the login screen.
    - Configured background with `background-size: cover` and precise centering to highlight the product.
    - Added dark linear-gradient overlay to improve text legibility while maintaining the glassmorphism effect.
    - Migrated global theme in `styles.scss` from blue to corporate green (`#10b981`).
    - Ajusted shadows, glows, and interactive elements to harmonize with the new brand palette.
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
- [ ] Integración final de permisos con el backend real cuando se ejecute el seeder en producción.
- [ ] Implementar páginas de Registro y Recuperación de contraseña (actualmente placeholders).
- [ ] Resolver advertencias de precisión decimal en entidades financieras detectadas durante el build.

## Notes
- Se completó la carga de todos los archivos PDF proporcionados (hasta la "página final").
- La paginación ahora soporta saltos dinámicos y elipsis (`...`) para datasets de gran escala.
- Split security entries: GAM (13 first records) vs HICONE (everything else).
