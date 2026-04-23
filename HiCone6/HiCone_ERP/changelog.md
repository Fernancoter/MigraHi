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

---
*Maintenance by Antigravity AI*
