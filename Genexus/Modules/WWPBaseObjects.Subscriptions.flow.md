# Flujo del módulo: WWPBaseObjects.Subscriptions

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/WWPBaseObjects.Subscriptions.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 7 |
| Transactions | 1 (WWP_Subscription) |
| WebPanels | 2 |
| Procedures | 4 |
| DataProviders | 0 |
| SDTs | 0 |
| Módulos que LLAMA | 2 (31 calls) |
| Módulos que LO LLAMAN | 11 (76 calls) |
| Procesos canónicos | 3 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `WWP_Subscription` | externo | WWPBaseObjects.Discussions.WWP_SubscribeLoggedUserToDiscussion, WWPBaseObjects.Discussions.WWP_SubscribeMentionedUsersToDiscussion |
| `WWP_SubscriptionsSettings` | externo | WWPBaseObjects.ListWWPPrograms, WWPBaseObjects.Notifications.Common.WWP_VisualizeAllNotifications |
| `WWP_SubscriptionsSettingsByRole` | externo | Root.GAMWWRoles |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[WWP_SubscriptionsSettingsByRole]
        X2[WWP_SubscriptionsSettings]
        X3[WWP_Subscription]
    end

    subgraph MOD["📦 WWPBaseObjects.Subscriptions (7 objetos)"]
        direction TB
    P_WWP_CheckUserIsNotUnsubscribed[WWP_CheckUserIsNotUnsubscribed]
    P_WWP_HasSubscriptionsToDisplay[WWP_HasSubscriptionsToDisplay]
    P_WWP_RoleUpdateSubscription[WWP_RoleUpdateSubscription]
    P_WWP_UserUpdateSubscription[WWP_UserUpdateSubscription]
    T_WWP_Subscription((WWP_Subscription))
    WP_WWP_SubscriptionsSettings[WWP_SubscriptionsSettings WP]
    WP_WWP_SubscriptionsSettingsByRole[WWP_SubscriptionsSettingsByRole WP]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>30 calls]
        E_WWPBaseObjects_Notifications_Common[WWPBaseObjects.Notifications.Common<br/>1 calls]
    end

    X1 --> WP_WWP_SubscriptionsSettingsByRole
    X2 --> WP_WWP_SubscriptionsSettings
    X3 --> T_WWP_Subscription
    WP_WWP_SubscriptionsSettings --> P_WWP_CheckUserIsNotUnsubscribed
    WP_WWP_SubscriptionsSettings --> P_WWP_HasSubscriptionsToDisplay
    WP_WWP_SubscriptionsSettings --> T_WWP_Subscription
    P_WWP_CheckUserIsNotUnsubscribed --> T_WWP_Subscription
    P_WWP_UserUpdateSubscription --> T_WWP_Subscription
    P_WWP_RoleUpdateSubscription --> T_WWP_Subscription
    WP_WWP_SubscriptionsSettings -.-> E_WWPBaseObjects
    WP_WWP_SubscriptionsSettingsByRole -.-> E_WWPBaseObjects
    T_WWP_Subscription -.-> E_WWPBaseObjects
    P_WWP_HasSubscriptionsToDisplay -.-> E_WWPBaseObjects
    P_WWP_HasSubscriptionsToDisplay -.-> E_WWPBaseObjects_Notifications_Common
    P_WWP_CheckUserIsNotUnsubscribed -.-> E_WWPBaseObjects
    P_WWP_UserUpdateSubscription -.-> E_WWPBaseObjects
    P_WWP_RoleUpdateSubscription -.-> E_WWPBaseObjects

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class T_WWP_Subscription trn
    class WP_WWP_SubscriptionsSettings,WP_WWP_SubscriptionsSettingsByRole wp
    class P_WWP_HasSubscriptionsToDisplay,P_WWP_CheckUserIsNotUnsubscribed,P_WWP_UserUpdateSubscription,P_WWP_RoleUpdateSubscription proc
    class E_WWPBaseObjects_Notifications_Common,E_WWPBaseObjects ext
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

### Proceso 1 -- `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings` (WWP_SubscriptionsSettings)

**10 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_WWP_SubscriptionsSettings[WWP_SubscriptionsSettings WP]
    P_WWP_GetUserFullName[WWP_GetUserFullName]
    P_WWP_GetUserPhone[WWP_GetUserPhone]
    P_WWP_GetUserEmail[WWP_GetUserEmail]
    P_WWP_CheckUserIsNotUnsubscribed[WWP_CheckUserIsNotUnsubscribed]
    T_WWP_UserExtended((WWP_UserExtended))
    T_WWP_Entity((WWP_Entity))
    P_WWP_GetLoggedUserRoles[WWP_GetLoggedUserRoles]
    T_WWP_Subscription((WWP_Subscription))
    P_WWP_GetLoggedUserId[WWP_GetLoggedUserId]
    WP_WWP_SubscriptionsSettings --> P_WWP_GetLoggedUserId
    WP_WWP_SubscriptionsSettings --> P_WWP_GetLoggedUserRoles
    WP_WWP_SubscriptionsSettings --> P_WWP_CheckUserIsNotUnsubscribed
    WP_WWP_SubscriptionsSettings --> T_WWP_UserExtended
    WP_WWP_SubscriptionsSettings --> T_WWP_Entity
    WP_WWP_SubscriptionsSettings --> T_WWP_Subscription
    T_WWP_UserExtended --> P_WWP_GetUserFullName
    T_WWP_UserExtended --> P_WWP_GetUserEmail
    T_WWP_UserExtended --> P_WWP_GetUserPhone

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_UserExtended,T_WWP_Entity,T_WWP_Subscription trn
```

### Proceso 2 -- `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings_by_role` (WWP_SubscriptionsSettingsByRole)

**7 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_GetUserPhone[WWP_GetUserPhone]
    WP_WWP_SubscriptionsSettingsByRole[WWP_SubscriptionsSettingsByRole WP]
    P_WWP_GetUserEmail[WWP_GetUserEmail]
    T_WWP_UserExtended((WWP_UserExtended))
    T_WWP_Entity((WWP_Entity))
    P_WWP_GetUserFullName[WWP_GetUserFullName]
    P_WWPGetRoleName[WWPGetRoleName]
    WP_WWP_SubscriptionsSettingsByRole --> P_WWPGetRoleName
    WP_WWP_SubscriptionsSettingsByRole --> T_WWP_UserExtended
    WP_WWP_SubscriptionsSettingsByRole --> T_WWP_Entity
    T_WWP_UserExtended --> P_WWP_GetUserFullName
    T_WWP_UserExtended --> P_WWP_GetUserEmail
    T_WWP_UserExtended --> P_WWP_GetUserPhone

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_UserExtended,T_WWP_Entity trn
```

### Proceso 3 -- `proc_wwpbase_objects_subscriptions_wwp_subscription` (WWP_Subscription)

**2 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_GetUserFullName[WWP_GetUserFullName]
    T_WWP_Subscription((WWP_Subscription))
    T_WWP_Subscription --> P_WWP_GetUserFullName

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Subscription trn
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 30 | `LoadWWPContext`, `WWP_GetLoggedUserId`, `WWP_UserExtended` |
| `WWPBaseObjects.Notifications.Common` | 1 | `WWP_NotificationDefinition` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `DB` | 40 | `CompanyView`, `BudgetWW`, `EmbarquePalletView` |
| `Reportes` | 10 | `vwOrdenEtiquetado`, `ExtrusoraObservacionView`, `vwPrensadoResultado` |
| `Embarques` | 6 | `ListadoEmbarques`, `RemissionsWW`, `ListadoRemisiones` |
| `Calidad` | 4 | `reclamoview`, `CarreteDefectoWW`, `reclamosww` |
| `Produccion` | 3 | `vwAnaliticaBobina`, `vwAnaliticaCarrete`, `vwAnaliticaPrensado` |
| `WWPBaseObjects` | 3 | `AuditWW`, `AuditView`, `ListWWPPrograms` |
| `WWPBaseObjects.Notifications.Common` | 3 | `WWP_VisualizeAllNotifications`, `WWP_SendNotification` |
| `WWPBaseObjects.Mail` | 2 | `WWP_MailTemplateWW`, `WWP_MailTemplateView` |
| `Downtime` | 2 | `DownTimeCodeView`, `DownTimeCodeWW` |
| `WWPBaseObjects.Discussions` | 2 | `WWP_SubscribeLoggedUserToDiscussion`, `WWP_SubscribeMentionedUsersToDiscussion` |
| `Root` | 1 | `GAMWWRoles` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `WWP_Entity` | **W** | `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings_by_role`, `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings` |
| `WWP_Subscription` | **CW** | `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings`, `proc_wwpbase_objects_subscriptions_wwp_subscription` |
| `WWP_UserExtended` | **W** | `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings_by_role`, `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 7 objetos parseados. Entidades centrales por referencias entrantes: `WWP_Subscription`. Sin entry points en `_menu.json` -- accedido indirectamente desde: Calidad, DB, Downtime.
- **Patrón dominante:** módulo mixto.
- **Valor diferencial:** cluster más grande es `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings` (10 objetos).
- **Acoplamiento externo:** 2 peers, 31 calls totales. Top: `WWPBaseObjects` (30), `WWPBaseObjects.Notifications.Common` (1).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

