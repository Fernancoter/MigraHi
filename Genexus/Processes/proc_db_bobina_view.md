# Proceso: BobinaView

- **Entry point:** [BobinaView](../WebPanels/DB/BobinaView.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Calidad.TrazabilidadView`, `Produccion.vwAnaliticaBobina`, `Produccion.vwAnaliticaCarrete`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 22
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_bobina_view.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [BobinaView](../WebPanels/DB/BobinaView.md) (`WebPanel`, `DB`)
- depth 1: [BobinaWW](../WebPanels/DB/BobinaWW.md) (`WebPanel`, `DB`)
- depth 2: [BobinaWWExport](../Procedures/DB/BobinaWWExport.md) (`Procedure`, `DB`)
- depth 2: [BobinaWWExportReport](../Procedures/DB/BobinaWWExportReport.md) (`Procedure`, `DB`)
- depth 2: [BobinaWWGetFilterData](../Procedures/DB/BobinaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 2: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 2: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 2: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 3: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 3: [ExtrusoraBobina](../Transactions/DB/ExtrusoraBobina.md) (`Transaction`, `DB`)
- depth 3: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 3: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 3: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 3: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 3: [SetEstadoBobina](../Procedures/Produccion/SetEstadoBobina.md) (`Procedure`, `Produccion`)
- depth 4: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 4: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)
- depth 4: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** `Bobina`, `DB.Bobina`, `DB.Extrusion`, `Extrusion`, `ExtrusoraBobina`
- **Tablas escritas:** `DB.Bobina`, `DB.ExtrusoraBobina`, `ExtrusoraBobina`
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTRptExtrusion`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

- [ExtrusoraBobina](../_domain_glossary.md#extrusorabobina)
