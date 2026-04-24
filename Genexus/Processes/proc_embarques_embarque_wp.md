# Proceso: EmbarqueWP

- **Entry point:** [EmbarqueWP](../WebPanels/Embarques/EmbarqueWP.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.Embarque`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 62
- **Módulos tocados:** `DB`, `Embarques`, `Informes`, `Produccion`, `WWPBaseObjects`, `WWPBaseObjects.Mail`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Notifications.Web`, `WWPBaseObjects.SMS`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_embarque_wp.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [EmbarqueWP](../WebPanels/Embarques/EmbarqueWP.md) (`WebPanel`, `Embarques`)
- depth 1: [Embarque](../Transactions/DB/Embarque.md) (`Transaction`, `DB`)
- depth 1: [ContarEmbarqueLineasValidadas](../Procedures/Embarques/ContarEmbarqueLineasValidadas.md) (`Procedure`, `Embarques`)
- depth 1: [EmbarqueDetalleDP](../DataProviders/Embarques/EmbarqueDetalleDP.md) (`DataProvider`, `Embarques`)
- depth 1: [EmbarqueDetalleSDT](../SDTs/Embarques/EmbarqueDetalleSDT.md) (`SDT`, `Embarques`)
- depth 1: [ListadoEmbarques](../WebPanels/Embarques/ListadoEmbarques.md) (`WebPanel`, `Embarques`)
- depth 1: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [EmbarqueDetalle](../Transactions/DB/EmbarqueDetalle.md) (`Transaction`, `DB`)
- depth 2: [EmbarqueView](../WebPanels/DB/EmbarqueView.md) (`WebPanel`, `DB`)
- depth 2: [LoadAuditEmbarque](../Procedures/DB/LoadAuditEmbarque.md) (`Procedure`, `DB`)
- depth 2: [CargarEmbarque](../WebPanels/Embarques/CargarEmbarque.md) (`WebPanel`, `Embarques`)
- depth 2: [ComenzarCargaDeEmbarque](../Procedures/Embarques/ComenzarCargaDeEmbarque.md) (`Procedure`, `Embarques`)
- depth 2: [EmbarqueFormato](../WebPanels/Embarques/EmbarqueFormato.md) (`WebPanel`, `Embarques`)
- depth 2: [EmbarqueReporte](../WebPanels/Embarques/EmbarqueReporte.md) (`WebPanel`, `Embarques`)
- depth 2: [ListadoEmbarquesExport](../Procedures/Embarques/ListadoEmbarquesExport.md) (`Procedure`, `Embarques`)
- depth 2: [ListadoEmbarquesExportReport](../Procedures/Embarques/ListadoEmbarquesExportReport.md) (`Procedure`, `Embarques`)
- depth 2: [ListadoEmbarquesGetFilterData](../Procedures/Embarques/ListadoEmbarquesGetFilterData.md) (`Procedure`, `Embarques`)
- depth 2: [DVMessageGetAdvancedNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetAdvancedNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_SendNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 2: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [EmbarqueDetalleView](../WebPanels/DB/EmbarqueDetalleView.md) (`WebPanel`, `DB`)
- depth 3: [EmbarquePallet](../Transactions/DB/EmbarquePallet.md) (`Transaction`, `DB`)
- depth 3: [LoadAuditEmbarqueDetalle](../Procedures/DB/LoadAuditEmbarqueDetalle.md) (`Procedure`, `DB`)
- depth 3: [LlenarLoteReporte](../Procedures/Embarques/LlenarLoteReporte.md) (`Procedure`, `Embarques`)
- depth 3: [NotificarSupervisor](../Procedures/Embarques/NotificarSupervisor.md) (`Procedure`, `Embarques`)
- depth 3: [InformesTelerik](../Procedures/Informes/InformesTelerik.md) (`Procedure`, `Informes`)
- depth 3: [SDTInformeFilter](../SDTs/Informes/SDTInformeFilter.md) (`SDT`, `Informes`)
- depth 3: [SDTTelerik](../SDTs/Informes/SDTTelerik.md) (`SDT`, `Informes`)
- depth 3: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 3: [WWP_CreateNotificationToUser](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CreateNotificationToUser.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_SendPendingNotifications](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendPendingNotifications.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 3: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUsersFromRole](../Procedures/WWPBaseObjects/WWP_GetUsersFromRole.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 4: [EmbarquePalletView](../WebPanels/DB/EmbarquePalletView.md) (`WebPanel`, `DB`)
- depth 4: [EmbarquePalletWW](../WebPanels/DB/EmbarquePalletWW.md) (`WebPanel`, `DB`)
- depth 4: [LoadAuditEmbarquePallet](../Procedures/DB/LoadAuditEmbarquePallet.md) (`Procedure`, `DB`)
- depth 4: [SDTPalet](../SDTs/Produccion/SDTPalet.md) (`SDT`, `Produccion`)
- depth 4: [WWP_GetSMTPParameters](../Procedures/WWPBaseObjects/Mail/WWP_GetSMTPParameters.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_Mail](../Transactions/WWPBaseObjects/Mail/WWP_Mail.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_SendMail](../Procedures/WWPBaseObjects/Mail/WWP_SendMail.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_SMTPParametersSDT](../SDTs/WWPBaseObjects/Mail/WWP_SMTPParametersSDT.md) (`SDT`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_CleanNotificationURL](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CleanNotificationURL.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_Notification](../Transactions/WWPBaseObjects/Notifications/Common/WWP_Notification.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_VisualizeNotification](../WebPanels/WWPBaseObjects/Notifications/Common/WWP_VisualizeNotification.md) (`WebPanel`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_SendWebNotification](../Procedures/WWPBaseObjects/Notifications/Web/WWP_SendWebNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Web`)
- depth 4: [WWP_WebClient](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebClient.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 4: [WWP_WebNotification](../Transactions/WWPBaseObjects/Notifications/Web/WWP_WebNotification.md) (`Transaction`, `WWPBaseObjects.Notifications.Web`)
- depth 4: [WWP_GetSMSParameters](../Procedures/WWPBaseObjects/SMS/WWP_GetSMSParameters.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 4: [WWP_SendSMS](../Procedures/WWPBaseObjects/SMS/WWP_SendSMS.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 4: [WWP_SendSMSResultSDT](../SDTs/WWPBaseObjects/SMS/WWP_SendSMSResultSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 4: [WWP_SMS](../Transactions/WWPBaseObjects/SMS/WWP_SMS.md) (`Transaction`, `WWPBaseObjects.SMS`)
- depth 4: [WWP_SMSParametersSDT](../SDTs/WWPBaseObjects/SMS/WWP_SMSParametersSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 4: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 4: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.embarque`, `Embarque`, `EmbarqueDetalle`, `EmbarquePallet`, `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_Subscription`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`, `WWPBaseObjects.Mail.WWP_Mail`, `WWPBaseObjects.Notifications.Web.WWP_WebNotification`, `WWPBaseObjects.SMS.WWP_SMS`, `WWPBaseObjects.Subscriptions.WWP_Subscription`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `Configuracion`, `DB.Embarque`, `Embarque`, `EmbarqueDetalle`, `EmbarquePallet`, `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_SMS`, `WWP_Subscription`, `WWP_UserExtended`, `WWP_WebClient`, `WWP_WebNotification`
- **SDTs usados:** `EmbarqueDetalleSDT`, `GeneXus.Common.GridState`, `GeneXus.Server.NotificationInfo`, `Informes.SDTInformeFilter`, `Informes.SDTTelerik`, `SDTInformeFilter`, `SDTTelerik`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `EmbarqueDetalleDP`
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [Embarque](../_domain_glossary.md#embarque)
- [EmbarqueDetalle](../_domain_glossary.md#embarquedetalle)
- [EmbarquePallet](../_domain_glossary.md#embarquepallet)
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
