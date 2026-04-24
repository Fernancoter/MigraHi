# Proceso: Bobinas

- **Entry point:** [vwAnaliticaBobina](../WebPanels/Produccion/vwAnaliticaBobina.md) -- tipo menú
- **Ruta en el menú:** `Web > Extrusión > Operación > Bobinas`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 56
- **Módulos tocados:** `admin`, `DB`, `PrinterSD`, `Produccion`, `Web`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_vw_analitica_bobina.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwAnaliticaBobina](../WebPanels/Produccion/vwAnaliticaBobina.md) (`WebPanel`, `Produccion`)
- depth 1: [ImprimirBobinas](../WebPanels/admin/ImprimirBobinas.md) (`WebPanel`, `admin`)
- depth 1: [BobinaView](../WebPanels/DB/BobinaView.md) (`WebPanel`, `DB`)
- depth 1: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 1: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 1: [LlenadoBobinaInterrupcion](../Procedures/DB/LlenadoBobinaInterrupcion.md) (`Procedure`, `DB`)
- depth 1: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 1: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 1: [vwAnaliticaBobinaExport](../Procedures/Produccion/vwAnaliticaBobinaExport.md) (`Procedure`, `Produccion`)
- depth 1: [vwAnaliticaBobinaExportReport](../Procedures/Produccion/vwAnaliticaBobinaExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [vwAnaliticaBobinaGetFilterData](../Procedures/Produccion/vwAnaliticaBobinaGetFilterData.md) (`Procedure`, `Produccion`)
- depth 1: [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) (`WebPanel`, `WWPBaseObjects`)
- depth 2: [ImprimirBobinasGetFilterData](../Procedures/admin/ImprimirBobinasGetFilterData.md) (`Procedure`, `admin`)
- depth 2: [BobinaWW](../WebPanels/DB/BobinaWW.md) (`WebPanel`, `DB`)
- depth 2: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 2: [ExtrusoraBobina](../Transactions/DB/ExtrusoraBobina.md) (`Transaction`, `DB`)
- depth 2: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 2: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 2: [BobinaReportMainMulti](../Procedures/PrinterSD/BobinaReportMainMulti.md) (`Procedure`, `PrinterSD`)
- depth 2: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 2: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 2: [ObtenerInterrupcionBobina](../Procedures/Produccion/ObtenerInterrupcionBobina.md) (`Procedure`, `Produccion`)
- depth 2: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 2: [SetEstadoBobina](../Procedures/Produccion/SetEstadoBobina.md) (`Procedure`, `Produccion`)
- depth 2: [AuditView](../WebPanels/WWPBaseObjects/AuditView.md) (`WebPanel`, `WWPBaseObjects`)
- depth 3: [BobinaWWExport](../Procedures/DB/BobinaWWExport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWExportReport](../Procedures/DB/BobinaWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWGetFilterData](../Procedures/DB/BobinaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionInterrupcion](../Transactions/DB/ExtrusionInterrupcion.md) (`Transaction`, `DB`)
- depth 3: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionWWExport](../Procedures/DB/InterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionWWExportReport](../Procedures/DB/InterrupcionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionWWGetFilterData](../Procedures/DB/InterrupcionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [LoadAuditInterrupcion](../Procedures/DB/LoadAuditInterrupcion.md) (`Procedure`, `DB`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)
- depth 3: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)
- depth 3: [Audit](../Transactions/WWPBaseObjects/Audit.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [AuditWW](../WebPanels/WWPBaseObjects/AuditWW.md) (`WebPanel`, `WWPBaseObjects`)
- depth 4: [ExtrusionInterrupcionView](../WebPanels/DB/ExtrusionInterrupcionView.md) (`WebPanel`, `DB`)
- depth 4: [ExtrusionInterrupcionWW](../WebPanels/DB/ExtrusionInterrupcionWW.md) (`WebPanel`, `DB`)
- depth 4: [LoadAuditExtrusionInterrupcion](../Procedures/DB/LoadAuditExtrusionInterrupcion.md) (`Procedure`, `DB`)
- depth 4: [DPSDTRptExtrusion](../DataProviders/PrinterSD/DPSDTRptExtrusion.md) (`DataProvider`, `PrinterSD`)
- depth 4: [SDTRptExtrusion](../SDTs/PrinterSD/SDTRptExtrusion.md) (`SDT`, `PrinterSD`)
- depth 4: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 4: [DPExtrusionResultado](../DataProviders/Produccion/DPExtrusionResultado.md) (`DataProvider`, `Produccion`)
- depth 4: [SDTExtrusionResultado](../SDTs/Produccion/SDTExtrusionResultado.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 4: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 4: [AuditWWExport](../Procedures/WWPBaseObjects/AuditWWExport.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [AuditWWExportReport](../Procedures/WWPBaseObjects/AuditWWExportReport.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [AuditWWGetFilterData](../Procedures/WWPBaseObjects/AuditWWGetFilterData.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Audit`, `Bobina`, `DB.Bobina`, `DB.Extrusion`, `DB.Order`, `Extrusion`, `ExtrusionInterrupcion`, `ExtrusoraBobina`, `Interrupcion`
- **Tablas escritas:** `Audit`, `Bobina`, `DB.Bobina`, `DB.ExtrusoraBobina`, `ExtrusionInterrupcion`, `ExtrusoraBobina`, `Interrupcion`
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTBobina`, `SDTExtrusionResultado`, `SDTRptExtrusion`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`, `WWPColumnsSelector`, `WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

- [Audit](../_domain_glossary.md#audit)
- [ExtrusionInterrupcion](../_domain_glossary.md#extrusioninterrupcion)
- [ExtrusoraBobina](../_domain_glossary.md#extrusorabobina)
- [Interrupcion](../_domain_glossary.md#interrupcion)
