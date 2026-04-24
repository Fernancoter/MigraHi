# Proceso: Inicio

- **Entry point:** [InicioExtrusion](../WebPanels/Produccion/InicioExtrusion.md) -- tipo menú
- **Ruta en el menú:** `Web > Extrusión > Inicio`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 18
- **Módulos tocados:** `DB`, `GeneXusReporting`, `PrinterSD`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_inicio_extrusion.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [InicioExtrusion](../WebPanels/Produccion/InicioExtrusion.md) (`WebPanel`, `Produccion`)
- depth 1: [QueryViewerDragAndDropData](../SDTs/GeneXusReporting/QueryViewerDragAndDropData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerElements](../SDTs/GeneXusReporting/QueryViewerElements.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerFilterChangedData](../SDTs/GeneXusReporting/QueryViewerFilterChangedData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemClickData](../SDTs/GeneXusReporting/QueryViewerItemClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemCollapseData](../SDTs/GeneXusReporting/QueryViewerItemCollapseData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemDoubleClickData](../SDTs/GeneXusReporting/QueryViewerItemDoubleClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemExpandData](../SDTs/GeneXusReporting/QueryViewerItemExpandData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerParameters](../SDTs/GeneXusReporting/QueryViewerParameters.md) (`SDT`, `GeneXusReporting`)
- depth 1: [TableroDirectivoExtrusion](../WebPanels/Produccion/TableroDirectivoExtrusion.md) (`WebPanel`, `Produccion`)
- depth 2: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 2: [TableroDirectivoExtrusionGetFilterData](../Procedures/Produccion/TableroDirectivoExtrusionGetFilterData.md) (`Procedure`, `Produccion`)
- depth 3: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 3: [ObtenerCantidadBobinasPorExtrusion](../Procedures/Produccion/ObtenerCantidadBobinasPorExtrusion.md) (`Procedure`, `Produccion`)
- depth 4: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 4: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** `Extrusion`
- **Tablas escritas:** ``
- **SDTs usados:** `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTRptExtrusion`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
