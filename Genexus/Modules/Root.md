# Módulo: Root

## Propósito

Módulo con 74 objetos parseados. Entidades centrales por referencias entrantes: `PaletEtiquetaImpresa`. Entry points desde el menú: `GAMWWUsers`, `GAMWWRoles`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 4 |
| Procedures | 32 |
| SDTs | 10 |
| Transactions | 1 |
| WebPanels | 27 |
| **Total** | **74** |

## Entidades clave

- [PaletEtiquetaImpresa](../_domain_glossary.md#paletetiquetaimpresa) -- 1 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (175): GAMWWUserPermissions -> WWP_ManageFiltersLoadSavedFilters; GAMWWUserPermissions -> WWP_GetAppliedFiltersDescription; GAMWWUserPermissions -> WWP_GridStateAddFilterValue; GAMWWUserPermissions -> LoadGridState; GAMWWUserPermissions -> SaveGridState _(+170 más)_
- [GeneXus.Common](GeneXus.Common.md) (16): GAMUpdateRegisterUser -> Messages; GAMSDChangePasswordUser -> Messages; GAMSetPassword -> Messages; GAMCheckUserActivationMethod -> Messages; GAMChangePassword -> Messages _(+11 más)_
- [WorkWithPlus.NativeMobile](WorkWithPlus.NativeMobile.md) (14): HICONESDOptionsDP -> GAMIsAuthByFunctionalityKey; HICONESDOptionsDP -> SDPMenuOptions; SDPCartAddressGetSelected -> SDPWebServerSessionGet; HICONESDHomeBannerDP -> SDPMenuOptions; SDPCartPaymentMethodsSetSelected -> SDPWebServerSessionSet _(+9 más)_
- [DB](DB.md) (8): CountCarretes -> PaletCarrete; EsCarreteEnPallet -> PaletCarrete; SetPaletNoCarretes -> Palet; wpImportarPermisosPorRol -> Document; SDPAddNotification -> Bobina _(+3 más)_
- [GeneXus.SD.Synchronization](GeneXus.SD.Synchronization.md) (8): GxAfterEventReplicator -> SynchronizationInfo; GxAfterEventReplicator -> SynchronizationEventResultList; GxBeforeEventReplicator -> SynchronizationInfo; GxBeforeEventReplicator -> SynchronizationEventList; GxBeforeEventReplicator -> SynchronizationEventResultList _(+3 más)_
- [Produccion](Produccion.md) (2): wpImportarPermisosPorRol -> ObtenerConfiguracion; GAMUserRoleSelect -> ObtenerConfiguracion
- [Embarques](Embarques.md) (1): ProcedureNotificarReimpresionEtiquetaPalet -> NotificarImpresion
- [GeneXus.SD](GeneXus.SD.md) (1): SDPCartPaymentMethodsAddNew -> CardInformation
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (1): Home -> WWP_SDTNotificationsData
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (1): GAMWWRoles -> WWP_SubscriptionsSettingsByRole

### Este módulo ES LLAMADO por

- [DB](DB.md) (23): WWOperador -> TransactionContext; Extrusora -> TransactionContext; Producto -> TransactionContext; WWConfiguracion -> TransactionContext; WWProductoCategoria -> TransactionContext _(+18 más)_
- [Produccion](Produccion.md) (10): SDTerminarCarreraDB -> SDPAddNotification; MedirBobinas -> SDPAddNotification; SDLimpiarNotificaciones -> SDPCartProductsList; SDEliminarNotificacion -> SDPCartProductsList; SDLimpiarNotificaciones -> SDPCartProductsRemove _(+5 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (9): ListWWPPrograms -> GAMWWUsers; MenuOptionsData -> GAMWWUsers; MenuOptionsData -> Home; WWP_ImpactMetadata -> SecGAMUpdatePermissions; WWP_LoadTreeViewSampleData -> TreeNodeCollection _(+4 más)_
- [Web](Web.md) (2): MenuSeguridad -> GAMWWUsers; MenuSeguridad -> GAMWWRoles

## Entry points (desde el menú)

- [GAMWWRoles](../WebPanels/Root/GAMWWRoles.md) -- ruta: `Web > Seguridad > Roles`
- [GAMWWUsers](../WebPanels/Root/GAMWWUsers.md) -- ruta: `Web > Seguridad > Usuarios`

