# Proceso: WWP_VisualizeAllNotifications

- **Entry point:** [WWP_VisualizeAllNotifications](../WebPanels/WWPBaseObjects/Notifications/Common/WWP_VisualizeAllNotifications.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `WWPBaseObjects.Notifications.Common`
- **Objetos en el proceso:** 15
- **Módulos tocados:** `WWPBaseObjects`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_notifications_common_wwp_visualize_all_notifications.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_VisualizeAllNotifications](../WebPanels/WWPBaseObjects/Notifications/Common/WWP_VisualizeAllNotifications.md) (`WebPanel`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_ChangeNotificationStatus](../Procedures/WWPBaseObjects/Notifications/Common/WWP_ChangeNotificationStatus.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_SDTNotificationMetadata](../SDTs/WWPBaseObjects/Notifications/Common/WWP_SDTNotificationMetadata.md) (`SDT`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_VisualizeNotification](../WebPanels/WWPBaseObjects/Notifications/Common/WWP_VisualizeNotification.md) (`WebPanel`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_SubscriptionsSettings](../WebPanels/WWPBaseObjects/Subscriptions/WWP_SubscriptionsSettings.md) (`WebPanel`, `WWPBaseObjects.Subscriptions`)
- depth 1: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_Notification](../Transactions/WWPBaseObjects/Notifications/Common/WWP_Notification.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_CheckUserIsNotUnsubscribed](../Procedures/WWPBaseObjects/Subscriptions/WWP_CheckUserIsNotUnsubscribed.md) (`Procedure`, `WWPBaseObjects.Subscriptions`)
- depth 2: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 2: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [WWP_GetLoggedUserRoles](../Procedures/WWPBaseObjects/WWP_GetLoggedUserRoles.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_Entity`, `WWP_Notification`, `WWP_Subscription`, `WWP_UserExtended`, `WWPBaseObjects.WWP_Entity`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `WWP_Entity`, `WWP_Notification`, `WWP_Subscription`, `WWP_UserExtended`
- **SDTs usados:** `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Entity](../_domain_glossary.md#wwp-entity)
- [WWP_Notification](../_domain_glossary.md#wwp-notification)
- [WWP_Subscription](../_domain_glossary.md#wwp-subscription)
- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
