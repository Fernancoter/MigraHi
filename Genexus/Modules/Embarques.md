# Módulo: Embarques

## Propósito

Módulo con 49 objetos parseados. Entry points desde el menú: `ListadoEmbarques`, `ListadoOrdenes`, `ListadoRemisiones`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 2 |
| Procedures | 35 |
| SDTs | 1 |
| WebPanels | 11 |
| **Total** | **49** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (277): OrdenesWWExport -> LoadColumnsSelectorState; OrdenesWWExport -> WWP_ColumnsSelector_Add; OrdenesWWExport -> WWP_ColumnSelector_UpdateColumns; OrdenesWWExport -> WWP_ExportWriteFilter; OrdenesWWExport -> WWP_Export_SecureText _(+272 más)_
- [DB](DB.md) (53): OrdenesWWExport -> Order; ObtenerFechaRemisionDesdeSAE -> Remission; OrdenesWWGetFilterData -> Order; ContarEmbarqueLineasValidadas -> EmbarqueDetalle; ListadoEmbarques -> EmbarqueDetalle _(+48 más)_
- [GeneXusReporting](GeneXusReporting.md) (8): InicioEmbarques -> QueryViewerElements; InicioEmbarques -> QueryViewerParameters; InicioEmbarques -> QueryViewerItemExpandData; InicioEmbarques -> QueryViewerItemDoubleClickData; InicioEmbarques -> QueryViewerItemCollapseData _(+3 más)_
- [Informes](Informes.md) (6): CrearEmbarque -> TotalPalletPorProductNumber; EmbarqueFormato -> InformesTelerik; EmbarqueFormato -> SDTTelerik; EmbarqueFormato -> SDTInformeFilter; InicializarEmbarque -> TotalPalletPorProductNumber _(+1 más)_
- [WWPBaseObjects.Mail](WWPBaseObjects.Mail.md) (6): NotificarImpresion -> WWP_SendMail; NotificarImpresion -> WWP_MailTemplate; NotificarImpresion -> WWP_Mail; NotificarSupervisor -> WWP_SendMail; NotificarSupervisor -> WWP_MailTemplate _(+1 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (6): ListadoEmbarques -> WWP_HasSubscriptionsToDisplay; ListadoOrdenes -> WWP_HasSubscriptionsToDisplay; ListadoRemisiones -> WWP_HasSubscriptionsToDisplay; OrdenesWW -> WWP_HasSubscriptionsToDisplay; RemissionsWW -> WWP_HasSubscriptionsToDisplay _(+1 más)_
- [Produccion](Produccion.md) (5): NotificarImpresion -> ObtenerConfiguracion; NotificarImpresion -> SDTPalet; EmbarqueFormato -> ObtenerConfiguracion; NotificarSupervisor -> ObtenerConfiguracion; NotificarSupervisor -> SDTPalet
- [SAE](SAE.md) (1): InicioEmbarques -> NotificarFechaEmbarque
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (1): InicializarEmbarque -> WWP_SendNotification

### Este módulo ES LLAMADO por

- [Web](Web.md) (7): MenuEmbarques -> ListadoEmbarques; MenuEmbarques -> ListadoOrdenes; MenuEmbarques -> ListadoRemisiones; Modules -> InicioEmbarques; MenuEmbarques -> InicioEmbarques _(+2 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (6): ListWWPPrograms -> ListadoEmbarques; ListWWPPrograms -> ListadoOrdenes; ListWWPPrograms -> ListadoRemisiones; ListWWPPrograms -> OrdenesWW; ListWWPPrograms -> RemissionsWW _(+1 más)_
- [DB](DB.md) (1): Embarque -> EmbarqueWP
- [Root](Root.md) (1): ProcedureNotificarReimpresionEtiquetaPalet -> NotificarImpresion
- [SAE](SAE.md) (1): NotificarFechaEmbarque -> InicializarEmbarque

## Entry points (desde el menú)

- [InicioEmbarques](../WebPanels/Embarques/InicioEmbarques.md) -- ruta: `Web > Embarques > Inicio`
- [ListadoEmbarques](../WebPanels/Embarques/ListadoEmbarques.md) -- ruta: `Web > Embarques > Embarques`
- [ListadoOrdenes](../WebPanels/Embarques/ListadoOrdenes.md) -- ruta: `Web > Embarques > Pedidos`
- [ListadoRemisiones](../WebPanels/Embarques/ListadoRemisiones.md) -- ruta: `Web > Embarques > Remisiones`
- [ProductsWW](../WebPanels/Embarques/ProductsWW.md) -- ruta: `Web > Reportes > Product` | `Web > Embarques > Productos`

