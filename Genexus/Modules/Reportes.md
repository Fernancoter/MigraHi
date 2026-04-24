# Módulo: Reportes

## Propósito

Módulo con 77 objetos parseados. Entidades centrales por referencias entrantes: `PrensaObservacion`, `ExtrusoraObservacion`, `CausaInterrupcion`. Entry points desde el menú: `PrensaObservacionWW`, `vwExtrusionResultado`, `vwPrensadoResultado`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 6 |
| Procedures | 45 |
| SDTs | 2 |
| Transactions | 3 |
| WebPanels | 21 |
| **Total** | **77** |

## Entidades clave

- [PrensaObservacion](../_domain_glossary.md#prensaobservacion) -- 8 referencias entrantes
- [ExtrusoraObservacion](../_domain_glossary.md#extrusoraobservacion) -- 8 referencias entrantes
- [CausaInterrupcion](../_domain_glossary.md#causainterrupcion) -- 7 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (430): CausaInterrupcion -> AuditTransaction; CausaInterrupcion -> LoadWWPContext; CausaInterrupcion -> AuditingObject; CausaInterrupcion -> WWPTransactionContext; CausaInterrupcion -> WWPContext _(+425 más)_
- [DB](DB.md) (51): vwPrensadoResultadoExportReport -> PrensadoResultado; WCDetallePrensadoBobinaExport -> PrensadoBobina; CarreteEnPalletExportReport -> PaletCarrete; vwPrensadoResultadoExport -> PrensadoResultado; BusquedaBobinas -> Bobina _(+46 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (10): PrensaObservacionWW -> WWP_HasSubscriptionsToDisplay; PrensaObservacionView -> WWP_HasSubscriptionsToDisplay; ExtrusoraObservacionView -> WWP_HasSubscriptionsToDisplay; CausaInterrupcionView -> WWP_HasSubscriptionsToDisplay; vwExtrusionResultado -> WWP_HasSubscriptionsToDisplay _(+5 más)_
- [Produccion](Produccion.md) (7): PrensadosDelDiaWCGetFilterData -> JornadaLaboral; ExtrusoraObservacion -> TurnoDP; ExtrusoraObservacion -> ExtrusoraDP; ExtrusionesDelDiaWCGetFilterData -> JornadaLaboral; PrensaObservacion -> TurnoDP _(+2 más)_
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (3): PrensaObservacionView -> WWP_HasDiscussionMessages; ExtrusoraObservacionView -> WWP_HasDiscussionMessages; CausaInterrupcionView -> WWP_HasDiscussionMessages

### Este módulo ES LLAMADO por

- [WWPBaseObjects](WWPBaseObjects.md) (8): ListWWPPrograms -> PrensaObservacionWW; ListWWPPrograms -> vwExtrusionResultado; ListWWPPrograms -> vwPrensadoResultado; ListWWPPrograms -> ExtrusoraObservacionWW; ListWWPPrograms -> CarreteEnPallet _(+3 más)_
- [DB](DB.md) (2): LoadAuditPrensado -> PrensadoInterrupMin; LoadAuditPrensado -> PrensadoInterrupEnCurso
- [Web](Web.md) (2): Modules -> InicioReportesHC; MenuByModule -> MenuReportesHC

## Entry points (desde el menú)

- [CarreteEnPallet](../WebPanels/Reportes/CarreteEnPallet.md) -- ruta: `Web > Reportes HC > Descargables > Carrete_Pallet`
- [CausaInterrupcionWW](../WebPanels/Reportes/CausaInterrupcionWW.md) -- ruta: `Web > Reportes HC > Observaciones > Causas Interrupción`
- [ExtrusoraObservacionWW](../WebPanels/Reportes/ExtrusoraObservacionWW.md) -- ruta: `Web > Reportes HC > Observaciones > Extrusoras`
- [InicioReportesHC](../WebPanels/Reportes/InicioReportesHC.md) -- ruta: `Web > Reportes HC > Inicio`
- [PalletEnEmbarque](../WebPanels/Reportes/PalletEnEmbarque.md) -- ruta: `Web > Reportes HC > Descargables > Pallet_Embarque`
- [PrensaObservacionWW](../WebPanels/Reportes/PrensaObservacionWW.md) -- ruta: `Web > Reportes HC > Observaciones > Prensas`
- [ReporteDRR](../WebPanels/Reportes/ReporteDRR.md) -- ruta: `Web > Reportes HC > Descargables > DRR`
- [vwExtrusionResultado](../WebPanels/Reportes/vwExtrusionResultado.md) -- ruta: `Web > Reportes HC > Resúmenes > Extrusión`
- [vwOrdenEtiquetado](../WebPanels/Reportes/vwOrdenEtiquetado.md) -- ruta: `Web > Reportes HC > Etiquetado > Órdenes`
- [vwPrensadoResultado](../WebPanels/Reportes/vwPrensadoResultado.md) -- ruta: `Web > Reportes HC > Resúmenes > Prensado`

