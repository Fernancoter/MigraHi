# Flujo del módulo: WWPBaseObjects.Notifications.Common

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/WWPBaseObjects.Notifications.Common.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 16 |
| Transactions | 2 (WWP_Notification, WWP_NotificationDefinition) |
| WebPanels | 2 |
| Procedures | 8 |
| DataProviders | 2 |
| SDTs | 2 |
| Módulos que LLAMA | 5 (46 calls) |
| Módulos que LO LLAMAN | 7 (14 calls) |
| Procesos canónicos | 5 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `WWP_NotificationDefinition` | externo | WWPBaseObjects.Discussions.WWP_SubscribeLoggedUserToDiscussion, WWPBaseObjects.Discussions.WWP_SubscribeMentionedUsersToDiscussion |
| `WWP_SendMentionNotification` | externo | WWPBaseObjects.Discussions.WWP_NotifyDiscussionMessage |
| `WWP_SendNotification` | externo | DB.Embarque, DB.Existencia |
| `WWP_UpdateNotificationDefinitions` | externo | WWPBaseObjects.WWP_ImpactMetadata |
| `WWP_VisualizeAllNotifications` | externo | WWPBaseObjects.ListWWPPrograms |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[WWP_NotificationDefinition]
        X2[WWP_SendMentionNotification]
        X3[WWP_UpdateNotificationDefinitions]
        X4[WWP_VisualizeAllNotifications]
        X5[WWP_SendNotification]
    end

    subgraph MOD["📦 WWPBaseObjects.Notifications.Common (16 objetos)"]
        direction TB
    DP_WWP_AutomaticNotificationDefinitionsToLoad[WWP_AutomaticNotificationDefinitionsToLoad DP]
    DP_WWP_GetNotificationsForUser[WWP_GetNotificationsForUser DP]
    P_WWP_ChangeNotificationStatus[WWP_ChangeNotificationStatus]
    P_WWP_CleanNotificationURL[WWP_CleanNotificationURL]
    P_WWP_CreateNotificationToUser[WWP_CreateNotificationToUser]
    P_WWP_GetNotificationDefinitionByName[WWP_GetNotificationDefinitionByName]
    P_WWP_SendMentionNotification[WWP_SendMentionNotification]
    P_WWP_SendNotification[WWP_SendNotification]
    P_WWP_SendPendingNotifications[WWP_SendPendingNotifications]
    P_WWP_UpdateNotificationDefinitions[WWP_UpdateNotificationDefinitions]
    S_WWP_SDTNotificationMetadata[WWP_SDTNotificationMetadata SDT]
    S_WWP_SDTNotificationsData[WWP_SDTNotificationsData SDT]
    T_WWP_Notification((WWP_Notification))
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    WP_WWP_VisualizeAllNotifications[WWP_VisualizeAllNotifications WP]
    WP_WWP_VisualizeNotification[WWP_VisualizeNotification WP]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>26 calls]
        E_WWPBaseObjects_Mail[WWPBaseObjects.Mail<br/>7 calls]
        E_WWPBaseObjects_SMS[WWPBaseObjects.SMS<br/>6 calls]
        E_WWPBaseObjects_Notifications_Web[WWPBaseObjects.Notifications.Web<br/>4 calls]
        E_WWPBaseObjects_Subscriptions[WWPBaseObjects.Subscriptions<br/>3 calls]
    end

    X1 --> T_WWP_NotificationDefinition
    X2 --> P_WWP_SendMentionNotification
    X3 --> P_WWP_UpdateNotificationDefinitions
    X4 --> WP_WWP_VisualizeAllNotifications
    X5 --> P_WWP_SendNotification
    WP_WWP_VisualizeAllNotifications --> P_WWP_ChangeNotificationStatus
    WP_WWP_VisualizeAllNotifications --> S_WWP_SDTNotificationMetadata
    WP_WWP_VisualizeAllNotifications --> WP_WWP_VisualizeNotification
    P_WWP_SendNotification --> P_WWP_CreateNotificationToUser
    P_WWP_SendNotification --> P_WWP_SendPendingNotifications
    P_WWP_SendNotification --> T_WWP_NotificationDefinition
    P_WWP_UpdateNotificationDefinitions --> DP_WWP_AutomaticNotificationDefinitionsToLoad
    P_WWP_UpdateNotificationDefinitions --> P_WWP_GetNotificationDefinitionByName
    P_WWP_UpdateNotificationDefinitions --> T_WWP_NotificationDefinition
    P_WWP_SendMentionNotification --> P_WWP_CreateNotificationToUser
    P_WWP_SendMentionNotification --> T_WWP_NotificationDefinition
    P_WWP_CreateNotificationToUser --> P_WWP_CleanNotificationURL
    P_WWP_CreateNotificationToUser --> T_WWP_Notification
    P_WWP_CreateNotificationToUser --> WP_WWP_VisualizeNotification
    WP_WWP_VisualizeNotification --> P_WWP_ChangeNotificationStatus
    WP_WWP_VisualizeNotification --> S_WWP_SDTNotificationMetadata
    WP_WWP_VisualizeNotification --> T_WWP_Notification
    P_WWP_ChangeNotificationStatus --> T_WWP_Notification
    DP_WWP_GetNotificationsForUser --> S_WWP_SDTNotificationsData
    DP_WWP_GetNotificationsForUser --> T_WWP_Notification
    DP_WWP_AutomaticNotificationDefinitionsToLoad --> T_WWP_NotificationDefinition
    P_WWP_GetNotificationDefinitionByName --> T_WWP_NotificationDefinition
    WP_WWP_VisualizeAllNotifications -.-> E_WWPBaseObjects
    WP_WWP_VisualizeAllNotifications -.-> E_WWPBaseObjects_Subscriptions
    P_WWP_SendNotification -.-> E_WWPBaseObjects
    P_WWP_SendNotification -.-> E_WWPBaseObjects_Subscriptions
    T_WWP_NotificationDefinition -.-> E_WWPBaseObjects
    P_WWP_UpdateNotificationDefinitions -.-> E_WWPBaseObjects
    P_WWP_UpdateNotificationDefinitions -.-> E_WWPBaseObjects_Mail
    P_WWP_SendMentionNotification -.-> E_WWPBaseObjects
    T_WWP_Notification -.-> E_WWPBaseObjects
    P_WWP_CreateNotificationToUser -.-> E_WWPBaseObjects
    P_WWP_CreateNotificationToUser -.-> E_WWPBaseObjects_SMS
    P_WWP_CreateNotificationToUser -.-> E_WWPBaseObjects_Notifications_Web
    P_WWP_CreateNotificationToUser -.-> E_WWPBaseObjects_Mail
    P_WWP_SendPendingNotifications -.-> E_WWPBaseObjects
    P_WWP_SendPendingNotifications -.-> E_WWPBaseObjects_SMS
    P_WWP_SendPendingNotifications -.-> E_WWPBaseObjects_Notifications_Web
    P_WWP_SendPendingNotifications -.-> E_WWPBaseObjects_Mail
    WP_WWP_VisualizeNotification -.-> E_WWPBaseObjects
    P_WWP_ChangeNotificationStatus -.-> E_WWPBaseObjects
    DP_WWP_GetNotificationsForUser -.-> E_WWPBaseObjects
    DP_WWP_AutomaticNotificationDefinitionsToLoad -.-> E_WWPBaseObjects

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class T_WWP_NotificationDefinition,T_WWP_Notification trn
    class WP_WWP_VisualizeAllNotifications,WP_WWP_VisualizeNotification wp
    class P_WWP_SendNotification,P_WWP_UpdateNotificationDefinitions,P_WWP_SendMentionNotification,P_WWP_CreateNotificationToUser,P_WWP_SendPendingNotifications,P_WWP_ChangeNotificationStatus,S_WWP_SDTNotificationMetadata,DP_WWP_GetNotificationsForUser,DP_WWP_AutomaticNotificationDefinitionsToLoad,S_WWP_SDTNotificationsData,P_WWP_GetNotificationDefinitionByName,P_WWP_CleanNotificationURL proc
    class E_WWPBaseObjects,E_WWPBaseObjects_Mail,E_WWPBaseObjects_Subscriptions,E_WWPBaseObjects_Notifications_Web,E_WWPBaseObjects_SMS ext
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

### Proceso 1 -- `proc_wwpbase_objects_notifications_common_wwp_send_notification` (WWP_SendNotification)

**45 objetos · 7 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_CreateNotificationToUser[WWP_CreateNotificationToUser]
    T_WWP_Entity((WWP_Entity))
    T_WWP_WebClient((WWP_WebClient))
    T_WWP_Subscription((WWP_Subscription))
    T_WWP_Notification((WWP_Notification))
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    T_WWP_Mail((WWP_Mail))
    P_WWP_GetEntityByName[WWP_GetEntityByName]
    P_WWP_SendPendingNotifications[WWP_SendPendingNotifications]
    P_WWP_SendNotification[WWP_SendNotification]
    T_WWP_UserExtended((WWP_UserExtended))
    T_WWP_WebNotification((WWP_WebNotification))
    T_WWP_MailTemplate((WWP_MailTemplate))
    T_WWP_SMS((WWP_SMS))
    P_WWP_GetLoggedUserId[WWP_GetLoggedUserId]
    INFRA[+30 helpers WWP]
    P_WWP_SendNotification --> P_WWP_GetLoggedUserId
    P_WWP_SendNotification --> P_WWP_GetEntityByName
    P_WWP_SendNotification --> P_WWP_CreateNotificationToUser
    P_WWP_SendNotification --> P_WWP_SendPendingNotifications
    P_WWP_SendNotification --> T_WWP_Subscription
    P_WWP_SendNotification --> T_WWP_NotificationDefinition
    P_WWP_GetEntityByName --> T_WWP_Entity
    P_WWP_CreateNotificationToUser --> T_WWP_UserExtended
    P_WWP_CreateNotificationToUser --> T_WWP_SMS
    P_WWP_CreateNotificationToUser --> T_WWP_WebNotification
    P_WWP_CreateNotificationToUser --> T_WWP_WebClient
    P_WWP_CreateNotificationToUser --> T_WWP_Notification
    P_WWP_CreateNotificationToUser --> T_WWP_MailTemplate
    P_WWP_CreateNotificationToUser --> T_WWP_Mail
    P_WWP_SendNotification -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Entity,T_WWP_WebClient,T_WWP_Subscription,T_WWP_Notification,T_WWP_NotificationDefinition,T_WWP_Mail,T_WWP_UserExtended,T_WWP_WebNotification,T_WWP_MailTemplate,T_WWP_SMS trn
```

### Proceso 2 -- `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification` (WWP_SendMentionNotification)

**27 objetos · 5 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_SendMentionNotification[WWP_SendMentionNotification]
    P_WWP_CleanNotificationURL[WWP_CleanNotificationURL]
    T_WWP_Entity((WWP_Entity))
    P_WWP_GetParameter[WWP_GetParameter]
    T_WWP_WebClient((WWP_WebClient))
    T_WWP_Notification((WWP_Notification))
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    T_WWP_Mail((WWP_Mail))
    P_WWP_GetEntityByName[WWP_GetEntityByName]
    T_WWP_MailTemplate((WWP_MailTemplate))
    T_WWP_UserExtended((WWP_UserExtended))
    P_WWP_CreateNotificationToUser[WWP_CreateNotificationToUser]
    T_WWP_WebNotification((WWP_WebNotification))
    WP_WWP_VisualizeNotification[WWP_VisualizeNotification WP]
    T_WWP_SMS((WWP_SMS))
    INFRA[+12 helpers WWP]
    P_WWP_SendMentionNotification --> P_WWP_GetEntityByName
    P_WWP_SendMentionNotification --> P_WWP_CreateNotificationToUser
    P_WWP_SendMentionNotification --> T_WWP_NotificationDefinition
    P_WWP_GetEntityByName --> T_WWP_Entity
    P_WWP_CreateNotificationToUser --> P_WWP_GetParameter
    P_WWP_CreateNotificationToUser --> P_WWP_CleanNotificationURL
    P_WWP_CreateNotificationToUser --> T_WWP_UserExtended
    P_WWP_CreateNotificationToUser --> T_WWP_SMS
    P_WWP_CreateNotificationToUser --> T_WWP_WebNotification
    P_WWP_CreateNotificationToUser --> T_WWP_WebClient
    P_WWP_CreateNotificationToUser --> T_WWP_Notification
    P_WWP_CreateNotificationToUser --> T_WWP_MailTemplate
    P_WWP_CreateNotificationToUser --> T_WWP_Mail
    P_WWP_CreateNotificationToUser --> WP_WWP_VisualizeNotification
    P_WWP_SendMentionNotification -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Entity,T_WWP_WebClient,T_WWP_Notification,T_WWP_NotificationDefinition,T_WWP_Mail,T_WWP_MailTemplate,T_WWP_UserExtended,T_WWP_WebNotification,T_WWP_SMS trn
```

### Proceso 3 -- `proc_wwpbase_objects_notifications_common_wwp_visualize_all_notifications` (WWP_VisualizeAllNotifications)

**15 objetos · 3 módulos tocados.**

```mermaid
flowchart LR
    WP_WWP_VisualizeAllNotifications[WWP_VisualizeAllNotifications WP]
    T_WWP_Entity((WWP_Entity))
    P_WWP_GetUserFullName[WWP_GetUserFullName]
    WP_WWP_VisualizeNotification[WWP_VisualizeNotification WP]
    P_WWP_CheckUserIsNotUnsubscribed[WWP_CheckUserIsNotUnsubscribed]
    P_WWP_GetUserPhone[WWP_GetUserPhone]
    T_WWP_Subscription((WWP_Subscription))
    T_WWP_Notification((WWP_Notification))
    P_WWP_GetUserEmail[WWP_GetUserEmail]
    P_WWP_ChangeNotificationStatus[WWP_ChangeNotificationStatus]
    S_WWP_SDTNotificationMetadata[WWP_SDTNotificationMetadata SDT]
    T_WWP_UserExtended((WWP_UserExtended))
    WP_WWP_SubscriptionsSettings[WWP_SubscriptionsSettings WP]
    P_WWP_GetLoggedUserRoles[WWP_GetLoggedUserRoles]
    P_WWP_GetLoggedUserId[WWP_GetLoggedUserId]
    WP_WWP_VisualizeAllNotifications --> P_WWP_GetLoggedUserId
    WP_WWP_VisualizeAllNotifications --> P_WWP_ChangeNotificationStatus
    WP_WWP_VisualizeAllNotifications --> S_WWP_SDTNotificationMetadata
    WP_WWP_VisualizeAllNotifications --> WP_WWP_VisualizeNotification
    WP_WWP_VisualizeAllNotifications --> WP_WWP_SubscriptionsSettings
    P_WWP_ChangeNotificationStatus --> T_WWP_Notification
    WP_WWP_SubscriptionsSettings --> P_WWP_GetLoggedUserRoles
    WP_WWP_SubscriptionsSettings --> P_WWP_CheckUserIsNotUnsubscribed
    WP_WWP_SubscriptionsSettings --> T_WWP_UserExtended
    WP_WWP_SubscriptionsSettings --> T_WWP_Entity
    WP_WWP_SubscriptionsSettings --> T_WWP_Subscription
    T_WWP_Notification --> P_WWP_GetUserFullName
    T_WWP_UserExtended --> P_WWP_GetUserEmail
    T_WWP_UserExtended --> P_WWP_GetUserPhone

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Entity,T_WWP_Subscription,T_WWP_Notification,T_WWP_UserExtended trn
```

### Proceso 4 -- `proc_wwpbase_objects_notifications_common_wwp_update_notification_definitions` (WWP_UpdateNotificationDefinitions)

**14 objetos · 3 módulos tocados.**

```mermaid
flowchart LR
    DP_WWP_AutomaticNotificationDefinitionsToLoad[WWP_AutomaticNotificationDefinitionsToLoad DP]
    WP_WWP_MailTemplateView[WWP_MailTemplateView WP]
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    WP_WWP_MailTemplateWW[WWP_MailTemplateWW WP]
    T_WWP_MailTemplate((WWP_MailTemplate))
    T_WWP_Entity((WWP_Entity))
    P_WWP_GetEntityByName[WWP_GetEntityByName]
    P_WWP_GetParameter[WWP_GetParameter]
    P_WWP_UpdateNotificationDefinitions[WWP_UpdateNotificationDefinitions]
    P_WWP_GetNotificationDefinitionByName[WWP_GetNotificationDefinitionByName]
    INFRA[+4 helpers WWP]
    P_WWP_UpdateNotificationDefinitions --> DP_WWP_AutomaticNotificationDefinitionsToLoad
    P_WWP_UpdateNotificationDefinitions --> P_WWP_GetParameter
    P_WWP_UpdateNotificationDefinitions --> P_WWP_GetNotificationDefinitionByName
    P_WWP_UpdateNotificationDefinitions --> T_WWP_NotificationDefinition
    P_WWP_UpdateNotificationDefinitions --> T_WWP_MailTemplate
    DP_WWP_AutomaticNotificationDefinitionsToLoad --> P_WWP_GetEntityByName
    T_WWP_MailTemplate --> WP_WWP_MailTemplateView
    T_WWP_MailTemplate --> WP_WWP_MailTemplateWW
    P_WWP_GetEntityByName --> T_WWP_Entity
    P_WWP_UpdateNotificationDefinitions -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_NotificationDefinition,T_WWP_MailTemplate,T_WWP_Entity trn
```

### Proceso 5 -- `proc_wwpbase_objects_notifications_common_wwp_notification_definition` (WWP_NotificationDefinition)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_NotificationDefinition trn
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 26 | `WWP_GetLoggedUserId`, `WWP_GetEntityByName`, `SecGAMIsAuthByFunctionalityKey` |
| `WWPBaseObjects.Mail` | 7 | `WWP_MailTemplate`, `WWP_Mail`, `WWP_SendMail` |
| `WWPBaseObjects.SMS` | 6 | `WWP_SMS`, `WWP_SendSMS`, `WWP_SMSParametersSDT` |
| `WWPBaseObjects.Notifications.Web` | 4 | `WWP_WebNotification`, `WWP_WebClient`, `WWP_SendWebNotification` |
| `WWPBaseObjects.Subscriptions` | 3 | `WWP_SubscriptionsSettings`, `WWP_Subscription` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `WWPBaseObjects.Discussions` | 5 | `WWP_NotifyDiscussionMessage`, `WWP_SubscribeLoggedUserToDiscussion`, `WWP_SubscribeMentionedUsersToDiscussion` |
| `DB` | 3 | `Embarque`, `PrensadoBobina`, `Existencia` |
| `WWPBaseObjects` | 2 | `WWP_ImpactMetadata`, `ListWWPPrograms` |
| `Embarques` | 1 | `InicializarEmbarque` |
| `Root` | 1 | `Home` |
| `WWPBaseObjects.Subscriptions` | 1 | `WWP_HasSubscriptionsToDisplay` |
| `WWPBaseObjects.Notifications.Web` | 1 | `WWP_GetUnreadWebNotifications` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `WWP_Entity` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_update_notification_definitions`, `proc_wwpbase_objects_notifications_common_wwp_visualize_all_notifications` _(+1)_ |
| `WWP_Mail` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |
| `WWP_MailTemplate` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_update_notification_definitions`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |
| `WWP_Notification` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_visualize_all_notifications`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |
| `WWP_NotificationDefinition` | **CW** | `proc_wwpbase_objects_notifications_common_wwp_notification_definition`, `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_update_notification_definitions` _(+1)_ |
| `WWP_SMS` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |
| `WWP_Subscription` | **W** | `proc_wwpbase_objects_notifications_common_wwp_visualize_all_notifications`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |
| `WWP_UserExtended` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_visualize_all_notifications`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |
| `WWP_WebClient` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |
| `WWP_WebNotification` | **W** | `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification`, `proc_wwpbase_objects_notifications_common_wwp_send_notification` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Top entidades con descripción sustantiva en el KB: "Notification Definition" (`WWP_NotificationDefinition`); "Notification" (`WWP_Notification`).
- **Patrón dominante:** módulo mixto.
- **Valor diferencial:** cluster más grande es `proc_wwpbase_objects_notifications_common_wwp_send_notification` (45 objetos).
- **Acoplamiento externo:** 5 peers, 46 calls totales. Top: `WWPBaseObjects` (26), `WWPBaseObjects.Mail` (7), `WWPBaseObjects.SMS` (6).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

