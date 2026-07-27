# Guía de Migración y Conexión a Microsoft Azure (HiCone ERP)

Esta guía detalla los pasos para conectar la base de datos, el almacenamiento de archivos (Blob Storage), y publicar el backend y frontend en **Microsoft Azure** sin afectar la ejecución local actual.

---

## 1. Conexión de la Base de Datos (Azure SQL Database)

Actualmente la base de datos corre localmente (`Server=.`). Para migrarla a Azure:

### Pasos en el Portal de Azure:
1. Ve a **SQL Databases** y crea una base de datos nueva (ej. `HiCone_ERP_V3`).
2. Configura las reglas de firewall en el servidor SQL de Azure para permitir el acceso a tu IP local y a los servicios de Azure.
3. Ve a **Connection strings** (Cadenas de conexión) y copia la cadena ADO.NET. Tendrá un formato similar a este:
   `Server=tcp:tu-servidor.database.windows.net,1433;Initial Catalog=HiCone_ERP_V3;Persist Security Info=False;User ID=tu_usuario;Password=tu_password;MultipleActiveResultSets=True;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`

### Configuración en el Proyecto (Comentada para no interferir):
Abre el archivo `appsettings.json` y reemplaza la sección `ConnectionStrings` de la siguiente manera cuando estés listo para migrar:

```json
  "ConnectionStrings": {
    // Desarrollo Local (Activa actualmente)
    "DefaultConnection": "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True",
    "SAEConnection": "Server=.;Database=HiCone_ERP_V3;Integrated Security=True;TrustServerCertificate=True"

    // CONFIGURACIÓN DE AZURE (Descomentar para usar en producción)
    // "DefaultConnection": "Server=tcp:tu-servidor.database.windows.net,1433;Initial Catalog=HiCone_ERP_V3;Persist Security Info=False;User ID=tu_usuario;Password=tu_password;MultipleActiveResultSets=True;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
    // "SAEConnection": "Server=tcp:tu-servidor.database.windows.net,1433;Initial Catalog=HiCone_ERP_V3;Persist Security Info=False;User ID=tu_usuario;Password=tu_password;MultipleActiveResultSets=True;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
```

---

## 2. Almacenamiento de Archivos e Imágenes (Azure Blob Storage)

El ERP ya utiliza de forma nativa Azure SDK para la carga de bobinas u otros archivos multimedia.

### Pasos en el Portal de Azure:
1. Crea una cuenta de almacenamiento (**Storage Account**).
2. Entra a **Containers** (Contenedores) y crea uno llamado `uploads`. Configura su nivel de acceso público como "Blob" (lectura anónima para que las imágenes se puedan visualizar en el navegador).
3. En el menú lateral ve a **Access keys** (Claves de acceso) y copia la **Connection string** (Cadena de conexión) de `key1`.

### Configuración en el Proyecto (Comentada para no interferir):
Abre el archivo `appsettings.json` y actualiza la sección `AzureStorage`:

```json
  "AzureStorage": {
    // Desarrollo Local (Simulado)
    "ConnectionString": "UseDevelopmentStorage=true",
    "DefaultContainer": "uploads"

    // CONFIGURACIÓN DE AZURE (Descomentar para usar en producción)
    // "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=tu_cuenta;AccountKey=tu_clave_secreta;EndpointSuffix=core.windows.net",
    // "DefaultContainer": "uploads"
  }
```

---

## 3. Publicación del Backend (Azure App Service)

El backend en C# (.NET 8) se aloja en un servicio de aplicación en la nube.

### Pasos en el Portal de Azure / VS:
1. Crea un **App Service** en Azure:
   - Sistema Operativo: Linux o Windows.
   - Pila de ejecución: **.NET 8 (LTS)**.
2. Desde Visual Studio local:
   - Haz clic derecho sobre el proyecto **`HiCone.API`** -> **Publish**.
   - Selecciona **Azure** -> **Azure App Service** -> Elige tu suscripción y el recurso creado.
   - Haz clic en **Publish**. Visual Studio compilará y subirá el backend automáticamente.

---

## 4. Publicación del Frontend (Azure Static Web Apps)

El frontend hecho en Angular se distribuye de forma global optimizada y segura.

### Pasos:
1. Crea una **Static Web App** en el portal de Azure.
2. Conéctala a tu repositorio de Git (GitHub/Azure DevOps). Azure generará automáticamente un pipeline de compilación.
3. Configura el archivo `src/environments/environment.prod.ts` en Angular para apuntar la propiedad `apiUrl` a la dirección pública provista por el backend en el App Service:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://tu-app-service-backend.azurewebsites.net/api/v1'
   };
   ```
