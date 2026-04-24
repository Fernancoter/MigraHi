# Módulo: SAE

## Propósito

Módulo con 26 objetos parseados. Entry points desde el menú: `Orders`, `FTBYTD`, `RealtimeInventory`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 1 |
| Procedures | 6 |
| SDTs | 2 |
| WebPanels | 17 |
| **Total** | **26** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [Informes](Informes.md) (15): Orders -> InformesTelerik; Orders -> SDTTelerik; Orders -> SDTInformeFilter; FTBYTD -> InformesTelerik; FTBYTD -> SDTTelerik _(+10 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (9): OrderPrompt -> WWP_GetAppliedFiltersDescription; OrderPrompt -> GetWWPTitleSettingsIcons; OrderPrompt -> LoadWWPContext; OrderPrompt -> WWPGridState; OrderPrompt -> DVB_SDTDropDownOptionsData _(+4 más)_
- [DB](DB.md) (8): EditBudget -> Budget; UpdateFTB -> FTB; OrderPrompt -> Order; NotificarFechaEmbarque -> Budget; NotificarFechaEmbarque -> Remission _(+3 más)_
- [GeneXusReporting](GeneXusReporting.md) (8): ReportITW -> QueryViewerElements; ReportITW -> QueryViewerParameters; ReportITW -> QueryViewerItemExpandData; ReportITW -> QueryViewerItemDoubleClickData; ReportITW -> QueryViewerItemCollapseData _(+3 más)_
- [Produccion](Produccion.md) (2): UnitPlan -> ObtenerConfiguracion; ITWOutlook -> ObtenerConfiguracion
- [Embarques](Embarques.md) (1): NotificarFechaEmbarque -> InicializarEmbarque

### Este módulo ES LLAMADO por

- [Web](Web.md) (8): MenuModuleInformesSAE -> Orders; MenuModuleInformesSAE -> FTBYTD; MenuModuleInformesSAE -> RealtimeInventory; Modules -> InicioReportes; Modules -> InicioCatalogosSAE _(+3 más)_
- [DB](DB.md) (2): Budget -> EditBudget; FTB -> UpdateFTB
- [Embarques](Embarques.md) (2): InicioEmbarques -> NotificarFechaEmbarque; SyncSAE -> Actualizando
- [Produccion](Produccion.md) (1): gestionarProducto -> ProductDP

## Entry points (desde el menú)

- [FTBYTD](../WebPanels/SAE/FTBYTD.md) -- ruta: `Web > Reportes > FTB YTD`
- [Orders](../WebPanels/SAE/Orders.md) -- ruta: `Web > Reportes > Report Orders`
- [OrdersMoney](../WebPanels/SAE/OrdersMoney.md) -- ruta: `Web > Reportes > Report Orders Price`
- [outlookww](../WebPanels/SAE/outlookww.md) -- ruta: `Web > Reportes > Outlook`
- [priceww](../WebPanels/SAE/priceww.md) -- ruta: `Web > Reportes > Price`
- [RealtimeInventory](../WebPanels/SAE/RealtimeInventory.md) -- ruta: `Web > Reportes > Realtime Inventory`

