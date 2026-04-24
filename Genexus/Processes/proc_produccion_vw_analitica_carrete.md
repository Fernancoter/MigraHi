# Proceso: Carretes

- **Entry point:** [vwAnaliticaCarrete](../WebPanels/Produccion/vwAnaliticaCarrete.md) -- tipo menú
- **Ruta en el menú:** `Web > Prensado > Operación > Carretes`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 64
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_vw_analitica_carrete.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwAnaliticaCarrete](../WebPanels/Produccion/vwAnaliticaCarrete.md) (`WebPanel`, `Produccion`)
- depth 1: [BobinaView](../WebPanels/DB/BobinaView.md) (`WebPanel`, `DB`)
- depth 1: [CarreraView](../WebPanels/DB/CarreraView.md) (`WebPanel`, `DB`)
- depth 1: [CarreteView](../WebPanels/DB/CarreteView.md) (`WebPanel`, `DB`)
- depth 1: [PrensadoView](../WebPanels/DB/PrensadoView.md) (`WebPanel`, `DB`)
- depth 1: [CarreteReportMain](../Procedures/PrinterSD/CarreteReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [CarreteReportMainPCR](../Procedures/PrinterSD/CarreteReportMainPCR.md) (`Procedure`, `PrinterSD`)
- depth 1: [ObtenerTipoMaterialPorCarrete](../Procedures/Produccion/ObtenerTipoMaterialPorCarrete.md) (`Procedure`, `Produccion`)
- depth 1: [vwAnaliticaCarreteExport](../Procedures/Produccion/vwAnaliticaCarreteExport.md) (`Procedure`, `Produccion`)
- depth 1: [vwAnaliticaCarreteGetFilterData](../Procedures/Produccion/vwAnaliticaCarreteGetFilterData.md) (`Procedure`, `Produccion`)
- depth 1: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 2: [BobinaWW](../WebPanels/DB/BobinaWW.md) (`WebPanel`, `DB`)
- depth 2: [CarreraWW](../WebPanels/DB/CarreraWW.md) (`WebPanel`, `DB`)
- depth 2: [CarreteWW](../WebPanels/DB/CarreteWW.md) (`WebPanel`, `DB`)
- depth 2: [PrensadoWW](../WebPanels/DB/PrensadoWW.md) (`WebPanel`, `DB`)
- depth 2: [EtiquetaCarreraSDT](../SDTs/PrinterSD/EtiquetaCarreraSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [EtiquetaCarreteSDT](../SDTs/PrinterSD/EtiquetaCarreteSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaCarrete](../Procedures/PrinterSD/ObtenerSDTEtiquetaCarrete.md) (`Procedure`, `PrinterSD`)
- depth 3: [BobinaWWExport](../Procedures/DB/BobinaWWExport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWExportReport](../Procedures/DB/BobinaWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWGetFilterData](../Procedures/DB/BobinaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [CarreraWWExport](../Procedures/DB/CarreraWWExport.md) (`Procedure`, `DB`)
- depth 3: [CarreraWWExportReport](../Procedures/DB/CarreraWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [CarreraWWGetFilterData](../Procedures/DB/CarreraWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [CarreteWWExport](../Procedures/DB/CarreteWWExport.md) (`Procedure`, `DB`)
- depth 3: [CarreteWWExportReport](../Procedures/DB/CarreteWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [CarreteWWGetFilterData](../Procedures/DB/CarreteWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 3: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 3: [LlenadoCarreraInterrupcion](../Procedures/DB/LlenadoCarreraInterrupcion.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWExport](../Procedures/DB/PrensadoWWExport.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWExportReport](../Procedures/DB/PrensadoWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWGetFilterData](../Procedures/DB/PrensadoWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 3: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)
- depth 3: [RptPrensado](../Procedures/PrinterSD/RptPrensado.md) (`Procedure`, `PrinterSD`)
- depth 3: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 3: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 3: [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) (`WebPanel`, `WWPBaseObjects`)
- depth 4: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 4: [ExtrusoraBobina](../Transactions/DB/ExtrusoraBobina.md) (`Transaction`, `DB`)
- depth 4: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 4: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 4: [DPSDTRptPrensado](../DataProviders/PrinterSD/DPSDTRptPrensado.md) (`DataProvider`, `PrinterSD`)
- depth 4: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 4: [SDTCarreteCalidad](../SDTs/PrinterSD/SDTCarreteCalidad.md) (`SDT`, `PrinterSD`)
- depth 4: [SDTRptPrensado](../SDTs/PrinterSD/SDTRptPrensado.md) (`SDT`, `PrinterSD`)
- depth 4: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 4: [CarreraDP](../DataProviders/Produccion/CarreraDP.md) (`DataProvider`, `Produccion`)
- depth 4: [CarreteDP](../DataProviders/Produccion/CarreteDP.md) (`DataProvider`, `Produccion`)
- depth 4: [DPPrensadoBobinaSDT](../DataProviders/Produccion/DPPrensadoBobinaSDT.md) (`DataProvider`, `Produccion`)
- depth 4: [DPPrensadoResultado](../DataProviders/Produccion/DPPrensadoResultado.md) (`DataProvider`, `Produccion`)
- depth 4: [DPProductoTerminado](../DataProviders/Produccion/DPProductoTerminado.md) (`DataProvider`, `Produccion`)
- depth 4: [ObtenerInterrupcionCarrera](../Procedures/Produccion/ObtenerInterrupcionCarrera.md) (`Procedure`, `Produccion`)
- depth 4: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 4: [SDTCarrera](../SDTs/Produccion/SDTCarrera.md) (`SDT`, `Produccion`)
- depth 4: [SDTCarrete](../SDTs/Produccion/SDTCarrete.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoBobina](../SDTs/Produccion/SDTPrensadoBobina.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 4: [SDTProductoTerminado](../SDTs/Produccion/SDTProductoTerminado.md) (`SDT`, `Produccion`)
- depth 4: [SetEstadoBobina](../Procedures/Produccion/SetEstadoBobina.md) (`Procedure`, `Produccion`)
- depth 4: [AuditView](../WebPanels/WWPBaseObjects/AuditView.md) (`WebPanel`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Audit`, `Bobina`, `Carrera`, `Carrete`, `DB.Bobina`, `DB.Extrusion`, `DB.Order`, `Extrusion`, `ExtrusoraBobina`, `Interrupcion`, `Prensado`
- **Tablas escritas:** `Carrera`, `DB.Bobina`, `DB.ExtrusoraBobina`, `ExtrusoraBobina`, `Interrupcion`
- **SDTs usados:** `EtiquetaBobinaSDT`, `EtiquetaCarreraSDT`, `EtiquetaCarreteSDT`, `GeneXus.Common.GridState`, `Produccion.SDTCarrera`, `Produccion.SDTCarrete`, `Produccion.SDTPrensadoBobina`, `Produccion.SDTPrensadoResultado`, `Produccion.SDTProductoTerminado`, `SDTCarrera`, `SDTCarrete`, `SDTCarreteCalidad`, `SDTPrensadoBobina`, `SDTPrensadoResultado`, `SDTProductoTerminado`, `SDTRptPrensado`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`, `WWPContext`
- **DataProviders usados:** `DPSDTRptPrensado`, `Produccion.CarreraDP`, `Produccion.CarreteDP`, `Produccion.DPPrensadoBobinaSDT`, `Produccion.DPPrensadoResultado`, `Produccion.DPProductoTerminado`
## Entidades relacionadas (del glosario)

- [ExtrusoraBobina](../_domain_glossary.md#extrusorabobina)
- [Interrupcion](../_domain_glossary.md#interrupcion)
