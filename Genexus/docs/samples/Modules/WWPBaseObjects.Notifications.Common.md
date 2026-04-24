# Módulo: WWPBaseObjects.Notifications.Common

## Propósito

Top entidades con descripción sustantiva en el KB: "Notification Definition" (`WWP_NotificationDefinition`); "Notification" (`WWP_Notification`).

- **Evidencia:** `explícita`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 2 |
| Procedures | 8 |
| SDTs | 2 |
| Transactions | 2 |
| WebPanels | 2 |
| **Total** | **16** |

## Entidades clave

- [WWP_NotificationDefinition](../_domain_glossary.md#wwp-notificationdefinition) -- 8 referencias entrantes
- [WWP_Notification](../_domain_glossary.md#wwp-notification) -- 4 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (25): WWP_VisualizeNotification -> WWP_GetLoggedUserId; WWP_VisualizeNotification -> NotAuthorized; WWP_ChangeNotificationStatus -> WWP_GetLoggedUserId; WWP_CreateNotificationToUser -> WWP_GetUserEmail; WWP_CreateNotificationToUser -> WWP_GetUserPhone _(+20 más)_
- [WWPBaseObjects.Mail](WWPBaseObjects.Mail.md) (7): WWP_CreateNotificationToUser -> WWP_MailTemplate; WWP_CreateNotificationToUser -> WWP_Mail; WWP_UpdateNotificationDefinitions -> WWP_MailTemplate; WWP_SendPendingNotifications -> WWP_GetSMTPParameters; WWP_SendPendingNotifications -> WWP_SendMail _(+2 más)_
- [WWPBaseObjects.SMS](WWPBaseObjects.SMS.md) (6): WWP_CreateNotificationToUser -> WWP_SMS; WWP_SendPendingNotifications -> WWP_SendSMS; WWP_SendPendingNotifications -> WWP_GetSMSParameters; WWP_SendPendingNotifications -> WWP_SMSParametersSDT; WWP_SendPendingNotifications -> WWP_SendSMSResultSDT _(+1 más)_
- [WWPBaseObjects.Notifications.Web](WWPBaseObjects.Notifications.Web.md) (4): WWP_CreateNotificationToUser -> WWP_WebNotification; WWP_CreateNotificationToUser -> WWP_WebClient; WWP_SendPendingNotifications -> WWP_SendWebNotification; WWP_SendPendingNotifications -> WWP_WebNotification
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (2): WWP_SendNotification -> WWP_Subscription; WWP_VisualizeAllNotifications -> WWP_SubscriptionsSettings

### Este módulo ES LLAMADO por

- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (5): WWP_NotifyDiscussionMessage -> WWP_SendNotification; WWP_NotifyDiscussionMessage -> WWP_SDTNotificationMetadata; WWP_NotifyDiscussionMessage -> WWP_SendMentionNotification; WWP_SubscribeLoggedUserToDiscussion -> WWP_NotificationDefinition; WWP_SubscribeMentionedUsersToDiscussion -> WWP_NotificationDefinition
- [DB](DB.md) (3): PrensadoBobina -> WWP_SendNotification; Embarque -> WWP_SendNotification; Existencia -> WWP_SendNotification
- [WWPBaseObjects](WWPBaseObjects.md) (2): ListWWPPrograms -> WWP_VisualizeAllNotifications; WWP_ImpactMetadata -> WWP_UpdateNotificationDefinitions
- [Embarques](Embarques.md) (1): InicializarEmbarque -> WWP_SendNotification
- [Root](Root.md) (1): Home -> WWP_SDTNotificationsData
- [WWPBaseObjects.Notifications.Web](WWPBaseObjects.Notifications.Web.md) (1): WWP_GetUnreadWebNotifications -> WWP_SDTNotificationsData
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (1): WWP_HasSubscriptionsToDisplay -> WWP_NotificationDefinition

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **DB, Embarques, Root, WWPBaseObjects, WWPBaseObjects.Discussions, WWPBaseObjects.Notifications.Web, WWPBaseObjects.Subscriptions**.

