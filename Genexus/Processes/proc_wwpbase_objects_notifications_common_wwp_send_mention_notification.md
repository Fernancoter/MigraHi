# Proceso: WWP_SendMentionNotification

- **Entry point:** [WWP_SendMentionNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendMentionNotification.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.Discussions.WWP_NotifyDiscussionMessage`
- **Módulo principal:** `WWPBaseObjects.Notifications.Common`
- **Objetos en el proceso:** 27
- **Módulos tocados:** `WWPBaseObjects`, `WWPBaseObjects.Mail`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Notifications.Web`, `WWPBaseObjects.SMS`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_notifications_common_wwp_send_mention_notification.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_SendMentionNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendMentionNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_CreateNotificationToUser](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CreateNotificationToUser.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_Mail](../Transactions/WWPBaseObjects/Mail/WWP_Mail.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_CleanNotificationURL](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CleanNotificationURL.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_Notification](../Transactions/WWPBaseObjects/Notifications/Common/WWP_Notification.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_VisualizeNotification](../WebPanels/WWPBaseObjects/Notifications/Common/WWP_VisualizeNotification.md) (`WebPanel`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_WebClient](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebClient.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 2: [WWP_WebNotification](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebNotification.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 2: [WWP_SMS](../Transactions/WWPBaseObjects/SMS/WWP_SMS.md) (`Transaction`, `WWPBaseObjects.SMS`)
- depth 2: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [LoadAuditWWP_MailTemplate](../Procedures/WWPBaseObjects/Mail/LoadAuditWWP_MailTemplate.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateView](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateView.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateWW](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateWW.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_ChangeNotificationStatus](../Procedures/WWPBaseObjects/Notifications/Common/WWP_ChangeNotificationStatus.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_SDTNotificationMetadata](../SDTs/WWPBaseObjects/Notifications/Common/WWP_SDTNotificationMetadata.md) (`SDT`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_MailTemplateWWExport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateWWExportReport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExportReport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateWWGetFilterData](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWGetFilterData.md) (`Procedure`, `WWPBaseObjects.Mail`)

## Efectos en datos

- **Tablas leídas:** `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Entity](../_domain_glossary.md#wwp-entity)
- [WWP_Mail](../_domain_glossary.md#wwp-mail)
- [WWP_MailTemplate](../_domain_glossary.md#wwp-mailtemplate)
- [WWP_Notification](../_domain_glossary.md#wwp-notification)
- [WWP_NotificationDefinition](../_domain_glossary.md#wwp-notificationdefinition)
- [WWP_SMS](../_domain_glossary.md#wwp-sms)
- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
- [WWP_WebClient](../_domain_glossary.md#wwp-webclient)
- [WWP_WebNotification](../_domain_glossary.md#wwp-webnotification)
