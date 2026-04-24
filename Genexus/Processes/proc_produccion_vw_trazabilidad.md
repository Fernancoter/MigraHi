# Proceso: vwTrazabilidad

- **Entry point:** [vwTrazabilidad](../WebPanels/Produccion/vwTrazabilidad.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 68
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_vw_trazabilidad.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwTrazabilidad](../WebPanels/Produccion/vwTrazabilidad.md) (`WebPanel`, `Produccion`)
- depth 1: [BobinaView](../WebPanels/DB/BobinaView.md) (`WebPanel`, `DB`)
- depth 1: [CarreraView](../WebPanels/DB/CarreraView.md) (`WebPanel`, `DB`)
- depth 1: [CarreteView](../WebPanels/DB/CarreteView.md) (`WebPanel`, `DB`)
- depth 1: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 1: [PaletView](../WebPanels/DB/PaletView.md) (`WebPanel`, `DB`)
- depth 1: [GenerarSDTTrazabilidad](../Procedures/Produccion/GenerarSDTTrazabilidad.md) (`Procedure`, `Produccion`)
- depth 1: [SDTTrazabilidad](../SDTs/Produccion/SDTTrazabilidad.md) (`SDT`, `Produccion`)
- depth 1: [vwTrazabilidadExport](../Procedures/Produccion/vwTrazabilidadExport.md) (`Procedure`, `Produccion`)
- depth 1: [vwTrazabilidadExportReport](../Procedures/Produccion/vwTrazabilidadExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [vwTrazabilidadGetFilterData](../Procedures/Produccion/vwTrazabilidadGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [BobinaWW](../WebPanels/DB/BobinaWW.md) (`WebPanel`, `DB`)
- depth 2: [CarreraWW](../WebPanels/DB/CarreraWW.md) (`WebPanel`, `DB`)
- depth 2: [CarreteWW](../WebPanels/DB/CarreteWW.md) (`WebPanel`, `DB`)
- depth 2: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 2: [PaletWW](../WebPanels/DB/PaletWW.md) (`WebPanel`, `DB`)
- depth 2: [DPSDTTrazabilidad](../DataProviders/Produccion/DPSDTTrazabilidad.md) (`DataProvider`, `Produccion`)
- depth 3: [BobinaWWExport](../Procedures/DB/BobinaWWExport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWExportReport](../Procedures/DB/BobinaWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWGetFilterData](../Procedures/DB/BobinaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [CarreraWWExport](../Procedures/DB/CarreraWWExport.md) (`Procedure`, `DB`)
- depth 3: [CarreraWWExportReport](../Procedures/DB/CarreraWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [CarreraWWGetFilterData](../Procedures/DB/CarreraWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [CarreteWWExport](../Procedures/DB/CarreteWWExport.md) (`Procedure`, `DB`)
- depth 3: [CarreteWWExportReport](../Procedures/DB/CarreteWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [CarreteWWGetFilterData](../Procedures/DB/CarreteWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 3: [LlenadoCarreraInterrupcion](../Procedures/DB/LlenadoCarreraInterrupcion.md) (`Procedure`, `DB`)
- depth 3: [PaletWWExport](../Procedures/DB/PaletWWExport.md) (`Procedure`, `DB`)
- depth 3: [PaletWWExportReport](../Procedures/DB/PaletWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [PaletWWGetFilterData](../Procedures/DB/PaletWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 3: [CarreteReportMain](../Procedures/PrinterSD/CarreteReportMain.md) (`Procedure`, `PrinterSD`)
- depth 3: [CarreteReportMainPCR](../Procedures/PrinterSD/CarreteReportMainPCR.md) (`Procedure`, `PrinterSD`)
- depth 3: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 3: [PaletReport](../Procedures/PrinterSD/PaletReport.md) (`Procedure`, `PrinterSD`)
- depth 3: [PaletReportMain](../Procedures/PrinterSD/PaletReportMain.md) (`Procedure`, `PrinterSD`)
- depth 3: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)
- depth 3: [ObtenerTipoMaterialPorCarrete](../Procedures/Produccion/ObtenerTipoMaterialPorCarrete.md) (`Procedure`, `Produccion`)
- depth 3: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 3: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 3: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 3: [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) (`WebPanel`, `WWPBaseObjects`)
- depth 4: [ExtrusoraBobina](../Transactions/DB/ExtrusoraBobina.md) (`Transaction`, `DB`)
- depth 4: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 4: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 4: [DPSDTRptExtrusion](../DataProviders/PrinterSD/DPSDTRptExtrusion.md) (`DataProvider`, `PrinterSD`)
- depth 4: [EtiquetaCarreraSDT](../SDTs/PrinterSD/EtiquetaCarreraSDT.md) (`SDT`, `PrinterSD`)
- depth 4: [EtiquetaCarreteSDT](../SDTs/PrinterSD/EtiquetaCarreteSDT.md) (`SDT`, `PrinterSD`)
- depth 4: [EtiquetaPaletSDT](../SDTs/PrinterSD/EtiquetaPaletSDT.md) (`SDT`, `PrinterSD`)
- depth 4: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 4: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 4: [ObtenerSDTEtiquetaCarrete](../Procedures/PrinterSD/ObtenerSDTEtiquetaCarrete.md) (`Procedure`, `PrinterSD`)
- depth 4: [ObtenerSDTEtiquetaPalet](../Procedures/PrinterSD/ObtenerSDTEtiquetaPalet.md) (`Procedure`, `PrinterSD`)
- depth 4: [PaletReportSAP](../Procedures/PrinterSD/PaletReportSAP.md) (`Procedure`, `PrinterSD`)
- depth 4: [SDTRptExtrusion](../SDTs/PrinterSD/SDTRptExtrusion.md) (`SDT`, `PrinterSD`)
- depth 4: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 4: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 4: [DPExtrusionResultado](../DataProviders/Produccion/DPExtrusionResultado.md) (`DataProvider`, `Produccion`)
- depth 4: [ObtenerInterrupcionCarrera](../Procedures/Produccion/ObtenerInterrupcionCarrera.md) (`Procedure`, `Produccion`)
- depth 4: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 4: [SDTExtrusionResultado](../SDTs/Produccion/SDTExtrusionResultado.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 4: [SetEstadoBobina](../Procedures/Produccion/SetEstadoBobina.md) (`Procedure`, `Produccion`)
- depth 4: [AuditView](../WebPanels/WWPBaseObjects/AuditView.md) (`WebPanel`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Audit`, `Bobina`, `Carrera`, `Carrete`, `DB.Bobina`, `DB.Extrusion`, `DB.Order`, `DB.Palet`, `Extrusion`, `ExtrusoraBobina`, `Interrupcion`, `Palet`
- **Tablas escritas:** `Carrera`, `DB.Bobina`, `DB.ExtrusoraBobina`, `ExtrusoraBobina`, `Interrupcion`
- **SDTs usados:** `EtiquetaBobinaSDT`, `EtiquetaCarreraSDT`, `EtiquetaCarreteSDT`, `EtiquetaPaletSDT`, `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTBobina`, `SDTExtrusionResultado`, `SDTRptExtrusion`, `SDTTrazabilidad`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`, `WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `DPSDTTrazabilidad`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

- [ExtrusoraBobina](../_domain_glossary.md#extrusorabobina)
- [Interrupcion](../_domain_glossary.md#interrupcion)
