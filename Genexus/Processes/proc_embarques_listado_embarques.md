# Proceso: Embarques

- **Entry point:** [ListadoEmbarques](../WebPanels/Embarques/ListadoEmbarques.md) -- tipo menú
- **Ruta en el menú:** `Web > Embarques > Embarques`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 57
- **Módulos tocados:** `DB`, `Embarques`, `Informes`, `Produccion`, `Root`, `WWPBaseObjects`, `WWPBaseObjects.Mail`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_listado_embarques.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ListadoEmbarques](../WebPanels/Embarques/ListadoEmbarques.md) (`WebPanel`, `Embarques`)
- depth 1: [EmbarqueDetalle](../Transactions/DB/EmbarqueDetalle.md) (`Transaction`, `DB`)
- depth 1: [EmbarqueView](../WebPanels/DB/EmbarqueView.md) (`WebPanel`, `DB`)
- depth 1: [CargarEmbarque](../WebPanels/Embarques/CargarEmbarque.md) (`WebPanel`, `Embarques`)
- depth 1: [ComenzarCargaDeEmbarque](../Procedures/Embarques/ComenzarCargaDeEmbarque.md) (`Procedure`, `Embarques`)
- depth 1: [EmbarqueFormato](../WebPanels/Embarques/EmbarqueFormato.md) (`WebPanel`, `Embarques`)
- depth 1: [EmbarqueReporte](../WebPanels/Embarques/EmbarqueReporte.md) (`WebPanel`, `Embarques`)
- depth 1: [EmbarqueWP](../WebPanels/Embarques/EmbarqueWP.md) (`WebPanel`, `Embarques`)
- depth 1: [ListadoEmbarquesExport](../Procedures/Embarques/ListadoEmbarquesExport.md) (`Procedure`, `Embarques`)
- depth 1: [ListadoEmbarquesExportReport](../Procedures/Embarques/ListadoEmbarquesExportReport.md) (`Procedure`, `Embarques`)
- depth 1: [ListadoEmbarquesGetFilterData](../Procedures/Embarques/ListadoEmbarquesGetFilterData.md) (`Procedure`, `Embarques`)
- depth 2: [Embarque](../Transactions/DB/Embarque.md) (`Transaction`, `DB`)
- depth 2: [EmbarqueDetalleView](../WebPanels/DB/EmbarqueDetalleView.md) (`WebPanel`, `DB`)
- depth 2: [EmbarquePallet](../Transactions/DB/EmbarquePallet.md) (`Transaction`, `DB`)
- depth 2: [LoadAuditEmbarqueDetalle](../Procedures/DB/LoadAuditEmbarqueDetalle.md) (`Procedure`, `DB`)
- depth 2: [ContarEmbarqueLineasValidadas](../Procedures/Embarques/ContarEmbarqueLineasValidadas.md) (`Procedure`, `Embarques`)
- depth 2: [EmbarqueDetalleDP](../DataProviders/Embarques/EmbarqueDetalleDP.md) (`DataProvider`, `Embarques`)
- depth 2: [EmbarqueDetalleSDT](../SDTs/Embarques/EmbarqueDetalleSDT.md) (`SDT`, `Embarques`)
- depth 2: [LlenarLoteReporte](../Procedures/Embarques/LlenarLoteReporte.md) (`Procedure`, `Embarques`)
- depth 2: [NotificarSupervisor](../Procedures/Embarques/NotificarSupervisor.md) (`Procedure`, `Embarques`)
- depth 2: [InformesTelerik](../Procedures/Informes/InformesTelerik.md) (`Procedure`, `Informes`)
- depth 2: [SDTInformeFilter](../SDTs/Informes/SDTInformeFilter.md) (`SDT`, `Informes`)
- depth 2: [SDTTelerik](../SDTs/Informes/SDTTelerik.md) (`SDT`, `Informes`)
- depth 2: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 2: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 3: [EmbarquePalletView](../WebPanels/DB/EmbarquePalletView.md) (`WebPanel`, `DB`)
- depth 3: [EmbarquePalletWW](../WebPanels/DB/EmbarquePalletWW.md) (`WebPanel`, `DB`)
- depth 3: [LoadAuditEmbarque](../Procedures/DB/LoadAuditEmbarque.md) (`Procedure`, `DB`)
- depth 3: [LoadAuditEmbarquePallet](../Procedures/DB/LoadAuditEmbarquePallet.md) (`Procedure`, `DB`)
- depth 3: [SDTPalet](../SDTs/Produccion/SDTPalet.md) (`SDT`, `Produccion`)
- depth 3: [DVMessageGetAdvancedNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetAdvancedNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_Mail](../Transactions/WWPBaseObjects/Mail/WWP_Mail.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_SendMail](../Procedures/WWPBaseObjects/Mail/WWP_SendMail.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_SendNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [EmbarquePalletWWExport](../Procedures/DB/EmbarquePalletWWExport.md) (`Procedure`, `DB`)
- depth 4: [EmbarquePalletWWExportReport](../Procedures/DB/EmbarquePalletWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [EmbarquePalletWWGetFilterData](../Procedures/DB/EmbarquePalletWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 4: [LoadAuditWWP_MailTemplate](../Procedures/WWPBaseObjects/Mail/LoadAuditWWP_MailTemplate.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_GetStatusCodeMessage](../Procedures/WWPBaseObjects/Mail/WWP_GetStatusCodeMessage.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateView](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateView.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_MailTemplateWW](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateWW.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_ParseMailAddressList](../Procedures/WWPBaseObjects/Mail/WWP_ParseMailAddressList.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_UpdateMailStatus](../Procedures/WWPBaseObjects/Mail/WWP_UpdateMailStatus.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [WWP_CreateNotificationToUser](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CreateNotificationToUser.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_SendPendingNotifications](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendPendingNotifications.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 4: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_GetUsersFromRole](../Procedures/WWPBaseObjects/WWP_GetUsersFromRole.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.Embarque`, `Embarque`, `EmbarqueDetalle`, `EmbarquePallet`, `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_NotificationDefinition`, `WWP_Subscription`, `WWPBaseObjects.Mail.WWP_Mail`, `WWPBaseObjects.Notifications.Web.WWP_WebNotification`, `WWPBaseObjects.SMS.WWP_SMS`, `WWPBaseObjects.Subscriptions.WWP_Subscription`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `Configuracion`, `DB.Embarque`, `Embarque`, `EmbarqueDetalle`, `EmbarquePallet`, `WWP_Entity`, `WWP_Mail`, `WWP_MailTemplate`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_Subscription`
- **SDTs usados:** `EmbarqueDetalleSDT`, `GeneXus.Common.GridState`, `Informes.SDTInformeFilter`, `Informes.SDTTelerik`, `SDTInformeFilter`, `SDTTelerik`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `EmbarqueDetalleDP`
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [Embarque](../_domain_glossary.md#embarque)
- [EmbarqueDetalle](../_domain_glossary.md#embarquedetalle)
- [EmbarquePallet](../_domain_glossary.md#embarquepallet)
- [WWP_Mail](../_domain_glossary.md#wwp-mail)
- [WWP_MailTemplate](../_domain_glossary.md#wwp-mailtemplate)
- [WWP_NotificationDefinition](../_domain_glossary.md#wwp-notificationdefinition)
- [WWP_Subscription](../_domain_glossary.md#wwp-subscription)
