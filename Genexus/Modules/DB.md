# Módulo: DB

## Propósito

Módulo con 240 objetos parseados. Entidades centrales por referencias entrantes: `Extrusion`, `Bobina`, `Prensado`. Entry points desde el menú: `WWOperador`, `BobinaWW`, `CustomerWW`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 102 |
| Transactions | 53 |
| WebPanels | 85 |
| **Total** | **240** |

## Entidades clave

- [Extrusion](../_domain_glossary.md#extrusion) -- 57 referencias entrantes
- [Bobina](../_domain_glossary.md#bobina) -- 52 referencias entrantes
- [Prensado](../_domain_glossary.md#prensado) -- 49 referencias entrantes
- [Palet](../_domain_glossary.md#palet) -- 31 referencias entrantes
- [Carrete](../_domain_glossary.md#carrete) -- 30 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (1412): PrensadoWWGetFilterData -> LoadGridState; PrensadoWWGetFilterData -> LoadWWPContext; PrensadoWWGetFilterData -> WWPGridState; PrensadoWWGetFilterData -> WWPContext; PaletPrompt -> WWP_GetAppliedFiltersDescription _(+1407 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (40): EtiquetadoOperadorWW -> WWP_HasSubscriptionsToDisplay; TroquelView -> WWP_HasSubscriptionsToDisplay; SalesPersonView -> WWP_HasSubscriptionsToDisplay; InterrupcionView -> WWP_HasSubscriptionsToDisplay; EtiquetadoOperadorView -> WWP_HasSubscriptionsToDisplay _(+35 más)_
- [Root](Root.md) (23): WWOperador -> TransactionContext; ViewOperador -> TabOptions; ViewInventario -> TabOptions; Extrusora -> TransactionContext; Producto -> TransactionContext _(+18 más)_
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (20): TroquelView -> WWP_HasDiscussionMessages; SalesPersonView -> WWP_HasDiscussionMessages; InterrupcionView -> WWP_HasDiscussionMessages; EtiquetadoOperadorView -> WWP_HasDiscussionMessages; CarreraView -> WWP_HasDiscussionMessages _(+15 más)_
- [Produccion](Produccion.md) (11): BobinaWW -> ReposoTranscurrido; BobinaWW -> SDPausarBobinas; LlenadoCarreraInterrupcion -> ObtenerInterrupcionCarrera; Troquel -> TipoCarreteDP; Troquel -> gestionarTroquel _(+6 más)_
- [PrinterSD](PrinterSD.md) (10): BobinaWW -> BobinaReportMain; BobinaWW -> EtiquetaBobinaSDT; PaletWW -> PaletReportMain; PaletWW -> PaletReport; PrensadoWW -> RptPrensado _(+5 más)_
- [GeneXus.Common](GeneXus.Common.md) (8): WWOperador -> GridState; WWConfiguracion -> GridState; WWProductoCategoria -> GridState; WWPrensaProducto -> GridState; WWExtrusora -> GridState _(+3 más)_
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (3): PrensadoBobina -> WWP_SendNotification; Embarque -> WWP_SendNotification; Existencia -> WWP_SendNotification
- [Reportes](Reportes.md) (2): LoadAuditPrensado -> PrensadoInterrupMin; LoadAuditPrensado -> PrensadoInterrupEnCurso
- [SAE](SAE.md) (2): Budget -> EditBudget; FTB -> UpdateFTB
- [Embarques](Embarques.md) (1): Embarque -> EmbarqueWP
- [Existencia](Existencia.md) (1): ExistenciaWW -> wpExistenciaMain
- [Web](Web.md) (1): CarreteWW -> Debugger

### Este módulo ES LLAMADO por

- [Produccion](Produccion.md) (378): MenuDP -> WWOperador; SDBobinaEnPrensado -> PrensadoBobina; SDProductoCarrera -> PrensadoBobina; CrearPrensadoBobina -> PrensadoBobina; IniciarCarrera -> PrensadoBobina _(+373 más)_
- [Embarques](Embarques.md) (53): OrdenesWWExport -> Order; OrdenesWWGetFilterData -> Order; ListadoOrdenes -> Order; OrdenesWW -> Order; ObtenerDatosRemisionDesdeSAE -> Order _(+48 más)_
- [Reportes](Reportes.md) (51): WCDetallePrensadoBobinaExport -> PrensadoBobina; WCDetallePrensadoBobinaGetFilterData -> PrensadoBobina; WCDetallePrensadoBobinaExportReport -> PrensadoBobina; vwExtrusionResultadoExportReport -> ExtrusionResultado; vwExtrusionResultado -> ExtrusionResultado _(+46 más)_
- [Web](Web.md) (43): MenuMateriaPrima -> WWOperador; MenuProduccion -> WWOperador; MenuMateriaPrima -> BobinaWW; MenuProduccion -> BobinaWW; MenuModuleCatalogosSAE -> CustomerWW _(+38 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (23): ListWWPPrograms -> EtiquetadoOperadorWW; ListWWPPrograms -> ProductoTerminadoWW; ListWWPPrograms -> BobinaWW; ListWWPPrograms -> ConsolidatedWW; ListWWPPrograms -> CompanyWW _(+18 más)_
- [Calidad](Calidad.md) (14): ConsultarCarrete -> Carrera; ReclamoSumarioCarrete -> Carrera; ConsultarCarrete -> Carrete; ReclamoSumarioCarrete -> Carrete; TrazabilidadView -> CarreraView _(+9 más)_
- [Existencia](Existencia.md) (14): ExistenciaBobinasPorTurnoId -> ExtrusionResultado; ObtenerExistenciaProducto -> Palet; ObtenerExistenciaProducto -> Producto; ExistenciaPalletPorTurnoId -> PrensadoResultado; ObtenerExistenciaSilo -> Lote _(+9 más)_
- [PrinterSD](PrinterSD.md) (10): CarreteReportMainPCR -> Carrete; CarreteReportMain -> Carrete; ObtenerSDTEtiquetaCarrete -> Carrete; PaletReport -> Palet; ObtenerSDTEtiquetaPalet -> Palet _(+5 más)_
- [Root](Root.md) (8): SDPAddNotification -> Carrera; SetPaletNoCarretes -> Palet; ProcedureNotificarReimpresionEtiquetaPalet -> Palet; GAMUserRoleSelect -> Operador; CountCarretes -> PaletCarrete _(+3 más)_
- [SAE](SAE.md) (8): OrderPrompt -> Order; EditBudget -> Budget; NotificarFechaEmbarque -> Budget; outlookww -> Budget; priceww -> Budget _(+3 más)_
- [admin](admin.md) (4): InsertarManualenteBobinas -> Extrusion; AgregarBobinas -> Extrusion; InsertarManualenteBobinas -> Bobina; ImprimirBobinas -> Bobina
- [Seguridad](Seguridad.md) (2): HabilitarOperador -> Operador; DeshabilitarOperador -> Operador

## Entry points (desde el menú)

- [BobinaWW](../WebPanels/DB/BobinaWW.md) -- ruta: `Web > Producción > Extrusión > Bobinas`
- [BudgetWW](../WebPanels/DB/BudgetWW.md) -- ruta: `Web > Reportes > Budget`
- [CarreraWW](../WebPanels/DB/CarreraWW.md) -- ruta: `Web > Prensado > Operación > Carreras` | `Web > Producción > Prensado > Carreras`
- [CarreteWW](../WebPanels/DB/CarreteWW.md) -- ruta: `Web > Producción > Prensado > Carretes`
- [CustomerWW](../WebPanels/DB/CustomerWW.md) -- ruta: `Web > Reportes > Customer` | `Web > Embarques > Clientes`
- [ExistenciaWW](../WebPanels/DB/ExistenciaWW.md) -- ruta: `Web > Inventarios > Inventario`
- [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) -- ruta: `Web > Extrusión > Operación > Extrusiones` | `Web > Producción > Extrusión > Extrusiones`
- [ExtrusoraMezcladoraWW](../WebPanels/DB/ExtrusoraMezcladoraWW.md) -- ruta: `Web > Producción > Referencias > ExtrusoraMezcladora`
- [FTBWW](../WebPanels/DB/FTBWW.md) -- ruta: `Web > Reportes > Report FTB` | `Web > Embarques > Facturas`
- [PaletWW](../WebPanels/DB/PaletWW.md) -- ruta: `Web > Prensado > Operación > Palets` | `Web > Producción > Prensado > Palets`
- [PrensadoWW](../WebPanels/DB/PrensadoWW.md) -- ruta: `Web > Producción > Prensado > Prensados`
- [SalesPersonWW](../WebPanels/DB/SalesPersonWW.md) -- ruta: `Web > Reportes > SalesPerson`
- [TroquelWW](../WebPanels/DB/TroquelWW.md) -- ruta: `Web > Prensado > Troqueles` | `Web > Producción > Catálogos > Troqueles`
- [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) -- ruta: `Web > Producción > Referencias > Configuración`
- [WWExtrusora](../WebPanels/DB/WWExtrusora.md) -- ruta: `Web > Producción > Catálogos > Extrusoras`
- [WWExtrusoraProducto](../WebPanels/DB/WWExtrusoraProducto.md) -- ruta: `Web > Producción > Referencias > ExtrusoraProducto`
- [WWInventario](../WebPanels/DB/WWInventario.md) -- ruta: `Web > Producción > Catálogos > Inventarios`
- [WWOperador](../WebPanels/DB/WWOperador.md) -- ruta: `Web > Producción > Catálogos > Operadores`
- [WWPrensaProducto](../WebPanels/DB/WWPrensaProducto.md) -- ruta: `Web > Producción > Referencias > PrensaProducto`
- [WWProducto](../WebPanels/DB/WWProducto.md) -- ruta: `Web > Producción > Catálogos > Productos`
- [WWProductoCategoria](../WebPanels/DB/WWProductoCategoria.md) -- ruta: `Web > Producción > Catálogos > Categorías`

