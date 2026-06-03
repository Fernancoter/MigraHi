# Manual de Actualización 2.0.1 - HiCone ERP

Este documento detalla los cambios estructurales, arquitectónicos y funcionales introducidos en la versión **2.0.1** del sistema HiCone ERP. Esta actualización se centra en dos pilares fundamentales: **Estabilización del Módulo de Inventario (Silos y Lotes)** y la **Integración de Seguridad Avanzada (Auth Pro)**.

---

## 1. Módulo de Inventario (Estabilización y Paridad QA)

Se implementaron mejoras para alcanzar la paridad funcional con el entorno de QA, sumando una interfaz Neo-Cyber Premium.

### Archivos Modificados y Líneas Clave

#### A. Gestión de Lotes (`lotes.component.ts`)
- **Ruta:** `src/Frontend/hicone-web/src/app/features/inventario/lotes/lotes.component.ts`
- **Cambios Principales:**
  - **Filtros Avanzados (Líneas ~21-48):** Se integró una barra de filtros interactiva para buscar por Silo, Rango de Fechas (Desde/Hasta) y Estado (Consumido/En Stock).
  - **Lógica de Filtrado (`filteredLotes`):** Implementación de la lógica en tiempo real para aplicar los filtros seleccionados sin necesidad de recargar la página.
  - **Función Archivar (`archiveLote`):** Se vinculó el botón "Archivar" al borrado lógico en base de datos.
- **Impacto Visual:** Interfaz premium con inputs y selects estilizados.

#### B. Gestión de Silos (`silos.component.ts`)
- **Ruta:** `src/Frontend/hicone-web/src/app/features/inventario/silos/silos.component.ts`
- **Cambios Principales:**
  - **Filtros Avanzados:** Se replicó la barra de filtros de Lotes adaptada a Silos (Tipo de Material, Estado Activo/Inactivo).
  - **Función Archivar:** Lógica de borrado lógico (`IsDeleted`) consistente con el resto del sistema.

#### C. Cierre de Mes (`existencias.component.ts` & `InventarioService.cs`)
- **Frontend Ruta:** `src/Frontend/hicone-web/src/app/features/inventario/existencias/existencias.component.ts`
  - Se añadieron columnas comparativas: **Stock Sistema**, **Cantidad Física** (editable por el usuario) y **Diferencia**.
  - Si existe diferencia, se resalta en color ámbar para alerta visual.
- **Backend Ruta:** `src/Core/HiCone.Application/Services/Inventario/InventarioService.cs`
  - Se modificó el DTO `ExistenciaSiloDto` para incluir `CantidadSistema` y `CantidadReal`.
  - La lógica de completado de cierre ahora sobrescribe la existencia real del sistema con lo capturado físicamente.

---

## 2. Seguridad Avanzada (Auth Pro)

Se migró la lógica de seguridad básica a un sistema robusto preparado para producción, importado de las pruebas de escritorio.

### Archivos Modificados y Líneas Clave

#### A. Interfaces Base (Backend)
- **Ruta:** `src/Core/HiCone.Application/Common/Interfaces/IIdentityInterfaces.cs`
- **Cambio:** Se crearon las interfaces `IIdentityService` y `ITokenService` para definir el contrato de autenticación, incluyendo soporte para *Refresh Tokens*.

#### B. Implementación de Servicios (Backend)
- **Rutas:** 
  - `src/Infrastructure/HiCone.Infrastructure/Identity/IdentityService.cs`
  - `src/Infrastructure/HiCone.Infrastructure/Identity/TokenService.cs`
- **Cambios:**
  - `IdentityService`: Implementa encriptación asimétrica con **BCrypt** para contraseñas. Añade política de bloqueo tras 5 intentos fallidos (`AccessFailedCount`) y validación de correo único.
  - `TokenService`: Generación dual de tokens (Access Token JWT de corta duración y Refresh Token de base de datos de larga duración). Embebido de Claims como `TenantId` y Roles.

#### C. Inyección de Dependencias (Backend)
- **Ruta:** `src/Infrastructure/HiCone.Infrastructure/DependencyInjection.cs`
- **Cambio (Línea ~19):** Se registraron los nuevos servicios:
  ```csharp
  services.AddScoped<IIdentityService, HiCone.Infrastructure.Identity.IdentityService>();
  services.AddScoped<ITokenService, HiCone.Infrastructure.Identity.TokenService>();
  ```

#### D. Controlador de Autenticación (Backend)
- **Ruta:** `src/Presentation/HiCone.API/Controllers/AuthController.cs`
- **Cambios:** Se rediseñó por completo para soportar los endpoints:
  - `POST /api/v1/auth/login` (Devuelve Access y Refresh token)
  - `POST /api/v1/auth/refresh-token` (Renueva sesión)
  - `POST /api/v1/auth/logout` (Invalida sesión actual)

#### E. Gestión de Sesión (Frontend)
- **Servicio Ruta:** `src/Frontend/hicone-web/src/app/core/auth/auth.service.ts`
  - **Modernización:** Se migró de RxJS puro a **Angular Signals** (`signal<boolean>`, `signal<User>`) para un renderizado más reactivo.
  - **Flujo Refresh:** Lógica automática para guardar el Refresh Token y utilizarlo cuando el token principal expire.
- **Interceptor Ruta:** `src/Frontend/hicone-web/src/app/core/interceptors/auth.interceptor.ts`
  - **Intercepción Inteligente:** Si el backend responde con un error `401 Unauthorized`, el interceptor pausa las peticiones, solicita un nuevo token usando el Refresh Token, y si tiene éxito, reintenta la petición original sin que el usuario lo note.

#### F. Configuración Global (Frontend)
- **Ruta:** `src/Frontend/hicone-web/src/app/app.config.ts`
- **Cambio:** Se reemplazó el interceptor antiguo (`jwtInterceptor`) por el nuevo `authInterceptor` que maneja el ciclo completo de sesión.

---

## 🚀 Cómo Continuar

Este manual sirve como tu punto de referencia para entender la arquitectura actual. Para las siguientes fases (ej. restringir controladores con `[Authorize]`, adaptar módulos de Producción), utilizaremos esta misma estructura de documentación para mantener el control total del código fuente.
