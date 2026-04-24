# Proceso: Inicio

- **Entry point:** [InicioEmbarques](../WebPanels/Embarques/InicioEmbarques.md) -- tipo menú
- **Ruta en el menú:** `Web > Embarques > Inicio`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 49
- **Módulos tocados:** `DB`, `Embarques`, `GeneXusReporting`, `Informes`, `SAE`, `WWPBaseObjects`, `WWPBaseObjects.Notifications.Common`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_inicio_embarques.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [InicioEmbarques](../WebPanels/Embarques/InicioEmbarques.md) (`WebPanel`, `Embarques`)
- depth 1: [SyncSAE](../Procedures/Embarques/SyncSAE.md) (`Procedure`, `Embarques`)
- depth 1: [QueryViewerDragAndDropData](../SDTs/GeneXusReporting/QueryViewerDragAndDropData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerElements](../SDTs/GeneXusReporting/QueryViewerElements.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerFilterChangedData](../SDTs/GeneXusReporting/QueryViewerFilterChangedData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemClickData](../SDTs/GeneXusReporting/QueryViewerItemClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemCollapseData](../SDTs/GeneXusReporting/QueryViewerItemCollapseData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemDoubleClickData](../SDTs/GeneXusReporting/QueryViewerItemDoubleClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemExpandData](../SDTs/GeneXusReporting/QueryViewerItemExpandData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerParameters](../SDTs/GeneXusReporting/QueryViewerParameters.md) (`SDT`, `GeneXusReporting`)
- depth 1: [NotificarFechaEmbarque](../Procedures/SAE/NotificarFechaEmbarque.md) (`Procedure`, `SAE`)
- depth 2: [Budget](../Transactions/DB/Budget.md) (`Transaction`, `DB`)
- depth 2: [Remission](../Transactions/DB/Remission.md) (`Transaction`, `DB`)
- depth 2: [InicializarEmbarque](../Procedures/Embarques/InicializarEmbarque.md) (`Procedure`, `Embarques`)
- depth 3: [BudgetView](../WebPanels/DB/BudgetView.md) (`WebPanel`, `DB`)
- depth 3: [BudgetWW](../WebPanels/DB/BudgetWW.md) (`WebPanel`, `DB`)
- depth 3: [Embarque](../Transactions/DB/Embarque.md) (`Transaction`, `DB`)
- depth 3: [EmbarqueDetalle](../Transactions/DB/EmbarqueDetalle.md) (`Transaction`, `DB`)
- depth 3: [LoadAuditBudget](../Procedures/DB/LoadAuditBudget.md) (`Procedure`, `DB`)
- depth 3: [LoadAuditRemission](../Procedures/DB/LoadAuditRemission.md) (`Procedure`, `DB`)
- depth 3: [Order](../Transactions/DB/Order.md) (`Transaction`, `DB`)
- depth 3: [BuscarEmbarqueRemission](../Procedures/Embarques/BuscarEmbarqueRemission.md) (`Procedure`, `Embarques`)
- depth 3: [EmbarqueWP](../WebPanels/Embarques/EmbarqueWP.md) (`WebPanel`, `Embarques`)
- depth 3: [ObtenerDatosRemisionDesdeSAE](../Procedures/Embarques/ObtenerDatosRemisionDesdeSAE.md) (`Procedure`, `Embarques`)
- depth 3: [ObtenerFechaRemisionDesdeSAE](../Procedures/Embarques/ObtenerFechaRemisionDesdeSAE.md) (`Procedure`, `Embarques`)
- depth 3: [TotalPalletPorProductNumber](../Procedures/Informes/TotalPalletPorProductNumber.md) (`Procedure`, `Informes`)
- depth 3: [EditBudget](../WebPanels/SAE/EditBudget.md) (`WebPanel`, `SAE`)
- depth 3: [WWP_SendNotification](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendNotification.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [BudgetWWExport](../Procedures/DB/BudgetWWExport.md) (`Procedure`, `DB`)
- depth 4: [BudgetWWExportReport](../Procedures/DB/BudgetWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [BudgetWWGetFilterData](../Procedures/DB/BudgetWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [EmbarqueDetalleView](../WebPanels/DB/EmbarqueDetalleView.md) (`WebPanel`, `DB`)
- depth 4: [EmbarqueView](../WebPanels/DB/EmbarqueView.md) (`WebPanel`, `DB`)
- depth 4: [LoadAuditEmbarque](../Procedures/DB/LoadAuditEmbarque.md) (`Procedure`, `DB`)
- depth 4: [LoadAuditEmbarqueDetalle](../Procedures/DB/LoadAuditEmbarqueDetalle.md) (`Procedure`, `DB`)
- depth 4: [ContarEmbarqueLineasValidadas](../Procedures/Embarques/ContarEmbarqueLineasValidadas.md) (`Procedure`, `Embarques`)
- depth 4: [EmbarqueDetalleDP](../DataProviders/Embarques/EmbarqueDetalleDP.md) (`DataProvider`, `Embarques`)
- depth 4: [EmbarqueDetalleSDT](../SDTs/Embarques/EmbarqueDetalleSDT.md) (`SDT`, `Embarques`)
- depth 4: [ListadoEmbarques](../WebPanels/Embarques/ListadoEmbarques.md) (`WebPanel`, `Embarques`)
- depth 4: [SDTBudget](../SDTs/SAE/SDTBudget.md) (`SDT`, `SAE`)
- depth 4: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_CreateNotificationToUser](../Procedures/WWPBaseObjects/Notifications/Common/WWP_CreateNotificationToUser.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_SendPendingNotifications](../Procedures/WWPBaseObjects/Notifications/Common/WWP_SendPendingNotifications.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 4: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 4: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [WWP_GetUsersFromRole](../Procedures/WWPBaseObjects/WWP_GetUsersFromRole.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Budget`, `DB.Budget`, `DB.Embarque`, `Embarque`, `EmbarqueDetalle`, `Order`, `Remission`, `WWP_Entity`, `WWP_NotificationDefinition`, `WWP_Subscription`, `WWPBaseObjects.Mail.WWP_Mail`, `WWPBaseObjects.Notifications.Web.WWP_WebNotification`, `WWPBaseObjects.SMS.WWP_SMS`, `WWPBaseObjects.Subscriptions.WWP_Subscription`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `Budget`, `DB.Budget`, `DB.Embarque`, `DB.EmbarqueDetalle`, `Embarque`, `EmbarqueDetalle`, `Order`, `Remission`, `WWP_Entity`, `WWP_Notification`, `WWP_NotificationDefinition`, `WWP_Subscription`
- **SDTs usados:** `EmbarqueDetalleSDT`, `GeneXus.Common.GridState`, `SDTBudget`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `EmbarqueDetalleDP`
## Entidades relacionadas (del glosario)

- [Budget](../_domain_glossary.md#budget)
- [Embarque](../_domain_glossary.md#embarque)
- [EmbarqueDetalle](../_domain_glossary.md#embarquedetalle)
- [Order](../_domain_glossary.md#order)
- [Remission](../_domain_glossary.md#remission)
- [WWP_NotificationDefinition](../_domain_glossary.md#wwp-notificationdefinition)
- [WWP_Subscription](../_domain_glossary.md#wwp-subscription)
