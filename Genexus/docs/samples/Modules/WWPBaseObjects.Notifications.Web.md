# Módulo: WWPBaseObjects.Notifications.Web

## Propósito

Módulo con 10 objetos parseados. Entidades centrales por referencias entrantes: `WWP_WebNotification`, `WWP_WebClient`. Sin entry points en `_menu.json` -- accedido indirectamente desde: WWPBaseObjects.Notifications.Common.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 7 |
| SDTs | 1 |
| Transactions | 2 |
| **Total** | **10** |

## Entidades clave

- [WWP_WebNotification](../_domain_glossary.md#wwp-webnotification) -- 7 referencias entrantes
- [WWP_WebClient](../_domain_glossary.md#wwp-webclient) -- 2 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (7): WWP_GetUnreadWebNotifications -> WWP_Logger; WWP_UpdateWebNotificationStatus -> WWP_Logger; WWP_RegisterWebClient -> WWP_Logger; WWP_RegisterWebClient -> WWP_ExistsUserExtended; WWP_RegisterWebClient -> WWP_CreateUserExtended _(+2 más)_
- [GeneXus.Server](GeneXus.Server.md) (1): WWP_SendWebNotification -> NotificationInfo
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (1): WWP_GetUnreadWebNotifications -> WWP_SDTNotificationsData

### Este módulo ES LLAMADO por

- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (4): WWP_CreateNotificationToUser -> WWP_WebClient; WWP_SendPendingNotifications -> WWP_SendWebNotification; WWP_CreateNotificationToUser -> WWP_WebNotification; WWP_SendPendingNotifications -> WWP_WebNotification

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **WWPBaseObjects.Notifications.Common**.

