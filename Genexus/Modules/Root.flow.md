# Flujo del módulo: Root

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/Root.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 74 |
| Transactions | 1 (PaletEtiquetaImpresa) |
| WebPanels | 27 |
| Procedures | 32 |
| DataProviders | 4 |
| SDTs | 10 |
| Módulos que LLAMA | 10 (253 calls) |
| Módulos que LO LLAMAN | 4 (44 calls) |
| Procesos canónicos | 8 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `GAMChangeYourPassword` | externo | WWPBaseObjects.MenuOptionsData |
| `Home` | externo | WWPBaseObjects.MenuOptionsData |
| `SDPAddNotification` | externo | Produccion.MedirBobinas, Produccion.SDTerminarCarreraDB |
| `SDPCartProductsList` | externo | Produccion.SDEliminarNotificacion, Produccion.SDLimpiarNotificaciones |
| `SDPCartProductsRemove` | externo | Produccion.SDEliminarNotificacion, Produccion.SDLimpiarNotificaciones |
| `SecGAMUpdatePermissions` | externo | WWPBaseObjects.WWP_ImpactMetadata |
| `GAMWWRoles` | menú | Web > Seguridad > Roles |
| `GAMWWUsers` | menú | Web > Seguridad > Usuarios |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph MENU["🚪 Entry points (menú)"]
        M1[GAMWWUsers]
        M2[GAMWWRoles]
    end

    subgraph XEN["⚙️ Entry points (externos)"]
        X1[GAMChangeYourPassword]
        X2[SDPCartProductsRemove]
        X3[SDPCartProductsList]
        X4[SDPAddNotification]
        X5[SecGAMUpdatePermissions]
        X6[Home]
    end

    subgraph MOD["📦 Root (74 objetos)"]
        direction TB
    P_SDPAddNotification[SDPAddNotification]
    P_SDPCartProductsList[SDPCartProductsList]
    P_SDPCartProductsRemove[SDPCartProductsRemove]
    P_SecGAMUpdatePermissions[SecGAMUpdatePermissions]
    S_TabOptions[TabOptions SDT]
    S_TransactionContext[TransactionContext SDT]
    T_PaletEtiquetaImpresa((PaletEtiquetaImpresa))
    WP_GAMChangeYourPassword[GAMChangeYourPassword WP]
    WP_GAMRolePermissionSelect[GAMRolePermissionSelect WP]
    WP_GAMRoleSelect[GAMRoleSelect WP]
    WP_GAMUserPermissionSelect[GAMUserPermissionSelect WP]
    WP_GAMUserRoleSelect[GAMUserRoleSelect WP]
    WP_GAMWWRolePermissions[GAMWWRolePermissions WP]
    WP_GAMWWRoleRoles[GAMWWRoleRoles WP]
    WP_GAMWWRoles[GAMWWRoles WP]
    WP_GAMWWUserPermissions[GAMWWUserPermissions WP]
    WP_GAMWWUserRoles[GAMWWUserRoles WP]
    WP_GAMWWUsers[GAMWWUsers WP]
    WP_Home[Home WP]
    WP_Login[Login WP]
        OTROS[+54 objetos internos]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>198 calls]
        E_GeneXus_Common[GeneXus.Common<br/>16 calls]
        E_WorkWithPlus_NativeMobile[WorkWithPlus.NativeMobile<br/>14 calls]
        E_GeneXus_SD_Synchronization[GeneXus.SD.Synchronization<br/>8 calls]
        E_DB[DB<br/>8 calls]
        E_Produccion[Produccion<br/>4 calls]
        E_Embarques[Embarques<br/>2 calls]
        E_WWPBaseObjects_Notifications_Common[WWPBaseObjects.Notifications.Common<br/>1 calls]
        E_WWPBaseObjects_Subscriptions[WWPBaseObjects.Subscriptions<br/>1 calls]
        E_GeneXus_SD[GeneXus.SD<br/>1 calls]
    end

    M1 --> WP_GAMWWUsers
    M2 --> WP_GAMWWRoles
    X1 --> WP_GAMChangeYourPassword
    X2 --> P_SDPCartProductsRemove
    X3 --> P_SDPCartProductsList
    X4 --> P_SDPAddNotification
    X5 --> P_SecGAMUpdatePermissions
    X6 --> WP_Home
    WP_GAMWWUsers --> WP_GAMWWUserRoles
    WP_GAMWWUsers --> WP_GAMWWUserPermissions
    WP_GAMWWRoles --> WP_GAMWWRolePermissions
    WP_GAMWWRoles --> WP_GAMWWRoleRoles
    WP_GAMWWRolePermissions --> WP_GAMRolePermissionSelect
    WP_GAMWWRolePermissions --> WP_GAMWWRoles
    WP_GAMWWUserRoles --> WP_GAMWWUsers
    WP_GAMWWUserRoles --> WP_GAMUserRoleSelect
    WP_GAMWWRoleRoles --> WP_GAMRoleSelect
    WP_GAMWWRoleRoles --> WP_GAMWWRoleRoles
    WP_GAMWWUserPermissions --> WP_GAMWWUsers
    WP_GAMWWUserPermissions --> WP_GAMUserPermissionSelect
    WP_GAMUserPermissionSelect --> WP_GAMWWUserPermissions
    WP_GAMRolePermissionSelect --> WP_GAMWWRolePermissions
    WP_Login --> WP_Home
    OTROS -.-> WP_GAMWWUsers
    WP_GAMWWUsers ==> E_WWPBaseObjects
    WP_GAMWWRoles ==> E_WWPBaseObjects
    WP_GAMWWRoles -.-> E_WWPBaseObjects_Subscriptions
    WP_Home -.-> E_WWPBaseObjects_Notifications_Common
    P_SDPAddNotification -.-> E_DB
    P_SecGAMUpdatePermissions ==> E_WWPBaseObjects
    WP_GAMChangeYourPassword -.-> E_GeneXus_Common
    WP_GAMChangeYourPassword ==> E_WWPBaseObjects
    WP_GAMWWRolePermissions ==> E_WWPBaseObjects
    WP_GAMWWUserRoles ==> E_WWPBaseObjects
    WP_GAMWWRoleRoles ==> E_WWPBaseObjects
    WP_GAMWWUserPermissions ==> E_WWPBaseObjects
    WP_GAMUserRoleSelect ==> E_WWPBaseObjects
    WP_GAMUserRoleSelect -.-> E_Produccion
    WP_GAMUserRoleSelect -.-> E_DB
    WP_GAMUserPermissionSelect ==> E_WWPBaseObjects
    WP_GAMRolePermissionSelect ==> E_WWPBaseObjects
    WP_GAMRoleSelect ==> E_WWPBaseObjects
    WP_Login ==> E_WWPBaseObjects

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class T_PaletEtiquetaImpresa trn
    class WP_GAMWWUsers,WP_GAMWWRoles,WP_Home,WP_GAMChangeYourPassword,WP_GAMWWRolePermissions,WP_GAMWWUserRoles,WP_GAMWWRoleRoles,WP_GAMWWUserPermissions,WP_GAMUserRoleSelect,WP_GAMUserPermissionSelect,WP_GAMRolePermissionSelect,WP_GAMRoleSelect,WP_Login wp
    class P_SDPAddNotification,P_SDPCartProductsList,P_SecGAMUpdatePermissions,P_SDPCartProductsRemove,S_TransactionContext,S_TabOptions proc
    class E_WWPBaseObjects_Notifications_Common,E_WWPBaseObjects,E_WorkWithPlus_NativeMobile,E_DB,E_Embarques,E_GeneXus_SD,E_GeneXus_Common,E_Produccion,E_WWPBaseObjects_Subscriptions,E_GeneXus_SD_Synchronization ext
```

**Leyenda:**
- 🟡 círculo = Transaction (entidad de negocio)
- 🔵 caja = WebPanel (pantalla)
- ⬜ caja gris = Procedure / DataProvider / SDT
- ➡️ sólida = navegación/invocación principal
- ➡️ punteada = llamada secundaria (audit, cross-module)
- ➡️ gruesa `==>` = dependencia pesada (>30 calls al mismo peer)

---

## 📦 Procesos del módulo

### Proceso 1 -- `proc_root_gamwwusers` (Usuarios)

**25 objetos · 4 módulos tocados.**

```mermaid
flowchart LR
    WP_GAMWWUsers[GAMWWUsers WP]
    WP_GAMUserPermissionSelect[GAMUserPermissionSelect WP]
    P_GAMCheckUserActivationMethod[GAMCheckUserActivationMethod]
    P_WWP_CreateUserExtended[WWP_CreateUserExtended]
    WP_GAMUserRoleSelect[GAMUserRoleSelect WP]
    WP_GAMUserEntry[GAMUserEntry WP]
    T_Configuracion((Configuracion))
    WP_GAMSetPassword[GAMSetPassword WP]
    P_DVMessageGetBasicNotificationMsg[DVMessageGetBasicNotificationMsg]
    WP_GAMWWUserRoles[GAMWWUserRoles WP]
    T_WWP_UserExtended((WWP_UserExtended))
    S_GridStateCollection[GridStateCollection SDT]
    T_Operador((Operador))
    S_DVB_SDTComboData[DVB_SDTComboData SDT]
    WP_GAMWWUserPermissions[GAMWWUserPermissions WP]
    INFRA[+10 helpers WWP]
    WP_GAMWWUsers --> S_GridStateCollection
    WP_GAMWWUsers --> WP_GAMSetPassword
    WP_GAMWWUsers --> WP_GAMUserEntry
    WP_GAMWWUsers --> WP_GAMWWUserRoles
    WP_GAMWWUsers --> WP_GAMWWUserPermissions
    WP_GAMUserEntry --> P_GAMCheckUserActivationMethod
    WP_GAMUserEntry --> P_DVMessageGetBasicNotificationMsg
    WP_GAMUserEntry --> P_WWP_CreateUserExtended
    WP_GAMUserEntry --> S_DVB_SDTComboData
    WP_GAMUserEntry --> T_WWP_UserExtended
    WP_GAMWWUserRoles --> WP_GAMUserRoleSelect
    WP_GAMWWUserPermissions --> WP_GAMUserPermissionSelect
    WP_GAMUserRoleSelect --> T_Operador
    WP_GAMWWUsers -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Configuracion,T_WWP_UserExtended,T_Operador trn
```

### Proceso 2 -- `proc_root_gamwwroles` (Roles)

**20 objetos · 5 módulos tocados.**

```mermaid
flowchart LR
    WP_GAMRolePermissionSelect[GAMRolePermissionSelect WP]
    T_WWP_Entity((WWP_Entity))
    P_WWPGetRoleName[WWPGetRoleName]
    WP_GAMRoleEntry[GAMRoleEntry WP]
    WP_GAMWWRolePermissions[GAMWWRolePermissions WP]
    T_Configuracion((Configuracion))
    WP_GAMWWRoles[GAMWWRoles WP]
    WP_GAMWWRoleRoles[GAMWWRoleRoles WP]
    T_Document((Document))
    P_ExportarPermisosPorRol[ExportarPermisosPorRol]
    T_WWP_UserExtended((WWP_UserExtended))
    S_GridStateCollection[GridStateCollection SDT]
    WP_GAMRoleSelect[GAMRoleSelect WP]
    WP_wpImportarPermisosPorRol[wpImportarPermisosPorRol WP]
    WP_WWP_SubscriptionsSettingsByRole[WWP_SubscriptionsSettingsByRole WP]
    INFRA[+5 helpers WWP]
    WP_GAMWWRoles --> S_GridStateCollection
    WP_GAMWWRoles --> WP_WWP_SubscriptionsSettingsByRole
    WP_GAMWWRoles --> WP_GAMRoleEntry
    WP_GAMWWRoles --> WP_GAMWWRolePermissions
    WP_GAMWWRoles --> WP_GAMWWRoleRoles
    WP_WWP_SubscriptionsSettingsByRole --> P_WWPGetRoleName
    WP_WWP_SubscriptionsSettingsByRole --> T_WWP_UserExtended
    WP_WWP_SubscriptionsSettingsByRole --> T_WWP_Entity
    WP_GAMWWRolePermissions --> P_ExportarPermisosPorRol
    WP_GAMWWRolePermissions --> WP_GAMRolePermissionSelect
    WP_GAMWWRolePermissions --> WP_wpImportarPermisosPorRol
    WP_GAMWWRoleRoles --> WP_GAMRoleSelect
    WP_wpImportarPermisosPorRol --> T_Document
    WP_GAMWWRoles -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Entity,T_Configuracion,T_Document,T_WWP_UserExtended trn
```

### Proceso 3 -- `proc_root_sdpadd_notification` (SDPAddNotification)

**3 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    S_SDPCartProduct[SDPCartProduct SDT]
    S_SDPProductData[SDPProductData SDT]
    P_SDPAddNotification[SDPAddNotification]
    P_SDPAddNotification --> S_SDPCartProduct
    S_SDPCartProduct --> S_SDPProductData

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 4 -- `proc_root_sdpcart_products_list` (SDPCartProductsList)

**3 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    S_SDPCartProduct[SDPCartProduct SDT]
    P_SDPCartProductsList[SDPCartProductsList]
    S_SDPProductData[SDPProductData SDT]
    P_SDPCartProductsList --> S_SDPCartProduct
    S_SDPCartProduct --> S_SDPProductData

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 5 -- `proc_root_sdpcart_products_remove` (SDPCartProductsRemove)

**3 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    S_SDPCartProduct[SDPCartProduct SDT]
    S_SDPProductData[SDPProductData SDT]
    P_SDPCartProductsRemove[SDPCartProductsRemove]
    P_SDPCartProductsRemove --> S_SDPCartProduct
    S_SDPCartProduct --> S_SDPProductData

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 6 -- `proc_root_sec_gamupdate_permissions` (SecGAMUpdatePermissions)

**3 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_SecGAMUpdatePermissions[SecGAMUpdatePermissions]
    DP_SecGAMGetAdvancedSecurityWWPFunctionalities[SecGAMGetAdvancedSecurityWWPFunctionalities DP]
    S_SecGAMFunctionalitiesToLoad[SecGAMFunctionalitiesToLoad SDT]
    P_SecGAMUpdatePermissions --> DP_SecGAMGetAdvancedSecurityWWPFunctionalities
    P_SecGAMUpdatePermissions --> S_SecGAMFunctionalitiesToLoad

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 7 -- `proc_root_home` (Home)

**2 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    S_WWP_SDTNotificationsData[WWP_SDTNotificationsData SDT]
    WP_Home[Home WP]
    WP_Home --> S_WWP_SDTNotificationsData

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 8 -- `proc_root_gamchange_your_password` (GAMChangeYourPassword)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    WP_GAMChangeYourPassword[GAMChangeYourPassword WP]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 198 | `LoadWWPContext`, `SaveGridState`, `WWPContext` |
| `GeneXus.Common` | 16 | `Messages`, `Route`, `DirectionsRequestParameters` |
| `WorkWithPlus.NativeMobile` | 14 | `SDPMenuOptions`, `SDPWebServerSessionSet`, `SDPWebServerSessionGet` |
| `GeneXus.SD.Synchronization` | 8 | `SynchronizationEventResultList`, `SynchronizationInfo`, `SynchronizationEventList` |
| `DB` | 8 | `PaletCarrete`, `Palet`, `Bobina` |
| `Produccion` | 4 | `ObtenerConfiguracion` |
| `Embarques` | 2 | `NotificarImpresion` |
| `WWPBaseObjects.Notifications.Common` | 1 | `WWP_SDTNotificationsData` |
| `WWPBaseObjects.Subscriptions` | 1 | `WWP_SubscriptionsSettingsByRole` |
| `GeneXus.SD` | 1 | `CardInformation` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `DB` | 23 | `WWProductoCategoria`, `ViewInventario`, `ViewProductoCategoria` |
| `Produccion` | 10 | `SDEliminarNotificacion`, `SDLimpiarNotificaciones`, `WWPrensa` |
| `WWPBaseObjects` | 9 | `MenuOptionsData`, `ListWWPPrograms`, `WWP_ImpactMetadata` |
| `Web` | 2 | `MenuSeguridad` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `Bobina` | **R** | `proc_root_sdpadd_notification` |
| `Carrera` | **R** | `proc_root_sdpadd_notification` |
| `Configuracion` | **W** | `proc_root_gamwwusers`, `proc_root_gamwwroles` |
| `Document` | **W** | `proc_root_gamwwroles` |
| `Operador` | **W** | `proc_root_gamwwusers` |
| `WWP_Entity` | **W** | `proc_root_gamwwroles` |
| `WWP_UserExtended` | **W** | `proc_root_gamwwusers`, `proc_root_gamwwroles` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 74 objetos parseados. Entidades centrales por referencias entrantes: `PaletEtiquetaImpresa`. Entry points desde el menú: `GAMWWUsers`, `GAMWWRoles`.
- **Patrón dominante:** WWP CRUD standard (Trn + WW/View + audit helpers + export/filter helpers generados por el pattern).
- **Valor diferencial:** cluster más grande es `proc_root_gamwwusers` (25 objetos) — ruta `Web > Seguridad > Usuarios`.
- **Acoplamiento externo:** 10 peers, 253 calls totales. Top: `WWPBaseObjects` (198), `GeneXus.Common` (16), `WorkWithPlus.NativeMobile` (14).
- **Riesgo de migración:** alto — dependencia intensa de WWPBaseObjects (198 calls); requiere reimplementar el pattern WWP en el target o tolerar pérdida de audit/filter/export.

