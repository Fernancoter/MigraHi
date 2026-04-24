# Proceso: Remisiones

- **Entry point:** [ListadoRemisiones](../WebPanels/Embarques/ListadoRemisiones.md) -- tipo menú
- **Ruta en el menú:** `Web > Embarques > Remisiones`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 46
- **Módulos tocados:** `DB`, `Embarques`, `Informes`, `WWPBaseObjects`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Subscriptions`
- **Mergeado con:** `RemissionsWW` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_listado_remisiones.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ListadoRemisiones](../WebPanels/Embarques/ListadoRemisiones.md) (`WebPanel`, `Embarques`)
- depth 0: [RemissionsWW](../WebPanels/Embarques/RemissionsWW.md) (`WebPanel`, `Embarques`)
- depth 1: [Remission](../Transactions/DB/Remission.md) (`Transaction`, `DB`)
- depth 1: [CrearEmbarque](../Procedures/Embarques/CrearEmbarque.md) (`Procedure`, `Embarques`)
- depth 1: [ListadoRemisionesExport](../Procedures/Embarques/ListadoRemisionesExport.md) (`Procedure`, `Embarques`)
- depth 1: [ListadoRemisionesExportReport](../Procedures/Embarques/ListadoRemisionesExportReport.md) (`Procedure`, `Embarques`)
- depth 1: [ListadoRemisionesGetFilterData](../Procedures/Embarques/ListadoRemisionesGetFilterData.md) (`Procedure`, `Embarques`)
- depth 1: [RemissionsWWExport](../Procedures/Embarques/RemissionsWWExport.md) (`Procedure`, `Embarques`)
- depth 1: [RemissionsWWExportReport](../Procedures/Embarques/RemissionsWWExportReport.md) (`Procedure`, `Embarques`)
- depth 1: [RemissionsWWGetFilterData](../Procedures/Embarques/RemissionsWWGetFilterData.md) (`Procedure`, `Embarques`)
- depth 2: [Embarque](../Transactions/DB/Embarque.md) (`Transaction`, `DB`)
- depth 2: [EmbarqueDetalle](../Transactions/DB/EmbarqueDetalle.md) (`Transaction`, `DB`)
- depth 2: [LoadAuditRemission](../Procedures/DB/LoadAuditRemission.md) (`Procedure`, `DB`)
- depth 2: [Order](../Transactions/DB/Order.md) (`Transaction`, `DB`)
- depth 2: [BuscarEmbarqueRemission](../Procedures/Embarques/BuscarEmbarqueRemission.md) (`Procedure`, `Embarques`)
- depth 2: [EmbarqueWP](../WebPanels/Embarques/EmbarqueWP.md) (`WebPanel`, `Embarques`)
- depth 2: [ObtenerDatosRemisionDesdeSAE](../Procedures/Embarques/ObtenerDatosRemisionDesdeSAE.md) (`Procedure`, `Embarques`)
- depth 2: [ObtenerFechaRemisionDesdeSAE](../Procedures/Embarques/ObtenerFechaRemisionDesdeSAE.md) (`Procedure`, `Embarques`)
- depth 2: [ValidarEmbarqueRemission](../Procedures/Embarques/ValidarEmbarqueRemission.md) (`Procedure`, `Embarques`)
- depth 2: [TotalPalletPorProductNumber](../Procedures/Informes/TotalPalletPorProductNumber.md) (`Procedure`, `Informes`)
- depth 3: [EmbarqueDetalleView](../WebPanels/DB/EmbarqueDetalleView.md) (`WebPanel`, `DB`)
- depth 3: [EmbarqueView](../WebPanels/DB/EmbarqueView.md) (`WebPanel`, `DB`)
- depth 3: [LoadAuditEmbarque](../Procedures/DB/LoadAuditEmbarque.md) (`Procedure`, `DB`)
- depth 3: [LoadAuditEmbarqueDetalle](../Procedures/DB/LoadAuditEmbarqueDetalle.md) (`Procedure`, `DB`)
- depth 3: [ContarEmbarqueLineasValidadas](../Procedures/Embarques/ContarEmbarqueLineasValidadas.md) (`Procedure`, `Embarques`)
- depth 3: [EmbarqueDetalleDP](../DataProviders/Embarques/EmbarqueDetalleDP.md) (`DataProvider`, `Embarques`)
- depth 3: [EmbarqueDetalleSDT](../SDTs/Embarques/EmbarqueDetalleSDT.md) (`SDT`, `Embarques`)
- depth 3: [ListadoEmbarques](../WebPanels/Embarques/ListadoEmbarques.md) (`WebPanel`, `Embarques`)
- depth 3: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_SendNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 3: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [CargarEmbarque](../WebPanels/Embarques/CargarEmbarque.md) (`WebPanel`, `Embarques`)
- depth 4: [ComenzarCargaDeEmbarque](../Procedures/Embarques/ComenzarCargaDeEmbarque.md) (`Procedure`, `Embarques`)
- depth 4: [EmbarqueFormato](../WebPanels/Embarques/EmbarqueFormato.md) (`WebPanel`, `Embarques`)
- depth 4: [EmbarqueReporte](../WebPanels/Embarques/EmbarqueReporte.md) (`WebPanel`, `Embarques`)
- depth 4: [ListadoEmbarquesExport](../Procedures/Embarques/ListadoEmbarquesExport.md) (`Procedure`, `Embarques`)
- depth 4: [ListadoEmbarquesExportReport](../Procedures/Embarques/ListadoEmbarquesExportReport.md) (`Procedure`, `Embarques`)
- depth 4: [ListadoEmbarquesGetFilterData](../Procedures/Embarques/ListadoEmbarquesGetFilterData.md) (`Procedure`, `Embarques`)
- depth 4: [DVMessageGetAdvancedNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetAdvancedNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_CreateNotificationToUser](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CreateNotificationToUser.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_SendPendingNotifications](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendPendingNotifications.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 4: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_GetUsersFromRole](../Procedures/WWPBaseObjects/WWP_GetUsersFromRole.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `DB.Embarque`, `Embarque`, `EmbarqueDetalle`, `Order`, `Remission`, `WWP_Entity`, `WWP_NotificationDefinition`, `WWP_Subscription`, `WWPBaseObjects.Mail.WWP_Mail`, `WWPBaseObjects.Notifications.Web.WWP_WebNotification`, `WWPBaseObjects.SMS.WWP_SMS`, `WWPBaseObjects.Subscriptions.WWP_Subscription`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `DB.Embarque`, `DB.EmbarqueDetalle`, `Embarque`, `EmbarqueDetalle`, `Order`, `Remission`, `WWP_Entity`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_Subscription`
- **SDTs usados:** `EmbarqueDetalleSDT`, `GeneXus.Common.GridState`, `Informes.SDTInformeFilter`, `Informes.SDTTelerik`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `EmbarqueDetalleDP`
## Entidades relacionadas (del glosario)

- [Embarque](../_domain_glossary.md#embarque)
- [EmbarqueDetalle](../_domain_glossary.md#embarquedetalle)
- [Order](../_domain_glossary.md#order)
- [Remission](../_domain_glossary.md#remission)
- [WWP_NotificationDefinition](../_domain_glossary.md#wwp-notificationdefinition)
- [WWP_Subscription](../_domain_glossary.md#wwp-subscription)
