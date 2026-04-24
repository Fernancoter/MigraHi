# Proceso: CarreraView

- **Entry point:** [CarreraView](../WebPanels/DB/CarreraView.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Calidad.TrazabilidadView`, `Produccion.vwAnaliticaCarrete`, `Produccion.vwTrazabilidad`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 38
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_carrera_view.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CarreraView](../WebPanels/DB/CarreraView.md) (`WebPanel`, `DB`)
- depth 1: [CarreraWW](../WebPanels/DB/CarreraWW.md) (`WebPanel`, `DB`)
- depth 2: [BobinaView](../WebPanels/DB/BobinaView.md) (`WebPanel`, `DB`)
- depth 2: [CarreraWWExport](../Procedures/DB/CarreraWWExport.md) (`Procedure`, `DB`)
- depth 2: [CarreraWWExportReport](../Procedures/DB/CarreraWWExportReport.md) (`Procedure`, `DB`)
- depth 2: [CarreraWWGetFilterData](../Procedures/DB/CarreraWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 2: [LlenadoCarreraInterrupcion](../Procedures/DB/LlenadoCarreraInterrupcion.md) (`Procedure`, `DB`)
- depth 2: [CarreteReportMain](../Procedures/PrinterSD/CarreteReportMain.md) (`Procedure`, `PrinterSD`)
- depth 2: [CarreteReportMainPCR](../Procedures/PrinterSD/CarreteReportMainPCR.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerTipoMaterialPorCarrete](../Procedures/Produccion/ObtenerTipoMaterialPorCarrete.md) (`Procedure`, `Produccion`)
- depth 2: [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) (`WebPanel`, `WWPBaseObjects`)
- depth 3: [BobinaWW](../WebPanels/DB/BobinaWW.md) (`WebPanel`, `DB`)
- depth 3: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 3: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 3: [EtiquetaCarreraSDT](../SDTs/PrinterSD/EtiquetaCarreraSDT.md) (`SDT`, `PrinterSD`)
- depth 3: [EtiquetaCarreteSDT](../SDTs/PrinterSD/EtiquetaCarreteSDT.md) (`SDT`, `PrinterSD`)
- depth 3: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 3: [ObtenerSDTEtiquetaCarrete](../Procedures/PrinterSD/ObtenerSDTEtiquetaCarrete.md) (`Procedure`, `PrinterSD`)
- depth 3: [ObtenerInterrupcionCarrera](../Procedures/Produccion/ObtenerInterrupcionCarrera.md) (`Procedure`, `Produccion`)
- depth 3: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 3: [AuditView](../WebPanels/WWPBaseObjects/AuditView.md) (`WebPanel`, `WWPBaseObjects`)
- depth 4: [BobinaWWExport](../Procedures/DB/BobinaWWExport.md) (`Procedure`, `DB`)
- depth 4: [BobinaWWExportReport](../Procedures/DB/BobinaWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [BobinaWWGetFilterData](../Procedures/DB/BobinaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 4: [InterrupcionWWExport](../Procedures/DB/InterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 4: [InterrupcionWWExportReport](../Procedures/DB/InterrupcionWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [InterrupcionWWGetFilterData](../Procedures/DB/InterrupcionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [LoadAuditInterrupcion](../Procedures/DB/LoadAuditInterrupcion.md) (`Procedure`, `DB`)
- depth 4: [PrensadoInterrupcion](../Transactions/DB/PrensadoInterrupcion.md) (`Transaction`, `DB`)
- depth 4: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 4: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 4: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)
- depth 4: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 4: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 4: [Audit](../Transactions/WWPBaseObjects/Audit.md) (`Transaction`, `WWPBaseObjects`)
- depth 4: [AuditWW](../WebPanels/WWPBaseObjects/AuditWW.md) (`WebPanel`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Audit`, `Bobina`, `Carrera`, `DB.Extrusion`, `DB.Order`, `Extrusion`, `Interrupcion`, `PrensadoInterrupcion`
- **Tablas escritas:** `Audit`, `Carrera`, `DB.ExtrusoraBobina`, `Interrupcion`, `PrensadoInterrupcion`
- **SDTs usados:** `EtiquetaBobinaSDT`, `EtiquetaCarreraSDT`, `EtiquetaCarreteSDT`, `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`, `WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Audit](../_domain_glossary.md#audit)
- [Interrupcion](../_domain_glossary.md#interrupcion)
- [PrensadoInterrupcion](../_domain_glossary.md#prensadointerrupcion)
