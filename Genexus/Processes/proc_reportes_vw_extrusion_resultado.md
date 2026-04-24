# Proceso: Extrusión

- **Entry point:** [vwExtrusionResultado](../WebPanels/Reportes/vwExtrusionResultado.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Resúmenes > Extrusión`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 19
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Reportes`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_vw_extrusion_resultado.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwExtrusionResultado](../WebPanels/Reportes/vwExtrusionResultado.md) (`WebPanel`, `Reportes`)
- depth 1: [ExtrusionResultado](../Transactions/DB/ExtrusionResultado.md) (`Transaction`, `DB`)
- depth 1: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 1: [ReporteExtrusion](../WebPanels/Reportes/ReporteExtrusion.md) (`WebPanel`, `Reportes`)
- depth 1: [vwExtrusionResultadoExport](../Procedures/Reportes/vwExtrusionResultadoExport.md) (`Procedure`, `Reportes`)
- depth 1: [vwExtrusionResultadoExportReport](../Procedures/Reportes/vwExtrusionResultadoExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [vwExtrusionResultadoGetFilterData](../Procedures/Reportes/vwExtrusionResultadoGetFilterData.md) (`Procedure`, `Reportes`)
- depth 2: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 3: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)
- depth 4: [DPSDTRptExtrusion](../DataProviders/PrinterSD/DPSDTRptExtrusion.md) (`DataProvider`, `PrinterSD`)
- depth 4: [SDTRptExtrusion](../SDTs/PrinterSD/SDTRptExtrusion.md) (`SDT`, `PrinterSD`)
- depth 4: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 4: [DPExtrusionResultado](../DataProviders/Produccion/DPExtrusionResultado.md) (`DataProvider`, `Produccion`)
- depth 4: [SDTExtrusionResultado](../SDTs/Produccion/SDTExtrusionResultado.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 4: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** `Extrusion`, `ExtrusionResultado`
- **Tablas escritas:** `ExtrusionResultado`
- **SDTs usados:** `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTBobina`, `SDTExtrusionResultado`, `SDTRptExtrusion`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

- [ExtrusionResultado](../_domain_glossary.md#extrusionresultado)
