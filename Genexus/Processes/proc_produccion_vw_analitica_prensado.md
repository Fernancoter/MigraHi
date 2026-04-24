# Proceso: Prensados

- **Entry point:** [vwAnaliticaPrensado](../WebPanels/Produccion/vwAnaliticaPrensado.md) -- tipo menú
- **Ruta en el menú:** `Web > Prensado > Operación > Prensados`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 38
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_vw_analitica_prensado.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwAnaliticaPrensado](../WebPanels/Produccion/vwAnaliticaPrensado.md) (`WebPanel`, `Produccion`)
- depth 1: [PrensadoView](../WebPanels/DB/PrensadoView.md) (`WebPanel`, `DB`)
- depth 1: [TroquelView](../WebPanels/DB/TroquelView.md) (`WebPanel`, `DB`)
- depth 1: [RptPrensado](../Procedures/PrinterSD/RptPrensado.md) (`Procedure`, `PrinterSD`)
- depth 1: [vwAnaliticaPrensadoExport](../Procedures/Produccion/vwAnaliticaPrensadoExport.md) (`Procedure`, `Produccion`)
- depth 1: [vwAnaliticaPrensadoExportReport](../Procedures/Produccion/vwAnaliticaPrensadoExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [vwAnaliticaPrensadoGetFilterData](../Procedures/Produccion/vwAnaliticaPrensadoGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [PrensadoWW](../WebPanels/DB/PrensadoWW.md) (`WebPanel`, `DB`)
- depth 2: [Troquel](../Transactions/DB/Troquel.md) (`Transaction`, `DB`)
- depth 2: [TroquelWW](../WebPanels/DB/TroquelWW.md) (`WebPanel`, `DB`)
- depth 2: [DPSDTRptPrensado](../DataProviders/PrinterSD/DPSDTRptPrensado.md) (`DataProvider`, `PrinterSD`)
- depth 2: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 2: [SDTCarreteCalidad](../SDTs/PrinterSD/SDTCarreteCalidad.md) (`SDT`, `PrinterSD`)
- depth 2: [SDTRptPrensado](../SDTs/PrinterSD/SDTRptPrensado.md) (`SDT`, `PrinterSD`)
- depth 2: [CarreraDP](../DataProviders/Produccion/CarreraDP.md) (`DataProvider`, `Produccion`)
- depth 2: [CarreteDP](../DataProviders/Produccion/CarreteDP.md) (`DataProvider`, `Produccion`)
- depth 2: [DPPrensadoBobinaSDT](../DataProviders/Produccion/DPPrensadoBobinaSDT.md) (`DataProvider`, `Produccion`)
- depth 2: [DPPrensadoResultado](../DataProviders/Produccion/DPPrensadoResultado.md) (`DataProvider`, `Produccion`)
- depth 2: [DPProductoTerminado](../DataProviders/Produccion/DPProductoTerminado.md) (`DataProvider`, `Produccion`)
- depth 2: [SDTCarrera](../SDTs/Produccion/SDTCarrera.md) (`SDT`, `Produccion`)
- depth 2: [SDTCarrete](../SDTs/Produccion/SDTCarrete.md) (`SDT`, `Produccion`)
- depth 2: [SDTPrensadoBobina](../SDTs/Produccion/SDTPrensadoBobina.md) (`SDT`, `Produccion`)
- depth 2: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 2: [SDTProductoTerminado](../SDTs/Produccion/SDTProductoTerminado.md) (`SDT`, `Produccion`)
- depth 3: [LoadAuditTroquel](../Procedures/DB/LoadAuditTroquel.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWExport](../Procedures/DB/PrensadoWWExport.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWExportReport](../Procedures/DB/PrensadoWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWGetFilterData](../Procedures/DB/PrensadoWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [TroquelWWExport](../Procedures/DB/TroquelWWExport.md) (`Procedure`, `DB`)
- depth 3: [TroquelWWExportReport](../Procedures/DB/TroquelWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [TroquelWWGetFilterData](../Procedures/DB/TroquelWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [gestionarTroquel](../WebPanels/Produccion/gestionarTroquel.md) (`WebPanel`, `Produccion`)
- depth 3: [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) (`DataProvider`, `Produccion`)
- depth 4: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 4: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 4: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 4: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `DB.Troquel`, `Prensado`, `Troquel`
- **Tablas escritas:** `DB.Troquel`, `Troquel`
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `Produccion.SDTCarrera`, `Produccion.SDTCarrete`, `Produccion.SDTPrensadoBobina`, `Produccion.SDTPrensadoResultado`, `Produccion.SDTProductoTerminado`, `SDTCarrera`, `SDTCarrete`, `SDTCarreteCalidad`, `SDTPrensadoBobina`, `SDTPrensadoResultado`, `SDTProducto`, `SDTProductoTerminado`, `SDTRptPrensado`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptPrensado`, `Produccion.CarreraDP`, `Produccion.CarreteDP`, `Produccion.DPPrensadoBobinaSDT`, `Produccion.DPPrensadoResultado`, `Produccion.DPProductoTerminado`
## Entidades relacionadas (del glosario)

- [Troquel](../_domain_glossary.md#troquel)
