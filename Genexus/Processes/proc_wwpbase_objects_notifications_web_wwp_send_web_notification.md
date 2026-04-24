# Proceso: WWP_SendWebNotification

- **Entry point:** [WWP_SendWebNotification](../Procedures/WWPBaseObjects/Notifications/Web/WWP_SendWebNotification.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications`
- **Módulo principal:** `WWPBaseObjects.Notifications.Web`
- **Objetos en el proceso:** 4
- **Módulos tocados:** `GeneXus.Server`, `WWPBaseObjects.Notifications.Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_notifications_web_wwp_send_web_notification.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_SendWebNotification](../Procedures/WWPBaseObjects/Notifications/Web/WWP_SendWebNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Web`)
- depth 1: [NotificationInfo](../SDTs/GeneXus/Server/NotificationInfo.md) (`SDT`, `GeneXus.Server`)
- depth 1: [WWP_UpdateWebNotificationStatus](../Procedures/WWPBaseObjects/Notifications/Web/WWP_UpdateWebNotificationStatus.md) (`Procedure`, `WWPBaseObjects.Notifications.Web`)
- depth 1: [WWP_WebNotification](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebNotification.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)

## Efectos en datos

- **Tablas leídas:** `WWP_WebNotification`
- **Tablas escritas:** `WWP_WebNotification`
- **SDTs usados:** `GeneXus.Server.NotificationInfo`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_WebNotification](../_domain_glossary.md#wwp-webnotification)
