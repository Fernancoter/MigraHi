# Módulo: WWPBaseObjects

## Propósito

Top entidades con descripción sustantiva en el KB: "Extended User from GAMUser" (`WWP_UserExtended`); "User Custom" (`UserCustomizations`).

- **Evidencia:** `explícita`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 8 |
| Procedures | 79 |
| SDTs | 27 |
| Transactions | 4 |
| WebPanels | 10 |
| **Total** | **128** |

## Entidades clave

- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended) -- 8 referencias entrantes
- [Audit](../_domain_glossary.md#audit) -- 7 referencias entrantes
- [WWP_Entity](../_domain_glossary.md#wwp-entity) -- 3 referencias entrantes
- [UserCustomizations](../_domain_glossary.md#usercustomizations) -- 2 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [DB](DB.md) (23): ListWWPPrograms -> CompanyWW; ListWWPPrograms -> BudgetWW; ListWWPPrograms -> ConsolidatedWW; ListWWPPrograms -> CustomerWW; ListWWPPrograms -> FTBWW _(+18 más)_
- [Produccion](Produccion.md) (22): ListWWPPrograms -> listarOperador; ListWWPPrograms -> listarProductos; ListWWPPrograms -> listarProductoCategoria; ListWWPPrograms -> listarTurnos; ListWWPPrograms -> listarLotes _(+17 más)_
- [Root](Root.md) (9): ListWWPPrograms -> GAMWWUsers; ListWWPPrograms -> GAMWWRoles; PromptGeolocation -> GxMap; MenuOptionsData -> Home; MenuOptionsData -> GAMChangeYourPassword _(+4 más)_
- [Reportes](Reportes.md) (8): ListWWPPrograms -> CausaInterrupcionWW; ListWWPPrograms -> ExtrusoraObservacionWW; ListWWPPrograms -> PrensaObservacionWW; ListWWPPrograms -> PalletEnEmbarque; ListWWPPrograms -> CarreteEnPallet _(+3 más)_
- [GeneXus.Common](GeneXus.Common.md) (7): SaveFilterAs -> Messages; WWP_AddImportErrorMessage -> Messages; ExportOptions -> Messages; WWP_AddMessage -> Messages; WWP_StorageProvider_GetFilePath -> Messages _(+2 más)_
- [Embarques](Embarques.md) (6): ListWWPPrograms -> OrdenesWW; ListWWPPrograms -> RemissionsWW; ListWWPPrograms -> ProductsWW; ListWWPPrograms -> ListadoEmbarques; ListWWPPrograms -> ListadoRemisiones _(+1 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (3): ListWWPPrograms -> WWP_SubscriptionsSettings; AuditView -> WWP_HasSubscriptionsToDisplay; AuditWW -> WWP_HasSubscriptionsToDisplay
- [Calidad](Calidad.md) (2): ListWWPPrograms -> reclamosww; ListWWPPrograms -> CarreteDefectoWW
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (2): ListWWPPrograms -> WWP_VisualizeAllNotifications; WWP_ImpactMetadata -> WWP_UpdateNotificationDefinitions
- [Downtime](Downtime.md) (1): ListWWPPrograms -> DownTimeCodeWW
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (1): AuditView -> WWP_HasDiscussionMessages
- [WWPBaseObjects.Mail](WWPBaseObjects.Mail.md) (1): ListWWPPrograms -> WWP_MailTemplateWW

### Este módulo ES LLAMADO por

- [DB](DB.md) (1412): EtiquetadoOperadorWW -> SaveFilterAs; ProductoTerminadoWW -> SaveFilterAs; BobinaWW -> SaveFilterAs; ConsolidatedWW -> SaveFilterAs; CompanyWW -> SaveFilterAs _(+1407 más)_
- [Produccion](Produccion.md) (935): listarLotes -> SaveFilterAs; vwTrazabilidad -> SaveFilterAs; listarOperador -> SaveFilterAs; vwAnaliticaBobina -> SaveFilterAs; listarPrensaProducto -> SaveFilterAs _(+930 más)_
- [Reportes](Reportes.md) (430): PrensaObservacionWW -> SaveFilterAs; vwExtrusionResultado -> SaveFilterAs; vwPrensadoResultado -> SaveFilterAs; ExtrusoraObservacionWW -> SaveFilterAs; CarreteEnPallet -> SaveFilterAs _(+425 más)_
- [Embarques](Embarques.md) (277): ListadoEmbarques -> SaveFilterAs; ListadoOrdenes -> SaveFilterAs; ListadoRemisiones -> SaveFilterAs; OrdenesWW -> SaveFilterAs; RemissionsWW -> SaveFilterAs _(+272 más)_
- [Root](Root.md) (175): GAMWWUserPermissions -> SaveFilterAs; GAMWWUsers -> SaveFilterAs; GAMRolePermissionSelect -> SaveFilterAs; GAMWWRoleRoles -> SaveFilterAs; GAMWWRolePermissions -> SaveFilterAs _(+170 más)_
- [Calidad](Calidad.md) (122): CarreteDefectoWW -> SaveFilterAs; reclamosww -> SaveFilterAs; Reclamo -> WWPTransactionContext; CarreteDefecto -> WWPTransactionContext; CarreteDefectoWW -> WWPTransactionContext _(+117 más)_
- [WWPBaseObjects.Mail](WWPBaseObjects.Mail.md) (64): WWP_MailTemplateWW -> SaveFilterAs; WWP_MailTemplate -> WWPTransactionContext; WWP_MailTemplateWW -> WWPTransactionContext; WWP_Mail -> WWPTransactionContext; WWP_MailTemplateWW -> WWP_GridStateAddFilterValueAndSel _(+59 más)_
- [Downtime](Downtime.md) (56): DownTimeCodeWW -> SaveFilterAs; DownTimeCode -> WWPTransactionContext; DownTimeCodeWW -> WWPTransactionContext; DownTimeCodeWW -> WWP_GridStateAddFilterValueAndSel; DownTimeCodeWW -> SecGAMIsAuthByFunctionalityKey _(+51 más)_
- [Web](Web.md) (30): ModuleA -> SecGAMIsAuthByFunctionalityKey; SessionLoad -> WWPContext; SessionLoad -> SetWWPContext; SessionLoad -> LoadWWPContext; SetDefaultModule -> GetMenuAuthorizedOptions _(+25 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (29): WWP_SubscriptionsSettings -> WWPTransactionContext; WWP_SubscriptionsSettingsByRole -> WWPTransactionContext; WWP_HasSubscriptionsToDisplay -> SecGAMIsAuthByFunctionalityKey; WWP_SubscriptionsSettings -> WWPContext; WWP_SubscriptionsSettingsByRole -> WWPContext _(+24 más)_
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (25): WWP_VisualizeAllNotifications -> WWPTransactionContext; WWP_VisualizeAllNotifications -> SecGAMIsAuthByFunctionalityKey; WWP_NotificationDefinition -> SecGAMIsAuthByFunctionalityKey; WWP_CreateNotificationToUser -> WWP_GetParameter; WWP_UpdateNotificationDefinitions -> WWP_GetParameter _(+20 más)_
- [admin](admin.md) (16): ImprimirBobinas -> WWP_GridStateAddFilterValueAndSel; InsertarManualenteBobinas -> WWPContext; ImprimirBobinasGetFilterData -> WWPContext; ImprimirBobinas -> WWPContext; AgregarBobinas -> DVMessageGetBasicNotificationMsg _(+11 más)_
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (11): WWP_SubscribeLoggedUserToDiscussion -> WWP_GetEntityByName; WWP_HasDiscussionMessages -> WWP_GetEntityByName; WWP_SubscribeMentionedUsersToDiscussion -> WWP_GetEntityByName; WWP_SubscribeLoggedUserToDiscussion -> WWP_GetLoggedUserId; WWP_DiscussionMessage -> WWP_GetLoggedUserId _(+6 más)_
- [SAE](SAE.md) (9): OrderPrompt -> WWPContext; ProductDP -> DVB_SDTComboData; priceww -> DVMessageGetBasicNotificationMsg; OrderPrompt -> LoadWWPContext; OrderPrompt -> WWPGridState _(+4 más)_
- [WWPBaseObjects.Notifications.Web](WWPBaseObjects.Notifications.Web.md) (7): WWP_RegisterWebClient -> WWP_CreateUserExtended; WWP_GetUnreadWebNotifications -> WWP_Logger; WWP_UpdateWebNotificationStatus -> WWP_Logger; WWP_RegisterWebClient -> WWP_Logger; WWP_SendWebNotification -> WWP_Logger _(+2 más)_
- [WWPBaseObjects.SMS](WWPBaseObjects.SMS.md) (7): WWP_GetSMSParameters -> WWP_GetParameter; WWP_GetSMSParameters -> WWP_Logger; WWP_ValidateVerificationCode -> WWP_Logger; WWP_UpdateSMSStatus -> WWP_Logger; WWP_SendSMS -> WWP_Logger _(+2 más)_
- [Existencia](Existencia.md) (1): wpExistenciaMain -> SecGAMIsAuthByFunctionalityKey

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **admin, Calidad, DB, Downtime, Embarques, Existencia, Produccion, Reportes, Root, SAE, Web, WWPBaseObjects.Discussions, WWPBaseObjects.Mail, WWPBaseObjects.Notifications.Common, WWPBaseObjects.Notifications.Web, WWPBaseObjects.SMS, WWPBaseObjects.Subscriptions**.

