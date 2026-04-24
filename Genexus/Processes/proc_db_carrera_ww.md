# Proceso: Carreras

- **Entry point:** [CarreraWW](../WebPanels/DB/CarreraWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Prensado > Operación > Carreras`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 50
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_carrera_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CarreraWW](../WebPanels/DB/CarreraWW.md) (`WebPanel`, `DB`)
- depth 1: [BobinaView](../WebPanels/DB/BobinaView.md) (`WebPanel`, `DB`)
- depth 1: [CarreraView](../WebPanels/DB/CarreraView.md) (`WebPanel`, `DB`)
- depth 1: [CarreraWWExport](../Procedures/DB/CarreraWWExport.md) (`Procedure`, `DB`)
- depth 1: [CarreraWWExportReport](../Procedures/DB/CarreraWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [CarreraWWGetFilterData](../Procedures/DB/CarreraWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 1: [LlenadoCarreraInterrupcion](../Procedures/DB/LlenadoCarreraInterrupcion.md) (`Procedure`, `DB`)
- depth 1: [CarreteReportMain](../Procedures/PrinterSD/CarreteReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [CarreteReportMainPCR](../Procedures/PrinterSD/CarreteReportMainPCR.md) (`Procedure`, `PrinterSD`)
- depth 1: [ObtenerTipoMaterialPorCarrete](../Procedures/Produccion/ObtenerTipoMaterialPorCarrete.md) (`Procedure`, `Produccion`)
- depth 1: [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) (`WebPanel`, `WWPBaseObjects`)
- depth 2: [BobinaWW](../WebPanels/DB/BobinaWW.md) (`WebPanel`, `DB`)
- depth 2: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 2: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 2: [EtiquetaCarreraSDT](../SDTs/PrinterSD/EtiquetaCarreraSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [EtiquetaCarreteSDT](../SDTs/PrinterSD/EtiquetaCarreteSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaCarrete](../Procedures/PrinterSD/ObtenerSDTEtiquetaCarrete.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerInterrupcionCarrera](../Procedures/Produccion/ObtenerInterrupcionCarrera.md) (`Procedure`, `Produccion`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 2: [AuditView](../WebPanels/WWPBaseObjects/AuditView.md) (`WebPanel`, `WWPBaseObjects`)
- depth 3: [BobinaWWExport](../Procedures/DB/BobinaWWExport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWExportReport](../Procedures/DB/BobinaWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [BobinaWWGetFilterData](../Procedures/DB/BobinaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 3: [InterrupcionWWExport](../Procedures/DB/InterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionWWExportReport](../Procedures/DB/InterrupcionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionWWGetFilterData](../Procedures/DB/InterrupcionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [LoadAuditInterrupcion](../Procedures/DB/LoadAuditInterrupcion.md) (`Procedure`, `DB`)
- depth 3: [PrensadoInterrupcion](../Transactions/DB/PrensadoInterrupcion.md) (`Transaction`, `DB`)
- depth 3: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 3: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)
- depth 3: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 3: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 3: [Audit](../Transactions/WWPBaseObjects/Audit.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [AuditWW](../WebPanels/WWPBaseObjects/AuditWW.md) (`WebPanel`, `WWPBaseObjects`)
- depth 4: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 4: [ExtrusoraBobina](../Transactions/DB/ExtrusoraBobina.md) (`Transaction`, `DB`)
- depth 4: [LoadAuditPrensadoInterrupcion](../Procedures/DB/LoadAuditPrensadoInterrupcion.md) (`Procedure`, `DB`)
- depth 4: [PrensadoInterrupcionView](../WebPanels/DB/PrensadoInterrupcionView.md) (`WebPanel`, `DB`)
- depth 4: [PrensadoInterrupcionWW](../WebPanels/DB/PrensadoInterrupcionWW.md) (`WebPanel`, `DB`)
- depth 4: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 4: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 4: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 4: [SetEstadoBobina](../Procedures/Produccion/SetEstadoBobina.md) (`Procedure`, `Produccion`)
- depth 4: [AuditWWExport](../Procedures/WWPBaseObjects/AuditWWExport.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [AuditWWExportReport](../Procedures/WWPBaseObjects/AuditWWExportReport.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [AuditWWGetFilterData](../Procedures/WWPBaseObjects/AuditWWGetFilterData.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Audit`, `Bobina`, `Carrera`, `DB.Bobina`, `DB.Extrusion`, `DB.Order`, `Extrusion`, `ExtrusoraBobina`, `Interrupcion`, `PrensadoInterrupcion`
- **Tablas escritas:** `Audit`, `Carrera`, `DB.Bobina`, `DB.ExtrusoraBobina`, `ExtrusoraBobina`, `Interrupcion`, `PrensadoInterrupcion`
- **SDTs usados:** `EtiquetaBobinaSDT`, `EtiquetaCarreraSDT`, `EtiquetaCarreteSDT`, `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`, `WWPColumnsSelector`, `WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Audit](../_domain_glossary.md#audit)
- [ExtrusoraBobina](../_domain_glossary.md#extrusorabobina)
- [Interrupcion](../_domain_glossary.md#interrupcion)
- [PrensadoInterrupcion](../_domain_glossary.md#prensadointerrupcion)
