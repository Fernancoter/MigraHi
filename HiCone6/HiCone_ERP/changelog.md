# Changelog - HiCone ERP Modernization

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
