# Proceso: Bobinas

- **Entry point:** [BobinaWW](../WebPanels/DB/BobinaWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Extrusión > Bobinas`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 29
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_bobina_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [BobinaWW](../WebPanels/DB/BobinaWW.md) (`WebPanel`, `DB`)
- depth 1: [BobinaView](../WebPanels/DB/BobinaView.md) (`WebPanel`, `DB`)
- depth 1: [BobinaWWExport](../Procedures/DB/BobinaWWExport.md) (`Procedure`, `DB`)
- depth 1: [BobinaWWExportReport](../Procedures/DB/BobinaWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [BobinaWWGetFilterData](../Procedures/DB/BobinaWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 1: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 1: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 1: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 2: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 2: [ExtrusoraBobina](../Transactions/DB/ExtrusoraBobina.md) (`Transaction`, `DB`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 2: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 2: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 2: [SetEstadoBobina](../Procedures/Produccion/SetEstadoBobina.md) (`Procedure`, `Produccion`)
- depth 3: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)
- depth 3: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)
- depth 4: [DPSDTRptExtrusion](../DataProviders/PrinterSD/DPSDTRptExtrusion.md) (`DataProvider`, `PrinterSD`)
- depth 4: [SDTRptExtrusion](../SDTs/PrinterSD/SDTRptExtrusion.md) (`SDT`, `PrinterSD`)
- depth 4: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 4: [DPExtrusionResultado](../DataProviders/Produccion/DPExtrusionResultado.md) (`DataProvider`, `Produccion`)
- depth 4: [SDTExtrusionResultado](../SDTs/Produccion/SDTExtrusionResultado.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 4: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** `Bobina`, `DB.Bobina`, `DB.Extrusion`, `Extrusion`, `ExtrusoraBobina`
- **Tablas escritas:** `DB.Bobina`, `DB.ExtrusoraBobina`, `ExtrusoraBobina`
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTBobina`, `SDTExtrusionResultado`, `SDTRptExtrusion`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

- [ExtrusoraBobina](../_domain_glossary.md#extrusorabobina)
