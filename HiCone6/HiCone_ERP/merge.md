# Guía de Integración (Merge Guide) - Autenticación Moderna

Esta lista contiene los archivos que deben ser integrados a la rama `main` para habilitar el nuevo sistema de autenticación.

## 📂 Archivos del Backend (.NET)

| Acción | Ruta del Archivo | Descripción del Cambio |
| :--- | :--- | :--- |
| **MODIFICAR** | `Directory.Packages.props` | Agregado `BCrypt.Net-Next` y fijadas versiones 8.0.11. |
| **MODIFICAR** | `src/Core/HiCone.Domain/Entities/Identity/User.cs` | Agregado `Username`, `OperadorId` y campos de seguridad. |
| **MODIFICAR** | `src/Core/HiCone.Application/Common/Interfaces/ICurrentUserService.cs` | Agregado `OperadorId`. |
| **NUEVO** | `src/Infrastructure/HiCone.Infrastructure/Identity/TokenService.cs` | Lógica de generación de JWT y Refresh Tokens. |
| **NUEVO** | `src/Infrastructure/HiCone.Infrastructure/Identity/IdentityService.cs` | Lógica de autenticación con BCrypt. |
| **MODIFICAR** | `src/Infrastructure/HiCone.Infrastructure/DependencyInjection.cs` | Registro de `IIdentityService` y `ITokenService`. |
| **NUEVO** | `src/Infrastructure/HiCone.Infrastructure/Services/CurrentUserService.cs` | Implementación real de extracción de Claims. |
| **MODIFICAR** | `src/Infrastructure/HiCone.Infrastructure/Services/DateTimeProvider.cs` | Eliminación de mocks antiguos. |
| **MODIFICAR** | `src/Infrastructure/HiCone.Persistence/Seeds/ApplicationDbContextSeeder.cs` | Credenciales `admin` / `hicone123` con hash dinámico. |
| **MODIFICAR** | `src/Infrastructure/HiCone.Persistence/HiCone.Persistence.csproj` | Agregada referencia a `BCrypt.Net-Next`. |
| **NUEVO** | `src/Presentation/HiCone.API/Controllers/AuthController.cs` | Endpoints de Login, Refresh y Logout. |
| **MODIFICAR** | `src/Presentation/HiCone.API/Program.cs` | Configuración de middleware de Auth y JWT. |
| **MODIFICAR** | `src/Presentation/HiCone.API/HiCone.API.csproj` | Agregada referencia a `JwtBearer`. |

## 📂 Archivos del Frontend (Angular)

| Acción | Ruta del Archivo | Descripción del Cambio |
| :--- | :--- | :--- |
| **MODIFICAR** | `src/app/app.config.ts` | Registro global del `authInterceptor`. |
| **MODIFICAR** | `src/app/core/services/auth.service.ts` | Conexión real a API y manejo de tokens. |
| **NUEVO** | `src/app/core/interceptors/auth.interceptor.ts` | Inyección de JWT y auto-refresh 401. |
| **MODIFICAR** | `src/app/features/auth/login/login.component.ts` | Soporte para usuario `admin` y manejo de errores. |

---
> [!IMPORTANT]
> **Nota para Integración**: Es necesario que el integrador ejecute un `dotnet build` tras arrastrar los archivos para validar la restauración de los nuevos paquetes NuGet (`BCrypt` y `JwtBearer`).
