# Proceso: WWP_SendNotification

- **Entry point:** [WWP_SendNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendNotification.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.Embarque`, `DB.Existencia`, `DB.PrensadoBobina`
- **Módulo principal:** `WWPBaseObjects.Notifications.Common`
- **Objetos en el proceso:** 45
- **Módulos tocados:** `GeneXus.Server`, `WWPBaseObjects`, `WWPBaseObjects.Mail`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Notifications.Web`, `WWPBaseObjects.SMS`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_notifications_common_wwp_send_notification.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_SendNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_CreateNotificationToUser](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CreateNotificationToUser.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_SendPendingNotifications](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendPendingNotifications.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 1: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_GetUsersFromRole](../Procedures/WWPBaseObjects/WWP_GetUsersFromRole.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetSMTPParameters](../Procedures/WWPBaseObjects/Mail/WWP_GetSMTPParameters.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_Mail](../Transactions/WWPBaseObjects/Mail/WWP_Mail.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_SendMail](../Procedures/WWPBaseObjects/Mail/WWP_SendMail.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_SMTPParametersSDT](../SDTs/WWPBaseObjects/Mail/WWP_SMTPParametersSDT.md) (`SDT`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_CleanNotificationURL](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CleanNotificationURL.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_Notification](../Transactions/WWPBaseObjects/Notifications/Common/WWP_Notification.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_VisualizeNotification](../WebPanels/WWPBaseObjects/Notifications/Common/WWP_VisualizeNotification.md) (`WebPanel`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_SendWebNotification](../Procedures/WWPBaseObjects/Notifications/Web/WWP_SendWebNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Web`)
- depth 2: [WWP_WebClient](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebClient.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 2: [WWP_WebNotification](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebNotification.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 2: [WWP_GetSMSParameters](../Procedures/WWPBaseObjects/SMS/WWP_GetSMSParameters.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 2: [WWP_SendSMS](../Procedures/WWPBaseObjects/SMS/WWP_SendSMS.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 2: [WWP_SendSMSResultSDT](../SDTs/WWPBaseObjects/SMS/WWP_SendSMSResultSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 2: [WWP_SMS](../Transactions/WWPBaseObjects/SMS/WWP_SMS.md) (`Transaction`, `WWPBaseObjects.SMS`)
- depth 2: [WWP_SMSParametersSDT](../SDTs/WWPBaseObjects/SMS/WWP_SMSParametersSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 2: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [NotificationInfo](../SDTs/GeneXus/Server/NotificationInfo.md) (`SDT`, `GeneXus.Server`)
- depth 3: [LoadAuditWWP_MailTemplate](../Procedures/WWPBaseObjects/Mail/LoadAuditWWP_MailTemplate.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_GetStatusCodeMessage](../Procedures/WWPBaseObjects/Mail/WWP_GetStatusCodeMessage.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateView](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateView.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateWW](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateWW.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_ParseMailAddressList](../Procedures/WWPBaseObjects/Mail/WWP_ParseMailAddressList.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_UpdateMailStatus](../Procedures/WWPBaseObjects/Mail/WWP_UpdateMailStatus.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_ChangeNotificationStatus](../Procedures/WWPBaseObjects/Notifications/Common/WWP_ChangeNotificationStatus.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_SDTNotificationMetadata](../SDTs/WWPBaseObjects/Notifications/Common/WWP_SDTNotificationMetadata.md) (`SDT`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_UpdateWebNotificationStatus](../Procedures/WWPBaseObjects/Notifications/Web/WWP_UpdateWebNotificationStatus.md) (`Procedure`, `WWPBaseObjects.Notifications.Web`)
- depth 3: [WWP_ParsePhoneNumbersList](../Procedures/WWPBaseObjects/SMS/WWP_ParsePhoneNumbersList.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 3: [WWP_UpdateSMSStatus](../Procedures/WWPBaseObjects/SMS/WWP_UpdateSMSStatus.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 4: [WWP_MailTemplateWWExport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateWWExportReport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExportReport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateWWGetFilterData](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWGetFilterData.md) (`Procedure`, `WWPBaseObjects.Mail`)

## Efectos en datos

- **Tablas leídas:** `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_Subscription`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`, `WWPBaseObjects.Mail.WWP_Mail`, `WWPBaseObjects.Notifications.Web.WWP_WebNotification`, `WWPBaseObjects.SMS.WWP_SMS`, `WWPBaseObjects.Subscriptions.WWP_Subscription`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_Subscription`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Server.NotificationInfo`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Entity](../_domain_glossary.md#wwp-entity)
- [WWP_Mail](../_domain_glossary.md#wwp-mail)
- [WWP_MailTemplate](../_domain_glossary.md#wwp-mailtemplate)
- [WWP_Notification](../_domain_glossary.md#wwp-notification)
- [WWP_NotificationDefinition](../_domain_glossary.md#wwp-notificationdefinition)
- [WWP_SMS](../_domain_glossary.md#wwp-sms)
- [WWP_Subscription](../_domain_glossary.md#wwp-subscription)
- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
- [WWP_WebClient](../_domain_glossary.md#wwp-webclient)
- [WWP_WebNotification](../_domain_glossary.md#wwp-webnotification)
