# Proceso: Existencia

- **Entry point:** [Existencia](../Transactions/DB/Existencia.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Existencia.FechaExistenciaAnterior`, `Existencia.ObtenerExistenciaProducto`, `Existencia.wpExistenciaMain`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 55
- **Módulos tocados:** `DB`, `Existencia`, `GeneXus.Server`, `Produccion`, `WWPBaseObjects`, `WWPBaseObjects.Mail`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Notifications.Web`, `WWPBaseObjects.SMS`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_existencia.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Existencia](../Transactions/DB/Existencia.md) (`Transaction`, `DB`)
- depth 1: [ExistenciaView](../WebPanels/DB/ExistenciaView.md) (`WebPanel`, `DB`)
- depth 1: [ExistenciaWW](../WebPanels/DB/ExistenciaWW.md) (`WebPanel`, `DB`)
- depth 1: [LoadAuditExistencia](../Procedures/DB/LoadAuditExistencia.md) (`Procedure`, `DB`)
- depth 1: [TurnoDP](../DataProviders/Produccion/TurnoDP.md) (`DataProvider`, `Produccion`)
- depth 1: [WWP_SendNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [ExistenciaWWExport](../Procedures/DB/ExistenciaWWExport.md) (`Procedure`, `DB`)
- depth 2: [ExistenciaWWExportReport](../Procedures/DB/ExistenciaWWExportReport.md) (`Procedure`, `DB`)
- depth 2: [ExistenciaWWGetFilterData](../Procedures/DB/ExistenciaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [wpExistenciaMain](../WebPanels/Existencia/wpExistenciaMain.md) (`WebPanel`, `Existencia`)
- depth 2: [SDTTurno](../SDTs/Produccion/SDTTurno.md) (`SDT`, `Produccion`)
- depth 2: [WWP_CreateNotificationToUser](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CreateNotificationToUser.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_SendPendingNotifications](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendPendingNotifications.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 2: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUsersFromRole](../Procedures/WWPBaseObjects/WWP_GetUsersFromRole.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [ReporteExistencia](../WebPanels/Existencia/ReporteExistencia.md) (`WebPanel`, `Existencia`)
- depth 3: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 3: [WWP_GetSMTPParameters](../Procedures/WWPBaseObjects/Mail/WWP_GetSMTPParameters.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_Mail](../Transactions/WWPBaseObjects/Mail/WWP_Mail.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_SendMail](../Procedures/WWPBaseObjects/Mail/WWP_SendMail.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_SMTPParametersSDT](../SDTs/WWPBaseObjects/Mail/WWP_SMTPParametersSDT.md) (`SDT`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_CleanNotificationURL](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CleanNotificationURL.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_Notification](../Transactions/WWPBaseObjects/Notifications/Common/WWP_Notification.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_VisualizeNotification](../WebPanels/WWPBaseObjects/Notifications/Common/WWP_VisualizeNotification.md) (`WebPanel`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_SendWebNotification](../Procedures/WWPBaseObjects/Notifications/Web/WWP_SendWebNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Web`)
- depth 3: [WWP_WebClient](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebClient.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 3: [WWP_WebNotification](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebNotification.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 3: [WWP_GetSMSParameters](../Procedures/WWPBaseObjects/SMS/WWP_GetSMSParameters.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 3: [WWP_SendSMS](../Procedures/WWPBaseObjects/SMS/WWP_SendSMS.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 3: [WWP_SendSMSResultSDT](../SDTs/WWPBaseObjects/SMS/WWP_SendSMSResultSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 3: [WWP_SMS](../Transactions/WWPBaseObjects/SMS/WWP_SMS.md) (`Transaction`, `WWPBaseObjects.SMS`)
- depth 3: [WWP_SMSParametersSDT](../SDTs/WWPBaseObjects/SMS/WWP_SMSParametersSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 3: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 4: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 4: [NotificationInfo](../SDTs/GeneXus/Server/NotificationInfo.md) (`SDT`, `GeneXus.Server`)
- depth 4: [LoadAuditWWP_MailTemplate](../Procedures/WWPBaseObjects/Mail/LoadAuditWWP_MailTemplate.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_GetStatusCodeMessage](../Procedures/WWPBaseObjects/Mail/WWP_GetStatusCodeMessage.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateView](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateView.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateWW](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateWW.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_ParseMailAddressList](../Procedures/WWPBaseObjects/Mail/WWP_ParseMailAddressList.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_UpdateMailStatus](../Procedures/WWPBaseObjects/Mail/WWP_UpdateMailStatus.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_ChangeNotificationStatus](../Procedures/WWPBaseObjects/Notifications/Common/WWP_ChangeNotificationStatus.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_SDTNotificationMetadata](../SDTs/WWPBaseObjects/Notifications/Common/WWP_SDTNotificationMetadata.md) (`SDT`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_UpdateWebNotificationStatus](../Procedures/WWPBaseObjects/Notifications/Web/WWP_UpdateWebNotificationStatus.md) (`Procedure`, `WWPBaseObjects.Notifications.Web`)
- depth 4: [WWP_ParsePhoneNumbersList](../Procedures/WWPBaseObjects/SMS/WWP_ParsePhoneNumbersList.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 4: [WWP_UpdateSMSStatus](../Procedures/WWPBaseObjects/SMS/WWP_UpdateSMSStatus.md) (`Procedure`, `WWPBaseObjects.SMS`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.Existencia`, `Existencia`, `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_Subscription`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`, `WWPBaseObjects.Mail.WWP_Mail`, `WWPBaseObjects.Notifications.Web.WWP_WebNotification`, `WWPBaseObjects.SMS.WWP_SMS`, `WWPBaseObjects.Subscriptions.WWP_Subscription`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `Configuracion`, `Existencia`, `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_Subscription`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Server.NotificationInfo`, `SDTTurno`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [Existencia](../_domain_glossary.md#existencia)
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
